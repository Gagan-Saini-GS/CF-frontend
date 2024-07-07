import { useState, useEffect } from "react";

const useDebounce = (callback, delay, dependencies = []) => {
  const [data, setData] = useState(null);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(async () => {
      const data = await callback();
      setData(data);
    }, delay);

    setTimerId(newTimerId);

    return () => {
      clearTimeout(newTimerId);
    };
  }, [...dependencies, delay]); // eslint-disable-line react-hooks/exhaustive-deps

  return { timerId, data };
};

export default useDebounce;
