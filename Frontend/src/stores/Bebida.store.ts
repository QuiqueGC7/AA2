import { defineStore } from "pinia"
import { fetchBebidas, createBebida, updateBebida, deleteBebida } from "../services/Bebida.service"
import type { Bebida } from "../types/Bebida"

export const useBebidaStore = defineStore("bebida", {
  state: () => ({
    bebidas: [] as Bebida[],
    loading: false,
    error:   "" as string,
  }),

  getters: {
    total:        (state) => state.bebidas.length,
    alcoholicas:  (state) => state.bebidas.filter((b) => b.esAlcoholica),
    noAlcoholicas:(state) => state.bebidas.filter((b) => !b.esAlcoholica),
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error   = ""
      try {
        this.bebidas = await fetchBebidas()
      } catch {
        this.error = "Error al cargar las bebidas"
      } finally {
        this.loading = false
      }
    },

    async create(data: Omit<Bebida, "id">) {
      this.loading = true
      this.error   = ""
      try {
        const nueva = await createBebida(data as Bebida)
        this.bebidas.push(nueva)
      } catch {
        this.error = "Error al crear la bebida"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async update(id: number, data: Omit<Bebida, "id">) {
      this.loading = true
      this.error   = ""
      try {
        const actualizada = await updateBebida(id, data as Bebida)
        const idx = this.bebidas.findIndex((b) => b.id === id)
        if (idx !== -1) this.bebidas[idx] = actualizada
      } catch {
        this.error = "Error al actualizar la bebida"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async remove(id: number) {
      this.loading = true
      this.error   = ""
      try {
        await deleteBebida(id)
        this.bebidas = this.bebidas.filter((b) => b.id !== id)
      } catch {
        this.error = "Error al eliminar la bebida"
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
})