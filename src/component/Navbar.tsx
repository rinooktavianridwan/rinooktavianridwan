import { useRef } from "react";
import useNavbar from "../hooks/useNavbar";

function Navbar() {
  const { isOpen, toggleNavbar, activeIndex, scrollToSection, isScrolled } =
    useNavbar();
  const menuItems = [
    { name: "My Bio", to: "#bio" },
    { name: "Tech Stack", to: "#techstack" },
    { name: "Projects", to: "#projects" },
    { name: "Contact", to: "#contact" },
  ];

  const navRefs = useRef<HTMLLIElement[]>([]);

  return (
    <nav
      role="navigation"
      aria-label="Navigasi utama"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isOpen
        ? "bg-white/95 backdrop-blur-md text-black shadow-lg"
        : isScrolled
        ? "bg-white/15 backdrop-blur-md text-black shadow-sm"
        : "bg-white/80 backdrop-blur-sm text-black shadow-none"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4 h-16">
        {/* Desktop Navbar */}
        <ul className="hidden md:flex gap-8 text-lg font-medium mx-auto relative">
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#143AA2] to-[#3E8DE3] rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: navRefs.current[activeIndex]?.offsetWidth || 0,
              transform: `translateX(${navRefs.current[activeIndex]?.offsetLeft || 0}px)`,
            }}
          ></div>

          {menuItems.map((item, index) => (
            <li
              key={item.name}
              ref={(el) => {
                navRefs.current[index] = el!;
              }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => scrollToSection(index, item.to)}
                aria-current={activeIndex === index ? "page" : undefined}
                className={`block pb-2 font-semibold transition-colors duration-200 relative ${
                  activeIndex === index
                    ? "text-[#143AA2]"
                    : "text-gray-700"
                } hover:text-[#143AA2] hover:scale-105`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Burger Menu */}
        <button
          type="button"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          className="flex flex-col items-center cursor-pointer gap-1.5 md:hidden z-10 p-2"
          onClick={toggleNavbar}
        >
          <div
            className={`h-1 w-8 bg-current rounded-full transform transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
          ></div>
          <div
            className={`h-1 w-8 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "w-6"}`}
          ></div>
          <div
            className={`h-1 w-8 bg-current rounded-full transform transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          ></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <ul
        className={`absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md transition-all duration-500 ease-in-out transform shadow-2xl border-t border-gray-100 ${isOpen
          ? "translate-y-0 opacity-100 pointer-events-auto visible"
          : "-translate-y-16 opacity-0 pointer-events-none invisible"
        } md:hidden`}
      >
        {menuItems.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => scrollToSection(index, item.to)}
              aria-current={activeIndex === index ? "page" : undefined}
              className={`block w-full text-left px-6 py-3.5 text-lg font-semibold transition-colors duration-200 hover:bg-gray-50 ${
                activeIndex === index ? "text-[#143AA2] bg-[#143AA2]/5" : "text-gray-800"
              }`}
            >
              {item.name}
            </button>
            {index < menuItems.length - 1 && <hr className="border-gray-100 mx-4" />}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;