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