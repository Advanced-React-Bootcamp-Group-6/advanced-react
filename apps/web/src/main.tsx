import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ProductsModule } from "./modules/Products/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FeatureFlagProvider } from "./modules/feature-flags/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

(function start() {
  fetch("/config.json")
    .then((res) => res.json())
    .then((config) => {
      const { Provider: ProductsProvider } = ProductsModule();
      console.log({ config });

      createRoot(document.getElementById("root")!).render(
        <StrictMode>
          <MantineProvider>
            <FeatureFlagProvider value={config}>
              <QueryClientProvider client={queryClient}>
                <ProductsProvider>
                  <App />
                </ProductsProvider>
              </QueryClientProvider>
            </FeatureFlagProvider>
          </MantineProvider>
        </StrictMode>,
      );
    });
})();
