"use client";

// Imports

import { useState, useEffect } from "react";
import css from "./principal.module.css";
import ModalSettings from "@/app/components/Settings/ModalSettings";

// Component -> Name: Principal

const Principal = () => {
  //Work
  const [workTimer, setWorkTimer] = useState(25); //25 seconds is the default time for countdown
  //Rest
  const [restTime, setRestTime] = useState(5); //5 seconds is the default time for resting
  //Other
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pause, setPause] = useState(false)


  // Runs WORK time
  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;
    if (!pause && workTimer > 0) {
      // setRestTime(5)
      intervalId = setInterval(() => {
        setWorkTimer((time: any) => time - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (workTimer === 0 && restTime === 0) {
      console.log("Line 41")
      setRestTime(5)
    }
    // CLear always
    return () => {
      clearInterval(intervalId);
    };
  }, [workTimer, restTime, pause]);

  // Runs REST time
  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;
    if (!pause && workTimer <= 0 && restTime > 0) {
      console.log("Inside rest")
      intervalId = setInterval(() => {
        setRestTime((time: any) => time - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (restTime === 0 && workTimer === 0) {
      setWorkTimer(25)
    }
    // CLear always
    return () => {
      clearInterval(intervalId);
    };
   }, [restTime, workTimer, pause]);


  // Modal
  const onSaveModal = (work: number, rest: number) => {
    setIsModalOpen(false);
    setWorkTimer(work);
    setRestTime(rest);
  };



  //Todo: Change style! Asap
  return (
    <>
      {isModalOpen && (
        <ModalSettings
          saveModal={(work, rest) => onSaveModal(work, rest)}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <div>
        {restTime > 0  && workTimer <= 0 ? (
          <p className={css.principal}>Descanso: {restTime}</p>
        ) : (
          <p className={css.principal}>Trabajo: {workTimer}</p>
        )}
        <button onClick={() => setPause(true)}>Pause</button>
        <button onClick={() => setPause(false)}>Continue</button>
        <button onClick={() => setWorkTimer(0)}>Start Over</button>
        <button onClick={() => setIsModalOpen(true)}>Open settings</button>
      </div>
    </>
  );
};

export default Principal;
