import * as yup from "yup";
import { FormField } from "../types/form";

export const generateValidationSchema = (fields: FormField[]) => {
  const shape: Record<string, any> = {};
  fields.forEach((f) => {
    if (f.required) {
      shape[f.name] = yup.string().required(`${f.label} is required`);
    }
  });
  return yup.object().shape(shape);
};
