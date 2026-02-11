import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { FormSchema, FormSection } from "../../types/form";
import { useFormStore } from "../../store/useFormStore";
import { v4 as uuid } from "uuid";
import FieldList from "./FieldList";
import FormSectionEditor from "./FormSectionEditor";

const FormCreator = () => {
  const { addForm } = useFormStore();
  const [formName, setFormName] = useState("");
  const [sections, setSections] = useState<FormSection[]>([]);

  const addSection = () => {
    setSections([
      ...sections,
      { id: uuid(), title: `Section ${sections.length + 1}`, fields: [] },
    ]);
  };

  const saveForm = () => {
    const form: FormSchema = {
      id: uuid(),
      name: formName,
      version: 1,
      sections,
    };
    addForm(form);
    setFormName("");
    setSections([]);
    alert("Form created!");
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Create Form</Typography>
      <TextField
        fullWidth
        label="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={addSection} sx={{ mb: 2 }}>
        Add Section
      </Button>
      {sections.map((section, index) => (
        <Paper key={section.id} sx={{ p: 2, mb: 2 }}>
          <FormSectionEditor
            section={section}
            sections={sections}
            setSections={setSections}
          />
        </Paper>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={saveForm}
        disabled={!formName || sections.length === 0}
      >
        Save Form
      </Button>
    </Box>
  );
};

export default FormCreator;
