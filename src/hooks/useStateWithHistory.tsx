import { useState } from "react";

export default function useStateWithHistory<T>(value: T) {
  const [state, setState] = useState({
    value: value,
    prev: [] as T[],
    future: [] as T[],
  });

  const setValue = (newValue: T) => {
    setState((prev) => ({
      ...prev,
      value: newValue,
      prev: [...prev.prev, prev.value],
      future: [],
    }));
  };

  const undo = () => {
    if (state.prev.length === 0) return;
    setState((prev) => ({
      ...prev,
      value: prev.prev[prev.prev.length - 1],
      prev: prev.prev.slice(0, prev.prev.length - 1),
      future: [...prev.future, prev.value],
    }));
  };

  const redo = () => {
    if (state.future.length === 0) return;
    setState((prev) => ({
      ...prev,
      value: prev.future[prev.future.length - 1],
      prev: [...prev.prev, prev.value],
      future: prev.future.slice(0, prev.future.length - 1),
    }));
  };



  return [state.value, setValue, undo, redo, state] as const;
}
