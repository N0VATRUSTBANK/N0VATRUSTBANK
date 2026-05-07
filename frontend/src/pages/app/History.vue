<script setup>
import { ref, computed, onMounted } from "vue";
import { useTransactionsStore } from "@/stores/transactions";

const store = useTransactionsStore();
const search = ref("");
const filter = ref("");
const selected = ref(null);

onMounted(() => store.loadMine());

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return store.items.filter((t) => {
    const matchesType = !filter.value || t.type === filter.value;
    const matchesSearch =
      !q ||
      (t.recipient || "").toLowerCase().includes(q) ||
      (t.method || "").toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });
});

const sign = (t) => (t.type === "debit" ? "-" : "+");
const cls = (t) => (t.type === "debit" ? "debit" : "credit");
const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "");
</script>

<template>
  <div class="page-title" style="font-size:22px; font-weight:bold; margin-bottom:20px;">
    Transaction History
  </div>

  <div class="history-card">
    <div class="history-header">
      <input v-model="search" placeholder="Search transactions" />
      <select v-model="filter">
        <option value="">All</option>
        <option value="debit">Withdrawals</option>
        <option value="credit">Deposits</option>
      </select>
    </div>

    <p v-if="store.loading" style="padding:20px;">Loading…</p>
    <p v-if="store.error" style="padding:20px;color:#b31b1b;">{{ store.error }}</p>

    <table v-if="filtered.length">
      <thead>
        <tr>
          <th>Date</th><th>Description</th><th>Method</th><th>Status</th><th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in filtered" :key="t._id" @click="selected = t">
          <td>{{ fmtDate(t.createdAt) }}</td>
          <td>{{ t.recipient }}</td>
          <td>{{ t.method }}</td>
          <td><span class="status" :class="(t.status || '').toLowerCase()">{{ t.status }}</span></td>
          <td class="amount" :class="cls(t)">{{ sign(t) }}${{ Number(t.amount).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <div class="mobile-list">
      <div
        v-for="t in filtered"
        :key="t._id"
        class="transaction-card"
        @click="selected = t"
      >
        <div class="transaction-row">
          <strong>{{ t.recipient }}</strong>
          <span class="amount" :class="cls(t)">{{ sign(t) }}${{ Number(t.amount).toLocaleString() }}</span>
        </div>
        <div class="transaction-meta">{{ t.method }} • {{ fmtDate(t.createdAt) }} • {{ t.status }}</div>
      </div>
    </div>

    <div v-if="!filtered.length && !store.loading" class="empty" style="padding:40px;text-align:center;color:#777;">
      No transactions found
    </div>
  </div>

  <div v-if="selected" class="tx-modal" @click.self="selected = null">
    <div class="tx-box">
      <h3>Transaction Details</h3>
      <p>
        <strong>Recipient:</strong> {{ selected.recipient }}<br />
        <strong>Method:</strong> {{ selected.method }}<br />
        <strong>Type:</strong> {{ (selected.type || '').toUpperCase() }}<br />
        <strong>Status:</strong> {{ selected.status }}<br />
        <strong>Amount:</strong> ${{ Number(selected.amount).toLocaleString() }}<br />
        <strong>Date:</strong> {{ fmtDate(selected.createdAt) }}
      </p>
      <button @click="selected = null">Close</button>
    </div>
  </div>
</template>

<style scoped>
.history-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.history-header {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.history-header input,
.history-header select {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
table { width: 100%; border-collapse: collapse; }
thead { background: #111; color: #fff; }
th, td { padding: 14px; font-size: 14px; text-align: left; }
tbody tr { border-bottom: 1px solid #eee; cursor: pointer; }
tbody tr:hover { background: #f5f7ff; }
.status { padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
.completed, .approved { background: #e8f7ee; color: #1e7f43; }
.pending { background: #fff4e5; color: #9c6a00; }
.failed, .rejected { background: #fdecea; color: #a11a1a; }
.amount { font-weight: bold; }
.credit { color: #1e7f43; }
.debit { color: #b31b1b; }
.mobile-list { display: none; }
.transaction-card {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  margin: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.transaction-row { display: flex; justify-content: space-between; align-items: center; }
.transaction-meta { font-size: 12px; color: #777; margin-top: 6px; }
.tx-modal {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex; align-items: center; justify-content: center;
  z-index: 5000;
}
.tx-box { background: #fff; width: 420px; max-width: 90%; padding: 24px; border-radius: 16px; }
.tx-box button {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  background: #6d1ed4;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
@media (max-width: 768px) {
  table { display: none; }
  .mobile-list { display: block; }
  .history-header { flex-direction: column; }
}
</style>
