import { defineStore } from "pinia"
import { fetchPostres, createPostre, updatePostre, deletePostre } from "../services/Postre.service"
import type { Postre } from "../types/Postre"

export const usePostreStore = defineStore("postre", {
  state: () => ({
    postres: [] as Postre[],
    loading: false,
    error:   "" as string,
  }),

  getters: {
    total:           (state) => state.postres.length,
    mediaCalorías:   (state) =>
      state.postres.length
        ? Math.round(state.postres.reduce((acc, p) => acc + p.calorias, 0) / state.postres.length)
        : 0,
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error   = ""
      try {
        this.postres = await fetchPostres()
      } catch {
        this.error = "Error al cargar los postres"
      } finally {
        this.loading = false
      }
    },

    async create(data: Omit<Postre, "id">) {
      this.loading = true
      this.error   = ""
      try {
        const nuevo = await createPostre(data as Postre)
        this.postres.push(nuevo)
      } catch {
        this.error = "Error al crear el postre"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async update(id: number, data: Omit<Postre, "id">) {
      this.loading = true
      this.error   = ""
      try {
        const actualizado = await updatePostre(id, data as Postre)
        const idx = this.postres.findIndex((p) => p.id === id)
        if (idx !== -1) this.postres[idx] = actualizado
      } catch {
        this.error = "Error al actualizar el postre"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async remove(id: number) {
      this.loading = true
      this.error   = ""
      try {
        await deletePostre(id)
        this.postres = this.postres.filter((p) => p.id !== id)
      } catch {
        this.error = "Error al eliminar el postre"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
})