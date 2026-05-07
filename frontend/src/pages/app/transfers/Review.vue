<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTransactionsStore } from "@/stores/transactions";

const router = useRouter();
const store = useTransactionsStore();

onMounted(() => store.loadMine("Pending"));

const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "");
</script>

<template>
  <div class="review">
    <h2>Pending Transfers</h2>
    <p v-if="store.loading">Loading…</p>
    <p v-else-if="!store.items.length">No pending transfers.</p>
    <div v-for="t in store.items" :key="t._id" class="row">
      <div>
        <strong>{{ t.method }}</strong> → {{ t.recipient }}
        <div style="font-size:12px;color:#666">{{ fmtDate(t.createdAt) }}</div>
      </div>
      <div>${{ Number(t.amount).toLocaleString() }}</div>
    </div>
    <button class="primary" @click="router.push({ name: 'dashboard' })">
      Back to Dashboard
    </button>
  </div>
</template>

<style scoped>
.review { max-width: 600px; margin: 30px auto; padding: 20px; background: #fff; border-radius: 14px; }
.row { display: flex; justify-content: space-between; padding: 14px; border-bottom: 1px solid #eee; }
button.primary {
  margin-top: 20px; width: 100%; padding: 12px;
  background: #b31b1b; color: #fff; border: none; border-radius: 8px; cursor: pointer;
}
</style>
