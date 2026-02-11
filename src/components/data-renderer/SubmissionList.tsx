import React from "react";
import { useFormStore } from "../../store/useFormStore";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

interface Props {
  formId: string;
}

const SubmissionList: React.FC<Props> = ({ formId }) => {
  const { submissions } = useFormStore();
  const data = submissions[formId] || [];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Submissions</Typography>
      <List>
        {data.map((item, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={`Submission #${index + 1}`} secondary={JSON.stringify(item, null, 2)} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SubmissionList;
        