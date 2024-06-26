"use client";

import { useState, useEffect } from "react";

export const useLocalStorage = (key?: any, initialValue?: any) => {
  if (typeof window === "undefined") {
    return initialValue;
  }

  const readValue = () => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const [state, setState] = useState(readValue);

  const setValue = (key: any, value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new Event("storage"));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setState(readValue());
    };

    window.addEventListener("storage", () => handleStorageChange());

    return () => {
      return window.removeEventListener("storage", handleStorageChange());
    };
  }, []);

  return [state, setValue];
};
