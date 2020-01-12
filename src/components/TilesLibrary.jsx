import "./TilesLibrary.css";
import React from "react";
import {
  availableTiles as tiles,
  tileToBgPosition
} from "providers/TilesService";

export default function TilesLibrary({ selectedTile, onSelect }) {
  return (
    <div className="tiles-library">
      <h1>library</h1>
      {tiles.map((tile, i) => (
        <div
          key={i}
          className={`tile ${selectedTile === i ? "selected" : ""}`}
          onClick={() => onSelect(i)}
        >
          <div
            className="tile-img"
            style={{ backgroundPosition: tileToBgPosition(tile) }}
          />
        </div>
      ))}
    </div>
  );
}
