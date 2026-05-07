<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const remember = ref(true);
const showPassword = ref(false);
const error = ref("");
const submitting = ref(false);

async function submit() {
  if (submitting.value) return;
  error.value = "";
  submitting.value = true;
  try {
    await auth.login(email.value.trim(), password.value);
    router.push({ name: "dashboard" });
  } catch (err) {
    error.value = err.message || "Sign in failed. Please try again.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="login-shell">
    <!-- Brand panel (desktop only) -->
    <aside class="brand-panel" aria-hidden="true">
      <div class="brand-top">
        <RouterLink to="/" class="brand-logo">NovaTrust</RouterLink>
      </div>

      <div class="brand-mid">
        <h2>Banking, simplified.</h2>
        <p>
          Manage accounts, move money, and stay protected — all from one
          secure dashboard you can trust.
        </p>
      </div>

      <ul class="brand-trust">
        <li>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          FDIC insured up to $250,000
        </li>
        <li>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Bank-grade encryption on every request
        </li>
        <li>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          24/7 support, real humans
        </li>
      </ul>

      <p class="brand-foot">© NovaTrust Bank · Member FDIC</p>
    </aside>

    <!-- Form panel -->
    <main class="form-panel">
      <RouterLink to="/" class="brand-logo brand-logo-mobile">NovaTrust</RouterLink>

      <div class="form-card">
        <header class="form-head">
          <h1>Welcome back</h1>
          <p>Sign in to your NovaTrust account.</p>
        </header>

        <form @submit.prevent="submit" novalidate>
          <label class="field">
            <span>Email</span>
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
              :disabled="submitting"
            />
          </label>

          <label class="field">
            <span class="field-label-row">
              Password
              <RouterLink to="/preapproval" class="field-link">Forgot?</RouterLink>
            </span>
            <span class="password-wrap">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Enter your password"
                required
                :disabled="submitting"
              />
              <button
                type="button"
                class="password-toggle"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" viewBox="0 0 24 24" width="18" height="18"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg v-else viewBox="0 0 24 24" width="18" height="18"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6 0-10-7-10-7a19.4 19.4 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6 0 10 7 10 7a19.46 19.46 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                </svg>
              </button>
            </span>
          </label>

          <label class="remember">
            <input type="checkbox" v-model="remember" />
            <span>Keep me signed in on this device</span>
          </label>

          <p v-if="error" class="form-error" role="alert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{{ error }}</span>
          </p>

          <button type="submit" class="primary" :disabled="submitting">
            {{ submitting ? "Signing in…" : "Sign in" }}
          </button>
        </form>

        <div class="divider"><span>or</span></div>

        <p class="signup-row">
          New to NovaTrust?
          <RouterLink to="/register">Create an account</RouterLink>
        </p>
      </div>

      <p class="legal">
        By signing in you agree to our
        <RouterLink to="/public/terms">Terms</RouterLink> and
        <RouterLink to="/public/privacy">Privacy Policy</RouterLink>.
      </p>
    </main>
  </div>
</template>

<style scoped>
.login-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background: var(--bg);
}

/* ---------- Brand panel ---------- */
.brand-panel {
  display: none;
}

@media (min-width: 900px) {
  .login-shell { grid-template-columns: 1fr 1fr; }
  .brand-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px;
    color: #fff;
    background:
      radial-gradient(circle at 80% 20%, rgba(196, 18, 48, 0.45), transparent 55%),
      linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    position: relative;
    overflow: hidden;
  }
  .brand-panel::before {
    content: "";
    position: absolute;
    inset: -40% -30% auto auto;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.06), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.brand-top { position: relative; z-index: 1; }
.brand-mid { position: relative; z-index: 1; max-width: 440px; }
.brand-trust { position: relative; z-index: 1; }
.brand-foot { position: relative; z-index: 1; }

.brand-logo {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #fff;
  text-decoration: none;
}
.brand-mid h2 {
  margin: 0 0 14px;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.brand-mid p {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 420px;
}
.brand-trust {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.brand-trust li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}
.brand-trust svg {
  color: var(--brand);
  flex-shrink: 0;
}
.brand-foot {
  margin: 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
}

/* ---------- Form panel ---------- */
.form-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px 24px;
  gap: 18px;
}
.brand-logo-mobile {
  color: var(--ink);
  font-size: 1.3rem;
}
@media (min-width: 900px) {
  .brand-logo-mobile { display: none; }
  .form-panel { padding: 32px; }
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 36px 32px;
  box-shadow: var(--shadow-md);
}
.form-head {
  margin-bottom: 22px;
}
.form-head h1 {
  margin: 0 0 6px;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.form-head p {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}

/* Inputs / fields */
.field {
  display: block;
  margin-bottom: 14px;
}
.field > span {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  margin-bottom: 6px;
}
.field-label-row {
  display: flex !important;
  justify-content: space-between;
  align-items: baseline;
}
.field-link {
  font-size: 12px;
  color: var(--brand);
  text-decoration: none;
  font-weight: 600;
}
.field-link:hover { text-decoration: underline; }

.field input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d8dde3;
  border-radius: 10px;
  font-size: 15px;
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(196, 18, 48, 0.12);
}
.field input:disabled {
  background: #f7f8fa;
  cursor: not-allowed;
}

.password-wrap {
  position: relative;
  display: block;
}
.password-toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.password-toggle:hover {
  color: var(--ink);
  background: #f3f5f8;
}
.password-wrap input {
  padding-right: 48px;
}

/* Remember me */
.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-soft);
  margin: 4px 0 16px;
  cursor: pointer;
}
.remember input {
  width: 16px;
  height: 16px;
  accent-color: var(--brand);
  cursor: pointer;
}

/* Error */
.form-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 14px;
  padding: 10px 12px;
  background: #fdecea;
  color: #a11a1a;
  border: 1px solid #f5c2c0;
  border-radius: 10px;
  font-size: 13px;
}
.form-error svg { margin-top: 1px; flex-shrink: 0; }

/* Submit */
.primary {
  width: 100%;
  padding: 13px;
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.primary:hover:not(:disabled) { background: var(--brand-strong); }
.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Divider */
.divider {
  position: relative;
  margin: 22px 0 16px;
  text-align: center;
}
.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border);
}
.divider span {
  position: relative;
  padding: 0 12px;
  background: var(--surface);
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

/* Sign-up row */
.signup-row {
  margin: 0;
  text-align: center;
  font-size: 0.95rem;
  color: var(--ink-soft);
}
.signup-row a {
  color: var(--brand);
  font-weight: 700;
  text-decoration: none;
  margin-left: 4px;
}
.signup-row a:hover { text-decoration: underline; }

/* Legal */
.legal {
  margin: 0;
  max-width: 420px;
  text-align: center;
  font-size: 11px;
  color: var(--muted);
  line-height: 1.5;
}
.legal a {
  color: var(--ink-soft);
  text-decoration: none;
  font-weight: 600;
}
.legal a:hover { text-decoration: underline; }

@media (max-width: 480px) {
  .form-card { padding: 28px 22px; }
  .form-head h1 { font-size: 1.3rem; }
}
</style>
