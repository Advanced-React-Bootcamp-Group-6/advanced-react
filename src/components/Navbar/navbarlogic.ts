import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "@mantine/hooks";

export type NavbarValue = string | null;

interface NavbarLogicParams {
  defaultValue?: NavbarValue;
  value?: NavbarValue;
  onChange?: (value: NavbarValue) => void;
}

export interface NavbarContextValue {
  value: NavbarValue;
  setValue: (value: NavbarValue) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isMobile: boolean;
}

export const NavbarContext =
  createContext<NavbarContextValue | null>(null);

export function useNavbarContext() {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error(
      "Navbar components must be used inside <Navbar>"
    );
  }
  return ctx;
}

export function useNavbarLogic({
  defaultValue = null,
  value: valueProp,
  onChange,
}: NavbarLogicParams) {
  const [internalValue, setInternalValue] =
    useState<NavbarValue>(defaultValue);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const setValue = (next: NavbarValue) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () =>
    setIsMenuOpen((o) => !o);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return useMemo(
    () => ({
      value,
      setValue,
      isMenuOpen,
      toggleMenu,
      isMobile,
    }),
    [value, isMenuOpen, isMobile]
  );
}
