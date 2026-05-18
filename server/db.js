import './loadEnv.js';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const dataDir = join(__dirname, 'data');
const sqlitePath = join(dataDir, 'orders.sqlite');

function hasDatabaseUrl() {
  return Boolean(String(process.env.DATABASE_URL || '').trim());
}
let sqliteDb = null;
let pgPool = null;
let initialized = false;

const sqliteSchema = `
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNo TEXT NOT NULL UNIQUE,
    pickupCode TEXT NOT NULL,
    courseId TEXT NOT NULL,
    amount INTEGER NOT NULL,
    recoveryEmail TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    paymentStatus TEXT NOT NULL DEFAULT 'pending',
    deliveryStatus TEXT NOT NULL DEFAULT 'pending',
    buyerIp TEXT,
    userAgent TEXT,
    createdAt TEXT NOT NULL,
    paidAt TEXT
  );

  CREATE TABLE IF NOT EXISTS deliveries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNo TEXT NOT NULL UNIQUE,
    learningUsername TEXT NOT NULL,
    learningPassword TEXT NOT NULL,
    downloadUrl TEXT NOT NULL,
    extractCode TEXT NOT NULL,
    deliveredAt TEXT NOT NULL,
    FOREIGN KEY(orderNo) REFERENCES orders(orderNo)
  );

  CREATE TABLE IF NOT EXISTS payment_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNo TEXT,
    paymentId TEXT,
    rawPayload TEXT NOT NULL,
    eventType TEXT NOT NULL,
    verifyStatus TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(orderNo) REFERENCES orders(orderNo)
  );

  CREATE TABLE IF NOT EXISTS refunds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNo TEXT NOT NULL,
    amount INTEGER NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'requested',
    createdAt TEXT NOT NULL,
    FOREIGN KEY(orderNo) REFERENCES orders(orderNo)
  );

  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS support_tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderNo TEXT NOT NULL,
    type TEXT NOT NULL,
    note TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    createdAt TEXT NOT NULL,
    FOREIGN KEY(orderNo) REFERENCES orders(orderNo)
  );
`;

const postgresSchema = `
  CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    orderNo TEXT NOT NULL UNIQUE,
    pickupCode TEXT NOT NULL,
    courseId TEXT NOT NULL,
    amount INTEGER NOT NULL,
    recoveryEmail TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    paymentStatus TEXT NOT NULL DEFAULT 'pending',
    deliveryStatus TEXT NOT NULL DEFAULT 'pending',
    buyerIp TEXT,
    userAgent TEXT,
    createdAt TEXT NOT NULL,
    paidAt TEXT
  );

  CREATE TABLE IF NOT EXISTS deliveries (
    id BIGSERIAL PRIMARY KEY,
    orderNo TEXT NOT NULL UNIQUE REFERENCES orders(orderNo),
    learningUsername TEXT NOT NULL,
    learningPassword TEXT NOT NULL,
    username TEXT,
    password TEXT,
    downloadUrl TEXT NOT NULL,
    extractCode TEXT NOT NULL,
    deliveredAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS payment_events (
    id BIGSERIAL PRIMARY KEY,
    orderNo TEXT REFERENCES orders(orderNo),
    paymentId TEXT,
    rawPayload TEXT NOT NULL,
    eventType TEXT NOT NULL,
    verifyStatus TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS refunds (
    id BIGSERIAL PRIMARY KEY,
    orderNo TEXT NOT NULL REFERENCES orders(orderNo),
    amount INTEGER NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'requested',
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS support_tickets (
    id BIGSERIAL PRIMARY KEY,
    orderNo TEXT NOT NULL REFERENCES orders(orderNo),
    type TEXT NOT NULL,
    note TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    createdAt TEXT NOT NULL
  );
`;

function normalizeRow(row) {
  if (!row) return row;
  return {
    ...row,
    orderNo: row.orderNo ?? row.orderno,
    pickupCode: row.pickupCode ?? row.pickupcode,
    courseId: row.courseId ?? row.courseid,
    recoveryEmail: row.recoveryEmail ?? row.recoveryemail,
    paymentStatus: row.paymentStatus ?? row.paymentstatus,
    deliveryStatus: row.deliveryStatus ?? row.deliverystatus,
    buyerIp: row.buyerIp ?? row.buyerip,
    userAgent: row.userAgent ?? row.useragent,
    createdAt: row.createdAt ?? row.createdat,
    paidAt: row.paidAt ?? row.paidat,
    learningUsername: row.learningUsername ?? row.learningusername,
    learningPassword: row.learningPassword ?? row.learningpassword,
    downloadUrl: row.downloadUrl ?? row.downloadurl,
    extractCode: row.extractCode ?? row.extractcode,
    deliveredAt: row.deliveredAt ?? row.deliveredat,
    paymentId: row.paymentId ?? row.paymentid,
    rawPayload: row.rawPayload ?? row.rawpayload,
    eventType: row.eventType ?? row.eventtype,
    verifyStatus: row.verifyStatus ?? row.verifystatus,
  };
}

function toPostgresQuery(statement, params = {}) {
  const values = [];
  const indexes = new Map();
  const text = statement.replace(/:([A-Za-z][A-Za-z0-9_]*)/g, (_, key) => {
    if (!indexes.has(key)) {
      indexes.set(key, values.length + 1);
      values.push(params[key]);
    }
    return `$${indexes.get(key)}`;
  });
  return { text, values };
}

async function getPgPool() {
  if (pgPool) return pgPool;
  let Pool;
  try {
    ({ Pool } = require('pg'));
  } catch (error) {
    const missingDriver = new Error('PostgreSQL driver "pg" is not installed. Run npm install before using DATABASE_URL.');
    missingDriver.cause = error;
    throw missingDriver;
  }
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  });
  return pgPool;
}

function getSqliteDb() {
  if (sqliteDb) return sqliteDb;
  mkdirSync(dataDir, { recursive: true });
  sqliteDb = new DatabaseSync(sqlitePath);
  return sqliteDb;
}

function migrateSqliteCompatibility(db) {
  const deliveryColumns = db.prepare('PRAGMA table_info(deliveries)').all().map((column) => column.name);

  if (!deliveryColumns.includes('learningUsername')) {
    db.exec('ALTER TABLE deliveries ADD COLUMN learningUsername TEXT');
    if (deliveryColumns.includes('username')) {
      db.exec('UPDATE deliveries SET learningUsername = username WHERE learningUsername IS NULL');
    }
  }

  if (!deliveryColumns.includes('learningPassword')) {
    db.exec('ALTER TABLE deliveries ADD COLUMN learningPassword TEXT');
    if (deliveryColumns.includes('password')) {
      db.exec('UPDATE deliveries SET learningPassword = password WHERE learningPassword IS NULL');
    }
  }

  if (!deliveryColumns.includes('username')) db.exec('ALTER TABLE deliveries ADD COLUMN username TEXT');
  if (!deliveryColumns.includes('password')) db.exec('ALTER TABLE deliveries ADD COLUMN password TEXT');

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((row) => row.name);
  if (tables.includes('support_records') && !tables.includes('support_tickets')) {
    db.exec('ALTER TABLE support_records RENAME TO support_tickets');
  } else if (tables.includes('support_records') && tables.includes('support_tickets')) {
    db.exec(`
      INSERT INTO support_tickets (orderNo, type, note, status, createdAt)
      SELECT orderNo, type, note, 'closed', createdAt
      FROM support_records
      WHERE NOT EXISTS (
        SELECT 1 FROM support_tickets
        WHERE support_tickets.orderNo = support_records.orderNo
          AND support_tickets.type = support_records.type
          AND support_tickets.note = support_records.note
          AND support_tickets.createdAt = support_records.createdAt
      )
    `);
  }
}

async function migratePostgresCompatibility(pool) {
  await pool.query(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'support_records'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'support_tickets'
      ) THEN
        ALTER TABLE support_records RENAME TO support_tickets;
      ELSIF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'support_records'
      ) AND EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'support_tickets'
      ) THEN
        INSERT INTO support_tickets (orderNo, type, note, status, createdAt)
        SELECT orderNo, type, note, 'closed', createdAt
        FROM support_records
        WHERE NOT EXISTS (
          SELECT 1 FROM support_tickets
          WHERE support_tickets.orderNo = support_records.orderNo
            AND support_tickets.type = support_records.type
            AND support_tickets.note = support_records.note
            AND support_tickets.createdAt = support_records.createdAt
        );
      END IF;
    END $$;
  `);
}

export async function initDb() {
  if (initialized) return;
  if (process.env.NODE_ENV === 'production' && !hasDatabaseUrl()) {
    throw new Error('DATABASE_URL is required in production.');
  }
  if (hasDatabaseUrl()) {
    const pool = await getPgPool();
    await pool.query(postgresSchema);
    await migratePostgresCompatibility(pool);
  } else {
    const db = getSqliteDb();
    db.exec(sqliteSchema);
    migrateSqliteCompatibility(db);
  }
  initialized = true;
}

export async function run(statement, params = {}) {
  await initDb();
  if (hasDatabaseUrl()) {
    const pool = await getPgPool();
    const query = toPostgresQuery(statement, params);
    return pool.query(query.text, query.values);
  }
  return getSqliteDb().prepare(statement).run(params);
}

export async function get(statement, params = {}) {
  await initDb();
  if (hasDatabaseUrl()) {
    const pool = await getPgPool();
    const query = toPostgresQuery(statement, params);
    const result = await pool.query(query.text, query.values);
    return normalizeRow(result.rows[0]);
  }
  return normalizeRow(getSqliteDb().prepare(statement).get(params));
}

export async function all(statement, params = {}) {
  await initDb();
  if (hasDatabaseUrl()) {
    const pool = await getPgPool();
    const query = toPostgresQuery(statement, params);
    const result = await pool.query(query.text, query.values);
    return result.rows.map(normalizeRow);
  }
  return getSqliteDb().prepare(statement).all(params).map(normalizeRow);
}

export async function closeDb() {
  if (pgPool) await pgPool.end();
  if (sqliteDb) sqliteDb.close();
}

export function getDbMode() {
  return hasDatabaseUrl() ? 'postgres' : 'sqlite';
}
