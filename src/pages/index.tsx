import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Dynamic Form Builder
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Build forms dynamically, render them, and view submissions.
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <Link href="/form-builder" passHref legacyBehavior>
          <Button variant="contained" color="primary">
            Create Form
          </Button>
        </Link>
        <Link href="/form-renderer" passHref legacyBehavior>
          <Button variant="outlined" color="primary">
            Render Form
          </Button>
        </Link>
        <Link href="/submissions" passHref legacyBehavior>
          <Button variant="outlined" color="secondary">
            Submissions
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
