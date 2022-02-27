import React from "react";
import { inputTypes } from '@ds.e/foundations';
import { fontSizes } from '@ds.e/foundations';

interface inputPros {
    type: keyof typeof inputTypes,
    size: keyof typeof fontSizes,
    placeHolder: string,
    value: string,
    onChange?: Function
}

const Input:React.FC<inputPros> = ({type, size, placeHolder, value, onChange}) => {
    return <input className={`dse-input-${type} dse-input-${type}_${size}`} type={type} placeholder={placeHolder} value={value} onChange={(e) => onChange && onChange(e)}></input>
};

export default Input;