<script setup>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as Yup from "yup"
import { useAuthStore } from "../stores/auth.store"

const auth = useAuthStore()

const schema = Yup.object({
email: Yup.string().email().required(),
password: Yup.string().required(),
})

const login = async (values) => {
await auth.login(values)
}
</script>

<template>
<Form @submit="login" :validation-schema="schema">
    <div>
    <label>Email</label>
    <Field name="email" type="email" />
    <ErrorMessage name="email" />
    </div>

    <div>
    <label>Contraseña</label>
    <Field name="password" type="password" />
    <ErrorMessage name="password" />
    </div>

    <button type="submit">Entrar</button>
</Form>
</template>

 
  