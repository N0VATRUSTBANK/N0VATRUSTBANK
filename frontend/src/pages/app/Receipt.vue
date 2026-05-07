<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTransactionsStore } from "@/stores/transactions";

const route = useRoute();
const store = useTransactionsStore();
const tx = ref(null);
const loading = ref(false);
const error = ref("");

const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "");

onMounted(async () => {
  const id = route.query.id;
  if (!id) return;
  loading.value = true;
  try {
    tx.value = await store.getOne(id);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="receipt-card">
    <h2>Transaction Receipt</h2>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error" style="color:#b31b1b">{{ error }}</p>
    <div v-else-if="tx">
      <p><strong>Method:</strong> {{ tx.method }}</p>
      <p><strong>Recipient:</strong> {{ tx.recipient }}</p>
      <p><strong>Amount:</strong> ${{ Number(tx.amount).toLocaleString() }}</p>
      <p><strong>Status:</strong> {{ tx.status }}</p>
      <p><strong>Date:</strong> {{ fmtDate(tx.createdAt) }}</p>
    </div>
    <p v-else style="color:#777;">
      No receipt selected. Click any transaction in History to see its receipt.
    </p>
  </div>
</template>

<style scoped>
.receipt-card {
  max-width: 480px;
  margin: 30px auto;
  background: #fff;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
}
</style>
