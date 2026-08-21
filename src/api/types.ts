export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
  version: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email?: string;
  name?: string;
  bio?: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechnologyResponse {
  id: number;
  name: string;
  description?: string;
  iconUrl?: string;
  color?: string;
  isVisible: boolean;
}

export interface ContactResponse {
  id: number;
  platformName: string;
  url: string;
  iconUrl: string;
  color?: string;
  order: number;
  isVisible: boolean;
}

export interface ProjectImageResponse {
  id: number;
  imageUrl: string;
  order: number;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  id: number;
  title: string;
  description: string;
  websiteUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  isVisible: boolean;
  userId?: number;
  createdAt: string;
  updatedAt: string;
  user?: UserResponse;
  images?: ProjectImageResponse[];
  technologies?: TechnologyResponse[];
}

export interface FullPortfolio {
  profile: UserResponse;
  contacts: ContactResponse[];
  projects: ProjectResponse[];
  technologies: TechnologyResponse[];
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface AuthResponse {
  user: UserResponse;
  access_token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
  name?: string;
  bio?: string;
}

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  email?: string;
  name?: string;
  bio?: string;
}

export interface CreateContactRequest {
  platformName: string;
  url: string;
  iconUrl: string;
  color?: string;
  order?: number;
  isVisible?: boolean;
}

export interface UpdateContactRequest {
  platformName?: string;
  url?: string;
  iconUrl?: string;
  color?: string;
  order?: number;
  isVisible?: boolean;
}

export interface CreateTechnologyRequest {
  name: string;
  description?: string;
  iconUrl?: string;
  color?: string;
  isVisible?: boolean;
}

export interface UpdateTechnologyRequest {
  name?: string;
  description?: string;
  iconUrl?: string;
  color?: string;
  isVisible?: boolean;
}

export interface ProjectImageRequest {
  id?: number;
  imageUrl?: string;
  order?: number;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  websiteUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  isVisible?: boolean;
  technologyIds?: number[];
  images?: { imageUrl: string; order?: number }[];
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  websiteUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  isVisible?: boolean;
  technologyIds?: number[];
  images?: ProjectImageRequest[];
  deleteImageIds?: number[];
}