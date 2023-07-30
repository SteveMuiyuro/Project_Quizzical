import React, { useContext } from "react";
import { HomeContext } from "../App/";
import { database } from "./database";

export default function HomePage() {
  const { handleHideHome, setCatergoryValue, setDifficulty } =
    useContext(HomeContext);

  function handleChange(e) {
    const { value } = e.target;
    setCatergoryValue(value);
  }

  function handleChange2(e) {
    const { value } = e.target;
    setdifficulty(value);
  }

  const selections = database.map((catergory) => (
    <option key={catergory.catergory} value={catergory.catergory}>
      {catergory.Name}
    </option>
  ));

  const difficulty = ["Easy", "Medium", "Hard"];

  const level = difficulty.map((c) => <option value={c}>{c}</option>);
  return (
    <div className="home">
      <h1>Quizzical</h1>
      <p>Welcome to Quizzical! Test your general knowledge.</p>
      <select onChange={handleChange}>
        <option value="">Choose Catergory</option>
        {selections}
      </select>
      <select onChange={handleChange2}>
        <option value="">Select Level</option>
        {level}
      </select>
      <button onClick={handleHideHome}>Start Quiz</button>
    </div>
  );
}
