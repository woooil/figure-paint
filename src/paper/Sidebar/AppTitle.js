import { Stack, Typography } from "@mui/material";
import ShapeLineOutlinedIcon from "@mui/icons-material/ShapeLineOutlined";

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
      <ShapeLineOutlinedIcon />
    </Stack>
  );
}

export default AppTitle;
