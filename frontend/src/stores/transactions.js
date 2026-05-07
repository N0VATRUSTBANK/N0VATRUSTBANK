import { defineStore } from "pinia";
import { api } from "@/api/client";

export const useTransactionsStore = defineStore("transactions", {
  state: () => ({
    items: [],
    loading: false,
    error: "",
  }),
  getters: {
    pending: (s) => s.items.filter((t) => t.status === "Pending"),
    history: (s) => s.items.filter((t) => t.status !== "Pending"),
    recent: (s) => s.items.slice(0, 5),
  },
  actions: {
    async loadMine(status) {
      this.loading = true;
      this.error = "";
      try {
        const path = status ? `/transactions/me?status=${status}` : "/transactions/me";
        this.items = await api.get(path, { auth: "user" });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async create(payload) {
      const tx = await api.post("/transactions", payload, { auth: "user" });
      this.items.unshift(tx);
      return tx;
    },

    async getOne(id) {
      return api.get(`/transactions/me/${id}`, { auth: "user" });
    },
  },
});
