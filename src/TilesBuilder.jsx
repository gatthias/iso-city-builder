import React, { useState, useEffect } from "react";
import TilesLibrary from "./TilesLibrary";
import TilesView from "./TilesView";
import { indexToPosition, positionToIndex } from "./TilesService";

const createTiles = (gridSize, randomize = true) =>
  new Array(gridSize * gridSize)
    .fill(0)
    .map((_, i) => (randomize ? Math.floor(Math.random() * 72) : 0));

export default function TilesBuilder() {
  const [gridSize, setGridSize] = useState(6);
  const [tiles, setTiles] = useState(createTiles(gridSize));
  const [selectedTile, setSelectedTile] = useState(0);

  const handleGridSizeChange = ev => {
    const newValue = Number(ev.target.value);

    // Save tiles along with their grid coordinates
    const save = new Map();
    tiles.forEach((tile, i) => {
      const coords = indexToPosition(i, gridSize);
      save.set(coords, tile);
    });

    // Create new empty board
    const newTiles = createTiles(newValue, false);

    // Restore saved tiles, getting their new index from their grid coordinates
    save.forEach((tile, coords) => {
      const newIdx = positionToIndex(coords.tileX, coords.tileY, newValue);
      if (newIdx > -1 && newIdx < newTiles.length) {
        newTiles[newIdx] = tile;
      }
    });

    // Update state
    setGridSize(newValue);
    setTiles(newTiles);
  };

  const randomize = () => setTiles(createTiles(gridSize));
  const clear = () => setTiles(createTiles(gridSize, false));

  const handleSelect = newSelection => {
    if (newSelection !== selectedTile) {
      setSelectedTile(newSelection);
    }
  };

  const setTile = (tileIdx, tileType) => {
    const newTiles = [...tiles];
    newTiles[tileIdx] = tileType;
    setTiles(newTiles);
  };

  const leftClick = tileIdx => setTile(tileIdx, selectedTile);
  const rightClick = tileIdx => setTile(tileIdx, 0);

  return (
    <div className="tiles-builder">
      <header>
        <span className="title">City Builder</span>
        <div className="options">
          <label htmlFor="gridsize-input">Grid Size: {gridSize}</label>&nbsp;
          <input
            id="gridsize-input"
            type="range"
            min="1"
            max="16"
            defaultValue={gridSize}
            onChange={handleGridSizeChange}
          />
          <button onClick={randomize}>Randomize</button>
          <button onClick={clear}>Clear</button>
        </div>
      </header>
      <TilesLibrary selectedTile={selectedTile} onSelect={handleSelect} />
      <TilesView
        tiles={tiles}
        gridSize={gridSize}
        onLeftClick={leftClick}
        onRightClick={rightClick}
      />
    </div>
  );
}
