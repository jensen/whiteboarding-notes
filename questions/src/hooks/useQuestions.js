const questions = [
  { id: "01", title: "Queries" },
  { id: "02", title: "Pairs Difference" },
  { id: "03", title: "Unique Characters" },
  { id: "04", title: "URL Encode" },
  { id: "05", title: "Palindrome" },
  { id: "06", title: "ERD" },
  { id: "07", title: "Print All" },
  { id: "08", title: "Min Max" },
  { id: "09", title: "Recursion" },
  { id: "10", title: "Stock Prices" },
  // { id: "11", title: "Coins" },
  { id: "12", title: "Array Rotation" }
];

export default function useQuestions(unlocked) {
  const qs = unlocked.reduce((prev, curr) => ({ ...prev, [curr]: true }), {});
  console.log(unlocked);

  const lockedQuestions = () =>
    questions.filter(question => qs[question.id] === undefined);

  const unlockedQuestions = () =>
    unlocked.map(question => questions.find(q => question === q.id));

  const nextQuestion = () => {
    if (unlocked.length === questions.length) return null;

    const locked = lockedQuestions();
    const id = locked[Math.floor(Math.random() * locked.length)].id;

    return questions.find(question => question.id === id).id;
  };

  return {
    questions,
    unlockedQuestions,
    nextQuestion
  };
}
