import React from "react";
import { useGlobalContext } from "../utils/Context";

export default function Form() {
  const { preferences, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <form style={{ display: "grid", placeItems: "center" }}>
      <h2>welcome to quiz app</h2>
      {/* amount of questions */}
      <label htmlFor="size">amount of questions</label>
      <input
        type="number"
        id="size"
        name="size"
        min={3}
        max={20}
        value={preferences.size}
        onChange={e => handleChange(e)}
      />
      {/* categories */}
      <label htmlFor="category">choose from the categories</label>
      <select name="category" id="category" onChange={e => handleChange(e)}>
        <option value="sport">sport</option>
        <option value="history">history</option>
        <option value="art">art</option>
        <option value="politics">politics</option>
      </select>
      {/* difficulty */}
      <label htmlFor="difficulty">select the difficulty level</label>
      <select name="difficulty" id="difficulty" onChange={e => handleChange(e)}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
      <button
        onClick={e => handleSubmit(e)}
        style={{ backgroundColor: "gold", margin: "2ex" }}
      >
        start quiz
      </button>
      {error && <h2>not avaible right now, try at different time</h2>}
    </form>
  );
}
