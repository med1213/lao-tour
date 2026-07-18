# Lao Tour

Modern full-stack travel discovery platform for Laos. Built with Nuxt 3, Nuxt UI, Tailwind CSS, NestJS and MariaDB.

## Run locally

1. Copy `.env.example` to `.env`.
2. Run `docker compose up --build`.
3. Open `http://localhost:3000`; API is at `http://localhost:3001/api`.
   Swagger API documentation is at `http://localhost:3001/api/docs`.

Demo admin: `admin@laotour.la` / `laotour2026`

## Structure

- `apps/web` — Nuxt public website and protected admin panel
- `apps/api` — NestJS REST API
- `docker-compose.yml` — MariaDB, API and web services
