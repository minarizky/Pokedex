import { useState, useEffect } from "react";
import axios from "axios";

/* Custom hook to handle flipping state. */
function useFlip() {
  const [isFlipped, setIsFlipped] = useState(true);

  const toggleFlip = () => {
    setIsFlipped(isFlipped => !isFlipped);
  };

  return [isFlipped, toggleFlip];
}

/* Custom hook to handle API requests with local storage support. */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

/* Custom hook to handle API requests with data formatting and local storage support. */
function useAxios(baseURL, formatData) {
  const [data, setData] = useLocalStorage(baseURL, []);

  const addData = async (urlSuffix = '') => {
    const response = await axios.get(`${baseURL}${urlSuffix}`);
    setData(data => [...data, formatData(response.data)]);
  };

  const clearData = () => {
    setData([]);
  };

  return [data, addData, clearData];
}

export { useFlip, useAxios };
