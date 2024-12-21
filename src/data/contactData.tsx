import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import instagram from "../assets/instagram.svg";

interface ContactData {
  id: number;
  color: string;
  destination: string;
  source: string;
}

export const contactData: ContactData[] = [
  {
    id: 1,
    color: "#333",
    destination: "https://github.com/rinooktavianridwan",
    source: github,
  },
  {
    id: 2,
    color: "#0077b5",
    destination: "https://www.linkedin.com/in/rino-oktavian-ridwan",
    source: linkedin,
  },
  {
    id: 3,
    color: "#c13584",
    destination: "",
    source: instagram,
  },
];