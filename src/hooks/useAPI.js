import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SERVER_URL } from "../config";

const useAPI = (
  method,
  path,
  includeAuthToken = true,
  variables = {},
  headers = {},
  dependencies = []
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    if (includeAuthToken) {
      fetchData();
    }
  }, [fetchData, ...dependencies]);

  return { data, loading, error };
};

export default useAPI;
