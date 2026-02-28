import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import HomeView      from "../views/HomeView.vue"
import LoginView     from "../views/LoginView.vue"
import RegisterView  from "../views/RegisterView.vue"
import AdminDashboard from "../views/AdminDashboard.vue"

import { useAuthStore } from "../stores/auth.store"

const routes: RouteRecordRaw[] = [
  // RUTAS PÚBLICAS
  {
    path: "/",
    component: HomeView,
    meta: { layout: "public" }
  },

  {
    path: "/login",
    component: LoginView,
    meta: { layout: "auth" }
  },
  {
    path: "/register",
    component: RegisterView,
    meta: { layout: "auth" }
  },

  // PANEL ADMIN
  {
    path: "/admin",
    component: AdminDashboard,
    meta: { layout: "admin", requiresAuth: true }
  },

  // CRUD PLATOS PRINCIPALES
  { path: "/admin/platos",      component: () => import("../views/Platos/List.vue"),  meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/platos/new",  component: () => import("../views/Platos/Form.vue"),  meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/platos/:id",  component: () => import("../views/Platos/Form.vue"),  meta: { layout: "admin", requiresAuth: true } },

  // CRUD BEBIDAS
  { path: "/admin/bebidas",     component: () => import("../views/Bebidas/List.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/bebidas/new", component: () => import("../views/Bebidas/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/bebidas/:id", component: () => import("../views/Bebidas/Form.vue"), meta: { layout: "admin", requiresAuth: true } },

  // CRUD POSTRES
  { path: "/admin/postres",     component: () => import("../views/Postres/List.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/postres/new", component: () => import("../views/Postres/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/postres/:id", component: () => import("../views/Postres/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLogged) {
    next("/login")
  } else {
    next()
  }
})

export default router