import CreateSegByClkEndpnts from "./CreateSegByClkEndpnts";

const MODE = {
  createSegByClkEndpnts: "Click two endpoints to create new segement",
};
Object.freeze(MODE);
export { MODE as SEGMENT_MODE };

function SegmentMode({ mode }) {
  switch (mode) {
    case MODE.createSegByClkEndpnts:
      return <CreateSegByClkEndpnts />;
    default:
      return <div></div>;
  }
}

export default SegmentMode;
