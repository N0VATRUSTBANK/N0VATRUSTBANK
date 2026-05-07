<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  title: { type: String, default: "" },
});

const auth = useAuthStore();
const router = useRouter();
const open = ref(false);

const welcome = `Welcome, ${auth.user?.firstName || ""}`;

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function logout() {
  auth.logout();
  router.push({ name: "home" });
}

function onDocClick(e) {
  if (!e.target.closest(".sidebar") && !e.target.closest(".menu-btn")) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<template>
  <header class="top-header">
    <button class="menu-btn" @click.stop="toggle">☰</button>
    <span class="welcome-text">{{ props.title || welcome }}</span>
  </header>

  <nav class="sidebar" :class="{ active: open, open: open }">
    <h2 class="bank-name">NovaTrust</h2>
    <div class="user-greeting">
      <p class="greeting-label">Signed in as</p>
      <p class="greeting-name">
        {{ auth.user?.firstName || "Customer" }}
        <template v-if="auth.user?.lastName">{{ auth.user.lastName }}</template>
      </p>
    </div>
    <RouterLink to="/app/dashboard" @click="close">Dashboard</RouterLink>
    <RouterLink to="/app/transfer" @click="close">Transfer</RouterLink>
    <RouterLink to="/app/history" @click="close">History</RouterLink>
    <RouterLink to="/app/loans" @click="close">Loans</RouterLink>
    <RouterLink to="/app/credit-card" @click="close">Credit Card</RouterLink>
    <RouterLink to="/app/support" @click="close">Customer Support</RouterLink>
    <a href="#" @click.prevent="logout">Logout</a>
  </nav>

  <div class="sidebar-overlay" :class="{ active: open }" @click="close"></div>
</template>
