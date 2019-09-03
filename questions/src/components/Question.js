import React, { useState, useEffect } from "react";

import axios from "axios";
import marked from "marked";

import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import sql from "highlight.js/lib/languages/sql";

import "highlight.js/styles/tomorrow-night.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("sql", sql);

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => hljs.highlightAuto(code).value
});

function splitData(data) {
  const entire = data.split("\n");
  const answer = entire.findIndex(value => value.startsWith("# Answer"));

  return {
    question: entire.slice(0, answer).join("\n"),
    answer: entire.slice(answer).join("\n")
  };
}

export default function Question(props) {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);

    axios
      .get(`/data/${props.question}.md`)
      .then(({ data }) => setData(splitData(data)));
  }, [props.question]);

  return (
    data && (
      <>
        <section
          className="question"
          dangerouslySetInnerHTML={{ __html: marked(data.question) }}
        />
        {open ? (
          <button onClick={() => setOpen(false)}>Hide Answer</button>
        ) : (
          <button onClick={() => setOpen(true)}>Show Answer</button>
        )}
        {open && (
          <section
            className="answer"
            dangerouslySetInnerHTML={{ __html: marked(data.answer) }}
          />
        )}
      </>
    )
  );
}
