import React, { useRef } from "react";
import { Modal } from "components/common/Modal";

export default function LoadModal({ setOpen, onLoadHash }) {
  const loadInputRef = useRef();

  const handleLoadHash = ev => onLoadHash(loadInputRef.current.value);

  return (
    <Modal
      title="Load..."
      onClose={() => setOpen(false)}
      style={{ width: "100%", maxWidth: 420 }}
    >
      <p>Paste a city hash below to load a previous creation :</p>
      <input type="text" ref={loadInputRef} />
      <button className="btn-clear" onClick={handleLoadHash}>
        Load
      </button>
    </Modal>
  );
}
