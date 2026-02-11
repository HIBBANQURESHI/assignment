import { create } from "zustand";
import { FormSchema } from "../types/form";

interface FormState {
  forms: FormSchema[];
  submissions: Record<string, any[]>; // formId -> submissions
  draftData: Record<string, any>; // formId -> draft
  addForm: (form: FormSchema) => void;
  updateForm: (form: FormSchema) => void;
  deleteForm: (formId: string) => void;
  saveDraft: (formId: string, data: any) => void;
  submitForm: (formId: string, data: any) => void;
}

export const useFormStore = create<FormState>((set) => ({
  forms: [],
  submissions: {},
  draftData: {},
  addForm: (form) =>
    set((state) => ({ forms: [...state.forms, form] })),
  updateForm: (form) =>
    set((state) => ({
      forms: state.forms.map((f) =>
        f.id === form.id ? { ...form, version: f.version + 1 } : f
      ),
    })),
  deleteForm: (formId) =>
    set((state) => ({ forms: state.forms.filter((f) => f.id !== formId) })),
  saveDraft: (formId, data) =>
    set((state) => ({ draftData: { ...state.draftData, [formId]: data } })),
  submitForm: (formId, data) =>
    set((state) => ({
      submissions: {
        ...state.submissions,
        [formId]: [...(state.submissions[formId] || []), data],
      },
    })),
}));
