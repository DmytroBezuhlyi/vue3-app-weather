import { defineStore } from "pinia";
import { login } from "@/services/api.ts"
import type { AuthState } from "@/types/auth.types.ts";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token") || "",
    tokenExpiresAt: localStorage.getItem("tokenExpiresAt") ? Number(localStorage.getItem("tokenExpiresAt")) : null,
    email: localStorage.getItem("email") || "",
  }),
  actions: {
    async login(email: string, password: string) {
      const result = await login(email, password)
      if (result.token) {
        const tokenExpiresAt = Date.now() + 15 * 60 * 1000

        this.token = result.token
        this.tokenExpiresAt = tokenExpiresAt
        this.email = email

        localStorage.setItem('token', result.token)
        localStorage.setItem('tokenExpiresAt', tokenExpiresAt.toString())
        localStorage.setItem('email', email)
      } else {
        throw new Error('Login error')
      }
    },
    logout() {
      this.token = null;
      this.tokenExpiresAt = null;
      this.email = null;

      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiresAt");
      localStorage.removeItem("email");
    },
    checkToken() {
      if (!this.token || !this.tokenExpiresAt || Date.now() > this.tokenExpiresAt) {
        this.logout();
        return false;
      }

      return true;
    },
  },
});
