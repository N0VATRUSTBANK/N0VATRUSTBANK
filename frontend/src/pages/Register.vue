<script setup>
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();
const submitting = ref(false);

const form = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  dob: "",
  phone: "",
  email: "",

  country: "",
  stateProvince: "",
  city: "",
  zipCode: "",
  address: "",
  houseAddress: "",

  accountType: "",
  password: "",
  confirmPassword: "",
  twoFaPin: "",

  ssn: "",
  govId: "",
});

const passwordMismatch = computed(
  () =>
    form.confirmPassword.length > 0 && form.password !== form.confirmPassword
);

const canSubmit = computed(
  () =>
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    !passwordMismatch.value &&
    !submitting.value
);

async function submit() {
  if (passwordMismatch.value) return alert("Passwords do not match");
  if (!canSubmit.value) return alert("Please fill all required fields");

  submitting.value = true;
  try {
    await auth.register(form);
    alert("Account created.\n\nYour account is pending approval.");
    router.push({ name: "home" });
  } catch (err) {
    alert(err.message);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="register-page">
    <div class="hero">
      <RouterLink to="/" class="exit-btn" title="Cancel">✕</RouterLink>
      <h1>Open your NovaTrust account</h1>
      <p>
        It only takes a few minutes. Your account will be reviewed by our team
        and approved within 24 hours.
      </p>
      <ul class="benefits">
        <li>No monthly fees, no minimum balance</li>
        <li>FDIC-insured up to $250,000</li>
        <li>Bank-grade encryption &amp; 24/7 fraud monitoring</li>
      </ul>
    </div>

    <form class="form-card" @submit.prevent="submit">
      <section class="section">
        <header>
          <span class="num">1</span>
          <div>
            <h2>Personal Information</h2>
            <p>Tell us who you are.</p>
          </div>
        </header>

        <div class="grid">
          <label class="field">
            <span>First name <em>*</em></span>
            <input v-model="form.firstName" required />
          </label>

          <label class="field">
            <span>Middle name</span>
            <input v-model="form.middleName" placeholder="Optional" />
          </label>

          <label class="field">
            <span>Last name <em>*</em></span>
            <input v-model="form.lastName" required />
          </label>

          <label class="field">
            <span>Date of birth</span>
            <input v-model="form.dob" placeholder="MM/DD/YYYY" />
          </label>

          <label class="field">
            <span>Phone number</span>
            <input v-model="form.phone" type="tel" placeholder="+1 (555) 555-5555" />
          </label>

          <label class="field">
            <span>Email <em>*</em></span>
            <input v-model="form.email" type="email" required />
          </label>
        </div>
      </section>

      <section class="section">
        <header>
          <span class="num">2</span>
          <div>
            <h2>Address</h2>
            <p>Where do you live?</p>
          </div>
        </header>

        <div class="grid">
          <label class="field">
            <span>Country</span>
            <input v-model="form.country" placeholder="United States" />
          </label>

          <label class="field">
            <span>State / Province</span>
            <input v-model="form.stateProvince" />
          </label>

          <label class="field">
            <span>City</span>
            <input v-model="form.city" />
          </label>

          <label class="field">
            <span>Zip / Postal code</span>
            <input v-model="form.zipCode" />
          </label>

          <label class="field full">
            <span>Street address</span>
            <input v-model="form.address" placeholder="123 Main St" />
          </label>

          <label class="field full">
            <span>Apt / Suite / Unit</span>
            <input v-model="form.houseAddress" placeholder="Optional" />
          </label>
        </div>
      </section>

      <section class="section">
        <header>
          <span class="num">3</span>
          <div>
            <h2>Account &amp; Security</h2>
            <p>Choose your account type and a strong password.</p>
          </div>
        </header>

        <div class="grid">
          <label class="field">
            <span>Account type</span>
            <select v-model="form.accountType">
              <option value="" disabled>Select an option</option>
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
              <option value="Business">Business</option>
            </select>
          </label>

          <label class="field">
            <span>2FA PIN</span>
            <input v-model="form.twoFaPin" type="password" placeholder="4–6 digits" maxlength="6" />
          </label>

          <label class="field">
            <span>Password <em>*</em></span>
            <input v-model="form.password" type="password" required minlength="6" />
          </label>

          <label class="field">
            <span>Confirm password <em>*</em></span>
            <input
              v-model="form.confirmPassword"
              type="password"
              required
              :class="{ mismatch: passwordMismatch }"
            />
            <small v-if="passwordMismatch" class="error">Passwords don't match</small>
          </label>
        </div>
      </section>

      <section class="section">
        <header>
          <span class="num">4</span>
          <div>
            <h2>Identity Verification</h2>
            <p>Required by federal banking regulations.</p>
          </div>
        </header>

        <div class="grid">
          <label class="field">
            <span>Social Security Number</span>
            <input v-model="form.ssn" placeholder="XXX-XX-XXXX" />
          </label>

          <label class="field">
            <span>Government ID number</span>
            <input v-model="form.govId" placeholder="Driver's license / Passport" />
          </label>
        </div>
      </section>

      <footer class="actions">
        <p class="tos">
          By creating an account you agree to our
          <RouterLink to="/public/terms">Terms</RouterLink> and
          <RouterLink to="/public/privacy">Privacy Policy</RouterLink>.
        </p>
        <button type="submit" :disabled="!canSubmit">
          {{ submitting ? "Creating account…" : "Create Account" }}
        </button>
      </footer>

      <p class="login-link">
        Already have an account?
        <RouterLink to="/">Sign in</RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
.register-page {
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
  gap: 30px;
  max-width: 1100px;
  margin: 100px auto 60px;
  padding: 0 20px;
  align-items: start;
}

/* HERO */
.hero {
  position: sticky;
  top: 90px;
  background: linear-gradient(155deg, #b31b1b 0%, #7a0f0f 100%);
  color: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 12px 30px rgba(179, 27, 27, 0.25);
}
.hero h1 {
  font-size: 28px;
  margin: 0 0 12px;
  line-height: 1.25;
}
.hero p {
  margin: 0 0 20px;
  opacity: 0.92;
  line-height: 1.5;
}
.benefits {
  list-style: none;
  margin: 0;
  padding: 0;
}
.benefits li {
  position: relative;
  padding: 8px 0 8px 26px;
  font-size: 14px;
  opacity: 0.95;
}
.benefits li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 8px;
  width: 18px;
  height: 18px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  text-align: center;
  line-height: 18px;
  font-size: 11px;
  font-weight: bold;
}
.exit-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.15s;
}
.exit-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* FORM */
.form-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.section {
  padding: 28px 32px;
  border-bottom: 1px solid #f0f0f0;
}
.section:last-of-type {
  border-bottom: none;
}
.section header {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 18px;
}
.section header h2 {
  margin: 0 0 2px;
  font-size: 18px;
  color: #1a1a1a;
}
.section header p {
  margin: 0;
  color: #777;
  font-size: 13px;
}
.num {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #b31b1b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  font-size: 13px;
}
.field.full {
  grid-column: 1 / -1;
}
.field span {
  margin-bottom: 6px;
  color: #444;
  font-weight: 500;
}
.field em {
  color: #b31b1b;
  font-style: normal;
}
.field input,
.field select {
  padding: 11px 13px;
  border-radius: 8px;
  border: 1px solid #d6d6d6;
  font-size: 14px;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.field input:focus,
.field select:focus {
  outline: none;
  border-color: #b31b1b;
  box-shadow: 0 0 0 3px rgba(179, 27, 27, 0.12);
}
.field input.mismatch {
  border-color: #c62828;
}
.error {
  color: #c62828;
  font-size: 12px;
  margin-top: 4px;
}

/* FOOTER */
.actions {
  padding: 24px 32px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.tos {
  margin: 0;
  font-size: 13px;
  color: #666;
  flex: 1 1 240px;
}
.tos a {
  color: #b31b1b;
  text-decoration: none;
}
.tos a:hover {
  text-decoration: underline;
}
.actions button {
  padding: 12px 28px;
  background: #b31b1b;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.actions button:hover:not(:disabled) {
  background: #8f1515;
}
.actions button:active:not(:disabled) {
  transform: scale(0.98);
}
.actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  font-size: 14px;
  padding: 18px;
  margin: 0;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
.login-link a {
  color: #b31b1b;
  font-weight: bold;
  text-decoration: none;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .register-page {
    grid-template-columns: 1fr;
    margin-top: 90px;
  }
  .hero {
    position: static;
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .section {
    padding: 22px 20px;
  }
  .actions {
    padding: 20px;
  }
  .actions button {
    width: 100%;
  }
}
</style>
