import React, { useState, useContext, useEffect } from "react";
import Question from "./Question";
import { HomeContext } from "../App";
import PlayAgain from "./PlayAgain";

export default function Questions({ data }) {
  const { showResults, isCorrect, count, playAgain } = useContext(HomeContext);

  const questions = data?.map((obj, i) => (
    <Question key={i} quiz={obj.question} selections={obj.choices} />
  ));

  console.log(data);

  return (
    <div className="questions">
      {questions}
      {!isCorrect ? (
        <button className="check-btn" onClick={showResults}>
          Check Answers
        </button>
      ) : (
        <div className="results">
          <p className="feedback">
            You got {count} out {data.length} questions
          </p>
          <button onClick={playAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
}
