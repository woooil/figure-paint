import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  List,
  ListItem,
} from "@mui/material";

function FigureList(props) {
  const figures = useSelector((state) => state.figures.value);

  const definition = (def) => {
    return (
      <>
        <Typography color="text.white" display="block" variant="caption">
          Definition:
        </Typography>
        <Typography
          color="text.prymary"
          display="block"
          variant="button"
          sx={{ lineHeight: 1.1 }}
        >
          {def}
        </Typography>
      </>
    );
  };

  return (
    <div
      {...props}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography color="text.secondary" display="block" variant="caption">
        List of figures:
      </Typography>
      <Box
        sx={{
          width: "100%",
          overflow: "auto",
        }}
      >
        <List>
          {figures.map((f, index) => (
            <ListItem disablePadding key={index}>
              <Tooltip title={definition(f.description)} placement="right">
                <Button fullWidth className={f.isHint ? "hint-button" : ""}>
                  {f.type} {f.name}
                </Button>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default FigureList;
