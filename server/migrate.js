import './loadEnv.js';
import { closeDb, getDbMode, initDb } from './db.js';
import { courses } from '../src/data/courses.js';
import { run } from './db.js';

await initDb();

for (const course of courses) {
  await run(
    `INSERT INTO courses (id, title, price, category, createdAt)
     VALUES (:id, :title, :price, :category, :createdAt)
     ON CONFLICT (id) DO UPDATE SET
       title = :title,
       price = :price,
       category = :category`,
    {
      id: course.id,
      title: course.title,
      price: course.price,
      category: course.category,
      createdAt: new Date().toISOString(),
    },
  );
}

await closeDb();

console.log(getDbMode() === 'postgres'
  ? 'PostgreSQL schema is ready.'
  : 'SQLite schema is ready.');
