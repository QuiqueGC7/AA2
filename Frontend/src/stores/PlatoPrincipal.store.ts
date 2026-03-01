import { defineStore } from "pinia"
import { fetchPlatos, createPlato, updatePlato, deletePlato } from "../services/PlatoPrincipal.service"
import type { PlatoPrincipal } from "../types/PlatoPrincipal"

export const usePlatoPrincipalStore = defineStore("platoPrincipal", {
  state: () => ({
    platos:  [] as PlatoPrincipal[],
    loading: false,
    error:   "" as string,
  }),

  getters: {
    total: (state) => state.platos.length,
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error   = ""
      try {
        this.platos = await fetchPlatos()
      } catch {
        this.error = "Error al cargar los platos principales"
      } finally {
        this.loading = false
      }
    },

    async create(data: Omit<PlatoPrincipal, "id">) {
      this.loading = true
      this.error   = ""
      try {
        const nuevo = await createPlato(data as PlatoPrincipal)
        this.platos.push(nuevo)
      } catch {
        this.error = "Error al crear el plato"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async update(id: number, data: Omit<PlatoPrincipal, "id">) {
      this.loading = true
      this.error   = ""
      try {
        const actualizado = await updatePlato(id, data as PlatoPrincipal)
        const idx = this.platos.findIndex((p) => p.id === id)
        if (idx !== -1) this.platos[idx] = actualizado
      } catch {
        this.error = "Error al actualizar el plato"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async remove(id: number) {
      this.loading = true
      this.error   = ""
      try {
        await deletePlato(id)
        this.platos = this.platos.filter((p) => p.id !== id)
      } catch {
        this.error = "Error al eliminar el plato"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
})
