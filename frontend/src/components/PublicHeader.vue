<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const open = ref(false);

const links = [
  { to: "/", label: "Home" },
  { to: "/public/loans", label: "Loans" },
  { to: "/public/credit-cards", label: "Credit Cards" },
  { to: "/public/support", label: "Customer Support" },
  { to: "/login", label: "Sign In" },
  { to: "/register", label: "Sign Up", cta: true },
];

function toggle(e) {
  e.stopPropagation();
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function onDocClick(e) {
  if (!e.target.closest(".menu") && !e.target.closest(".menu-btn")) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<template>
  <div class="header">
    <RouterLink to="/" class="brand-link">
      <h2>NovaTrust Bank</h2>
    </RouterLink>

    <nav class="desktop-nav">
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        :class="{ cta: l.cta }"
      >
        {{ l.label }}
      </RouterLink>
    </nav>

    <button class="menu-btn" type="button" aria-label="Open menu" @click="toggle">☰</button>
  </div>

  <div class="menu" :class="{ active: open }">
    <button class="menu-close" type="button" aria-label="Close menu" @click="close">×</button>
    <RouterLink
      v-for="l in links"
      :key="l.to"
      :to="l.to"
      :class="{ cta: l.cta }"
      @click="close"
    >
      {{ l.label }}
    </RouterLink>
  </div>
</template>

<style scoped>
.brand-link {
  text-decoration: none;
  color: inherit;
}

.brand-link h2 {
  margin: 0;
}

.desktop-nav { display: none; }

@media (min-width: 769px) {
  .desktop-nav {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-left: auto;
    margin-right: 14px;
  }

  .desktop-nav a {
    color: #fff;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 6px;
    font-weight: 500;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .desktop-nav a:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  .desktop-nav a.router-link-exact-active:not(.cta) {
    background: rgba(255, 255, 255, 0.22);
  }

  .desktop-nav a.cta {
    background: #fff;
    color: var(--brand);
    padding: 8px 18px;
    margin-left: 6px;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .desktop-nav a.cta:hover {
    background: #f3f5f8;
    color: var(--brand-strong);
  }
}

/* Mobile menu CTA emphasis */
.menu a.cta {
  background: var(--brand);
  color: #fff !important;
  font-weight: 700;
  text-align: center;
}

.menu a.cta:hover {
  background: var(--brand-strong);
}
</style>
