import { useState, useEffect } from "react";

export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key)) || initial
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
