"use client";

// Imports

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import css from "./principal.module.css";
import common from "../common.module.css";
import ModalSettings from "@/app/components/Settings/ModalSettings";

// Component -> Name: Principal

const Principal = () => {
  const [workTimeStorage, setWorkTimeStorage] = useLocalStorage("workTimer");
  const [restTimeStorage, setRestTimeStorage] = useLocalStorage("restTimer");
  //Work
  const [workTimer, setWorkTimer] = useState(25); //25 seconds is the default time for countdown
  //Rest
  const [restTimer, setRestTime] = useState(5); //5 seconds is the default time for resting
  //Other
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (workTimeStorage !== undefined && restTimeStorage !== undefined) {
      setWorkTimer(workTimeStorage);
      setRestTime(restTimeStorage);
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
      setRestTime(restTimeStorage);
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
      setWorkTimer(workTimeStorage);
    }
    // CLear always
    return () => {
      clearInterval(intervalId);
    };
  }, [restTimer, workTimer, pause]);


  // Modal
  const saveModal = (work: number, rest: number) => {
    setIsModalOpen(false);
    setWorkTimeStorage("workTimer", work);
    setRestTimeStorage("restTimer", rest);
    setPause(false);
  };

  const onOpenModal = () => {
    setPause(true);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setPause(false);
    setIsModalOpen(false);
  };

  //Todo: Change style! Asap
  return (
    <>
      {isModalOpen && (
        <ModalSettings
          onSaveModal={(work, rest) => saveModal(work, rest)}
          closeModal={() => onCloseModal()}
        />
      )}
      <div className={`${css.container} ${common.allCenter}`}>
        {restTimer > 0 && workTimer <= 0 ? (
          <p className={css.title}>Rest</p>
        ) : (
          <p className={css.title}>Working!</p>
        )}
        <p className={css.title}>
          {restTimer > 0 && workTimer <= 0 ? restTimer : workTimer}
        </p>
        <div className={css.buttons}>
          <button onClick={() => setPause(!pause)}>
            {pause ? "Continue" : "Pause"}
          </button>
          <button onClick={() => setWorkTimer(0)}>Start Over</button>
          <button onClick={() => onOpenModal()}>Open settings</button>
        </div>
      </div>
    </>
  );
};

export default Principal;
