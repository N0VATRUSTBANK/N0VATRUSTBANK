<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import PublicHeader from "@/components/PublicHeader.vue";
import BankFooter from "@/components/BankFooter.vue";

import secure from "@/assets/images/secure.jpg";
import gsave from "@/assets/images/gsave.jpg";
import loan from "@/assets/images/loan.jpg";
import finance from "@/assets/images/finance.jpg";
import customer from "@/assets/images/customer.jpg";

const slides = [
  { img: secure, label: "Secure Digital Banking" },
  { img: gsave, label: "Save, Invest & Grow" },
  { img: loan, label: "Loans & Credit Cards" },
  { img: finance, label: "International Transfers to 130+ Countries" },
  { img: customer, label: "24/7 Customer Support" },
];

const current = ref(0);
let timer;

onMounted(() => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % slides.length;
  }, 4000);
});
onBeforeUnmount(() => clearInterval(timer));

const auth = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");

async function login() {
  if (!email.value || !password.value) return alert("Please enter email and password");
  try {
    await auth.login(email.value.trim(), password.value);
    router.push({ name: "dashboard" });
  } catch (err) {
    alert(err.message);
  }
}
</script>

<template>
  <PublicHeader />

  <div class="slideshow">
    <div
      v-for="(s, i) in slides"
      :key="i"
      class="slide"
      :class="{ active: current === i }"
      :style="{ backgroundImage: `url(${s.img})` }"
    >
      {{ s.label }}
    </div>
  </div>

  <div class="main">
    <div class="card">
      <h2>Online Banking Login</h2>
      <input v-model="email" placeholder="Email / Online ID" />
      <input v-model="password" type="password" placeholder="Password" @keyup.enter="login" />
      <div class="home-login">
        <button @click="login">Login</button>
        <p class="signup-link">
          New to NovaTrust?
          <RouterLink to="/register">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </div>

  <div class="bank-info">
    <h2>Why Choose NovaTrust?</h2>
    <div class="info-grid">
      <div class="info-card"><h3>🔐 Bank-Grade Security</h3><p>Advanced encryption, fraud monitoring, and secure authentication.</p></div>
      <div class="info-card"><h3>⚡ Fast Transfers</h3><p>Local & international payments with real-time tracking.</p></div>
      <div class="info-card"><h3>💳 Cards & Credit</h3><p>Manage cards, limits, balances, and payments online.</p></div>
      <div class="info-card"><h3>🌍 Global Access</h3><p>Bank securely anytime, anywhere, on any device.</p></div>
    </div>
  </div>

  <div class="bank-stats">
    <div class="stat"><h2>2M+</h2><p>Customers</p></div>
    <div class="stat"><h2>$5B+</h2><p>Processed</p></div>
    <div class="stat"><h2>120+</h2><p>Countries</p></div>
    <div class="stat"><h2>24/7</h2><p>Support</p></div>
  </div>

  <div class="security-note">
    <h3>Security Reminder</h3>
    <p>NovaTrust will never ask for your password, PIN, or OTP. Always log in through the official website.</p>
  </div>

  <BankFooter />
</template>

<style scoped>
.main { padding-top: 140px; }

.bank-info h2 {
  color: #fff;
}

.bank-info, .bank-stats, .security-note {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 16px;
}
.info-card {
  background: rgba(255,255,255,0.95);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.bank-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  text-align: center;
}
.stat {
  background: rgba(255,255,255,0.95);
  border-radius: 10px;
  padding: 20px;
}
.security-note {
  background: rgba(255,255,255,0.95);
  border-radius: 10px;
  padding: 20px;
}
</style>
