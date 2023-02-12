import { ThemeProvider, createTheme } from "@mui/material/styles";
import Canvas from "./Paper/Canvas";
import "./style/canvas.css";
import "./style/fonts.css";
import "./style/figures.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      light: "#000",
      dark: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          width: "100%",
          ">.MuiGrid-item": {
            display: "flex",
            justifyContent: "center",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Canvas />
    </ThemeProvider>
  );
}

export default App;
