import React, { useContext, useState } from "react";
import { decode } from "html-entities";
import { HomeContext } from "../App";

export default function Options(props) {
  const { isCorrect, setCount } = useContext(HomeContext);

  const [option, setOption] = useState({});
  function handleChange(e) {
    const { name, value } = e.target;

    setOption((prev) => ({
      ...prev,
      [name]: value,
      isChecked: value === decode(props.choice),
    }));
    value === props.correct && setCount((prev) => prev + 1);
  }

  return (
    <label className="answer" htmlFor={props.id}>
      <input
        className="radio-input"
        type="radio"
        id={props.id}
        name={props.quiz}
        value={decode(props.choice)}
        onChange={handleChange}
        checked={option.isChecked}
        disabled={isCorrect}
      />
      <span
        className={
          isCorrect && props.choice === props.correct
            ? "correctAnswer"
            : "custom-radio"
        }
      >
        {decode(props.choice)}
      </span>
    </label>
  );
}
