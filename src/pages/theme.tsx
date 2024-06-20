// Create a theme file if not already existing
// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ffc107",
    },
  },
});

export default theme;
