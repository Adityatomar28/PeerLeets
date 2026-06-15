Local Docker-based deploy and testing

1) Build and run services (Postgres, Redis, API)

```bash
docker-compose up --build
```

This builds the `api` image from `Backend/Dockerfile`, creates a Postgres database (`peersolve`) and runs Redis.

2) Environment

- The compose file sets local placeholder env values. Replace them in `docker-compose.yml` or set a `.env` file for compose.
- Do NOT commit real secrets to the repository. Use a secret manager or CI environment variables for production.

3) Migrations

The container entry runs `npm run prisma:deploy` at start (best-effort). For production, run migrations from CI or a release step:

```bash
# from CI/release
npm ci --include=dev
npm run prisma:deploy
```

4) Notes

- The Dockerfile uses `npm ci --include=dev` to ensure Prisma CLI is available for generation. If you prefer smaller production images, generate the Prisma client during CI and copy the generated client into a slimmer runtime image.
- The API exposes port `3000` and the health endpoint `/api/health` for readiness checks.
