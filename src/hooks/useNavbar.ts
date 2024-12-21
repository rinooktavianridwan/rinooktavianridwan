import { useState, useEffect } from "react";

interface UseNavbarReturn {
  isOpen: boolean;
  toggleNavbar: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  scrollToSection: (index: number, href: string) => void;
  isScrolled: boolean;
}

function useNavbar(): UseNavbarReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const scrollToSection = (index: number, href: string) => {
    setActiveIndex(index);
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set isScrolled jika posisi scroll > 0

      const sections = ["#bio", "#projects", "#contact"];
      sections.forEach((section, index) => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isOpen, toggleNavbar, activeIndex, setActiveIndex, scrollToSection, isScrolled };
}


export default useNavbar;
