import "./TilesBuilder.css";
import React, { useState, useEffect } from "react";
import Header from "components/Header";
import TilesLibrary from "components/TilesLibrary";
import TilesView from "components/TilesView";
import {
  createTiles,
  updateGridSize,
  loadStateFromHash
} from "providers/TilesService";
import { debouce, saveToHash } from "providers/utils";

//const hash = "eyJncmlkU2l6ZSI6NiwidGlsZXMiOlswLDQ0LDQ0LDQ0LDQ0LDAsNDUsNzAsNjUsNjQsNDksNDMsNDUsNiwxLDYsNDksNDMsNDUsMzgsOCw0MCw0OSw0Myw0NSw2OSw2LDcxLDQ4LDQzLDAsNDIsNiw0Miw0MiwwXX0=";
const { gridSize: baseGridSize, tiles: baseTiles } = loadStateFromHash(6);

let lastHash = "";

export default function TilesBuilder() {
  const [gridSize, setGridSize] = useState(baseGridSize);
  const [tiles, setTiles] = useState(baseTiles);
  const [selectedTile, setSelectedTile] = useState(0);

  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  });

  /**
   * Utils
   */
  const updateHash = (delay = 500) =>
    debouce(() => {
      lastHash = saveToHash({ gridSize, tiles });
    }, delay);
  const onHashChange = ev => {
    const newHash = new URL(ev.newURL).hash.substr(1);
    if (lastHash !== newHash) {
      lastHash = newHash;
      handleLoadHash(newHash, false);
    }
  };
  /**
   * Header handlers
   */
  const handleLoadHash = (hash, doUpdate = true) => {
    const { gridSize: newGridSize, tiles: newTiles } = loadStateFromHash(
      gridSize,
      tiles,
      hash
    );

    // Update state
    setGridSize(newGridSize);
    setTiles(newTiles);
    if (doUpdate) {
      updateHash(0);
    }
  };
  const handleGridSizeChange = ev => {
    const newValue = Number(ev.target.value);
    const newTiles = updateGridSize(gridSize, newValue, tiles);

    // Update state
    setGridSize(newValue);
    setTiles(newTiles);
    updateHash();
  };
  const randomize = () => {
    setTiles(createTiles(gridSize));
    updateHash(0);
  };
  const clear = () => {
    setTiles(createTiles(gridSize, false));
    updateHash(0);
  };

  /**
   * Library handlers
   */
  const handleSelect = newSelection => {
    if (newSelection !== selectedTile) {
      setSelectedTile(newSelection);
    }
  };

  /**
   * View Handlers
   */
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
      <Header
        gridSize={gridSize}
        onLoadHash={handleLoadHash}
        onGridSizeChange={handleGridSizeChange}
        onRandomize={randomize}
        onClear={clear}
      />
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
