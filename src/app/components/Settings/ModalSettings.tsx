"use client";

// Imports
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import Modal from "@/app/components/common/Modal/Modal";
import common from "@/app/common.module.css";
import css from "./modalSettings.module.css"

interface ModalSettingsProps {
  closeModal: () => void;
  onSaveModal: (work: number, rest: number) => void;
}

// Component -> Name: ModalSettings
const ModalSettings = ({ closeModal, onSaveModal }: ModalSettingsProps) => {
  const [workTimeStorage, setWorkTimeStorage] = useLocalStorage("workTimer");
  const [restTimeStorage, setRestValueStorage] = useLocalStorage("restTimer");
  const [workTimer, setWorkTimer] = useState(25);
  const [restTimer, setRestTimer] = useState(5);

  useEffect(() => {
    if (workTimeStorage !== undefined && restTimeStorage !== undefined) {
      setWorkTimer(workTimeStorage);
      setRestTimer(restTimeStorage);
    }
  }, []);

  return (
    <Modal title="Settings" closeModal={closeModal} saveModal={() => onSaveModal(workTimer, restTimer)}>
      <div className={css.container}>
        <p>Timer:</p>
        <div className={`${common.flex} ${css.inputContainer}`}>
          <p>Work:</p>
          <input
            onChange={(e) => setWorkTimer(Number(e.target.value))}
            value={workTimer}
            type="string"
            name="work"
            className={css.input}
          />
        </div>
        <div className={`${common.flex} ${css.inputContainer}`}>
          <p>Rest:</p>
          <input
            onChange={(e) => setRestTimer(Number(e.target.value))}
            value={restTimer}
            type="string"
            name="rest"
            className={css.input}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalSettings;
