import React from "react";
import { useFormStore } from "../store/useFormStore";
import { Container, Typography, MenuItem, Select, FormControl, Box } from "@mui/material";
import SubmissionList from "../components/data-renderer/SubmissionList";

const SubmissionsPage = () => {
  const { forms } = useFormStore();
  const [selectedFormId, setSelectedFormId] = React.useState(forms[0]?.id || "");

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ mt: 3, mb: 3 }}>
        Form Submissions
      </Typography>

      {forms.length === 0 ? (
        <Typography>No forms created yet.</Typography>
      ) : (
        <Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              value={selectedFormId}
              onChange={(e) => setSelectedFormId(e.target.value)}
            >
              {forms.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.name} (v{f.version})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedFormId && <SubmissionList formId={selectedFormId} />}
        </Box>
      )}
    </Container>
  );
};

export default SubmissionsPage;
