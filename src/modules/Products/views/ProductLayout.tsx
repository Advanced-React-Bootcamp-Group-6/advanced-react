import {
  Container,
  Text,
  Group,
  Button,
  AppShell,
  Stack,
  Title,
  Box,
} from "@mantine/core";

export default function ProductLayout() {
  return (
    <AppShell.Header>
      <Box
        h="100%"
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
          backgroundColor: "transparent",
          zIndex: 100,
        }}
      >
        <Container fluid h="100%">
          <Group h="100%" justify="space-between" align="center">
            <Stack gap={0} align="flex-start" pr={"md"} pl={"md"}>
              <Title order={2} c="blue">
                Product Dashboard
              </Title>

              <Text fz="sm" c="dimmed">
                Manage your products efficiently
              </Text>
            </Stack>
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              + Add Product
            </Button>
          </Group>
        </Container>
      </Box>
    </AppShell.Header>
  );
}
