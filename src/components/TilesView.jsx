import "./TilesView.css";
import React from "react";
import { indexToBgPosition, indexToViewPosition } from "providers/TilesService";

const getTileIdxFromBtnEvent = ev =>
  ev.target.hasAttribute("data-tile-idx")
    ? Number(ev.target.getAttribute("data-tile-idx"))
    : -1;

export default function TilesView({
  tiles,
  onLeftClick,
  onRightClick,
  gridSize = 6,
  offsetX = 64 * gridSize,
  offsetY = 0
}) {
  const handleClick = ev => {
    const i = getTileIdxFromBtnEvent(ev);
    if (i > -1) {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.buttons === 1) {
        onLeftClick(i);
      } else if (ev.buttons === 2) {
        onRightClick(i);
      }
    }
  };
  const handleMouseMove = ev => {
    if (ev.buttons) {
      handleClick(ev);
    }
  };

  return (
    <div className="tiles-view" onMouseMove={handleMouseMove}>
      {tiles.map((tile, i) => {
        const { top, left } = indexToViewPosition(
          i,
          gridSize,
          offsetX,
          offsetY
        );
        return (
          <div
            key={i}
            className="tile"
            style={{
              backgroundPosition: indexToBgPosition(tile),
              top,
              left
            }}
          >
            <div
              className="tile-btn"
              data-tile-idx={i}
              onMouseDown={handleClick}
            />
          </div>
        );
      })}
    </div>
  );
}
