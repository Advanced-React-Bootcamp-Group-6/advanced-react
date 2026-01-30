import { Group, Stack } from "@mantine/core";
import { useNavbarContext } from "./Navbar.context";

export function NavbarItems({ children }: { children: React.ReactNode }) {
  const { isMobile } = useNavbarContext();

  if (!isMobile) {
    return (
      <Group gap="lg" style={{ flex: 1, justifyContent: "center" }}>
        {children}
      </Group>
    );
  }

  return (
    <Stack gap="xs" mt="sm">
      {children}
    </Stack>
  );
}

NavbarItems.displayName = "NavbarItems";
