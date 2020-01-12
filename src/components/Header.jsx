import "./Header.css";
import React from "react";

export default function Header({
  gridSize,
  onGridSizeChange,
  onRandomize,
  onClear
}) {
  return (
    <header>
      <span className="title">IsoCity</span>
      <div className="options">
        <label htmlFor="gridsize-input">Grid Size: {gridSize}</label>&nbsp;
        <input
          id="gridsize-input"
          type="range"
          min="1"
          max="16"
          defaultValue={gridSize}
          onChange={onGridSizeChange}
        />
        <button onClick={onRandomize}>Randomize</button>
        <button onClick={onClear}>Clear</button>
      </div>
    </header>
  );
}
