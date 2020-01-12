import "./Modal.css";
import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Context = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <div className="modal-container">
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </div>
  );
}

export function Modal({ onClose, children, ...props }) {
  const modalNode = useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="modal-dialog"
            onClick={ev => ev.stopPropagation()}
            {...props}
          >
            <div className="modal-head">
              <div className="modal-title">{props.title || ""}</div>
              <button className="modal-btn" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>,
        modalNode
      )
    : null;
}
