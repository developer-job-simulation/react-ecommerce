import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;

// in file hook imported in
// const [cart, updateCart] = useLocalStorage('cart', []);
