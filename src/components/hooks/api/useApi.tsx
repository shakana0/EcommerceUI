import { useAuth } from "@clerk/clerk-react";
import { useApiBase } from "./useApiBase";

export function useApi() {
  const { getToken } = useAuth();
  const apiBase = useApiBase();

  async function request(path: string, options: RequestInit = {}) {
    const token = await getToken({ template: "ecom-jwt-template" });

    return fetch(`${apiBase}/${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async function get() {
    const response = await fetch(`${apiBase}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  }

  async function getById(path: string) {
    console.log(path);
    const res = await request(path, { method: "GET" });
    console.log(res);
    if (!res.ok) throw new Error(`GET failed: ${res.status}`);
    return res.json();
  }

  async function post(path: string, token: string, body: any) {
    const res = await request(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`POST failed: ${res.status}`);
    return res.json();
  }

  async function put(path: string, body: any) {
    const res = await request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
    return res.json();
  }

  async function del(path: string) {
    const res = await request(path, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
    return res.json();
  }

  return { get, getById, post, put, del };
}
