"use client";

// Imports
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import Modal from "@/app/components/common/Modal/Modal";
import css from "@/app/common.module.css";

interface ModalSettingsProps {
  closeModal: () => void;
}

// Component -> Name: ModalSettings
const ModalSettings = ({ closeModal }: ModalSettingsProps) => {
  const [workTime, setWorkTime] = useLocalStorage("workTimer");
  const [restTime, setRestValue] = useLocalStorage("restTimer");
  const [workTimer, setWorkTimer] = useState(25);
  const [restTimer, setRestTimer] = useState(5);

  useEffect(() => {
    if (workTime !== undefined && restTime !== undefined) {
      setWorkTimer(workTime);
      setRestTimer(restTime);
    }
  }, []);

  const onSave = () => {
    setWorkTime("workTimer", workTimer);
    setRestValue("restTimer", restTimer);
    closeModal();
  };

  return (
    <Modal title="Settings" closeModal={closeModal} saveModal={() => onSave()}>
      <div>
        <p>Timer:</p>
        <div className={css.flex}>
          <p>Work:</p>
          <input
            onChange={(e) => setWorkTimer(Number(e.target.value))}
            value={workTimer}
            type="string"
            name="work"
          />
        </div>
        <div className={css.flex}>
          <p>Rest:</p>
          <input
            onChange={(e) => setRestTimer(Number(e.target.value))}
            value={restTimer}
            type="string"
            name="rest"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalSettings;
