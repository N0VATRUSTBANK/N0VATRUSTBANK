<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const paying = ref(null);

const cards = computed(() => auth.user?.cards || []);

onMounted(async () => {
  try {
    await auth.refreshUser();
  } catch (_) {}
});

async function pay(card) {
  const input = prompt(`How much do you want to pay on ${card.name}?`, "100");
  const amount = Number(input);
  if (!amount || amount <= 0) return;
  paying.value = card.id;
  try {
    await auth.payCard(card.id, amount);
  } catch (err) {
    alert(err.message);
  } finally {
    paying.value = null;
  }
}
</script>

<template>
  <h1 class="section-title">Your Credit Cards</h1>
  <div class="card-grid">
    <div v-for="c in cards" :key="c.id" class="cc">
      <h3>NovaTrust {{ c.name }}</h3>
      <p class="num">•••• •••• •••• {{ c.id }}{{ c.id }}{{ c.id }}{{ c.id }}</p>
      <div class="row"><span>Balance</span><strong>${{ Number(c.balance || 0).toLocaleString() }}</strong></div>
      <div class="row"><span>Limit</span><strong>${{ Number(c.limit).toLocaleString() }}</strong></div>
      <div class="row"><span>Available</span><strong>${{ (Number(c.limit) - Number(c.balance || 0)).toLocaleString() }}</strong></div>
      <button :disabled="paying === c.id" @click="pay(c)">
        {{ paying === c.id ? "Processing…" : "Pay" }}
      </button>
    </div>
    <p v-if="!cards.length" style="color:#777;">No cards on file.</p>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.cc {
  background: linear-gradient(135deg, #b31b1b, #800f0f);
  color: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
.cc .num { letter-spacing: 2px; margin: 16px 0; font-size: 18px; }
.cc .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
.cc button {
  margin-top: 16px;
  width: 100%;
  padding: 12px;
  background: #fff;
  color: #b31b1b;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
.cc button:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
