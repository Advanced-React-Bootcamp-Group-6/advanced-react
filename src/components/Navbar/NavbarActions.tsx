import { Group, Stack, ActionIcon, Button, Avatar, Text } from "@mantine/core";
import { IconBell, IconMessageCircle } from "@tabler/icons-react";
import { useNavbarContext } from "./Navbar.context";

export function NavbarActions({ children }: { children?: React.ReactNode }) {
  const { isMobile } = useNavbarContext();

  if (!isMobile) {
    return (
      <Group gap="sm">
        {children}
        <ActionIcon variant="subtle" aria-label="Notifications">
          <IconBell size={18} />
        </ActionIcon>

        <ActionIcon variant="subtle">
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

        <ActionIcon variant="subtle">
          <IconMessageCircle size={18} />
        </ActionIcon>
      </Group>
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        size="sm"
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

NavbarActions.displayName = "NavbarActions";
