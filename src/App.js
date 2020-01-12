import React from "react";
import "./styles.css";
import TilesBuilder from "components/TilesBuilder";
import { ModalProvider } from "components/common/Modal";

export default function App() {
  return (
    <div className="App">
      <ModalProvider>
        <TilesBuilder />
      </ModalProvider>
    </div>
  );
}
