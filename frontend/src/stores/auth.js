import { defineStore } from "pinia";
import { api } from "@/api/client";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("loggedInUser") || "null"),
    userToken: localStorage.getItem("userToken") || null,
    adminToken: localStorage.getItem("adminToken") || null,
  }),
  getters: {
    isLoggedIn: (s) => !!s.userToken && !!s.user,
    isAdmin: (s) => !!s.adminToken,
  },
  actions: {
    async login(email, password) {
      const { token, user } = await api.post("/auth/login", { email, password });
      this.userToken = token;
      this.user = user;
      localStorage.setItem("userToken", token);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return user;
    },

    async register(payload) {
      return api.post("/auth/register", payload);
    },

    async adminLogin(email, password) {
      const { token } = await api.post("/auth/admin-login", { email, password });
      this.adminToken = token;
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminLoggedIn", "true");
      return token;
    },

    async refreshUser() {
      if (!this.userToken) return null;
      const user = await api.get("/users/me", { auth: "user" });
      this.user = user;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return user;
    },

    async payCard(cardId, amount) {
      const user = await api.post(
        `/users/me/cards/${cardId}/pay`,
        { amount },
        { auth: "user" }
      );
      this.user = user;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return user;
    },

    logout() {
      this.user = null;
      this.userToken = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("loggedInUser");
    },

    adminLogout() {
      this.adminToken = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLoggedIn");
    },
  },
});
