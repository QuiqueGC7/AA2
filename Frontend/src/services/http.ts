// src/services/http.ts

export const API_URL = "https://localhost:7278/api"

function getHeaders(): Record<string, string> {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function httpGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: getHeaders() })
  return res.json()
}

export async function httpPost<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function httpPut<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function httpDelete(url: string): Promise<void> {
  await fetch(url, { method: "DELETE", headers: getHeaders() })
}