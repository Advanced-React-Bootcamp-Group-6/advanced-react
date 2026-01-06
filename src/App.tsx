import { MantineProvider, Typography } from "@mantine/core";
import "@mantine/core/styles.css";
import  ThemeProvider from "./context/ThemContext"

function App() {
  return (
    <MantineProvider>
      <ThemeProvider>
      <Typography>Advanced React</Typography>
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;
