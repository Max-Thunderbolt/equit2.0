# Equipt Equipment API

Boilerplate Express backend that will orchestrate communication with MongoDB and other third-party services.

## Prerequisites

- Node.js 18+
- npm 9+ (or compatible package manager)

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in secrets.
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Lint the project:
   ```bash
   npm run lint
   ```

## Project structure

```
equipment/
├── src/
│   ├── index.js              # Entry point: Mongo connection + server bootstrap
│   ├── server.js             # Express app + middleware
│   ├── config/               # env + logger configuration
│   ├── routes/               # Express routers
│   ├── controllers/          # Request/response orchestration
│   └── services/             # Business logic, Mongo + HTTP helpers
└── .env.example              # Copy to .env and edit values
```

## Included endpoints

- `GET /health` – basic readiness probe.
- `GET /api/storage/ping` – proxy call to a third-party API via Axios.
- `GET /api/storage/documents` – sample MongoDB read (first 25 documents).

## Next steps

- Extend routes and services under `src/`.
- Add tests (Jest, Vitest, or your preferred framework).
- Integrate real third-party providers as needed.
