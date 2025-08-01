import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.ts";
import LoginPage from "@/pages/LoginPage.vue";
import WeatherPage from "@/pages/WeatherPage.vue";
import WeatherCityPage from "@/pages/WeatherCityPage.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/weather",
    name: "weather",
    component: WeatherPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/weather/:country",
    name: "weather-city",
    component: WeatherCityPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.checkToken()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
