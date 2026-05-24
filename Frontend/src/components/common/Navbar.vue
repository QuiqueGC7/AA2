<template>
  <v-app-bar color="surface" elevation="2" border="b">

    <!-- Logo -->
    <v-app-bar-title>
      <RouterLink to="/" class="logo-link">
        <v-icon color="primary" class="mr-1">mdi-store</v-icon>
        <span class="text-primary font-weight-bold">MiRestaurante</span>
      </RouterLink>
    </v-app-bar-title>

    <!-- Links públicos -->
    <v-btn variant="text" to="/"        exact>{{ t("nav.home")     }}</v-btn>
    <v-btn variant="text" to="/products"      >{{ t("nav.products") }}</v-btn>
    <v-btn variant="text" to="/search"        >{{ t("nav.search")   }}</v-btn>

    <v-spacer />

    <!-- Selector de idioma -->
    <v-btn-toggle
      v-model="currentLocale"
      mandatory
      density="compact"
      variant="outlined"
      class="mr-2"
      @update:modelValue="changeLocale"
    >
      <v-btn value="es" size="small">ES</v-btn>
      <v-btn value="en" size="small">EN</v-btn>
    </v-btn-toggle>

    <!-- Selector de tema -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon size="small" class="mr-1">
          <v-icon>{{ themeIcon }}</v-icon>
        </v-btn>
      </template>
      <v-list density="compact">
        <v-list-item
          v-for="opt in themeOptions"
          :key="opt.value"
          :value="opt.value"
          :prepend-icon="opt.icon"
          :title="t(`themes.${opt.value}`)"
          @click="changeTheme(opt.value)"
        />
      </v-list>
    </v-menu>

    <!-- Sin sesión -->
    <template v-if="!auth.isLogged">
      <v-btn variant="text"  to="/login"   >{{ t("nav.login")    }}</v-btn>
      <v-btn variant="flat"  to="/register">{{ t("nav.register") }}</v-btn>
    </template>

    <!-- Con sesión -->
    <template v-else>
      <v-chip v-if="auth.userRole" :color="roleColor" size="small" class="mr-2" label>
        {{ auth.userRole.toUpperCase() }}
      </v-chip>
      <v-btn
        v-if="auth.isAdmin"
        variant="text"
        to="/admin"
        prepend-icon="mdi-view-dashboard"
      >
        {{ t("nav.admin") }}
      </v-btn>
      <v-btn
        variant="outlined"
        color="error"
        prepend-icon="mdi-logout"
        class="mr-2"
        @click="logout"
      >
        {{ t("nav.logout") }}
      </v-btn>
    </template>

  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, ref }   from "vue"
import { useI18n }         from "vue-i18n"
import { useTheme }        from "vuetify"
import { useAuthStore }    from "../../stores/auth.store"
import { useUIStore }      from "../../stores/ui.store"
import type { AppTheme, AppLocale } from "../../stores/ui.store"
import { useRouter }       from "vue-router"

const { t, locale } = useI18n()
const vuetifyTheme  = useTheme()
const auth          = useAuthStore()
const ui            = useUIStore()
const router        = useRouter()

const currentLocale = ref<AppLocale>(ui.locale as AppLocale)

const themeOptions = [
  { value: "light" as AppTheme, icon: "mdi-white-balance-sunny"  },
  { value: "dark"  as AppTheme, icon: "mdi-weather-night"        },
  { value: "warm"  as AppTheme, icon: "mdi-fire"                 },
]

const themeIcon = computed(() => {
  return themeOptions.find(o => o.value === ui.theme)?.icon ?? "mdi-theme-light-dark"
})

const roleColor = computed(() => {
  if (auth.userRole === "admin") return "error"
  if (auth.userRole === "user")  return "primary"
  return "secondary"
})

function changeTheme(newTheme: AppTheme) {
  ui.setTheme(newTheme)
  vuetifyTheme.global.name.value = newTheme
}

function changeLocale(newLocale: AppLocale) {
  ui.setLocale(newLocale)
  locale.value = newLocale
}

function logout() {
  auth.logout()
  router.push("/")
}
</script>

<style scoped>
.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}
</style>