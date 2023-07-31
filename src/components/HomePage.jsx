import React, { useContext } from "react";
import { useState } from "react";
import { HomeContext } from "../App/";
import { database } from "./database";

export default function HomePage() {
  const { handleHideHome, setCatergoryValue, setLevel } =
    useContext(HomeContext);
  const difficulty = ["Easy", "Medium", "Hard"];

  function handleChange2(e) {
    const { value } = e.target;
    setLevel(value.toLowerCase());
  }

  function handleChange(e) {
    const { value } = e.target;
    setCatergoryValue(value);
  }

  const selections = database.map((catergory) => (
    <option key={catergory.catergory} value={catergory.catergory}>
      {catergory.Name}
    </option>
  ));

  const levels = difficulty.map((level) => (
    <option key={level} value={level}>
      {level}
    </option>
  ));

  return (
    <div className="home">
      <h1>Quizzical</h1>
      <p>Welcome to Quizzical! Test your general knowledge.</p>
      <select onChange={handleChange}>
        <option value="">Choose Catergory</option>
        {selections}
      </select>

      <select onChange={handleChange2}>
        <option value="">Choose Level</option>
        {levels}
      </select>

      <button onClick={handleHideHome}>Start Quiz</button>
    </div>
  );
}
