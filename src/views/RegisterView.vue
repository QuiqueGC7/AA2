<script setup lang="ts">
import { ref } from "vue"

const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const loading = ref(false)

const rules = {
  required: (v: string) => !!v || "Campo obligatorio",
  email: (v: string) => /.+@.+\..+/.test(v) || "Email no válido",
  minLength: (v: string) => v.length >= 6 || "Mínimo 6 caracteres",
  match: (v: string) => v === password.value || "Las contraseñas no coinciden",
}

const handleRegister = async () => {
  loading.value = true
  try {
    console.log("Register:", { email: email.value, password: password.value })
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
            Crear cuenta
          </v-card-title>

          <v-form @submit.prevent="handleRegister">
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
              :rules="[rules.required, rules.minLength]"
              class="mb-3"
            />

            <v-text-field
              v-model="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              prepend-inner-icon="mdi-lock-check-outline"
              variant="outlined"
              :rules="[rules.required, rules.match]"
              class="mb-4"
            />

            <v-btn type="submit" color="primary" size="large" block :loading="loading">
              Registrarse
            </v-btn>
          </v-form>

          <v-card-text class="text-center text-body-2 mt-2">
            ¿Ya tienes cuenta?
            <RouterLink to="/login" class="text-primary font-weight-bold">
              Inicia sesión
            </RouterLink>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>