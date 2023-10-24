import { useEffect, useState } from "react";

export const useFetch = (url, options = { selector: null }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = async () => {
    setLoading(true);
    if (error) setError(false);
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (response.ok) {
        setData(options.selector !== null ? result[options.selector] : result);
      } else {
        setError("Errore 404");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error)
    }
  };

  useEffect(() => {
    update();
  }, [url]);

  return { data, error, loading, update};
};
