import { AppShell } from "@mantine/core";
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import Navbar from "../Navbar"

export const Layout = () => {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const pathname = location.pathname;

  const current =
    pathname === "/" || pathname.startsWith("/product/") ? "products" : null;

  return (
    <AppShell header={{ height: 75 }} padding={0}>
      <AppShell.Header>
        <Navbar
          value={current}
          onChange={(val) => {
            if (val === "products") navigate({ to: "/" });
          }}
        >
          <Navbar.Brand
            title="Product Admin"
            subtitle="Manage your products efficiently"
          />

          <Navbar.Items>
            <Navbar.Item value="dashboard">Dashboard</Navbar.Item>
            <Navbar.Item value="products">Products</Navbar.Item>
            <Navbar.Item value="orders">Orders</Navbar.Item>
            <Navbar.Item value="customers">Customers</Navbar.Item>
          </Navbar.Items>

          <Navbar.Actions />
        </Navbar>
      </AppShell.Header>

      <AppShell.Main pt="xl">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;