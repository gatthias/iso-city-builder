import React, { useState } from "react";
import TilesLibrary from "./TilesLibrary";
import TilesView from "./TilesView";
import {
  indexToPosition,
  positionToIndex,
  stateToB64,
  B64ToState
} from "./TilesService";

const createTiles = (gridSize, randomize = true) =>
  new Array(gridSize * gridSize)
    .fill(0)
    .map((_, i) => (randomize ? Math.floor(Math.random() * 72) : 0));

// Try to load data from hash
let baseGridSize = 6;
let baseTiles = createTiles(baseGridSize);
try {
  //const hash = "eyJncmlkU2l6ZSI6NiwidGlsZXMiOlswLDQ0LDQ0LDQ0LDQ0LDAsNDUsNzAsNjUsNjQsNDksNDMsNDUsNiwxLDYsNDksNDMsNDUsMzgsOCw0MCw0OSw0Myw0NSw2OSw2LDcxLDQ4LDQzLDAsNDIsNiw0Miw0MiwwXX0=";
  const hash = window.location.hash.substr(1);
  const data = B64ToState(hash);
  if (
    data &&
    data.gridSize &&
    typeof data.gridSize === "number" &&
    data.tiles &&
    data.tiles instanceof Array
  ) {
    baseGridSize = data.gridSize;
    baseTiles = data.tiles;
  }
} catch (e) {}

const debouce = (cb, delay) => {
  const now = performance.now();
  if (debouce.lastCall && now - debouce.lastCall < delay) {
    window.clearTimeout(debouce.lastTimerId);
  }

  debouce.lastCall = now;
  debouce.lastTimerId = window.setTimeout(() => {
    cb();
    debouce.lastCall = 0;
    debouce.lastTimerId = null;
  }, delay);
};

export default function TilesBuilder() {
  const [gridSize, setGridSize] = useState(baseGridSize);
  const [tiles, setTiles] = useState(baseTiles);
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
    updateHash();
  };

  const randomize = () => setTiles(createTiles(gridSize)) || updateHash();
  const clear = () => setTiles(createTiles(gridSize, false)) || updateHash();

  const handleSelect = newSelection => {
    if (newSelection !== selectedTile) {
      setSelectedTile(newSelection);
    }
  };

  const updateHash = () => {
    debouce(() => {
      window.location.hash = stateToB64(gridSize, tiles);
      console.log("called");
    }, 500);
  };

  const setTile = (tileIdx, tileType) => {
    const newTiles = [...tiles];
    newTiles[tileIdx] = tileType;
    setTiles(newTiles);

    updateHash();
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
