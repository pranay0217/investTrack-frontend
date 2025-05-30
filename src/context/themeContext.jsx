import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const defaultThemes = {
  light: {
    background: '#ffffff',
    text: '#000000'
  },
  dark: {
    background: '#121212',
    text: '#ffffff'
  },
  ocean: {
    background: '#0f3057',
    text: '#f8f8f8'
  },
  sunset: {
    background: '#ff6f61',
    text: '#ffffff'
  }
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');
  const [theme, setTheme] = useState(defaultThemes.light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && defaultThemes[savedTheme]) {
      setThemeName(savedTheme);
      setTheme(defaultThemes[savedTheme]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', themeName);
    setTheme(defaultThemes[themeName]);
    document.body.style.backgroundColor = defaultThemes[themeName].background;
    document.body.style.color = defaultThemes[themeName].text;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
