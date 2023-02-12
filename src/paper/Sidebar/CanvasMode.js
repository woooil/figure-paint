import { useState } from "react";

import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";

import PointMode, { POINT_MODE } from "../Point/PointMode";
import SegmentMode, { SEGMENT_MODE } from "../Segment/SegmentMode";
import LabelMode, { LABEL_MODE } from "../Label/LabelMode";
import LineMode, { LINE_MODE } from "../Line/LineMode";

const MODE = {
  point: "Point",
  segment: "Segment",
  label: "Label",
  line: "Line",
};
Object.freeze(MODE);

function ModeComponent(mode, subMode) {
  switch (mode) {
    case MODE.point:
      return <PointMode mode={subMode} />;
    case MODE.segment:
      return <SegmentMode mode={subMode} />;
    case MODE.label:
      return <LabelMode mode={subMode} />;
    case MODE.line:
      return <LineMode mode={subMode} />;
    default:
      return <div></div>;
  }
}

function getSubModes(mode) {
  let subModes = (mode) => {
    switch (mode) {
      case MODE.point:
        return POINT_MODE;
      case MODE.segment:
        return SEGMENT_MODE;
      case MODE.label:
        return LABEL_MODE;
      case MODE.line:
        return LINE_MODE;
      default:
        return {};
    }
  };
  return Object.values(subModes(mode));
}

function ModeMenu({ mode, setMode }) {
  const subModes = getSubModes(mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (m) => {
    setMode({
      main: mode,
      sub: m,
    });
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="canvas-mode-button"
      >
        {mode}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {subModes.map((m, index) => (
          <MenuItem
            onClick={() => handleMenuItemClick(m)}
            key={index}
            sx={{ typography: "body2" }}
          >
            {m}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function CanvasMode(props) {
  const modes = Object.values(MODE);
  const [mode, setMode] = useState({
    main: modes[0],
    sub: getSubModes(modes[0])[0],
  });

  return (
    <div {...props}>
      <Typography color="text.secondary" display="block" variant="caption">
        Current mode:
      </Typography>
      <Typography color="text.primary" display="block" variant="button">
        {mode.sub}
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <Typography color="text.secondary" display="block" variant="caption">
        Select mode you want:
      </Typography>
      <Grid container>
        {modes.map((m, index) => (
          <Grid item xs={6} key={index}>
            <ModeMenu mode={m} setMode={setMode} />
          </Grid>
        ))}
      </Grid>
      {ModeComponent(mode.main, mode.sub)}
    </div>
  );
}

export default CanvasMode;
