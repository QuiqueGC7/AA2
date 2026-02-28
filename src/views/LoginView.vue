<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/auth.store"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

const email = ref("")
const password = ref("")
const errorMsg = ref("")
const loading = ref(false)

const rules = {
  required: (v: string) => !!v || "Campo obligatorio",
  email: (v: string) => /.+@.+\..+/.test(v) || "Email no válido",
}

const login = async () => {
  errorMsg.value = ""
  loading.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push("/admin")
  } catch {
    errorMsg.value = "Credenciales incorrectas"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5" lg="4">

        <v-card rounded="lg" elevation="4" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">
            Iniciar sesión
          </v-card-title>

          <v-alert v-if="errorMsg" type="error" variant="tonal" class="mb-4">
            {{ errorMsg }}
          </v-alert>

          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :rules="[rules.required, rules.email]"
              class="mb-3"
            />

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              :rules="[rules.required]"
              class="mb-4"
            />

            <v-btn type="submit" color="primary" size="large" block :loading="loading">
              Entrar
            </v-btn>
          </v-form>

          <v-card-text class="text-center text-body-2 mt-2">
            ¿No tienes cuenta?
            <RouterLink to="/register" class="text-primary font-weight-bold">
              Regístrate
            </RouterLink>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>