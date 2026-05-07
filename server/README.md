# NovaTrust Backend

Express + MongoDB API for the NovaTrust frontend.

## Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env with your real values:
#   MONGODB_URI   – MongoDB Atlas connection string
#   JWT_SECRET    – long random string
#   ADMIN_EMAIL   – admin login email
#   ADMIN_PASSWORD – admin login password
#   CORS_ORIGIN   – the URL you serve the frontend from (e.g. http://127.0.0.1:5500)
npm start
```

The API listens on `http://localhost:4000` by default. Health check: `GET /api/health`.

## MongoDB Atlas — quick setup

1. Create a free cluster at https://cloud.mongodb.com
2. Database Access → add a user (username + password).
3. Network Access → add your IP (or `0.0.0.0/0` for now).
4. Connect → "Drivers" → copy the `mongodb+srv://…` string into `.env` as `MONGODB_URI`. Replace `<password>` with the user's password.

## Running the frontend

The frontend is plain HTML, so any static server works. Easiest: VS Code's "Live Server" extension on the project root. The pages call `window.API_BASE` which defaults to `http://localhost:4000/api` (set in `assets/js/api.js`).

If your static server runs on a different origin than `http://127.0.0.1:5500`, update `CORS_ORIGIN` in `.env`.

## Endpoints

| Method | Path                               | Auth   | Purpose                             |
|--------|------------------------------------|--------|-------------------------------------|
| POST   | `/api/auth/register`               | —      | Create a user (Pending Approval)    |
| POST   | `/api/auth/login`                  | —      | User login → returns JWT            |
| POST   | `/api/auth/admin-login`            | —      | Admin login → returns admin JWT     |
| GET    | `/api/admin/users`                 | admin  | List all users                      |
| PATCH  | `/api/admin/users/:id/status`      | admin  | Approve / reject a user             |
| PATCH  | `/api/admin/users/:id/balance`     | admin  | Add or subtract from balance        |

All admin routes expect `Authorization: Bearer <adminToken>`.

## Deploying

- **Render / Railway**: connect this repo, set the build dir to `server`, start command `npm start`, and add the `.env` values as environment variables. Set `CORS_ORIGIN` to the URL where the frontend is hosted.
- The frontend can be hosted anywhere static (Netlify, Vercel, GitHub Pages). Edit `assets/js/api.js` to point `API_BASE` at your deployed API URL.

## Next steps

This first pass covers auth and admin user management. Pending transfers, transaction history, and balances on the dashboard still read/write `localStorage` — they'll be migrated in a follow-up once the auth flow is verified end-to-end.
