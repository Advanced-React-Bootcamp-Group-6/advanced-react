import { Group, SegmentedControl, Title } from "@mantine/core";
import { IconLayoutGrid, IconTable } from "@tabler/icons-react";

export type ViewMode = "grid" | "table";

type ViewToggleProps = {
    view: ViewMode;
    setView: (view: ViewMode) => void;
};
export function ViewToggle({ view, setView }: ViewToggleProps) {

  return (
    <Group justify="space-between" mt="sm" mb="sm">
      <Title order={3}>
        Products
      </Title>
      <SegmentedControl
        value={view}
        onChange={(value) => setView(value as "grid" | "table")}
        data={[
          {
            value: "grid",
            label: (
              <>
                <IconLayoutGrid size={16} style={{ marginRight: 6 }} />
                Grid
              </>
            ),
          },
          {
            value: "table",
            label: (
              <>
                <IconTable size={16} style={{ marginRight: 6 }} />
                Table
              </>
            ),
          },
        ]}
        radius="xl"
        size="md"
      />
    </Group>
  );
}
