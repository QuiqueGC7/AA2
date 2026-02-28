<script setup lang="ts">
import { ref } from "vue"
import { useForm, useField } from "vee-validate"
import * as Yup from "yup"
import { useRouter } from "vue-router"

const router  = useRouter()
const loading = ref(false)

const schema = Yup.object({
  email: Yup.string().email("Email no valido").required("Campo obligatorio"),
  password: Yup.string().min(6, "Minimo 6 caracteres").required("Campo obligatorio"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contrasenas no coinciden")
    .required("Campo obligatorio"),
})

const { handleSubmit } = useForm({ validationSchema: schema })

const { value: email,           errorMessage: emailError           } = useField<string>("email")
const { value: password,        errorMessage: passwordError        } = useField<string>("password")
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>("confirmPassword")

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    console.log("Register:", values)
    router.push("/login")
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
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">
            Crear cuenta
          </v-card-title>

          <form @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :error-messages="emailError"
              class="mb-2"
            />
            <v-text-field
              v-model="password"
              label="Contrasena"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              :error-messages="passwordError"
              class="mb-2"
            />
            <v-text-field
              v-model="confirmPassword"
              label="Confirmar contrasena"
              type="password"
              prepend-inner-icon="mdi-lock-check-outline"
              variant="outlined"
              :error-messages="confirmPasswordError"
              class="mb-4"
            />
            <v-btn type="submit" color="primary" size="large" block :loading="loading">
              Registrarse
            </v-btn>
          </form>

          <v-card-text class="text-center text-body-2 mt-2">
            Ya tienes cuenta?
            <RouterLink to="/login" class="text-primary font-weight-bold">
              Inicia sesion
            </RouterLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>