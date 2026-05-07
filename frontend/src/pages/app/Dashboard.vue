<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useTransactionsStore } from "@/stores/transactions";

const auth = useAuthStore();
const txs = useTransactionsStore();

const checking = computed(() => auth.user?.balance || 0);
const savings = computed(() => auth.user?.savings || 0);
const total = computed(() => checking.value + savings.value);

const showBalance = ref(true);
const masked = "••••••";
const fmt = (n) =>
  `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const firstName = computed(() => auth.user?.firstName || "there");
const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
});

onMounted(async () => {
  try { await auth.refreshUser(); } catch (_) {}
  await txs.loadMine();
});

const quickActions = [
  { to: "/app/transfer/send-money", label: "Send", icon: "send" },
  { to: "/app/transfer/bills", label: "Pay Bills", icon: "bills" },
  { to: "/app/transfer", label: "Transfer", icon: "transfer" },
  { to: "/app/credit-card", label: "Cards", icon: "card" },
];

const fmtDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const days = (Date.now() - date.getTime()) / 86_400_000;
  if (days < 1) return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (days < 7) return date.toLocaleDateString(undefined, { weekday: "short" });
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const txInitial = (t) => (t.recipient || t.method || "?").trim().charAt(0).toUpperCase();
const txSign = (t) => (t.type === "debit" ? "-" : "+");
const txClass = (t) => (t.type === "debit" ? "out" : "in");
</script>

<template>
  <div class="dash">
    <header class="greet">
      <h1>{{ greeting }}, {{ firstName }}.</h1>
      <p>Here's a snapshot of your accounts.</p>
    </header>

    <section class="hero">
      <div class="hero-top">
        <span class="hero-label">Total balance</span>
        <button
          class="hero-eye"
          type="button"
          :aria-label="showBalance ? 'Hide balance' : 'Show balance'"
          @click="showBalance = !showBalance"
        >
          <svg v-if="showBalance" viewBox="0 0 24 24" width="18" height="18"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6 0-10-7-10-7a19.4 19.4 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6 0 10 7 10 7a19.46 19.46 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          </svg>
        </button>
      </div>
      <div class="hero-amount">{{ showBalance ? fmt(total) : masked }}</div>
      <div class="hero-split">
        <div>
          <span class="hero-sub-label">Checking</span>
          <strong>{{ showBalance ? fmt(checking) : masked }}</strong>
        </div>
        <span class="hero-divider"></span>
        <div>
          <span class="hero-sub-label">Savings</span>
          <strong>{{ showBalance ? fmt(savings) : masked }}</strong>
        </div>
      </div>
    </section>

    <section class="actions">
      <RouterLink
        v-for="a in quickActions"
        :key="a.to"
        :to="a.to"
        class="action"
      >
        <span class="action-icon">
          <svg v-if="a.icon === 'send'" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" width="20" height="20">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <svg v-else-if="a.icon === 'bills'" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" width="20" height="20">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="13" y2="17" />
          </svg>
          <svg v-else-if="a.icon === 'transfer'" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" width="20" height="20">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <svg v-else-if="a.icon === 'card'" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" width="20" height="20">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </span>
        <span class="action-label">{{ a.label }}</span>
      </RouterLink>
    </section>

    <div class="body">
      <section class="panel">
        <header class="panel-header">
          <h2>Recent activity</h2>
          <RouterLink to="/app/history" class="see-all">See all</RouterLink>
        </header>
        <div v-if="!txs.recent.length" class="empty">No transactions yet</div>
        <ul v-else class="tx-list">
          <li v-for="t in txs.recent" :key="t._id" class="tx">
            <span class="tx-avatar">{{ txInitial(t) }}</span>
            <div class="tx-mid">
              <strong>{{ t.recipient || t.method }}</strong>
              <span class="tx-meta">{{ t.method }} · {{ fmtDate(t.createdAt) }}</span>
            </div>
            <span class="tx-amount" :class="txClass(t)">
              {{ txSign(t) }}${{ Number(t.amount).toLocaleString() }}
            </span>
          </li>
        </ul>
      </section>

      <aside class="panel">
        <header class="panel-header">
          <h2>Accounts</h2>
        </header>
        <ul class="acct-list">
          <li class="acct">
            <div class="acct-row">
              <strong>Checking</strong>
              <span>{{ showBalance ? fmt(checking) : masked }}</span>
            </div>
            <div class="acct-meta">Primary · NovaTrust</div>
          </li>
          <li class="acct">
            <div class="acct-row">
              <strong>Savings</strong>
              <span>{{ showBalance ? fmt(savings) : masked }}</span>
            </div>
            <div class="acct-meta">High-yield · 4.50% APY</div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.dash {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.greet h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.greet p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #c41230 0%, #8b0d22 100%);
  color: #fff;
  border-radius: 18px;
  padding: 28px 32px;
  box-shadow: 0 12px 30px rgba(196, 18, 48, 0.18);
}
.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.hero-label {
  font-size: 13px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.hero-eye {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
}
.hero-eye:hover { background: rgba(255, 255, 255, 0.22); }
.hero-amount {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 8px 0 18px;
  letter-spacing: -0.02em;
}
.hero-split {
  display: flex;
  align-items: center;
  gap: 22px;
}
.hero-split > div {
  display: flex;
  flex-direction: column;
}
.hero-sub-label {
  font-size: 12px;
  opacity: 0.85;
  margin-bottom: 2px;
}
.hero-split strong {
  font-size: 1.05rem;
  font-weight: 600;
}
.hero-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.25);
}

/* Quick actions */
.actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.action {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease,
    border-color 0.15s ease;
}
.action:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: #dce1e7;
}
.action-icon {
  width: 40px;
  height: 40px;
  background: rgba(196, 18, 48, 0.08);
  color: var(--brand);
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.action-label {
  font-weight: 600;
  font-size: 0.95rem;
}

/* Body */
.body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 18px;
}
.panel {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: var(--shadow-sm);
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.panel-header h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}
.see-all {
  color: var(--brand);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}
.see-all:hover { text-decoration: underline; }
.empty {
  color: var(--muted);
  padding: 30px 0;
  text-align: center;
  font-size: 0.95rem;
}

.tx-list,
.acct-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tx {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.tx:last-child { border-bottom: none; }
.tx-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f3f5f8;
  color: var(--ink-soft);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  flex-shrink: 0;
}
.tx-mid {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.tx-mid strong { font-size: 0.95rem; }
.tx-meta {
  color: var(--muted);
  font-size: 12px;
}
.tx-amount {
  font-weight: 700;
  font-size: 0.95rem;
}
.tx-amount.in { color: #1e7f43; }
.tx-amount.out { color: var(--brand); }

.acct {
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.acct:last-child { border-bottom: none; }
.acct-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.acct-row strong { font-size: 0.95rem; }
.acct-row span {
  font-weight: 700;
  font-size: 0.95rem;
}
.acct-meta {
  color: var(--muted);
  font-size: 12px;
  margin-top: 2px;
}

/* Responsive */
@media (max-width: 900px) {
  .actions { grid-template-columns: repeat(2, 1fr); }
  .body { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .hero { padding: 22px; }
  .hero-amount { font-size: 2rem; }
}
</style>
