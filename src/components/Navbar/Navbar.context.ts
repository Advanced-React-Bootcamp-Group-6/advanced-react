import { createContext, useContext } from "react";

export type NavbarValue = string | null;

export interface NavbarContextValue {
  value: NavbarValue;
  setValue: (value: NavbarValue) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isMobile: boolean;
}

export const NavbarContext = createContext<NavbarContextValue | null>(null);

export function useNavbarContext() {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error("Navbar compound components must be used inside <Navbar>");
  }
  return ctx;
}
