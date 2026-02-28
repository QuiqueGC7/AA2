import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import RegisterView from "../views/RegisterView.vue"
import AdminDashboard from "../views/AdminDashboard.vue"
import { useAuthStore } from "../stores/auth.store"

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView, meta: { layout: "public" } },
  { path: "/login", component: LoginView, meta: { layout: "public" } },
  { path: "/register", component: RegisterView, meta: { layout: "public" } },

  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true, layout: "admin" },
  },

  {
    path: "/admin/products",
    component: () => import("../views/Products/List.vue"),
    meta: { requiresAuth: true, layout: "admin" },
  },
  {
    path: "/admin/products/new",
    component: () => import("../views/Products/Form.vue"),
    meta: { requiresAuth: true, layout: "admin" },
  },
  {
    path: "/admin/products/:id",
    component: () => import("../views/Products/Form.vue"),
    meta: { requiresAuth: true, layout: "admin" },
  },

  {
    path: "/admin/categories",
    component: () => import("../views/Categories/List.vue"),
    meta: { requiresAuth: true, layout: "admin" },
  },
  {
    path: "/admin/categories/new",
    component: () => import("../views/Categories/Form.vue"),
    meta: { requiresAuth: true, layout: "admin" },
  },
  {
    path: "/admin/categories/:id",
    component: () => import("../views/Categories/Form.vue"),
    meta: { requiresAuth: true, layout: "admin" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLogged) next("/login")
  else next()
})

export default router
