<script setup>
import { reactive } from "vue";

const form = reactive({ subject: "", message: "" });

function submit() {
  if (!form.subject || !form.message) return alert("Fill all fields");
  alert("Your message has been sent. We'll respond shortly.");
  form.subject = "";
  form.message = "";
}
</script>

<template>
  <h1 class="section-title">Customer Support</h1>

  <div class="grid">
    <div class="card">
      <h3>FAQs</h3>
      <p><strong>Q: How long do transfers take?</strong></p>
      <p>A: Most internal transfers complete instantly. Wire transfers can take 1–3 business days.</p>
      <p><strong>Q: Is my money insured?</strong></p>
      <p>A: Yes, NovaTrust accounts are protected up to FDIC limits.</p>
      <p><strong>Q: How do I report a lost card?</strong></p>
      <p>A: Use this form, or call our 24/7 support line.</p>
    </div>

    <div class="card">
      <h3>Contact Us</h3>
      <form @submit.prevent="submit">
        <label>Subject</label>
        <input v-model="form.subject" placeholder="Subject" />
        <label>Message</label>
        <textarea v-model="form.message" rows="5" placeholder="Describe your issue"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.card {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
input, textarea {
  width: 100%; padding: 12px; margin-top: 6px; border-radius: 8px; border: 1px solid #ccc;
}
button {
  margin-top: 16px; width: 100%; padding: 12px;
  background: #b31b1b; color: #fff; border: none; border-radius: 8px;
  font-weight: bold; cursor: pointer;
}
</style>
