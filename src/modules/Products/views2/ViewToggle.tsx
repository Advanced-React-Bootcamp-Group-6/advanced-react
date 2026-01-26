import { Group, SegmentedControl, Text, Title } from "@mantine/core";
import { IconLayoutGrid, IconTable } from "@tabler/icons-react";
import { useState } from "react";

export function ViewToggle() {
  const [view, setView] = useState("grid");

  return (
    <Group justify="space-between" mt={"sm"}>
      <Title order={3}>
        Products
      </Title>
      <SegmentedControl
        value={view}
        onChange={setView}
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
