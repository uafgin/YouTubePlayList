import React from "react";
import { fontSizes } from '@ds.e/foundations';

interface ButtonProps {
    title: string,
    onClick: Function
    fontSize: keyof typeof fontSizes
}

const Button : React.FC<ButtonProps> = ({title, onClick, fontSize}) => {
    return <button className={`dse-button-container dse-button-container_${fontSize}`} onClick={(e) => onClick(e)}>{title}</button>
}

export default Button;