import "./Header.css";
import React, { useState } from "react";
import LoadModal from "components/modals/LoadModal";
import AboutModal from "components/modals/AboutModal";

export default function Header({
  gridSize,
  onGridSizeChange,
  onRandomize,
  onClear,
  onLoadHash
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <header>
      <div>
        <span className="title">IsoCity Builder</span>
        <button onClick={() => setIsModalOpen(true)}>Load...</button>
        <button onClick={() => setIsAboutModalOpen(true)}>About</button>
      </div>
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

      {isModalOpen && (
        <LoadModal setOpen={setIsModalOpen} onLoadHash={onLoadHash} />
      )}
      {isAboutModalOpen && <AboutModal setOpen={setIsAboutModalOpen} />}
    </header>
  );
}
