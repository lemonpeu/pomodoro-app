"use client";

import Image from "next/image";
import common from "@/app/common.module.css"
import css from "./Button.module.css"

type ButtonProps = {
    text: string;
    imageSrc: string;
    onClick: () => void;
}

const Button = ({text, imageSrc, onClick}: ButtonProps) => {
    return (
        <div className={common.horizontalColumnCenter}>
            <button onClick={onClick}>
                <Image alt={text} src={imageSrc} width={20} height={20}/>
            </button>
            <p className={css.btnText}>{text}</p>
        </div>
    )
}

export default Button