# NovaTrust Frontend (Vue 3)

Vue 3 + Vite + Pinia + Vue Router SPA. Talks to the Express API in `../server`.

## Run locally

```bash
# 1. Start the API (in another terminal)
cd ../server
npm start                      # → http://localhost:4000

# 2. Start the frontend
cd ../frontend
npm install                    # first time only
npm run dev                    # → http://localhost:5173
```

Vite proxies `/api/*` → `http://localhost:4000` (configured in `vite.config.js`), so no CORS setup needed in dev.

## Build for production

```bash
npm run build                  # → dist/
npm run preview                # serves dist/ on http://localhost:4173
```

For production, point `VITE_API_BASE` at your deployed API:

```bash
VITE_API_BASE=https://api.novatrust.example.com/api npm run build
```

## Project layout

```
src/
├── api/client.js            # tiny fetch wrapper, attaches userToken or adminToken
├── stores/auth.js           # Pinia: login, register, adminLogin, logout
├── router/index.js          # All routes; guards on requiresUser / requiresAdmin
├── layouts/                 # AppLayout (dashboard), AuthLayout, PublicLayout, AdminLayout
├── components/              # DashboardSidebar, BankFooter
├── pages/
│   ├── Home.vue             # / — landing page with login
│   ├── Login.vue            # /login
│   ├── Register.vue         # /register
│   ├── Preapproval.vue      # /preapproval
│   ├── admin/               # /admin/login, /admin/dashboard
│   ├── app/                 # /app/* — authenticated user pages
│   │   ├── Dashboard.vue
│   │   ├── History.vue
│   │   ├── Statements.vue
│   │   ├── Receipt.vue
│   │   ├── CreditCard.vue
│   │   ├── Loans.vue
│   │   ├── Support.vue
│   │   ├── Transfer.vue          # hub
│   │   └── transfers/            # individual transfer methods
│   │       ├── TransferForm.vue  # parameterized; one component for all 8 methods
│   │       ├── Review.vue
│   │       └── Recurring.vue
│   └── public/              # /public/* — marketing pages
└── assets/css/              # ported from the old project (main, dashboard, transfer, credit-card)
```

## Routes

| Path                       | Page                | Auth      |
|----------------------------|---------------------|-----------|
| `/`                        | Home + login form   | —         |
| `/login`                   | Login               | —         |
| `/register`                | Registration        | —         |
| `/preapproval`             | Credit-card pre-approval | —    |
| `/app/dashboard`           | User dashboard      | user      |
| `/app/history`             | Transaction history | user      |
| `/app/statements`          | Account statement   | user      |
| `/app/receipt`             | Transaction receipt | user      |
| `/app/credit-card`         | Credit cards        | user      |
| `/app/loans`               | Loans               | user      |
| `/app/support`             | Support             | user      |
| `/app/transfer`            | Transfer hub        | user      |
| `/app/transfer/{zelle,wire,ach,bills,check,btc,internal,send-money}` | Transfer form | user |
| `/app/transfer/review`     | Review pending      | user      |
| `/app/transfer/recurring`  | Recurring transfer  | user      |
| `/admin/login`             | Admin login         | —         |
| `/admin/dashboard`         | Admin dashboard     | admin     |
| `/public/*`                | Marketing pages     | —         |

## Backend integration

The auth/admin pages call the real MongoDB-backed API:

- `auth.login()` → `POST /api/auth/login`
- `auth.register()` → `POST /api/auth/register`
- `auth.adminLogin()` → `POST /api/auth/admin-login`
- Admin dashboard → `GET /api/admin/users`, `PATCH /api/admin/users/:id/status`, `PATCH /api/admin/users/:id/balance`

The transfer/history/credit-card pages still read/write `localStorage` (preserved from the original project) — they'll be migrated to the API in a follow-up.

## Deploying

- **Frontend** (Vercel/Netlify/Render Static): build with `VITE_API_BASE` set.
- **Backend** (Render/Railway): see `../server/README.md`. Set its `CORS_ORIGIN` to your deployed frontend URL.
