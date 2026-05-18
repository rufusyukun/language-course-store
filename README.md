# Language Course Store MVP

React + Tailwind mobile H5 course store with a Node API, mock payment flow, admin panel, and PostgreSQL-ready database layer.

## Local Development

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example` and fill local values. For local PostgreSQL/Supabase development, set `DATABASE_URL`. If `DATABASE_URL` is empty, the API falls back to local SQLite.

Initialize database tables and seed courses:

```bash
npm run db:init
```

Run the API server:

```bash
npm run api
```

Run the Vite frontend dev server:

```bash
npm run dev
```

During local frontend development, Vite proxies `/api` to `http://127.0.0.1:3001`.

## Production Build

Build the frontend into `dist`:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

`npm start` runs `server/index.js`. The same Node server serves:

- API routes under `/api`
- Admin panel at `/admin`
- Built frontend assets from `dist`
- SPA fallback to `dist/index.html`

The production server listens on `process.env.PORT`, falling back to `API_PORT` and then `3001`.

## Database

Production should use PostgreSQL through `DATABASE_URL`. Supabase Postgres and Neon Postgres are supported.

When `NODE_ENV=production`, `DATABASE_URL` is required. The app will not fall back to local SQLite in production.

Initialize or update schema:

```bash
npm run db:init
```

The init script is safe to run repeatedly. It creates:

- `courses`
- `orders`
- `deliveries`
- `payment_events`
- `refunds`
- `support_tickets`

It also seeds course records from the current course data.

## Environment Variables

Required for production:

```env
PORT=
DATABASE_URL=
ADMIN_PASSWORD=
MOCK_PAYMENT_SECRET=
NODE_ENV=production
```

Reserved for Antom sandbox integration:

```env
ANTOM_CLIENT_ID=
ANTOM_MERCHANT_ID=
ANTOM_PRIVATE_KEY=
ANTOM_PUBLIC_KEY=
ANTOM_WEBHOOK_SECRET=
```

Optional:

```env
DATABASE_SSL=true
API_PORT=3001
```

For local non-SSL PostgreSQL, set `DATABASE_SSL=false`.

## Render Deployment

Recommended settings:

- Build command: `npm install && npm run build && npm run db:init`
- Start command: `npm start`
- Environment: Node
- Add `DATABASE_URL`, `ADMIN_PASSWORD`, `MOCK_PAYMENT_SECRET`, and `NODE_ENV=production`

Render provides `PORT`; the app reads it automatically.

## Railway Deployment

Recommended settings:

- Build command: `npm install && npm run build && npm run db:init`
- Start command: `npm start`
- Add `DATABASE_URL`, `ADMIN_PASSWORD`, `MOCK_PAYMENT_SECRET`, and `NODE_ENV=production`

Railway provides `PORT`; the app reads it automatically.

## Verification

After deployment:

1. Open `/` and confirm the frontend loads.
2. Open `/api/health` and confirm `{ "ok": true }`.
3. Create a test order from the checkout flow.
4. Query PostgreSQL:

```sql
select * from orders order by id desc limit 5;
select * from deliveries order by id desc limit 5;
select * from payment_events order by id desc limit 5;
```

5. Open `/admin`, log in with `ADMIN_PASSWORD`, and verify the order appears.
