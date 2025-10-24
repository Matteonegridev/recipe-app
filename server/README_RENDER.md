# Deploying the server to Render — Quick Guide

This file documents the minimal, tested settings to run the Express server from this repository on Render (https://render.com). It also outlines a couple of options to keep the service responsive after periods of inactivity.

## Service type & repo

- Create a new **Web Service** in Render and point it to this repository.
- Set the **Root Directory** for the service to: `server` (so Render runs inside the `server/` folder).

## Build & Start commands

- Build Command: (none required for plain JS server)
- Start Command: `npm start`

Note: The `server/package.json` `start` script runs the production node process. `dev` uses `nodemon` and is for local development.

## Environment Variables (required)

Configure these in the Render dashboard (Service → Environment):

- `MONGO_URI` — your MongoDB connection string
- `CLIENT_URL` — front-end origin (e.g. `https://your-client-domain.com`)
- `SESSION_SECRET` — (only if you enable session middleware)
- `NODE_ENV` — set to `production`

## Port and Health check

- Render will set `PORT` automatically. The server reads `process.env.PORT` so no extra config is needed.
- Health Check Path: set this to `/health` in **Service → Settings → Health Check Path**. The server responds with a fast JSON object `{ status: 'ok', uptime: ... }`.

Why this helps: Render uses the health check to determine service readiness. It also helps uptime monitors and avoids showing a blank page when the server wakes from idle.

## Preventing sleep / keep-alive

- Free Render instances may sleep after inactivity. To prevent user-facing downtime, either:
  - Upgrade the instance to a paid plan and enable **Always On**, or
  - Use an external monitor (UptimeRobot, Pingdom) to ping `https://<your-service>.onrender.com/health` every 5 minutes.

Example UptimeRobot settings:

- Monitor type: HTTP(s)
- URL: `https://<your-render-service>.onrender.com/health`
- Check Interval: 5 minutes

## Quick verification (after deploy)

Run these from your terminal (or open in browser):

```bash
curl -i https://<your-render-service>.onrender.com/
curl -i https://<your-render-service>.onrender.com/health
```

Expected results:

- `/` returns HTTP 200 with body `OK`
- `/health` returns HTTP 200 with JSON `{ "status": "ok", "uptime": <number> }`

## Notes & recommendations

- Static images are currently served from `server/src/public/images`. For best performance put large static assets in the frontend `client/public` folder or a CDN.
- If you need persistent sessions across instances, use a session store (Redis) and enable the session middleware.
- If you want me to add an automated GitHub Action that pings `/health` on a schedule, I can add it to the repo.

---

If anything in this guide needs tuning for your Render plan or workflow, tell me which Render plan you're using and I will adapt the steps.
