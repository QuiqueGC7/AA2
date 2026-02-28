import { API_URL, httpGet, httpPost, httpPut, httpDelete } from "./http"
import type { Postre } from "../types/Postre"

const BASE = `${API_URL}/Postre`

export const fetchPostres   = () => httpGet<Postre[]>(BASE)
export const createPostre   = (data: Postre) => httpPost<Postre>(BASE, data)
export const updatePostre   = (id: number, data: Postre) => httpPut<Postre>(`${BASE}/${id}`, data)
export const deletePostre   = (id: number) => httpDelete(`${BASE}/${id}`)