import React from "react";
import Options from "./Options";
import { decode } from "html-entities";
export default function Question(props) {
  const answers = props.selections?.map((obj) => (
    <Options
      key={obj.id}
      choice={obj.alt}
      id={obj.id}
      quiz={props.quiz}
      correct={obj.correct}
    />
  ));

  return (
    <div className="quiz">
      <p>{decode(props.quiz)}</p>
      <div className="options">{answers}</div>
    </div>
  );
}
