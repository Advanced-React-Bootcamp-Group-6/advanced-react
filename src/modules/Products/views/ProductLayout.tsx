import {
  Container,
  Text,
  Group,
  Button,
  Stack,
} from "@mantine/core";

export default function ProductLayout() {
  return (
      <Container fluid h={50} mb={"xl"} style={{ shadow: "md" }}>
        <Group mb="md" justify="space-between" align="center">
          <Stack gap={4} align="flex-start">
            <Text fz="h1" fw={500} gradient={{ from: "indigo", to: "cyan" }} variant="gradient">
              Product Dashboard
            </Text>
            <Text fz="sm" c="dimmed">
              Manage your products efficiently
            </Text>
          </Stack>

          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            + Add Product
          </Button>
        </Group>
      </Container>
      
  );
}
