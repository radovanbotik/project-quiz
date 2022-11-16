import React from "react";
import { useGlobalContext } from "../utils/Context";
import "./Modal.css";

export default function Modal() {
  const { showModal, closeModal, correctAnswers } = useGlobalContext();

  return (
    <div className={showModal ? "overlay modal-open" : "overlay modal-closed"}>
      <div className="modal-control">
        <h2>congrats quiz is over you can die in peace</h2>
        <p>you answered {correctAnswers} answers correctly</p>
        {!correctAnswers && <p>that's pretty pathetic</p>}
        <button style={{ backgroundColor: "gold" }} onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
}
