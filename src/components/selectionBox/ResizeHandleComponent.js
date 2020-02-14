import React from "react";
import { number, bool, string, func } from "prop-types";

export default function ResizeHandleComponent({
  active,
  cursor,
  isInSelectionGroup,
  recommendedSize,
  onMouseDown,
  scale,
  x,
  y,
  name
}) {
  return (
    <rect
      fill={active ? "rgba(229,240,244,1)" : "rgba(229,240,244,0.3)"}
      height={recommendedSize}
      stroke={active ? "rgba(53,33,140,1)" : "rgba(53,33,140,0.3)"}
      strokeWidth={1 / scale}
      width={recommendedSize}
      x={x - recommendedSize / 2}
      y={y - recommendedSize / 2}
      // The onMouseDown prop must be passed on or resize will not work
      onMouseDown={onMouseDown}
      style={{
        cursor,
        opacity: isInSelectionGroup ? 0 : 1,
        display: ["n", "s"].includes(name) ? "" : "none"
      }}
    />
  );
}

ResizeHandleComponent.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  active: bool.isRequired,
  cursor: string.isRequired,
  isInSelectionGroup: bool.isRequired,
  onMouseDown: func.isRequired,
  scale: number.isRequired,
  name: string.isRequired
};
