import type { ProjectResponse } from "../api/types";

import project1_1 from "../assets/Project/Project_1/1.jpg";
import project1_2 from "../assets/Project/Project_1/2.jpg";
import project1_3 from "../assets/Project/Project_1/3.jpg";
import project1_4 from "../assets/Project/Project_1/4.jpg";

import project2_1 from "../assets/Project/Project_2/1.jpg";
import project2_2 from "../assets/Project/Project_2/2.jpg";
import project2_3 from "../assets/Project/Project_2/3.jpg";
import project2_4 from "../assets/Project/Project_2/4.jpg";

import project3_1 from "../assets/Project/Project_3/1.png";
import project3_2 from "../assets/Project/Project_3/2.png";
import project3_3 from "../assets/Project/Project_3/3.png";
import project3_4 from "../assets/Project/Project_3/4.png";

const toImages = (
  prefix: number,
  urls: string[],
): ProjectResponse["images"] =>
  urls.map((url, index) => ({
    id: prefix * 10 + index + 1,
    imageUrl: url,
    order: index + 1,
    projectId: prefix,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  }));

export const projects: ProjectResponse[] = [
  {
    id: 1,
    title: "Website Budaya Indonesia",
    images: toImages(1, [project1_1, project1_2, project1_3, project1_4]),
    description: "React + CSS",
    websiteUrl: "https://jejak-budaya-nusantara.web.app",
    githubUrl: "https://github.com/zakkimuzakki25/jejak-budaya-nusantara",
    documentationUrl: "",
    isVisible: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    technologies: [
      { id: 1, name: "React", iconUrl: "⚛️", color: "#61DAFB", isVisible: true },
      { id: 3, name: "JavaScript", iconUrl: "💛", color: "#F7DF1E", isVisible: true },
      { id: 6, name: "HTML5", iconUrl: "🌐", color: "#E34F26", isVisible: true },
      { id: 7, name: "CSS3", iconUrl: "🎭", color: "#1572B6", isVisible: true },
    ],
  },
  {
    id: 2,
    title: "My Pokemon List",
    images: toImages(2, [project2_1, project2_2, project2_3, project2_4]),
    description: "React + CSS",
    websiteUrl: "https://mypokemonlist-0.web.app/",
    githubUrl:
      "https://github.com/rinooktavianridwan/MyPokemon?tab=readme-ov-file",
    documentationUrl: "",
    isVisible: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    technologies: [
      { id: 1, name: "React", iconUrl: "⚛️", color: "#61DAFB", isVisible: true },
      { id: 3, name: "JavaScript", iconUrl: "💛", color: "#F7DF1E", isVisible: true },
      { id: 7, name: "CSS3", iconUrl: "🎭", color: "#1572B6", isVisible: true },
      { id: 14, name: "REST API", iconUrl: "🔌", color: "#009688", isVisible: true },
    ],
  },
  {
    id: 3,
    title: "Website Rental Mobil",
    images: toImages(3, [project3_1, project3_2, project3_3, project3_4]),
    description: "Laravel + CSS",
    websiteUrl: "",
    githubUrl: "https://github.com/rinooktavianridwan/projectAkhirPEMWEB",
    documentationUrl: "https://www.youtube.com/embed/OzM9Ym3fiNc",
    isVisible: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    technologies: [
      { id: 13, name: "Laravel", iconUrl: "🔴", color: "#FF2D20", isVisible: true },
      { id: 12, name: "PHP", iconUrl: "🐘", color: "#777BB4", isVisible: true },
      { id: 17, name: "MySQL", iconUrl: "🐬", color: "#4479A1", isVisible: true },
    ],
  },
];