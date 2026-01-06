import {  createContext, type ReactNode } from "react";

type Theme = 'light' | 'dark';

type ThemeContextType ={
    theme:Theme;
    toggleTheme:()=>void;
    setTheme:(theme:Theme)=>void;

}

const ThemeContext=createContext<ThemeContextType|undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, setTheme: () => {} }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;