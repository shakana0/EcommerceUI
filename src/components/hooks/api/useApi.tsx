import { useAuth } from "@clerk/clerk-react";
import { useApiBase } from "./useApiBase";
import type { PagedResult, ProductData } from "../../../types/types";

export function useApi() {
  const { getToken } = useAuth();
  const apiBase = useApiBase();

  async function request(path: string, options: RequestInit = {}) {
    const token = await getToken({ template: "ecom-jwt-template" });
    const response = await fetch(`${apiBase}/${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("API request failed");
    return response.json();
  }

  async function getProducts(page: number, pageSize: number) {
    return request(`Products?page=${page}&pageSize=${pageSize}`);
  }

  async function getAllProducts(): Promise<PagedResult<ProductData>> {
    const items: ProductData[] = await request("Products");

    return {
      items,
      totalCount: items.length,
      page: 1,
      pageSize: items.length,
      totalPages: 1,
    };
  }

  async function getById(path: string) {
    return request(path);
  }

  async function post(path: string, body: any) {
    return request(path, { method: "POST", body: JSON.stringify(body) });
  }

  async function put(path: string, body: any) {
    return request(path, { method: "PUT", body: JSON.stringify(body) });
  }

  async function del(path: string) {
    return request(path, { method: "DELETE" });
  }

  return { getProducts, getAllProducts, getById, post, put, del };
}
