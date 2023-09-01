import React, { useState, createContext, useEffect, memo } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import PlayAgain from "./components/PlayAgain";
import Questions from "./components/Questions";
import Loading from "./components/Loading";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";
import Confetti from "react-confetti";

const HomeContext = createContext();

function App() {
  const [hideHome, setHideHome] = useState(false);
  const [data, setData] = useState([]);
  const [isCorrect, setCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [isNewQuiz, setIsNewQuiz] = useState(false);
  const [catergoryValue, setCatergoryValue] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [level, setLevel] = useState("");

  function handleHideHome() {
    data.length > 0 && setHideHome((prev) => !prev);
    setIsNewQuiz(true);
  }
  console.log(level);

  function showResults() {
    setCorrect((prev) => !prev);
    if (count === data.length) setConfetti((prev) => !prev);
  }

  function playAgain() {
    showResults();
    setIsNewQuiz(false);
    window.location.reload(false);
  }

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://opentdb.com/api.php?amount=6&category=${catergoryValue}&difficulty=${level}`,
      { signal: controller.signal }
    )
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

    return () => controller.abort();
  }, [catergoryValue, level]);

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
        setCatergoryValue,
        setLevel,
      }}
    >
      {!hideHome && <HomePage />}
      {hideHome && isNewQuiz && <Questions data={data} />}
      {hideHome && !isNewQuiz && <Loading />}
      {confetti && <Confetti />}
    </HomeContext.Provider>
  );
}

export { HomeContext };
export default memo(App);
