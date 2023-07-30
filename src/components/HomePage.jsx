import React, { useContext } from "react";
import { HomeContext } from "../App/";
import { database } from "./database";

export default function HomePage() {
  const { handleHideHome, setCatergoryValue } = useContext(HomeContext);

  function handleChange(e) {
    const { value } = e.target;
    setCatergoryValue(value);
  }

  const selections = database.map((catergory) => (
    <option key={catergory.catergory} value={catergory.catergory}>
      {catergory.Name}
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

      <button onClick={handleHideHome}>Start Quiz</button>
    </div>
  );
}
