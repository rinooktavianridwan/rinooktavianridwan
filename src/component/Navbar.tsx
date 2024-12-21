import { useRef } from "react";
import useNavbar from "../hooks/useNavbar";

function Navbar() {
  const { isOpen, toggleNavbar, activeIndex, scrollToSection, isScrolled } =
    useNavbar();
  const menuItems = [
    { name: "My Bio", to: "#bio" },
    { name: "Projects", to: "#projects" },
    { name: "Contact", to: "#contact" },
  ];

  const navRefs = useRef<HTMLLIElement[]>([]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors  ${
        isScrolled
          ? "bg-transparent text-black shadow-lg"
          : "bg-white text-black"
      } ${isOpen ? "bg-white" : ""}`}
    >
      <div className="flex justify-between items-center px-6 py-4 h-16">
        {/* Desktop Navbar */}
        <ul className="hidden md:flex gap-10 text-lg font-medium mx-auto relative">
          {/* Animated Bar */}
          <div
            className="absolute bottom-0 h-[2px] bg-blue-400 transition-all duration-1000 ease-in-out"
            style={{
              width: navRefs.current[activeIndex]?.offsetWidth || 0,
              transform: `translateX(${
                navRefs.current[activeIndex]?.offsetLeft || 0
              }px)`,
            }}
          ></div>

          {menuItems.map((item, index) => (
            <li
              key={index}
              ref={(el) => (navRefs.current[index] = el!)}
              className="relative"
            >
              <button
                type="button"
                onClick={() => scrollToSection(index, item.to)}
                className={`block pb-1 font-bold ${
                  activeIndex === index ? "text-blue-400" : ""
                } hover:text-blue-400`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Burger Menu */}
        <div
          className="flex flex-col items-center cursor-pointer gap-1 md:hidden z-10"
          onClick={toggleNavbar}
        >
          <div
            className={`h-1 w-8 bg-current transform transition-transform ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`h-1 w-8 bg-current transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`h-1 w-8 bg-current transform transition-transform ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <ul
        className={`absolute top-16 left-0 w-full bg-white transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto visible"
            : "-translate-y-16 opacity-0 pointer-events-none invisible"
        } md:hidden`}
      >
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => scrollToSection(index, item.to)}
              className={`block w-full text-left px-6 py-3 text-lg hover:bg-gray-100 ${
                activeIndex === index ? "text-blue-400" : ""
              }`}
            >
              {item.name}
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
