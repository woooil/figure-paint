import { Stack, Typography, IconButton } from "@mui/material";
import ShapeLineOutlinedIcon from "@mui/icons-material/ShapeLineOutlined";
import Paper from "../Paper";

function AppTitle(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ alignItems: "center" }}
      sx={{ mb: 3 }}
      {...props}
    >
      <Typography color="text.primary" display="inline" variant="h4">
        Figure Paint
      </Typography>
      <IconButton onClick={Paper.save}>
        <ShapeLineOutlinedIcon />
      </IconButton>
    </Stack>
  );
}

export default AppTitle;
