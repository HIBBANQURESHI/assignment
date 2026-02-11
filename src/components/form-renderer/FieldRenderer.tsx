import React from "react";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
} from "@mui/material";
import { FormField } from "../../types/form";

interface Props {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
}

const FieldRenderer: React.FC<Props> = ({ field, value, onChange }) => {
  const handleChange = (e: any) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    onChange(field.name, val);
  };

  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "date":
    case "datetime-local":
      return (
        <TextField
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          fullWidth
          value={value || ""}
          onChange={handleChange}
        />
      );

    case "textarea":
      return (
        <TextField
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          fullWidth
          multiline
          minRows={3}
          value={value || ""}
          onChange={handleChange}
        />
      );

    case "dropdown":
      return (
        <TextField
          select
          label={field.label}
          required={field.required}
          fullWidth
          value={value || ""}
          onChange={handleChange}
        >
          {field.options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      );

    case "checkbox":
      return (
        <FormControlLabel
          control={<Checkbox checked={!!value} onChange={handleChange} />}
          label={field.label}
        />
      );

    case "radio":
      return (
        <RadioGroup
          value={value || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          {field.options?.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<Radio />}
              label={opt.label}
            />
          ))}
        </RadioGroup>
      );

    case "switch":
      return (
        <FormControlLabel
          control={<Switch checked={!!value} onChange={handleChange} />}
          label={field.label}
        />
      );

    default:
      return null;
  }
};

export default FieldRenderer;
