import React, { createContext, useContext, useState, type ReactNode, useMemo } from "react";
import {
  Box,
  Container,
  Group,
  Text,
  Stack,
  Button,
  ActionIcon,
  Avatar,
  Divider,
  Collapse,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBell,
  IconMessageCircle,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

type NavbarValue = string | null;

interface NavbarContextValue {
  value: NavbarValue;
  setValue: (value: NavbarValue) => void;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isMobile: boolean;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

function useNavbarContext() {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error("Navbar compound components must be used inside <Navbar>");
  }
  return ctx;
}

interface NavbarProps {
  children: ReactNode;
  defaultValue?: NavbarValue;
  value?: NavbarValue;
  onChange?: (value: NavbarValue) => void;
}

export function Navbar({
  children,
  defaultValue = null,
  value: valueProp,
  onChange,
}: NavbarProps) {
  const [internalValue, setInternalValue] = useState<NavbarValue>(defaultValue);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const setValue = (next: NavbarValue) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  const toggleMenu = () => setIsMenuOpen((o) => !o);

  const ctxValue = useMemo(
    () => ({ value, setValue, isMenuOpen, toggleMenu, isMobile }),
    [value, isMenuOpen, isMobile]
  );

  const brand: ReactNode[] = [];
  const items: ReactNode[] = [];
  const actions: ReactNode[] = [];

  React.Children.forEach(children, (child: any) => {
    if (!child) return;
    if (child.type === NavbarBrand) brand.push(child);
    else if (child.type === NavbarItems) items.push(child);
    else if (child.type === NavbarActions) actions.push(child);
  });

  return (
    <NavbarContext.Provider value={ctxValue}>
      <Box
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
        }}
      >
        <Box h={75}>
          <Container fluid h="100%" style={{ paddingLeft: "4%", paddingRight: "5%" }}>
            <Group h="100%" justify="space-between" align="center" wrap="nowrap">
              {brand}
              {!isMobile && items}
              {!isMobile && actions}
            </Group>
          </Container>
        </Box>

        {isMobile && (
          <Collapse in={isMenuOpen}>
            <Divider />
            <Box px="md" pb="md">
              {items}
              {actions}
            </Box>
          </Collapse>
        )}
      </Box>
    </NavbarContext.Provider>
  );
}

interface NavbarBrandProps {
  title: string;
  subtitle?: string;
}

function NavbarBrand({ title, subtitle }: NavbarBrandProps) {
  const { isMobile, toggleMenu, isMenuOpen } = useNavbarContext();

  return (
    <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
      <Stack gap={0} align="flex-start">
        <Text fw={700} c="blue" fz="xl">
          {title}
        </Text>
        {!isMobile && subtitle && (
          <Text fz="sm" c="dimmed">
            {subtitle}
          </Text>
        )}
      </Stack>

      {isMobile && (
        <ActionIcon
          variant="subtle"
          aria-label="Toggle menu"
          onClick={toggleMenu}
          style={{ marginLeft: "auto" }}
        >
          {isMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </ActionIcon>
      )}
    </Group>
  );
}

interface NavbarItemsProps {
  children: ReactNode;
}

function NavbarItems({ children }: NavbarItemsProps) {
  const { isMobile } = useNavbarContext();

  if (!isMobile) {
    return (
      <Group
        gap="lg"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {children}
      </Group>
    );
  }

  return <Stack gap="xs" mt="sm">{children}</Stack>;
}

interface NavbarItemProps {
  value: string;
  children: ReactNode;
}

function NavbarItem({ value, children }: NavbarItemProps) {
  const { value: active, setValue, isMobile } = useNavbarContext();
  const isActive = active === value;

  return (
    <Box
      component="button"
      onClick={() => setValue(value)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: isMobile ? "left" : "center",
      }}
    >
      <Text
        fz="sm"
        fw={isActive ? 600 : 400}
        c={isActive ? "blue" : "dark"}
        style={{
          borderBottom: !isMobile
            ? isActive
              ? "2px solid #228be6"
              : "2px solid transparent"
            : "none",
          paddingBottom: !isMobile ? 4 : 0,
        }}
      >
        {children}
      </Text>
    </Box>
  );
}

interface NavbarActionsProps {
  children?: ReactNode;
}

function NavbarActions({ children }: NavbarActionsProps) {
  const { isMobile } = useNavbarContext();

  if (!isMobile) {
    return (
      <Group gap="sm">
        {children}
        <ActionIcon variant="subtle" aria-label="Notifications">
          <IconBell size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" aria-label="Messages">
          <IconMessageCircle size={18} />
        </ActionIcon>
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          size="sm"
        >
          + Add Product
        </Button>
        <Avatar radius="xl" size={32} src="https://i.pravatar.cc/100" />
      </Group>
    );
  }

  return (
    <Stack gap="sm" mt="md">
      {children}
      <Group gap="sm">
        <ActionIcon variant="subtle" aria-label="Notifications">
          <IconBell size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" aria-label="Messages">
          <IconMessageCircle size={18} />
        </ActionIcon>
      </Group>
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        size="sm"
        fullWidth
      >
        + Add Product
      </Button>
      <Group gap="sm">
        <Avatar radius="xl" size={32} src="https://i.pravatar.cc/100" />
        <Text fz="sm" c="dimmed">
          John Doe
        </Text>
      </Group>
    </Stack>
  );
}

Navbar.Brand = NavbarBrand;
Navbar.Items = NavbarItems;
Navbar.Item = NavbarItem;
Navbar.Actions = NavbarActions;

export default Navbar;
