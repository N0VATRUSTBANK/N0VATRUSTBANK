<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/api/client";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();

const section = ref("overview");
const users = ref([]);
const transactions = ref([]);
const txFilter = ref("Pending");
const userSearch = ref("");
const loading = ref(false);
const error = ref("");
const sidebarOpen = ref(false);
const adjustAmounts = ref({});

function adjustBy(id, sign) {
  const raw = Number(adjustAmounts.value[id]);
  if (!Number.isFinite(raw) || raw <= 0) {
    alert("Enter a positive amount");
    return;
  }
  adjust(id, sign * raw);
  adjustAmounts.value[id] = "";
}

function initials(u) {
  return ((u.firstName?.[0] || "") + (u.lastName?.[0] || "")).toUpperCase() || "?";
}

function avatarColor(u) {
  if (u.status === "Approved") return "#15803d";
  if (u.status === "Rejected") return "#b91c1c";
  return "#a16207";
}

const stats = computed(() => ({
  totalUsers: users.value.length,
  approvedUsers: users.value.filter((u) => u.status === "Approved").length,
  pendingUsers: users.value.filter((u) => u.status === "Pending Approval").length,
  pendingTx: transactions.value.filter((t) => t.status === "Pending").length,
  approvedTx: transactions.value.filter((t) => t.status === "Approved").length,
  totalVolume: transactions.value
    .filter((t) => t.status === "Approved")
    .reduce((s, t) => s + Number(t.amount || 0), 0),
}));

const filteredUsers = computed(() => {
  const q = userSearch.value.trim().toLowerCase();
  if (!q) return users.value;
  return users.value.filter((u) =>
    [u.email, u.firstName, u.lastName].some((s) => (s || "").toLowerCase().includes(q))
  );
});

const recentTransactions = computed(() => transactions.value.slice(0, 6));
const recentUsers = computed(() =>
  [...users.value]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
);

async function load() {
  loading.value = true;
  error.value = "";
  try {
    const [u, t] = await Promise.all([
      api.get("/admin/users", { auth: "admin" }),
      api.get(`/admin/transactions${txFilter.value ? `?status=${txFilter.value}` : ""}`, { auth: "admin" }),
    ]);
    users.value = u;
    transactions.value = t;
  } catch (err) {
    error.value = err.message;
    if (/token|admin/i.test(err.message)) {
      auth.adminLogout();
      router.push({ name: "admin-login" });
    }
  } finally {
    loading.value = false;
  }
}

async function setUserStatus(id, status) {
  try {
    await api.patch(`/admin/users/${id}/status`, { status }, { auth: "admin" });
    await load();
  } catch (err) {
    alert(err.message);
  }
}

async function adjust(id, delta) {
  try {
    await api.patch(`/admin/users/${id}/balance`, { delta }, { auth: "admin" });
    await load();
  } catch (err) {
    alert(err.message);
  }
}

async function approveTx(id) {
  try {
    await api.patch(`/admin/transactions/${id}/approve`, {}, { auth: "admin" });
    await load();
  } catch (err) {
    alert(err.message);
  }
}

async function rejectTx(id) {
  try {
    await api.patch(`/admin/transactions/${id}/reject`, {}, { auth: "admin" });
    await load();
  } catch (err) {
    alert(err.message);
  }
}

function logout() {
  auth.adminLogout();
  router.push({ name: "admin-login" });
}

function go(name) {
  section.value = name;
  sidebarOpen.value = false;
}

const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "");
const fmtMoney = (n) => `$${Number(n || 0).toLocaleString()}`;

onMounted(load);
</script>

<template>
  <div class="admin-shell">
    <!-- SIDEBAR -->
    <aside class="adm-sidebar" :class="{ open: sidebarOpen }">
      <div class="brand">
        <div class="logo">N</div>
        <div>
          <div class="brand-name">NovaTrust</div>
          <div class="brand-sub">Admin</div>
        </div>
      </div>

      <nav class="nav">
        <button :class="{ active: section === 'overview' }" @click="go('overview')">
          <span class="ic">▦</span> Overview
        </button>
        <button :class="{ active: section === 'users' }" @click="go('users')">
          <span class="ic">⚇</span> Users
          <span v-if="stats.pendingUsers" class="badge">{{ stats.pendingUsers }}</span>
        </button>
        <button :class="{ active: section === 'transactions' }" @click="go('transactions')">
          <span class="ic">⇌</span> Transactions
          <span v-if="stats.pendingTx" class="badge">{{ stats.pendingTx }}</span>
        </button>
      </nav>

      <button class="logout" @click="logout">
        <span class="ic">⏻</span> Sign out
      </button>
    </aside>

    <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen = false"></div>

    <!-- MAIN -->
    <div class="adm-main">
      <header class="topbar">
        <button class="hamburger" @click="sidebarOpen = !sidebarOpen">☰</button>
        <h1>{{ section === 'overview' ? 'Overview' : section === 'users' ? 'User Management' : 'Transactions' }}</h1>
        <div class="topbar-right">
          <button class="refresh" :disabled="loading" @click="load">
            {{ loading ? "Loading…" : "↻ Refresh" }}
          </button>
        </div>
      </header>

      <div v-if="error" class="banner-error">{{ error }}</div>

      <!-- OVERVIEW -->
      <div v-show="section === 'overview'" class="content">
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-label">Total users</div>
            <div class="stat-value">{{ stats.totalUsers }}</div>
            <div class="stat-foot">
              <span class="pill ok">{{ stats.approvedUsers }} approved</span>
              <span class="pill warn">{{ stats.pendingUsers }} pending</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-label">Pending transactions</div>
            <div class="stat-value">{{ stats.pendingTx }}</div>
            <div class="stat-foot">
              <span class="pill warn">Awaiting review</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-label">Approved transactions</div>
            <div class="stat-value">{{ stats.approvedTx }}</div>
            <div class="stat-foot">
              <span class="pill ok">Completed</span>
            </div>
          </div>

          <div class="stat-card highlight">
            <div class="stat-label">Total volume</div>
            <div class="stat-value">{{ fmtMoney(stats.totalVolume) }}</div>
            <div class="stat-foot">
              <span class="pill subtle">Approved transfers</span>
            </div>
          </div>
        </div>

        <div class="dual">
          <div class="panel">
            <div class="panel-head">
              <h2>Recent transactions</h2>
              <button class="link" @click="section = 'transactions'">View all →</button>
            </div>
            <div v-if="!recentTransactions.length" class="empty">No transactions yet</div>
            <ul class="activity">
              <li v-for="t in recentTransactions" :key="t._id">
                <div class="meta">
                  <strong>{{ t.method }} → {{ t.recipient }}</strong>
                  <small>{{ t.userEmail }} · {{ fmtDate(t.createdAt) }}</small>
                </div>
                <div class="end">
                  <span class="pill" :class="t.status.toLowerCase()">{{ t.status }}</span>
                  <span class="amount">{{ fmtMoney(t.amount) }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="panel">
            <div class="panel-head">
              <h2>Recent signups</h2>
              <button class="link" @click="section = 'users'">View all →</button>
            </div>
            <div v-if="!recentUsers.length" class="empty">No users yet</div>
            <ul class="activity">
              <li v-for="u in recentUsers" :key="u._id">
                <div class="meta">
                  <strong>{{ u.firstName }} {{ u.lastName }}</strong>
                  <small>{{ u.email }} · {{ fmtDate(u.createdAt) }}</small>
                </div>
                <div class="end">
                  <span class="pill" :class="u.status === 'Approved' ? 'approved' : u.status === 'Rejected' ? 'rejected' : 'pending'">
                    {{ u.status }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- USERS -->
      <div v-show="section === 'users'" class="content">
        <div class="panel">
          <div class="panel-head">
            <h2>All users <small>({{ filteredUsers.length }})</small></h2>
            <input v-model="userSearch" class="search" placeholder="Search by name or email…" />
          </div>

          <div class="table-wrap">
            <table class="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Status</th>
                  <th class="right">Balance</th>
                  <th>Joined</th>
                  <th>Adjust balance</th>
                  <th class="right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in filteredUsers" :key="u._id">
                  <td>
                    <div class="user-cell">
                      <div class="avatar" :style="{ background: avatarColor(u) }">
                        {{ initials(u) }}
                      </div>
                      <div class="user-meta">
                        <strong>{{ u.firstName }} {{ u.lastName }}</strong>
                        <small>{{ u.email }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      class="pill"
                      :class="u.status === 'Approved' ? 'approved' : u.status === 'Rejected' ? 'rejected' : 'pending'"
                    >
                      {{ u.status }}
                    </span>
                  </td>
                  <td class="right balance-cell">{{ fmtMoney(u.balance) }}</td>
                  <td class="muted">{{ fmtDate(u.createdAt) }}</td>
                  <td>
                    <div class="adjuster">
                      <button class="adj-btn" title="Subtract" @click="adjustBy(u._id, -1)">−</button>
                      <input
                        v-model="adjustAmounts[u._id]"
                        type="number"
                        min="0"
                        placeholder="Amount"
                        @keyup.enter="adjustBy(u._id, 1)"
                      />
                      <button class="adj-btn" title="Add" @click="adjustBy(u._id, 1)">+</button>
                    </div>
                  </td>
                  <td class="right actions">
                    <button
                      v-if="u.status !== 'Approved'"
                      class="btn-primary"
                      @click="setUserStatus(u._id, 'Approved')"
                    >
                      Approve
                    </button>
                    <button
                      v-if="u.status !== 'Rejected'"
                      class="btn-secondary"
                      @click="setUserStatus(u._id, 'Rejected')"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
                <tr v-if="!filteredUsers.length">
                  <td colspan="6" class="empty-row">No users match your search</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- TRANSACTIONS -->
      <div v-show="section === 'transactions'" class="content">
        <div class="panel">
          <div class="panel-head">
            <h2>Transactions <small>({{ transactions.length }})</small></h2>
            <div class="tabs">
              <button
                v-for="opt in ['Pending', 'Approved', 'Rejected', '']"
                :key="opt || 'all'"
                :class="{ active: txFilter === opt }"
                @click="txFilter = opt; load()"
              >
                {{ opt || 'All' }}
              </button>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Method</th>
                  <th>Recipient</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th class="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in transactions" :key="t._id">
                  <td class="muted">{{ fmtDate(t.createdAt) }}</td>
                  <td>{{ t.userEmail }}</td>
                  <td><strong>{{ t.method }}</strong></td>
                  <td class="muted">{{ t.recipient }}</td>
                  <td class="amount">{{ fmtMoney(t.amount) }}</td>
                  <td>
                    <span class="pill" :class="t.status.toLowerCase()">{{ t.status }}</span>
                  </td>
                  <td class="right actions">
                    <template v-if="t.status === 'Pending'">
                      <button class="btn ok" @click="approveTx(t._id)">Approve</button>
                      <button class="btn danger" @click="rejectTx(t._id)">Reject</button>
                    </template>
                    <span v-else class="muted">—</span>
                  </td>
                </tr>
                <tr v-if="!transactions.length">
                  <td colspan="7" class="empty-row">No transactions in this view</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-shell {
  position: fixed;
  inset: 0;
  display: flex;
  background: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  color: #0f172a;
}

/* SIDEBAR */
.adm-sidebar {
  position: static;
  left: auto;
  top: auto;
  height: auto;
  width: 240px;
  background: #0f172a;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 22px 16px;
  flex-shrink: 0;
  z-index: 100;
  transition: none;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 14px;
}
.logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #b31b1b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
}
.brand-name { font-weight: 600; font-size: 15px; }
.brand-sub { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }

.nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.nav button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  background: none;
  border: none;
  color: #cbd5e1;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
}
.nav button:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }
.nav button.active {
  background: #b31b1b;
  color: #fff;
}
.nav .ic { font-size: 16px; opacity: 0.8; }
.nav .badge {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: bold;
}
.nav button:not(.active) .badge { background: #b31b1b; }

.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
.logout:hover { background: rgba(255, 255, 255, 0.05); color: #fff; }

/* MAIN */
.adm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  position: static;
}
.topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 28px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}
.topbar h1 { margin: 0; font-size: 19px; font-weight: 600; }
.topbar-right { margin-left: auto; }
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #475569;
}
.refresh {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: #475569;
}
.refresh:hover:not(:disabled) { background: #e2e8f0; }
.refresh:disabled { opacity: 0.6; cursor: wait; }

.banner-error {
  background: #fef2f2;
  color: #991b1b;
  padding: 12px 28px;
  border-bottom: 1px solid #fecaca;
  font-size: 14px;
}

.content {
  padding: 28px;
  overflow-y: auto;
  flex: 1;
}

/* STATS */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}
.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 22px;
  border: 1px solid #e2e8f0;
}
.stat-card.highlight {
  background: linear-gradient(135deg, #b31b1b, #7a0f0f);
  color: #fff;
  border-color: transparent;
}
.stat-card.highlight .stat-label,
.stat-card.highlight .pill.subtle { color: rgba(255, 255, 255, 0.85); }
.stat-card.highlight .pill.subtle { background: rgba(255, 255, 255, 0.18); }
.stat-label {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin: 6px 0 12px;
}
.stat-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* PANELS */
.dual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.panel {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
.panel-head {
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
}
.panel-head h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.panel-head h2 small {
  color: #94a3b8;
  font-weight: 400;
  margin-left: 6px;
}
.link {
  background: none;
  border: none;
  color: #b31b1b;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}
.search {
  flex: 0 0 280px;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 13px;
}
.search:focus { outline: none; border-color: #b31b1b; }
.tabs {
  display: flex;
  gap: 4px;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 8px;
}
.tabs button {
  background: none;
  border: none;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  border-radius: 6px;
  color: #64748b;
}
.tabs button.active {
  background: #fff;
  color: #0f172a;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* ACTIVITY LIST */
.activity {
  list-style: none;
  margin: 0;
  padding: 0;
}
.activity li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 22px;
  border-bottom: 1px solid #f1f5f9;
}
.activity li:last-child { border-bottom: none; }
.activity .meta { display: flex; flex-direction: column; min-width: 0; }
.activity .meta strong { font-size: 14px; }
.activity .meta small { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.activity .end {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* TABLE */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th {
  background: #f8fafc;
  text-align: left;
  padding: 11px 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #64748b;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}
td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}
tbody tr:hover { background: #f8fafc; }
.right { text-align: right; }
.muted { color: #64748b; font-size: 13px; }
.amount { font-weight: 600; }
.empty-row { text-align: center; color: #94a3b8; padding: 40px; }
.empty { padding: 30px; text-align: center; color: #94a3b8; font-size: 14px; }

/* PILLS */
.pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.pill.approved, .pill.ok { background: #dcfce7; color: #15803d; }
.pill.pending, .pill.warn { background: #fef3c7; color: #a16207; }
.pill.rejected, .pill.danger { background: #fee2e2; color: #b91c1c; }
.pill.subtle { background: #f1f5f9; color: #475569; }

/* USERS TABLE — refined */
.users-table tbody tr { border-bottom: 1px solid #f1f5f9; }
.users-table td { vertical-align: middle; padding: 14px 16px; }

.user-cell { display: flex; align-items: center; gap: 12px; }
.avatar {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.3px;
}
.user-meta { display: flex; flex-direction: column; min-width: 0; }
.user-meta strong { font-size: 14px; color: #0f172a; }
.user-meta small { font-size: 12px; color: #64748b; margin-top: 2px; }

.balance-cell { font-weight: 600; font-variant-numeric: tabular-nums; font-size: 15px; }

/* INLINE BALANCE ADJUSTER */
.adjuster {
  display: inline-flex;
  align-items: center;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.adjuster:focus-within {
  border-color: #b31b1b;
  box-shadow: 0 0 0 3px rgba(179, 27, 27, 0.1);
}
.adjuster input {
  border: none;
  outline: none;
  width: 100px;
  padding: 7px 8px;
  font-size: 13px;
  text-align: center;
  background: transparent;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
  appearance: textfield;
}
.adjuster input::-webkit-outer-spin-button,
.adjuster input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.adj-btn {
  background: #f8fafc;
  border: none;
  width: 32px;
  height: 32px;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #475569;
  transition: background 0.15s, color 0.15s;
}
.adj-btn:hover { background: #b31b1b; color: #fff; }
.adj-btn:first-child { border-right: 1px solid #e2e8f0; }
.adj-btn:last-child { border-left: 1px solid #e2e8f0; }

/* ACTIONS */
.actions { white-space: nowrap; display: flex; gap: 6px; justify-content: flex-end; }
.btn-primary,
.btn-secondary {
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
}
.btn-primary {
  background: #15803d;
  color: #fff;
  border-color: #15803d;
}
.btn-primary:hover { background: #166534; }
.btn-secondary {
  background: #fff;
  color: #475569;
  border-color: #cbd5e1;
}
.btn-secondary:hover {
  background: #fee2e2;
  color: #b91c1c;
  border-color: #fecaca;
}

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 90;
  display: none;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .dual { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .adm-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.25s;
  }
  .adm-sidebar.open { transform: translateX(0); }
  .overlay { display: block; }
  .hamburger { display: block; }
  .content { padding: 18px; }
  .topbar { padding: 14px 18px; }
  .panel-head { flex-direction: column; align-items: stretch; }
  .search { flex: 1 1 auto; }
}
</style>
