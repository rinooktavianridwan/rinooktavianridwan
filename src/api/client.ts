import type { ApiResponse, FullPortfolio } from "./types";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.trim() ?? "";

export function getApiBaseUrl(): string {
  return API_BASE_URL.replace(/\/+$/, "");
}

export function resolveAssetUrl(url?: string): string {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("/")) {
    const base = getApiBaseUrl();
    return base ? `${base}${url}` : url;
  }
  return url;
}

export function isApiEnabled(): boolean {
  return API_BASE_URL.length > 0;
}

function normalizeFullPortfolio(data: FullPortfolio): FullPortfolio {
  const profilePictureUrl = resolveAssetUrl(data.profile?.profilePictureUrl);
  return {
    ...data,
    profile: {
      ...data.profile,
      profilePictureUrl: profilePictureUrl || undefined,
    },
    contacts: (data.contacts ?? []).map((contact) => ({
      ...contact,
      iconUrl: resolveAssetUrl(contact.iconUrl) || contact.iconUrl,
    })),
    projects: (data.projects ?? []).map((project) => ({
      ...project,
      images: (project.images ?? []).map((image) => ({
        ...image,
        imageUrl: resolveAssetUrl(image.imageUrl) || image.imageUrl,
      })),
    })),
    technologies: (data.technologies ?? []).map((technology) => ({
      ...technology,
      iconUrl: resolveAssetUrl(technology.iconUrl) || technology.iconUrl,
    })),
  };
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
  return normalizeFullPortfolio(payload.data);
}