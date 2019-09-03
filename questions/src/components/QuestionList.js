import React from "react";
import cx from "classnames";

function Question(props) {
  const questionClass = cx("question__list-item", {
    "question__list-item--selected": props.selected,
    "question__list-item--locked": props.locked
  });
  return (
    <li
      className={questionClass}
      onClick={props.locked ? () => {} : props.onChange}
    >
      {props.children}
    </li>
  );
}

export default function QuestionList(props) {
  const questions = props.questions.map(question => (
    <Question
      key={question.id}
      selected={question.id === props.value}
      onChange={() => props.onChange(question.id)}
    >
      {question.title}
    </Question>
  ));

  return <ul className="question__list">{questions}</ul>;
}
