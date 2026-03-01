import { API_URL, httpGet, httpPost, httpPut, httpDelete } from "./http"
import type { Bebida } from "../types/Bebida"

const BASE = `${API_URL}/Bebida`

export const fetchBebidas   = () => httpGet<Bebida[]>(BASE)
export const createBebida   = (data: Bebida) => httpPost<Bebida>(BASE, data)
export const updateBebida   = (id: number, data: Bebida) => httpPut<Bebida>(`${BASE}/${id}`, data)
export const deleteBebida   = (id: number) => httpDelete(`${BASE}/${id}`)