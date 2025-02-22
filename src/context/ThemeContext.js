import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#007AFF',
    secondary: '#5856D6',
    border: '#E5E5EA',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    border: '#38383A',
  },
};

export const ThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{theme, isDark, setIsDark}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
