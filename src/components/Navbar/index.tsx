import{createContext,useContext,useState,useMemo, type ReactNode} from "react";
import {
    Box,
    Container,
    Group,
    Text,
    Stack,
    Button,
    ActionIcon,
    Avatar,
  } from "@mantine/core";
  import { IconBell, IconMessageCircle } from "@tabler/icons-react";
  
  
  type NavbarValue = string | null;
  
  interface NavbarContextValue {
    value: NavbarValue;
    setValue: (value: NavbarValue) => void;
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
  
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : internalValue;
  
    const setValue = (next: NavbarValue) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };
  
    const ctxValue = useMemo(
      () => ({ value, setValue }),
      [value]
    );
  
    return (
      <NavbarContext.Provider value={ctxValue}>
        <Box
          h={75}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
            position: "sticky",
            top: 0,
            zIndex: 100,
            backgroundColor: "#fff",
          }}
        >
          <Container
            fluid
            h="100%"
            style={{ paddingLeft: "4%", paddingRight: "5%" }}
          >
            <Group
              h="100%"
              justify="space-between"
              align="center"
              gap="lg"
              wrap="nowrap"
            >
              {children}
            </Group>
          </Container>
        </Box>
      </NavbarContext.Provider>
    );
  }
  
  
  interface NavbarBrandProps {
    title: string;
    subtitle?: string;
  }
  
  function NavbarBrand({ title, subtitle }: NavbarBrandProps) {
    return (
      <Group gap="xs">
        <Stack gap={0} align="flex-start">
          <Text fw={700} c="blue" fz="xl">
            {title}
          </Text>
          {subtitle && (
            <Text fz="sm" c="dimmed">
              {subtitle}
            </Text>
          )}
        </Stack>
      </Group>
    );
  }
  
  
  interface NavbarItemsProps {
    children: ReactNode;
  }
  
  function NavbarItems({ children }: NavbarItemsProps) {
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
  
  
  interface NavbarItemProps {
    value: string;
    children: ReactNode;
  }
  
  function NavbarItem({ value, children }: NavbarItemProps) {
    const { value: active, setValue } = useNavbarContext();
  
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
        }}
      >
        <Text
          fz="sm"
          fw={isActive ? 600 : 400}
          c={isActive ? "blue" : "dark"}
          style={{
            borderBottom: isActive ? "2px solid #228be6" : "2px solid transparent",
            paddingBottom: 4,
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
  
  Navbar.Brand = NavbarBrand;
  Navbar.Items = NavbarItems;
  Navbar.Item = NavbarItem;
  Navbar.Actions = NavbarActions;
  
  export default Navbar;