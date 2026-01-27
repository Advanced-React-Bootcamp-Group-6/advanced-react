import { createRootRoute, createRoute, Navigate } from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { Products } from "./modules/Products/views";
import { ProductDetail } from "./modules/Products/components/ProductDetail";

const rootRoute = createRootRoute({
    component: Layout,
    notFoundComponent: () => <Navigate to="/" />,
  });

  export const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Products,
  });
  
  export const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/product/$productId",
    component: ProductDetail,
  });
  
  export const routeTree = rootRoute.addChildren([productsRoute, productRoute]);