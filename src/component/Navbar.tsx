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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen
        ? "bg-white/90 backdrop-blur-md text-black shadow-lg"
        : "bg-white text-black shadow-sm"
        }`}
    >
      <div className="flex justify-between items-center px-6 py-4 h-16">
        {/* Desktop Navbar */}
        <ul className="hidden md:flex gap-10 text-lg font-medium mx-auto relative">
          <div
            className="absolute bottom-0 h-[3px] bg-[#143AA2] rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: navRefs.current[activeIndex]?.offsetWidth || 0,
              transform: `translateX(${navRefs.current[activeIndex]?.offsetLeft || 0
                }px)`,
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
                className={`block pb-1 font-bold transition-colors duration-200 ${activeIndex === index ? "text-[#143AA2]" : "text-black/80"
                  } hover:text-[#143AA2]`}
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
          className="flex flex-col items-center cursor-pointer gap-1 md:hidden z-10 p-2"
          onClick={toggleNavbar}
        >
          <div
            className={`h-1 w-8 bg-current rounded-full transform transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
              }`}
          ></div>
          <div
            className={`h-1 w-8 bg-current rounded-full transition-opacity duration-300 ${isOpen ? "opacity-0" : ""
              }`}
          ></div>
          <div
            className={`h-1 w-8 bg-current rounded-full transform transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          ></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <ul
        className={`absolute top-16 left-0 w-full bg-white transition-all duration-500 ease-in-out transform shadow-lg ${isOpen
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
              className={`block w-full text-left px-6 py-3 text-lg font-bold transition-colors duration-200 hover:bg-gray-100 ${activeIndex === index ? "text-[#143AA2]" : "text-black"
                }`}
            >
              {item.name}
            </button>
            <hr className="border-gray-200" />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;