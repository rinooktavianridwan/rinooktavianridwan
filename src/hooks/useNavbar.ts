import { useState, useEffect } from "react";

interface UseNavbarReturn {
  isOpen: boolean;
  toggleNavbar: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  scrollToSection: (index: number, href: string) => void;
  isScrolled: boolean;
}

const SECTIONS = ["#bio", "#techstack", "#projects", "#contact"];

function useNavbar(): UseNavbarReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const scrollToSection = (index: number, href: string) => {
    setActiveIndex(index);
    setIsOpen(false);
    const section = document.querySelector(href);
    if (section) {
      const navbarHeight = 64;
      const top =
        section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const scrollMarker = window.scrollY + window.innerHeight / 3;

      let current = 0;
      SECTIONS.forEach((sectionId, index) => {
        const element = document.querySelector(sectionId);
        if (element) {
          const elementTop =
            element.getBoundingClientRect().top + window.scrollY;
          if (scrollMarker >= elementTop) {
            current = index;
          }
        }
      });

      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      if (pageBottom >= documentBottom - 2) {
        current = SECTIONS.length - 1;
      }

      setActiveIndex(current);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isOpen,
    toggleNavbar,
    activeIndex,
    setActiveIndex,
    scrollToSection,
    isScrolled,
  };
}

export default useNavbar;
