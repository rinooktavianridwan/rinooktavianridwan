import { getApiBaseUrl } from "./client";

const TOKEN_KEY = "admin_token";
const USER_KEY = "admin_user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser<T>(): T | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveSession(token: string, user: unknown): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateStoredUser(user: unknown): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  formData?: FormData;
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined>;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const base = getApiBaseUrl();
  let url = `${base}/v1${path}`;

  if (options.query) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    }
    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;
  }

  const headers: Record<string, string> = {};
  const token = options.token !== undefined ? options.token : getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let body: BodyInit | undefined;
  if (options.formData) {
    body = options.formData;
  } else if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body,
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const payload: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) {
      clearSession();
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    throw new ApiError(extractErrorMessage(payload), res.status);
  }

  return (payload as { data?: T })?.data as T;
}

function extractErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "Request failed";
  const message = (payload as { message?: unknown }).message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message.join(", ");
  return "Request failed";
}