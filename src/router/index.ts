import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"


// Vistas públicas
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"

// Vistas admin
import AdminDashboard from "../views/AdminDashboard.vue"

// Store de autenticación
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
    meta: { layout: "public" }
  },
  {
    path: "/register",
    component: RegisterView,
    meta: { layout: "public" }
  },

  // PANEL ADMIN
  {
    path: "/admin",
    component: AdminDashboard,
    meta: { layout: "admin", requiresAuth: true }
  },

  // CRUD PRODUCTOS
  {
    path: "/admin/products",
    component: () => import("@/views/Products/List.vue"),
    meta: { layout: "admin", requiresAuth: true }
  },
  {
    path: "/admin/products/new",
    component: () => import("@/views/Products/Form.vue"),
    meta: { layout: "admin", requiresAuth: true }
  },
  {
    path: "/admin/products/:id",
    component: () => import("@/views/Products/Form.vue"),
    meta: { layout: "admin", requiresAuth: true }
  },

  // CRUD CATEGORÍAS
  {
    path: "/admin/categories",
    component: () => import("@/views/Categories/List.vue"),
    meta: { layout: "admin", requiresAuth: true }
  },
  {
    path: "/admin/categories/new",
    component: () => import("@/views/Categories/Form.vue"),
    meta: { layout: "admin", requiresAuth: true }
  },
  {
    path: "/admin/categories/:id",
    component: () => import("@/views/Categories/Form.vue"),
    meta: { layout: "admin", requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// PROTECCIÓN DE RUTAS PRIVADAS
router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLogged) {
    next("/login")
  } else {
    next()
  }
})

export default router
