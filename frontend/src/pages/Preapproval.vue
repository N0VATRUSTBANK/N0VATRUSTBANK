<script setup>
import { ref } from "vue";

const form = ref({ name: "", income: "", employment: "" });
const result = ref(null);

function submit() {
  if (!form.value.name || !form.value.income) {
    return alert("Please fill required fields");
  }
  const income = Number(form.value.income);
  result.value = income >= 30000
    ? { ok: true, message: "Congratulations! You're pre-approved for the NovaTrust Platinum Card." }
    : { ok: false, message: "Sorry, you do not meet the requirements at this time." };
}
</script>

<template>
  <div class="preapproval">
    <h2>Credit Card Pre-Approval</h2>
    <form @submit.prevent="submit" v-if="!result">
      <label>Full Name</label>
      <input v-model="form.name" placeholder="Full Name" required />

      <label>Annual Income (USD)</label>
      <input v-model="form.income" type="number" placeholder="50000" required />

      <label>Employment Status</label>
      <input v-model="form.employment" placeholder="Employed / Self-employed / Other" />

      <button type="submit">Check Pre-Approval</button>
    </form>

    <div v-else class="result" :class="result.ok ? 'ok' : 'no'">
      <h3>{{ result.ok ? "✅ Pre-Approved" : "❌ Not Pre-Approved" }}</h3>
      <p>{{ result.message }}</p>
      <button @click="result = null">Try Again</button>
    </div>
  </div>
</template>

<style scoped>
.preapproval {
  max-width: 480px;
  margin: 60px auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
label { display: block; margin-top: 12px; font-size: 14px; color: #444; }
input { width: 100%; padding: 12px; margin-top: 6px; border-radius: 6px; border: 1px solid #ccc; }
button { width: 100%; margin-top: 24px; padding: 14px; background: #b31b1b; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; }
.result.ok { color: #1e7f43; }
.result.no { color: #a11a1a; }
</style>
