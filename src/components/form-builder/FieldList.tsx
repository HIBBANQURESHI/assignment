import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { FormField } from "../../types/form";
import FieldEditor from "./FieldEditor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  fields: FormField[];
  onUpdate: (fields: FormField[]) => void;
}

const FieldList: React.FC<Props> = ({ fields, onUpdate }) => {
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const handleSave = (field: FormField) => {
    const updated = fields.some((f) => f.id === field.id)
      ? fields.map((f) => (f.id === field.id ? field : f))
      : [...fields, field];
    onUpdate(updated);
    setEditingField(null);
  };

  const handleDelete = (id: string) => {
    onUpdate(fields.filter((f) => f.id !== id));
  };

  return (
    <Box>
      {fields.map((field) => (
        <Box key={field.id} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography>{field.label} ({field.type})</Typography>
          <Box>
            <IconButton onClick={() => setEditingField(field)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(field.id)} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}

      {editingField && (
        <FieldEditor field={editingField} onSave={handleSave} onCancel={() => setEditingField(null)} />
      )}

      <Button variant="outlined" onClick={() => setEditingField({} as FormField)}>
        Add Field
      </Button>
    </Box>
  );
};

export default FieldList;
