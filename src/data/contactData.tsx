import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";

// Contact data aligned with backend schema
// Backend: { platformName, url, iconUrl, color, order, isVisible }

interface ContactData {
  id: number;
  platformName: string;
  url: string;
  iconUrl: string;
  color: string;
  order: number;
  isVisible: boolean;
}

export const contactData: ContactData[] = [
  {
    id: 1,
    platformName: "GitHub",
    color: "#333",
    url: "https://github.com/rinooktavianridwan",
    iconUrl: github,
    order: 1,
    isVisible: true,
  },
  {
    id: 2,
    platformName: "LinkedIn",
    color: "#0077b5",
    url: "https://www.linkedin.com/in/rino-oktavian-ridwan",
    iconUrl: linkedin,
    order: 2,
    isVisible: true,
  },
  {
    id: 3,
    platformName: "Instagram",
    color: "#c13584",
    url: "https://www.instagram.com/rinooktavianridwan",
    iconUrl: instagram,
    order: 3,
    isVisible: true,
  },
  {
    id: 4,
    platformName: "Email",
    color: "#EA4335",
    url: "mailto:rinooktavianridwan@gmail.com",
    iconUrl: "📧", // Using emoji for email icon
    order: 4,
    isVisible: true,
  },
  {
    id: 5,
    platformName: "WhatsApp",
    color: "#25D366",
    url: "https://wa.me/6281234567890", // Replace with actual number
    iconUrl: "💬", // Using emoji for WhatsApp icon
    order: 5,
    isVisible: true,
  },
];