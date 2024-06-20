"use client";

// Imports

import css from "./Modal.module.css";

// Typescript props

interface ModalProps {
  title: string;
  children: React.ReactNode;
  closeModal: () => void;
  saveModal: () => void;
  cancelBtn?: string;
  saveBtn?: string;
}

const Modal = ({
  title,
  cancelBtn = "Cancel",
  saveBtn = "Save",
  children,
  closeModal,
  saveModal
}: ModalProps) => {

  return (
    <section className={css.container}>
      <div className={css.subContainer}>
        <div className={css.content}>
          <h2>{title}</h2>
          <div>{children}</div>
          <div className={css.btnContainer}>
            <button className={css.cancel}  onClick={() => closeModal()}>{cancelBtn}</button>
            <button className={css.save} onClick={() => saveModal()}>{saveBtn}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
