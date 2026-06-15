# PeerSolve

Social accountability platform for DSA consistency — daily challenges, streaks, squads, and leaderboards.

## Project structure

```
PeerSolve/
├── Frontend/          # React + Vite + TypeScript (UI)
│   └── src/
│       ├── components/ui/     # Shared UI primitives
│       ├── components/layout/ # App shell
│       ├── pages/             # Route-level views
│       ├── routes/            # React Router config
│       ├── services/          # API & WebSocket clients
│       └── store/             # Zustand state
├── Backend/           # Node.js + Express API
│   ├── src/           # Application source
│   ├── prisma/        # Database schema & migrations
│   └── generated/     # Prisma client (run generate after clone)
└── README.md
```

## Local development

### Prerequisites
- Node.js 20+
- PostgreSQL
- Redis (for jobs & real-time features)

### Start the app
```bash
npm install
cd Frontend && npm install && cd ..
npm run dev
```

This starts the frontend at `http://localhost:5173` and the API at
`http://localhost:3000`. The frontend sign-in cannot finish unless both are
running.

Add `VITE_CLERK_PUBLISHABLE_KEY` to `Frontend/.env.local` and
`DATABASE_URL`, `JWT_SECRET`, `REDIS_URL`, and `CLERK_SECRET_KEY` to
`Backend/.env.local`. Get the Clerk keys from the [Clerk API keys page](https://dashboard.clerk.com/~/api-keys).

## Production build

```bash
npm ci
npm run build
```

The frontend build output is `Frontend/dist/`. The backend starts with:

```bash
npm run prisma:deploy
npm start
```

### Recommended deployment layout

Deploy this project as two services:

1. **Frontend static site**
   - Root directory: `Frontend`
   - Build command: `npm ci && npm run build`
   - Publish directory: `dist`
   - Environment:
     - `VITE_CLERK_PUBLISHABLE_KEY`
     - `VITE_API_URL=https://your-api-domain.example`
     - `VITE_SOCKET_URL=https://your-api-domain.example`

2. **Backend web service**
   - Root directory: repository root
   - Build command: `npm ci && npm run prisma:generate`
   - Pre-deploy/release command: `npm run prisma:deploy`
   - Start command: `npm start`
   - Health check: `/api/health`
   - Environment:
     - `NODE_ENV=production`
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `CLERK_SECRET_KEY`
     - `REDIS_URL`
     - `CORS_ORIGIN=https://your-frontend-domain.example`

`CORS_ORIGIN` accepts comma-separated frontend URLs when both preview and
production domains need access. Add the deployed frontend domain to Clerk's
allowed origins/redirect URLs.

The repository includes SPA rewrites for Vercel and Netlify, so direct visits
to routes such as `/dashboard` and `/groups` resolve to the React app.

## Author

[Aditya Singh Tomar](https://www.linkedin.com/in/aditya-singh-tomar-1683a3279/) on LinkedIn
