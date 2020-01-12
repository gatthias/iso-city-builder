import React from "react";
import { Modal } from "components/common/Modal";

export default function AboutModal({ setOpen }) {
  return (
    <Modal title="About" onClose={() => setOpen(false)} style={{ width: 400 }}>
      <h1>IsoCity Builder</h1>
      <p>Simple isometric city builder.</p>
      <p>
        Inspired from&nbsp;
        <a href="https://victorribeiro.com/isocity" rel="nofollow">
          https://victorribeiro.com/isocity
        </a>
        .
      </p>
      <p>
        Edit on&nbsp;
        <a href="https://codesandbox.io/s/city-builder-kgghx" rel="nofollow">
          CodeSandbox
        </a>
        .
      </p>

      <p>Created with React.</p>
      <h2>Tip</h2>
      <p>
        Share your creations with the generated url, it is changing as you
        build.
      </p>
    </Modal>
  );
}
