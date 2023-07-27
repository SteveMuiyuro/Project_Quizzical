import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import PlayAgain from "./components/PlayAgain";
import Questions from "./components/Questions";
import Loading from "./components/Loading";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";

const HomeContext = createContext();

function App() {
  const [hideHome, setHideHome] = useState(false);
  const [data, setData] = useState([]);
  const [isCorrect, setCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [isNewQuiz, setIsNewQuiz] = useState(false);

  function handleHideHome() {
    data.length > 0 && setHideHome((prev) => !prev);
    setIsNewQuiz(true);
  }

  function showResults() {
    setCorrect((prev) => !prev);
  }

  function playAgain() {
    showResults();
    setIsNewQuiz(false);
    window.location.reload(false);
  }
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=6")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.results?.map((result) => ({
            ...result,
            choices: shuffle([
              ...result.incorrect_answers,
              result.correct_answer,
            ]).map((res) => ({
              alt: res,
              id: nanoid(),
              correct: result.correct_answer,
            })),
          }))
        )
      );
  }, []);

  return (
    <HomeContext.Provider
      value={{
        hideHome,
        handleHideHome,
        data,
        setData,
        showResults,
        isCorrect,
        setCorrect,
        setCount,
        count,
        playAgain,
        isNewQuiz,
      }}
    >
      {!hideHome && <HomePage />}
      {hideHome && isNewQuiz && <Questions data={data} />}
      {hideHome && !isNewQuiz && <Loading />}
    </HomeContext.Provider>
  );
}

export { HomeContext };
export default App;
