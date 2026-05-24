<template>
  <v-app>
    <Navbar />

    <!-- Sidebar de administración -->
    <v-navigation-drawer permanent color="grey-darken-4" width="230">

      <v-list-item
        prepend-icon="mdi-silverware-fork-knife"
        :title="t('nav.admin')"
        class="py-4"
        nav
      />

      <v-divider />

      <v-list density="compact" nav class="mt-2">
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          :title="t('admin.dashboard')"
          to="/admin"
          exact
          rounded="lg"
          active-color="primary"
        />
        <v-list-item
          prepend-icon="mdi-food"
          :title="t('admin.platos')"
          to="/admin/platos"
          rounded="lg"
          active-color="primary"
        />
        <v-list-item
          prepend-icon="mdi-cup"
          :title="t('admin.bebidas')"
          to="/admin/bebidas"
          rounded="lg"
          active-color="primary"
        />
        <v-list-item
          prepend-icon="mdi-cake"
          :title="t('admin.postres')"
          to="/admin/postres"
          rounded="lg"
          active-color="primary"
        />
      </v-list>

      <!-- Usuario activo al pie con role -->
      <template #append>
        <v-divider />
        <v-list density="compact" nav class="my-2">
          <v-list-item
            prepend-icon="mdi-account-circle-outline"
            :title="auth.user?.email ?? ''"
            :subtitle="auth.user?.role?.toUpperCase() ?? 'GUEST'"
          >
            <template #append>
              <v-chip :color="roleColor" size="x-small" label>
                {{ auth.user?.role }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </template>

    </v-navigation-drawer>

    <v-main>
      <Notification />
      <LoadingSpinner v-if="ui.loading" />
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">
import { computed }         from "vue"
import { useI18n }          from "vue-i18n"
import Navbar               from "../components/common/Navbar.vue"
import Notification         from "../components/ui/Notification.vue"
import LoadingSpinner       from "../components/ui/LoadingSpinner.vue"
import { useUIStore }       from "../stores/ui.store"
import { useAuthStore }     from "../stores/auth.store"

const { t }  = useI18n()
const ui     = useUIStore()
const auth   = useAuthStore()

const roleColor = computed(() => {
  if (auth.userRole === "admin") return "error"
  if (auth.userRole === "user")  return "primary"
  return "secondary"
})
</script>