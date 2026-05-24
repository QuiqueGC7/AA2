import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw }            from "vue-router"

import HomeView       from "../views/HomeView.vue"
import LoginView      from "../views/LoginView.vue"
import RegisterView   from "../views/RegisterView.vue"
import AdminDashboard from "../views/AdminDashboard.vue"

import { useAuthStore } from "../stores/auth.store"

const routes: RouteRecordRaw[] = [
  // ── Rutas públicas ──────────────────────────────────────────────────────────
  { path: "/",         component: HomeView,      meta: { layout: "public" } },
  { path: "/login",    component: LoginView,     meta: { layout: "auth"   } },
  { path: "/register", component: RegisterView,  meta: { layout: "auth"   } },
  { path: "/products", component: () => import("../views/ProductsView.vue"),   meta: { layout: "public" } },
  { path: "/search",   component: () => import("../views/SearchView.vue"),     meta: { layout: "public" } },

  // ── Admin – sólo rol admin ──────────────────────────────────────────────────
  {
    path:      "/admin",
    component: AdminDashboard,
    meta:      { layout: "admin", requiresAuth: true, requiresRole: "admin" },
  },

  // CRUD Platos (admin + user pueden gestionar)
  { path: "/admin/platos",      component: () => import("../views/PlatoPrincipal/List.vue"), meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },
  { path: "/admin/platos/new",  component: () => import("../views/PlatoPrincipal/Form.vue"), meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },
  { path: "/admin/platos/:id",  component: () => import("../views/PlatoPrincipal/Form.vue"), meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },

  // CRUD Bebidas
  { path: "/admin/bebidas",     component: () => import("../views/Bebida/List.vue"),         meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },
  { path: "/admin/bebidas/new", component: () => import("../views/Bebida/Form.vue"),         meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },
  { path: "/admin/bebidas/:id", component: () => import("../views/Bebida/Form.vue"),         meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },

  // CRUD Postres
  { path: "/admin/postres",     component: () => import("../views/Postre/List.vue"),         meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },
  { path: "/admin/postres/new", component: () => import("../views/Postre/Form.vue"),         meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },
  { path: "/admin/postres/:id", component: () => import("../views/Postre/Form.vue"),         meta: { layout: "admin", requiresAuth: true, requiresRole: "editor" } },

  // Catch-all → home
  { path: "/:pathMatch(.*)*", redirect: "/" },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLogged) {
    return next("/login")
  }

  // Ruta solo para admin
  if (to.meta.requiresRole === "admin" && !auth.isAdmin) {
    return next("/login")
  }

  // Ruta para admin o user (editor)
  if (to.meta.requiresRole === "editor" && !auth.isEditor) {
    return next("/login")
  }

  next()
})

export default router