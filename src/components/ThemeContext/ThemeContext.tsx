import { createContext, ReactNode, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Button from "../Button/Button";

type ThemeContextProp = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextProp | undefined>(undefined);

type ThemeContextProviderProp = {
  children: ReactNode;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const ThemeContextComp = () => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContextProvider
      theme={theme}
      setTheme={setTheme}
    >
      <ExampleConsumer />
    </ThemeContextProvider>
  );
};

const ThemeContextProvider = ({ children, theme, setTheme }: ThemeContextProviderProp) => {
  return (
    <ThemeContext
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
};

const ExampleConsumer = () => {
  const themeContext = useContext(ThemeContext);
  if (themeContext === undefined) {
    throw new Error("ExampeConsumer must be used within a ThemeContextProvider");
  }
  const { theme, setTheme } = themeContext;
  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div>
      Current theme: {theme}<br/>
      <Button
        label="Toggle Theme"
        onClick={handleThemeChange}
      />
    </div>
  );
};

export default ThemeContextComp;
