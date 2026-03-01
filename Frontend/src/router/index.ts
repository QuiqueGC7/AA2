import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

import HomeView       from "../views/HomeView.vue"
import LoginView      from "../views/LoginView.vue"
import RegisterView   from "../views/RegisterView.vue"
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
  {
  path: "/products",
  component: () => import("../views/ProductsView.vue"),
  meta: { layout: "public" }
},

  // CRUD PLATOS PRINCIPALES  ← carpeta real: views/PlatoPrincipal/
  { path: "/admin/platos",      component: () => import("../views/PlatoPrincipal/List.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/platos/new",  component: () => import("../views/PlatoPrincipal/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/platos/:id",  component: () => import("../views/PlatoPrincipal/Form.vue"), meta: { layout: "admin", requiresAuth: true } },

  // CRUD BEBIDAS  ← carpeta real: views/Bebida/
  { path: "/admin/bebidas",     component: () => import("../views/Bebida/List.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/bebidas/new", component: () => import("../views/Bebida/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/bebidas/:id", component: () => import("../views/Bebida/Form.vue"), meta: { layout: "admin", requiresAuth: true } },

  // CRUD POSTRES  ← carpeta real: views/Postre/
  { path: "/admin/postres",     component: () => import("../views/Postre/List.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/postres/new", component: () => import("../views/Postre/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
  { path: "/admin/postres/:id", component: () => import("../views/Postre/Form.vue"), meta: { layout: "admin", requiresAuth: true } },
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