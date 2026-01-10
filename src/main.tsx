import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ProductsModule } from "./modules/Products/index.tsx";

const { Provider: ProductsProvider } = ProductsModule();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>
);
