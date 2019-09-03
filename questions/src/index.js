import React from "react";
import ReactDOM from "react-dom";

import "index.css";

import useLocalStorage from "hooks/useLocalStorage";
import useQuestions from "hooks/useQuestions";

import QuestionList from "components/QuestionList";
import Question from "components/Question";

function Application(props) {
  const [selected, setSelected] = useLocalStorage("selected", null);
  const [unlocked, setUnlocked] = useLocalStorage("unlocked", []);

  function unlock(id) {
    if (id === null) return;
    setUnlocked([...unlocked, id]);
  }

  const { unlockedQuestions, nextQuestion } = useQuestions(unlocked);
  console.log(unlockedQuestions());
  return (
    <main>
      <h1>Whiteboarding</h1>
      <div className="actions">
        <button onClick={() => unlock(nextQuestion())}>Next Question</button>
        <button
          onClick={() => {
            setSelected(null);
            setUnlocked([]);
          }}
        >
          Reset
        </button>
      </div>
      <QuestionList
        questions={unlockedQuestions()}
        value={selected}
        onChange={id => setSelected(id)}
      />
      {selected !== null && <Question question={selected} />}
    </main>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
