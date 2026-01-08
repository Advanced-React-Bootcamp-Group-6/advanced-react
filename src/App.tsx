import { MantineProvider, Typography } from "@mantine/core";
import "@mantine/core/styles.css";
import { ProductProvider } from "./modules/Products";

function App() {
  return (
    <MantineProvider>
      <ProductProvider value="this is product context">
      <Typography>Advanced React</Typography>
      </ProductProvider>
    </MantineProvider>
  );
}

export default App;
