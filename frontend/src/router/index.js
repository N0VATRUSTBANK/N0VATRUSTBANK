import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import AuthLayout from "@/layouts/AuthLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import PublicLayout from "@/layouts/PublicLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      { path: "", name: "home", component: () => import("@/pages/Home.vue") },
      { path: "login", name: "login", component: () => import("@/pages/Login.vue") },
      { path: "register", name: "register", component: () => import("@/pages/Register.vue") },
      { path: "preapproval", name: "preapproval", component: () => import("@/pages/Preapproval.vue") },
    ],
  },

  {
    path: "/app",
    component: AppLayout,
    meta: { requiresUser: true },
    children: [
      { path: "dashboard", name: "dashboard", component: () => import("@/pages/app/Dashboard.vue") },
      { path: "history", name: "history", component: () => import("@/pages/app/History.vue") },
      { path: "statements", name: "statements", component: () => import("@/pages/app/Statements.vue") },
      { path: "receipt", name: "receipt", component: () => import("@/pages/app/Receipt.vue") },
      { path: "credit-card", name: "credit-card", component: () => import("@/pages/app/CreditCard.vue") },
      { path: "loans", name: "loans", component: () => import("@/pages/app/Loans.vue") },
      { path: "support", name: "support", component: () => import("@/pages/app/Support.vue") },
      { path: "transfer", name: "transfer", component: () => import("@/pages/app/Transfer.vue") },
      { path: "transfer/review", name: "transfer-review", component: () => import("@/pages/app/transfers/Review.vue") },
      { path: "transfer/zelle", name: "transfer-zelle", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Zelle", title: "Zelle®", subtitle: "Send money securely to people you trust", color: "#6d1ed4" } },
      { path: "transfer/wire", name: "transfer-wire", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Wire", title: "Wire Transfer", subtitle: "Send funds domestically or internationally", color: "#0a4f8c", needsBank: true } },
      { path: "transfer/ach", name: "transfer-ach", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "ACH", title: "ACH Transfer", subtitle: "Bank-to-bank transfer (1-3 business days)", color: "#1565c0", needsBank: true, needsRouting: true } },
      { path: "transfer/bills", name: "transfer-bills", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Bill Pay", title: "Pay Bills", subtitle: "Pay your bills directly from your account", color: "#2e7d32" } },
      { path: "transfer/check", name: "transfer-check", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Mobile Check", title: "Mobile Check Deposit", subtitle: "Deposit checks from your phone", color: "#ef6c00" } },
      { path: "transfer/btc", name: "transfer-btc", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Bitcoin", title: "Bitcoin Transfer", subtitle: "Send BTC to any wallet address", color: "#f7931a" } },
      { path: "transfer/internal", name: "transfer-internal", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Internal", title: "Internal Transfer", subtitle: "Move funds between your accounts", color: "#0277bd" } },
      { path: "transfer/send-money", name: "transfer-send", component: () => import("@/pages/app/transfers/TransferForm.vue"), props: { method: "Inter-Send", title: "Inter-Send", subtitle: "Send money to other NovaTrust members", color: "#b31b1b" } },
    ],
  },

  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "login", name: "admin-login", component: () => import("@/pages/admin/AdminLogin.vue") },
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: () => import("@/pages/admin/AdminDashboard.vue"),
        meta: { requiresAdmin: true },
      },
    ],
  },

  {
    path: "/public",
    component: PublicLayout,
    children: [
      { path: "accounts", component: () => import("@/pages/public/Accounts.vue") },
      { path: "loans", component: () => import("@/pages/public/Loans.vue") },
      { path: "credit-cards", component: () => import("@/pages/public/CreditCards.vue") },
      { path: "support", component: () => import("@/pages/public/Support.vue") },
      { path: "terms", component: () => import("@/pages/public/Terms.vue") },
      { path: "privacy", component: () => import("@/pages/public/Privacy.vue") },
      { path: "legal", component: () => import("@/pages/public/Legal.vue") },
      { path: "accessibility", component: () => import("@/pages/public/Accessibility.vue") },
      { path: "disclosure", component: () => import("@/pages/public/Disclosure.vue") },
    ],
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresUser && !auth.isLoggedIn) return { name: "login" };
  if (to.meta.requiresAdmin && !auth.isAdmin) return { name: "admin-login" };
});

export default router;
