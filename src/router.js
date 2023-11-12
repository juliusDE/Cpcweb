import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

// Importa tus componentes Vue aquí
import home from "./components/home.vue";
import login from "./components/login.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: login, name: "LoginWeb" },
  { path: "/home", component: home, name: "Home" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.name !== "LoginWeb" && !isAuthenticated) {
    next({ name: "LoginWeb" });
  } else if (to.name === "LoginWeb" && isAuthenticated) {
    // Si ya estamos en la ruta a la que intentamos redirigir, no hacemos nada
    if (from.name !== "Home") {
      next({ name: "Home" });
    } else {
      next(false); // Evita la navegación redundante
    }
  } else {
    next();
  }
});

export default router;
