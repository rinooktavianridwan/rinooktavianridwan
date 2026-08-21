import { apiRequest } from "./adminClient";
import type {
  AuthResponse,
  ContactResponse,
  CreateContactRequest,
  CreateProjectRequest,
  CreateTechnologyRequest,
  LoginRequest,
  PaginatedResponse,
  ProjectResponse,
  TechnologyResponse,
  UpdateContactRequest,
  UpdateProjectRequest,
  UpdateTechnologyRequest,
  UpdateUserRequest,
  UserResponse,
} from "./types";

// AUTH
export function loginRequest(body: LoginRequest): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/login", { method: "POST", body });
}

export function fetchMyProfile(token?: string): Promise<UserResponse> {
  return apiRequest<UserResponse>("/auth/profile", { token });
}

// PROFILE / USERS
export function fetchUser(id: number): Promise<UserResponse> {
  return apiRequest<UserResponse>(`/users/${id}`);
}

export function updateUser(
  id: number,
  body: UpdateUserRequest,
): Promise<void> {
  return apiRequest<void>(`/users/${id}`, { method: "PUT", body });
}

export function uploadProfilePicture(id: number, file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  return apiRequest<void>(`/users/${id}/profile-picture`, {
    method: "PUT",
    formData,
  });
}

// CONTACTS
export function fetchContacts(query?: {
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<ContactResponse>> {
  return apiRequest<PaginatedResponse<ContactResponse>>("/contacts", { query });
}

export function fetchContact(id: number): Promise<ContactResponse> {
  return apiRequest<ContactResponse>(`/contacts/${id}`);
}

export function createContact(
  body: CreateContactRequest,
): Promise<void> {
  return apiRequest<void>("/contacts", { method: "POST", body });
}

export function updateContact(
  id: number,
  body: UpdateContactRequest,
): Promise<void> {
  return apiRequest<void>(`/contacts/${id}`, { method: "PUT", body });
}

export function deleteContact(id: number): Promise<void> {
  return apiRequest<void>(`/contacts/${id}`, { method: "DELETE" });
}

// TECHNOLOGIES
export function fetchTechnologies(query?: {
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<TechnologyResponse>> {
  return apiRequest<PaginatedResponse<TechnologyResponse>>("/technologies", {
    query,
  });
}

export function fetchTechnology(id: number): Promise<TechnologyResponse> {
  return apiRequest<TechnologyResponse>(`/technologies/${id}`);
}

export function createTechnology(
  body: CreateTechnologyRequest,
  icon?: File,
): Promise<void> {
  return apiRequest<void>("/technologies", {
    method: "POST",
    formData: buildTechnologyForm(body, icon),
  });
}

export function updateTechnology(
  id: number,
  body: UpdateTechnologyRequest,
  icon?: File,
): Promise<void> {
  return apiRequest<void>(`/technologies/${id}`, {
    method: "PUT",
    formData: buildTechnologyForm(body, icon),
  });
}

export function deleteTechnology(id: number): Promise<void> {
  return apiRequest<void>(`/technologies/${id}`, { method: "DELETE" });
}

// PROJECTS
export function fetchProjects(query?: {
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<ProjectResponse>> {
  return apiRequest<PaginatedResponse<ProjectResponse>>("/projects", { query });
}

export function fetchProject(id: number): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(`/projects/${id}`);
}

export function createProject(
  body: CreateProjectRequest,
  files?: File[],
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>("/projects", {
    method: "POST",
    formData: buildProjectForm(body, files),
  });
}

export function updateProject(
  id: number,
  body: UpdateProjectRequest,
  files?: File[],
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(`/projects/${id}`, {
    method: "PUT",
    formData: buildProjectForm(body, files),
  });
}

export function deleteProject(id: number): Promise<void> {
  return apiRequest<void>(`/projects/${id}`, { method: "DELETE" });
}

function buildTechnologyForm(
  body: CreateTechnologyRequest | UpdateTechnologyRequest,
  icon?: File,
): FormData {
  const formData = new FormData();
  if (body.name) formData.append("name", body.name);
  if (body.description) formData.append("description", body.description);
  if (body.color) formData.append("color", body.color);
  if (body.iconUrl) formData.append("iconUrl", body.iconUrl);
  if (body.isVisible !== undefined) {
    formData.append("isVisible", String(body.isVisible));
  }
  if (icon) formData.append("icon", icon);
  return formData;
}

function buildProjectForm(
  body: CreateProjectRequest | UpdateProjectRequest,
  files?: File[],
): FormData {
  const formData = new FormData();
  if (body.title) formData.append("title", body.title);
  if (body.description) formData.append("description", body.description);
  if (body.websiteUrl) formData.append("websiteUrl", body.websiteUrl);
  if (body.githubUrl) formData.append("githubUrl", body.githubUrl);
  if (body.documentationUrl) {
    formData.append("documentationUrl", body.documentationUrl);
  }
  if (body.isVisible !== undefined) {
    formData.append("isVisible", String(body.isVisible));
  }
  if (body.technologyIds && body.technologyIds.length > 0) {
    formData.append("technologyIds", JSON.stringify(body.technologyIds));
  }
  if (body.images && body.images.length > 0) {
    formData.append("images", JSON.stringify(body.images));
  }
  if ("deleteImageIds" in body && body.deleteImageIds?.length) {
    formData.append("deleteImageIds", JSON.stringify(body.deleteImageIds));
  }
  files?.forEach((file) => formData.append("images", file));
  return formData;
}