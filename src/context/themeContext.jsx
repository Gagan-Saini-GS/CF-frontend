import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check the initial theme preference from localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("cf-theme") || "light";
  });

  useEffect(() => {
    // Save the theme preference to localStorage
    localStorage.setItem("cf-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
