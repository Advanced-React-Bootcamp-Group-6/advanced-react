import { Outlet } from "@tanstack/react-router";

export const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};