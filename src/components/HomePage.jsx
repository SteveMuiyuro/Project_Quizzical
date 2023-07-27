import React, { useContext } from "react";
import { HomeContext } from "../App/";

export default function HomePage() {
  const { handleHideHome, disabled } = useContext(HomeContext);
  return (
    <div className="home">
      <h1>Quizzical</h1>
      <p>Welcome to Quizzical, Let's Do some QuickFire</p>
      <button onClick={handleHideHome}>Start Quiz</button>
    </div>
  );
}