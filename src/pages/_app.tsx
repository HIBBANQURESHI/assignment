import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme, CssBaseline, Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Global App Bar / Navigation */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dynamic Form Builder
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="/form-builder" passHref legacyBehavior>
              <Button color="inherit">Form Builder</Button>
            </Link>
            <Link href="/form-renderer" passHref legacyBehavior>
              <Button color="inherit">Render Form</Button>
            </Link>
            <Link href="/submissions" passHref legacyBehavior>
              <Button color="inherit">Submissions</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
