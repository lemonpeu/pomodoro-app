"use client";

// Imports

import { useState, useEffect } from "react";
import css from "./principal.module.css";
import Modal from "@/app/components/common/Modal/Modal";
import ModalSettings from "@/app/components/Settings/ModalSettings";

// Component -> Name: Principal

const Principal = () => {
  const [timer, setTimer] = useState(25); //25 seconds is the default time for countdown
  const [saveTime, lastSaveTime] = useState(0);
  const [pause, setPause] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restTime, setRestTime] = useState(5) //5 seconds is the default time for resting

  useEffect(() => {
    let intervalId: any = null;
    if (!pause) {
      intervalId = setInterval(() => {
        setTimer((time: any) => time - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      clearInterval(intervalId);
    }
  }, [timer, pause]);

  const pauseAndSaveLastTime = () => {
    setPause(true);
    lastSaveTime(timer);
  };

  const continueTimer = () => {
    setPause(false);
    setTimer(saveTime);
  };

  // Modal

  const onSaveModal = (work: number, rest: number) => {
    setIsModalOpen(false)
    setPause(false);
    setTimer(work);
    setRestTime(rest)
  }

  const onOpenModal = () => {
    setPause(true);
    lastSaveTime(timer);
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setPause(false);
    setTimer(saveTime);
  }

  //Todo: Change style! Asap
  return (
    <>
      {isModalOpen && <ModalSettings saveModal={(work, rest) => onSaveModal(work, rest)} closeModal={() => onCloseModal()}/>}
      <div>
        <div className={css.principal}>{timer}</div>
        <button onClick={() => pauseAndSaveLastTime()}>Pause</button>
        <button onClick={() => continueTimer()}>Continue</button>
        <button onClick={() => setTimer(0)}>Start Over</button>
        <button onClick={() => onOpenModal()}>Open settings</button>
      </div>
    </>
  );
};

export default Principal;
