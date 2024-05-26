'use client'

import { useState, useEffect } from 'react'
import css from "./principal.module.css"

const Principal = () => {
    const [timer, setTimer] = useState(0)

   useEffect(() => {
    const intervalId = setInterval(() => {
        setTimer((time: number) => time + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
   }, [timer])

    return (
        <div className={css.principal}>{timer}</div>
    )
}

export default Principal