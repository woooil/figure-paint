import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Menu, MenuItem, Grid, Typography } from "@mui/material";

import Paper from "../Paper";
import { append } from "../../Figure/figureSlice";

function SaveMenu() {
  const menu = [
    { name: "Save raw", onClick: () => Paper.saveRaw() },
    { name: "Save as PNG", onClick: () => Paper.saveAsPng() },
    { name: "Save as SVG", onClick: () => Paper.saveAsSvg() },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (m) => {
    m.onClick();
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button-save"
        aria-controls={open ? "basic-menu-save" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="canvas-mode-button"
      >
        Save
      </Button>
      <Menu
        id="basic-menu-save"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menu.map((m, index) => (
          <MenuItem
            onClick={() => handleMenuItemClick(m)}
            key={index}
            sx={{ typography: "body2" }}
          >
            {m.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function FileMenu(props) {
  const dispatch = useDispatch();

  const handleLoadClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".fpd";
    fileInput.onchange = function () {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        dispatch(append(Paper.readRaw(reader.result)));
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };

  return (
    <div {...props}>
      <Typography color="text.secondary" display="block" variant="caption">
        File:
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Button onClick={handleLoadClick}>Load</Button>
        </Grid>
        <Grid item xs={6}>
          <SaveMenu />
        </Grid>
      </Grid>
    </div>
  );
}

export default FileMenu;
