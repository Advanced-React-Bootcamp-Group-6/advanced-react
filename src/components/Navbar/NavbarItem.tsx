import { Box, Text } from "@mantine/core";
import { useNavbarContext } from "./Navbar.context";

export function NavbarItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { value: active, setValue, isMobile } = useNavbarContext();

  const isActive = active === value;

  return (
    <Box
      component="button"
      onClick={() => setValue(value)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
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

NavbarItem.displayName = "NavbarItem";
