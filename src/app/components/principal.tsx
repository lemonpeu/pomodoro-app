"use client";

// Imports

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import css from "./principal.module.css";
import ModalSettings from "@/app/components/Settings/ModalSettings";

// Component -> Name: Principal

const Principal = () => {
  const [workTime, setWorkTime] = useLocalStorage("workTimer");
  const [restTime, setValue] = useLocalStorage("restTimer");
  //Work
  const [workTimer, setWorkTimer] = useState(25); //25 seconds is the default time for countdown
  //Rest
  const [restTimer, setRestTime] = useState(5); //5 seconds is the default time for resting
  //Other
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (workTime !== undefined && restTime !== undefined) {
      setWorkTimer(workTime);
      setRestTime(restTime);
    }
  }, []);

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
    if (workTimer === 0 && restTimer === 0) {
      console.log("Line 41");
      setRestTime(restTime);
    }
    // CLear always
    return () => {
      clearInterval(intervalId);
    };
  }, [workTimer, restTimer, pause]);

  // Runs REST time
  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;
    if (!pause && workTimer <= 0 && restTimer > 0) {
      intervalId = setInterval(() => {
        setRestTime((time: any) => time - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (restTimer === 0 && workTimer === 0) {
      setWorkTimer(workTime);
    }
    // CLear always
    return () => {
      clearInterval(intervalId);
    };
  }, [restTimer, workTimer, pause]);

  // Modal
  const onSaveModal = (work: number, rest: number) => {
    setIsModalOpen(false);
    setWorkTimer(work);
    setRestTime(rest);
    setPause(false);
  };

  const onOpenModal = () => {
    setPause(true)
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setPause(false)
    setIsModalOpen(false)
  }

  //Todo: Change style! Asap
  return (
    <>
      {isModalOpen && (
        <ModalSettings
          saveModal={(work, rest) => onSaveModal(work, rest)}
          closeModal={() => onCloseModal()}
        />
      )}
      <div>
        {restTimer > 0 && workTimer <= 0 ? (
          <p className={css.principal}>Descanso: {restTimer}</p>
        ) : (
          <p className={css.principal}>Trabajo: {workTimer}</p>
        )}
        <button onClick={() => setPause(true)}>Pause</button>
        <button onClick={() => setPause(false)}>Continue</button>
        <button onClick={() => setWorkTimer(0)}>Start Over</button>
        <button onClick={() => onOpenModal()}>Open settings</button>
      </div>
    </>
  );
};

export default Principal;
