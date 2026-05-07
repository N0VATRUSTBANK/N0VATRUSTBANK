<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const submitting = ref(false);
const error = ref("");

async function submit() {
  if (!email.value || !password.value) {
    error.value = "Please fill all fields";
    return;
  }
  error.value = "";
  submitting.value = true;
  try {
    await auth.adminLogin(email.value, password.value);
    router.push({ name: "admin-dashboard" });
  } catch (err) {
    error.value = err.message;
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="admin-login-page">
    <div class="brand-side">
      <div class="brand">
        <div class="logo">N</div>
        <div>
          <h1>NovaTrust</h1>
          <p>Admin Console</p>
        </div>
      </div>
      <div class="caption">
        <h2>Manage users, transactions &amp; security</h2>
        <p>Approve new accounts, review pending transfers, and monitor activity.</p>
      </div>
    </div>

    <div class="form-side">
      <form class="login-card" @submit.prevent="submit">
        <h2>Sign in to admin</h2>
        <p class="subtitle">Enter your administrator credentials to continue.</p>

        <label>
          <span>Email</span>
          <input v-model="email" type="email" placeholder="admin@novatrust.com" autofocus />
        </label>

        <label>
          <span>Password</span>
          <input v-model="password" type="password" placeholder="••••••••" />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="submit" :disabled="submitting">
          {{ submitting ? "Signing in…" : "Sign in" }}
        </button>

        <RouterLink to="/" class="back">← Back to public site</RouterLink>
      </form>
    </div>
  </div>
</template>

<style scoped>
.admin-login-page {
  position: fixed;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #0f172a;
}

.brand-side {
  background: linear-gradient(155deg, #b31b1b 0%, #5a0a0a 100%);
  color: #fff;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.brand-side::before {
  content: "";
  position: absolute;
  top: -100px;
  right: -100px;
  width: 360px;
  height: 360px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 50%;
}
.brand-side::after {
  content: "";
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 260px;
  height: 260px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 50%;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
}
.logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}
.brand h1 { margin: 0; font-size: 20px; }
.brand p { margin: 2px 0 0; opacity: 0.8; font-size: 13px; }

.caption {
  position: relative;
  max-width: 420px;
}
.caption h2 {
  font-size: 32px;
  margin: 0 0 16px;
  line-height: 1.2;
}
.caption p {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}

.form-side {
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-card {
  width: 100%;
  max-width: 380px;
}
.login-card h2 {
  margin: 0 0 8px;
  color: #1e293b;
  font-size: 24px;
}
.subtitle {
  margin: 0 0 28px;
  color: #64748b;
  font-size: 14px;
}

.login-card label {
  display: block;
  margin-bottom: 16px;
  font-size: 13px;
  color: #334155;
  font-weight: 500;
}
.login-card label span {
  display: block;
  margin-bottom: 6px;
}
.login-card input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.login-card input:focus {
  outline: none;
  border-color: #b31b1b;
  box-shadow: 0 0 0 3px rgba(179, 27, 27, 0.12);
}

.error {
  background: #fef2f2;
  color: #b91c1c;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  margin: 0 0 14px;
  border: 1px solid #fecaca;
}

button {
  width: 100%;
  padding: 12px;
  background: #b31b1b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s;
}
button:hover:not(:disabled) { background: #8f1515; }
button:disabled { opacity: 0.6; cursor: not-allowed; }

.back {
  display: block;
  text-align: center;
  margin-top: 18px;
  color: #64748b;
  text-decoration: none;
  font-size: 13px;
}
.back:hover { color: #b31b1b; }

@media (max-width: 768px) {
  .admin-login-page { grid-template-columns: 1fr; }
  .brand-side { display: none; }
}
</style>
