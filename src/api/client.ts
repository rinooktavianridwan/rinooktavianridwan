import type { ApiResponse, FullPortfolio } from "./types";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.trim() ?? "";

export function getApiBaseUrl(): string {
  return API_BASE_URL.replace(/\/+$/, "");
}

export function isApiEnabled(): boolean {
  return API_BASE_URL.length > 0;
}

export async function fetchFullPortfolio(
  baseUrl = getApiBaseUrl(),
): Promise<FullPortfolio> {
  const url = `${baseUrl}/v1/profile/full`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  const payload = (await res.json()) as ApiResponse<FullPortfolio>;
  return payload.data;
}