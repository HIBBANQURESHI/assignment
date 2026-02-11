'use client'
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { FormField, FieldOption, FieldType } from "../../types/form";
import { v4 as uuid } from "uuid";

interface Props {
  field?: FormField;
  onSave: (field: FormField) => void;
  onCancel: () => void;
}

const FIELD_TYPES: FieldType[] = [
  "text",
  "email",
  "password",
  "textarea",
  "date",
  "datetime-local",
  "dropdown",
  "checkbox",
  "radio",
  "switch",
];

const FieldEditor: React.FC<Props> = ({ field, onSave, onCancel }) => {
  const [type, setType] = useState<FieldType>(field?.type || "text");
  const [label, setLabel] = useState(field?.label || "");
  const [name, setName] = useState(field?.name || "");
  const [placeholder, setPlaceholder] = useState(field?.placeholder || "");
  const [required, setRequired] = useState(field?.required || false);
  const [columnSpan, setColumnSpan] = useState(field?.columnSpan || 1);
  const [options, setOptions] = useState<FieldOption[]>(field?.options || []);

  useEffect(() => {
    if (!name) setName(label.toLowerCase().replace(/\s+/g, "_"));
  }, [label]);

  const addOption = () => setOptions([...options, { label: "", value: "" }]);
  const updateOption = (index: number, key: "label" | "value", val: string) => {
    const updated = [...options];
    updated[index][key] = val;
    setOptions(updated);
  };
  const removeOption = (index: number) => {
    const updated = [...options];
    updated.splice(index, 1);
    setOptions(updated);
  };

  const handleSave = () => {
    const newField: FormField = {
      id: field?.id || uuid(),
      type,
      label,
      name,
      placeholder,
      required,
      columnSpan,
      options: ["dropdown", "checkbox", "radio"].includes(type) ? options : undefined,
    };
    onSave(newField);
  };

  return (
    <Box p={2} sx={{ border: "1px solid #ccc", borderRadius: 1 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Field Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value as FieldType)}>
          {FIELD_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      {["text", "email", "password", "textarea"].includes(type) && (
        <TextField
          fullWidth
          label="Placeholder"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}
      <FormControlLabel
        control={<Checkbox checked={required} onChange={(e) => setRequired(e.target.checked)} />}
        label="Required"
        sx={{ mb: 2 }}
      />
      <TextField
        type="number"
        label="Column Span (1–4)"
        value={columnSpan}
        onChange={(e) => setColumnSpan(Number(e.target.value))}
        fullWidth
        sx={{ mb: 2 }}
        inputProps={{ min: 1, max: 4 }}
      />
      {["dropdown", "checkbox", "radio"].includes(type) && (
        <Box mb={2}>
          {options.map((opt, i) => (
            <Box key={i} display="flex" gap={1} mb={1}>
              <TextField
                placeholder="Label"
                value={opt.label}
                onChange={(e) => updateOption(i, "label", e.target.value)}
              />
              <TextField
                placeholder="Value"
                value={opt.value}
                onChange={(e) => updateOption(i, "value", e.target.value)}
              />
              <Button color="error" onClick={() => removeOption(i)}>
                Remove
              </Button>
            </Box>
          ))}
          <Button variant="outlined" onClick={addOption}>
            Add Option
          </Button>
        </Box>
      )}
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default FieldEditor;
