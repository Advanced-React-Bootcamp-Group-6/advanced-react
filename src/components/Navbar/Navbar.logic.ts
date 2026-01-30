import { useState, useMemo, useCallback } from "react";
import { useMediaQuery } from "@mantine/hooks";
import type { NavbarValue } from "./Navbar.context";

interface Params {
  defaultValue?: NavbarValue;
  value?: NavbarValue;
  onChange?: (value: NavbarValue) => void;
}

export function useNavbarLogic({
  defaultValue = null,
  value: valueProp,
  onChange,
}: Params) {
  const [internalValue, setInternalValue] = useState<NavbarValue>(defaultValue);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const setValue = useCallback(
    (next: NavbarValue) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
      if (isMenuOpen) setIsMenuOpen(false);
    },
    [isControlled, onChange, isMenuOpen],
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return useMemo(
    () => ({
      value,
      setValue,
      isMenuOpen,
      toggleMenu,
      isMobile,
    }),
    [value, setValue, isMenuOpen, toggleMenu, isMobile],
  );
}
