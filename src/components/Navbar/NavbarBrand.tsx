import { Group, Stack, Text, ActionIcon } from "@mantine/core";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useNavbarContext } from "../../components/Navbar/Navbar.context";

export function NavbarBrand({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { isMobile, toggleMenu, isMenuOpen } = useNavbarContext();

  return (
    <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
      <Stack gap={0}>
        <Text fw={700} fz="xl" c="blue">
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
          {isMenuOpen ? <IconX size={25} /> : <IconMenu2 size={25} />}
        </ActionIcon>
      )}
    </Group>
  );
}

NavbarBrand.displayName = "NavbarBrand";
