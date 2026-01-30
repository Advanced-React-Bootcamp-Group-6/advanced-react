import React from "react";
import { Box, Container, Group, Divider, Collapse } from "@mantine/core";
import { NavbarContext } from "./Navbar.context";
import { useNavbarLogic } from "./Navbar.logic";

interface Props {
  children: React.ReactNode;
  defaultValue?: string | null;
  value?: string | null;
  onChange?: (v: string | null) => void;
}

export function NavbarRoot(props: Props) {
  const ctxValue = useNavbarLogic(props);

  const brand: React.ReactNode[] = [];
  const items: React.ReactNode[] = [];
  const actions: React.ReactNode[] = [];

  React.Children.forEach(props.children, (child: any) => {
    if (!child) return;
    if (child.type.displayName === "NavbarBrand") brand.push(child);
    else if (child.type.displayName === "NavbarItems") items.push(child);
    else if (child.type.displayName === "NavbarActions") actions.push(child);
  });

  return (
    <NavbarContext.Provider value={ctxValue}>
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0,0,0,.08)",
        }}
      >
        <Box h={75}>
          <Container fluid h="100%">
            <Group h="100%" justify="space-between">
              {brand}
              {!ctxValue.isMobile && items}
              {!ctxValue.isMobile && actions}
            </Group>
          </Container>
        </Box>

        {ctxValue.isMobile && (
          <Collapse in={ctxValue.isMenuOpen}>
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
