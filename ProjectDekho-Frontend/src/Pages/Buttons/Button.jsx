import React from 'react'
import './Button.css'
import { Button as TailwindButton } from "@material-tailwind/react";
function Button({value,func}) {
   
    return (
        <TailwindButton className="liner-color" onClick={func}>{value}</TailwindButton>


    )
}

export default React.memo(Button)