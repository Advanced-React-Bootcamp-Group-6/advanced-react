import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ProductsModule } from "./modules/Products/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { Provider: ProductsProvider } = ProductsModule();
const queryClient = new QueryClient({
  defaultOptions: {queries:{ refetchOnWindowFocus: false, retry: false }}
})
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <App />
      </ProductsProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
