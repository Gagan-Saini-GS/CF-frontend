import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";

const useDebouncedAPI = (
  method,
  path,
  variables = {},
  headers = {},
  dependencies = [],
  debounceDelay = 200
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url: `${SERVER_URL}${path}`,
        data: method === "GET" ? null : { ...variables },
        params: method === "GET" ? { ...variables } : null,
        headers: { ...headers },
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [method, path, JSON.stringify(variables), JSON.stringify(headers)]);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(fetchData, debounceDelay);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [fetchData, debounceDelay, ...dependencies]);

  return { data, loading, error };
};

export default useDebouncedAPI;
