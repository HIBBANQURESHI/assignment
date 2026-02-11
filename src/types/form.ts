export type FieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "date"
  | "datetime-local"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "switch";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  validation?: any;
  options?: FieldOption[];
  columnSpan?: number; // 1–4
  conditional?: {
    fieldName: string;
    value: any;
  };
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormSchema {
  id: string;
  name: string;
  version: number;
  sections: FormSection[];
}
