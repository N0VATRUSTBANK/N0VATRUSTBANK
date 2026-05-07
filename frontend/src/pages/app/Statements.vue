<script setup>
import { onMounted } from "vue";
import { useTransactionsStore } from "@/stores/transactions";

const store = useTransactionsStore();
onMounted(() => store.loadMine());

const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "");
</script>

<template>
  <h1 class="section-title">Account Statement</h1>
  <p v-if="store.loading">Loading…</p>
  <table v-else>
    <thead>
      <tr><th>Date</th><th>Method</th><th>Recipient</th><th>Amount</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr v-for="t in store.items" :key="t._id">
        <td>{{ fmtDate(t.createdAt) }}</td>
        <td>{{ t.method }}</td>
        <td>{{ t.recipient }}</td>
        <td>${{ Number(t.amount).toLocaleString() }}</td>
        <td>{{ t.status }}</td>
      </tr>
      <tr v-if="!store.items.length">
        <td colspan="5" style="text-align:center;color:#777;padding:20px;">No transactions yet</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table { width: 100%; background: #fff; border-collapse: collapse; margin-top: 16px; }
th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
th { background: #f0f0f0; }
</style>
