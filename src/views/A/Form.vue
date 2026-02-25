<template>
    <Form :initial-values="form" :validation-schema="schema" @submit="save">
      <div>
        <label>Nombre</label>
        <Field name="name" />
        <ErrorMessage name="name" />
      </div>
  
      <button type="submit">Guardar</button>
    </Form>
  </template>
  
  <script setup lang="ts">
  import { Form, Field, ErrorMessage } from "vee-validate"
  import * as Yup from "yup"
  import { ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import type { A } from "@/types/A"
  
  const route = useRoute()
  const router = useRouter()
  
  const schema = Yup.object({
    name: Yup.string().required(),
  })
  
  const form = ref<A>({
    id: 0,
    name: "",
  })
  
  if (route.params.id) {
    form.value = {
      id: Number(route.params.id),
      name: "Elemento cargado",
    }
  }
  
  const save = (values: A) => {
    console.log("Guardado:", values)
    router.push("/entity-a")
  }
  </script>
  