<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTransactionsStore } from "@/stores/transactions";

const props = defineProps({
  method: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  color: { type: String, default: "#b31b1b" },
  needsBank: { type: Boolean, default: false },
  needsRouting: { type: Boolean, default: false },
});

const txs = useTransactionsStore();
const router = useRouter();

const recipient = ref("");
const amount = ref("");
const bank = ref("");
const routing = ref("");
const submitting = ref(false);

async function submit() {
  if (!recipient.value) return alert("Enter recipient");
  const amt = Number(amount.value);
  if (!amt || amt <= 0) return alert("Invalid amount");

  submitting.value = true;
  try {
    await txs.create({
      method: props.method,
      recipient: recipient.value,
      bank: bank.value || undefined,
      routing: routing.value || undefined,
      amount: amt,
    });
    alert(`${props.method} transfer submitted for admin approval.`);
    router.push({ name: "dashboard" });
  } catch (err) {
    alert(err.message);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="transfer-card">
      <RouterLink to="/app/transfer" class="exit-btn">✕</RouterLink>
      <div class="logo" :style="{ color }">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>

      <label>Recipient</label>
      <input v-model="recipient" placeholder="Name, email, account, or wallet address" />

      <template v-if="needsBank">
        <label>Bank Name</label>
        <input v-model="bank" placeholder="Bank Name" />
      </template>

      <template v-if="needsRouting">
        <label>Routing / SWIFT</label>
        <input v-model="routing" placeholder="Routing or SWIFT code" />
      </template>

      <label>Amount</label>
      <input v-model="amount" type="number" placeholder="Enter amount" />

      <button :style="{ background: color }" :disabled="submitting" @click="submit">
        {{ submitting ? "Submitting…" : `Send ${method}` }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper { padding: 40px 20px; display: flex; justify-content: center; }
.transfer-card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.exit-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f2f2f2;
  color: #444;
  text-align: center;
  line-height: 34px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}
.logo { text-align: center; margin-bottom: 10px; font-size: 26px; font-weight: bold; }
.subtitle { text-align: center; font-size: 14px; color: #666; margin-bottom: 25px; }
label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #444; }
input {
  width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc;
  font-size: 14px; margin-bottom: 18px;
}
button {
  width: 100%; padding: 14px; border-radius: 10px; border: none; color: #fff;
  font-size: 15px; font-weight: bold; cursor: pointer;
}
</style>
