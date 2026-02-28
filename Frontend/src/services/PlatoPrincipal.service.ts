import { API_URL, httpGet, httpPost, httpPut, httpDelete } from "./http"
import type { PlatoPrincipal } from "../types/PlatoPrincipal"

const BASE = `${API_URL}/PlatoPrincipal`

export const fetchPlatos    = () => httpGet<PlatoPrincipal[]>(BASE)
export const createPlato    = (data: PlatoPrincipal) => httpPost<PlatoPrincipal>(BASE, data)
export const updatePlato    = (id: number, data: PlatoPrincipal) => httpPut<PlatoPrincipal>(`${BASE}/${id}`, data)
export const deletePlato    = (id: number) => httpDelete(`${BASE}/${id}`)