import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import AdminDashboard from "@/views/AdminDashboard.vue"
import { useAuthStore } from '@/stores/counter'

const routes: RouteRecordRaw[] = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },

  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },

  // CRUD de entidades
  {
    path: "/entity-a",
    component: () => import("@/views/A/List.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/entity-a/new",
    component: () => import("@/views/A/Form.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/entity-a/:id",
    component: () => import("@/views/A/Form.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/entity-b",
    component: () => import("@/views/B/List.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/entity-b/new",
    component: () => import("@/views/B/Form.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/entity-b/:id",
    component: () => import("@/views/B/Form.vue"),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLogged) {
    next("/login")
  } else {
    next()
  }
})

export default router
