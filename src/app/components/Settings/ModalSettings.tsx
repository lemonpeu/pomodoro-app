"use client";

// Imports
import { useState } from "react";
import Modal from "@/app/components/common/Modal/Modal";
import css from "@/app/common.module.css"

interface ModalSettingsProps {
    closeModal: () => void;
    saveModal: (work: number, rest: number) => void;
}

// Component -> Name: ModalSettings
const ModalSettings = ({closeModal, saveModal}: ModalSettingsProps) => {
    const [workTimer, setWorkTimer] = useState(25)
    const [restTimer, setRestTimer] = useState(5)

    const onSave = () => {
        saveModal(workTimer, restTimer)
    }

    return (
        <Modal title="Settings" closeModal={closeModal} saveModal={() => onSave()}>
            <div>
                <p>Timer:</p>
                <div className={css.flex}>
                    <p>Work:</p>
                    <input onChange={e => setWorkTimer(Number(e.target.value))} value={workTimer} type="string" name="work"/>
                </div>
                <div className={css.flex}>
                    <p>Rest:</p>
                    <input onChange={e => setRestTimer(Number(e.target.value))} value={restTimer} type="string" name="rest"/>
                </div>
            </div>
        </Modal>
    )
}

export default ModalSettings; 