import React, { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      className="text-2xl text-secondary cursor-pointer transition-all duration-300 hover:text-base-content"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <MdOutlineWbSunny /> : <IoMoon />}
    </button>
  );
};

export default ThemeToggle;