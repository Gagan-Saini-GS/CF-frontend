import { useState, useEffect } from "react";

const useDebounce = (callback, delay, dependencies = []) => {
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      callback();
    }, delay);

    setTimerId(newTimerId);

    return () => {
      clearTimeout(newTimerId);
    };
  }, [...dependencies, delay]); // eslint-disable-line react-hooks/exhaustive-deps

  return timerId;
};

export default useDebounce;
