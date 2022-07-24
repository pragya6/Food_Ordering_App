import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await requestConfig;

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!!");
    }

    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    setRequest,
  };
};

export default useFetch;
