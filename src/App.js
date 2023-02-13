import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Canvas from "./Paper/Canvas";
import "./style/canvas.css";
import "./style/style.css";
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
    h4: {
      fontWeight: "bold",
    },
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

function About() {
  const aboutButtonStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: 8,
  };

  const homepage = "https://github.com/woooil/figure-paint";

  const openInNewTab = (url) => {
    window.open(url, "_blank").focus();
  };

  return (
    <Tooltip title="Go to the homepage" followCursor leaveDelay={200}>
      <IconButton
        className="about-button"
        style={aboutButtonStyle}
        onClick={() => openInNewTab(homepage)}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <About />
      <Canvas />
    </ThemeProvider>
  );
}

export default App;
