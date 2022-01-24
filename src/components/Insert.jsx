import React from "react";
import './Insert.css'


export default function Insert (props){
    if (props.value === " "){
        return (
        <div>
            <textarea className='input' readOnly={true} value=''></textarea>
        </div>)
    }
    else{
    return (
        <div>
            <textarea style={props.style} className='input' value={props.typed} onChange={event=>props.setTyped(event.target.value)}></textarea>
        </div>
    )}
}