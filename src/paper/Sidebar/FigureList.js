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
    <div {...props} style={{ flex: 1 }}>
      <Typography color="text.secondary" display="block" variant="caption">
        List of figures:
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "300px",
          overflow: "auto",
        }}
      >
        <List>
          {figures.map((f, index) => (
            <ListItem disablePadding>
              <Tooltip
                title={definition(f.description)}
                placement="right"
                key={index}
              >
                <Button fullWidth>
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
