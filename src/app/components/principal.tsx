"use client";

// Imports

import { useState, useEffect } from "react";
import css from "./principal.module.css";

// Component -> Name: Principal

const Principal = () => {
  const [timer, setTimer] = useState(0);
  const [saveTime, lastSaveTime] = useState(0);
  const [pause, setPause] = useState(false);

  // TODO: When you pause it tracks the previous number, ex: you paused on 6, it'll save 5
  // so when you want to continue, 5 is the number is going to appear
  useEffect(() => {
    let intervalId: any = null;
    if (!pause) {
       intervalId = setInterval(() => {
        setTimer((time: any) => time + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
        clearInterval(intervalId);
    }
  }, [timer, pause]);

  //Todo: Change functions names
  const pauseAndSaveLastTime = () => {
    setPause(true);
    lastSaveTime(timer);
  };

  const continueTimer = () => {
    setPause(false);
    setTimer(saveTime);
  };

  //Todo: Change style! Asap 
  return (
    <div>
      <div className={css.principal}>{timer}</div>
      <button onClick={() => pauseAndSaveLastTime()}>Pause</button>
      <button onClick={() => continueTimer()}>Continue</button>
      <button onClick={() => setTimer(0)}>Start Over</button>
    </div>
  );
};

export default Principal;
