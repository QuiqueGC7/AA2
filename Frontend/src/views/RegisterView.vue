<script setup lang="ts">
import { ref } from "vue"
import { useForm, useField } from "vee-validate"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/auth.store"

const router   = useRouter()
const auth     = useAuthStore()
const loading  = ref(false)
const errorMsg = ref("")

const { handleSubmit } = useForm({
  validationSchema: {
    email: (v: string) => {
      if (!v) return "El email es obligatorio"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "El email no es válido"
      return true
    },
    password: (v: string) => {
      if (!v) return "La contraseña es obligatoria"
      if (v.length < 6) return "Mínimo 6 caracteres"
      return true
    },
    confirmPassword: (v: string) => {
      if (!v) return "Confirma tu contraseña"
      if (v !== password.value) return "Las contraseñas no coinciden"
      return true
    },
  },
})

const { value: email,           errorMessage: emailError           } = useField<string>("email")
const { value: password,        errorMessage: passwordError        } = useField<string>("password")
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>("confirmPassword")

const onSubmit = handleSubmit(async (values) => {
  errorMsg.value = ""
  loading.value  = true
  try {
    await auth.register({ email: values.email, password: values.password })
    router.push("/login")
  } catch {
    errorMsg.value = "Error al registrar. El email puede estar ya en uso."
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5" lg="4">

        <v-card rounded="lg" elevation="4" class="pa-6">

          <v-card-title class="text-h5 font-weight-bold text-center mb-2">
            Crear cuenta
          </v-card-title>

          <v-card-subtitle class="text-center mb-4">
            Rellena los campos para registrarte
          </v-card-subtitle>

          <!-- Error -->
          <v-alert
            v-if="errorMsg"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
            @click:close="errorMsg = ''"
          >
            {{ errorMsg }}
          </v-alert>

          <form @submit.prevent="onSubmit" novalidate>

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :error-messages="emailError"
              autocomplete="email"
              class="mb-2"
            />

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              :error-messages="passwordError"
              autocomplete="new-password"
              class="mb-2"
            />

            <v-text-field
              v-model="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              prepend-inner-icon="mdi-lock-check-outline"
              variant="outlined"
              :error-messages="confirmPasswordError"
              autocomplete="new-password"
              class="mb-4"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
            >
              Registrarse
            </v-btn>

          </form>

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