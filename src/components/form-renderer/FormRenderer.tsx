import React from "react";
import { useFormStore } from "../../store/useFormStore";
import { Box, Button, Grid } from "@mui/material";
import FieldRenderer from "./FieldRenderer";
import { FormSchema } from "../../types/form";

interface Props {
  form: FormSchema;
}

const FormRenderer: React.FC<Props> = ({ form }) => {
  const { saveDraft, submitForm, draftData } = useFormStore();
  const formDraft = draftData[form.id] || {};

  const handleChange = (name: string, value: any) => {
    saveDraft(form.id, { ...formDraft, [name]: value });
  };

  const handleSubmit = () => {
    submitForm(form.id, formDraft);
    alert("Form submitted!");
  };

  return (
    <Box p={3}>
      <form>
        {form.sections.map((section) => (
          <Box key={section.id} mb={3}>
            <Grid container spacing={2}>
              {section.fields.map((field) => (
                <Grid item xs={12 / (field.columnSpan || 1)} key={field.id}>
                  <FieldRenderer field={field} value={formDraft[field.name]} onChange={handleChange} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }}>
          Submit
        </Button>
        <Button variant="outlined" onClick={() => saveDraft(form.id, {})}>
          Clear
        </Button>
      </form>
    </Box>
  );
};

export default FormRenderer;
