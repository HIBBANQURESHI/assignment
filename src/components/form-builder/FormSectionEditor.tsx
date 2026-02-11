import React from "react";
import { FormSection } from "../../types/form";
import { TextField, Typography } from "@mui/material";
import FieldList from "./FieldList";

interface Props {
  section: FormSection;
  sections: FormSection[];
  setSections: (sections: FormSection[]) => void;
}

const FormSectionEditor: React.FC<Props> = ({ section, sections, setSections }) => {
  const handleFieldUpdate = (fields: FormSection["fields"]) => {
    const updated = sections.map((s) => (s.id === section.id ? { ...s, fields } : s));
    setSections(updated);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Section Title"
        value={section.title}
        onChange={(e) =>
          setSections(sections.map((s) => (s.id === section.id ? { ...s, title: e.target.value } : s)))
        }
        sx={{ mb: 2 }}
      />
      <FieldList fields={section.fields} onUpdate={handleFieldUpdate} />
    </div>
  );
};

export default FormSectionEditor;
