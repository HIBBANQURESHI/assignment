import React from "react";
import FormCreator from "../components/form-builder/FormCreator";
import { Container, Typography } from "@mui/material";

const FormBuilderPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ mt: 3, mb: 3 }}>
        Dynamic Form Builder
      </Typography>
      <FormCreator />
    </Container>
  );
};

export default FormBuilderPage;
