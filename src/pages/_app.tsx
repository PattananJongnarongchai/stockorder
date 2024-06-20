// pages/_app.js
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/pages/theme"; // Import a custom theme setup from a separate file
import Header from "@/components/header";
import "@/app/globals.css"
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
