import React from "react";
import Insert from './Insert.jsx'



export default function Manager(props){

    if (props.value===' '){
        return (<Insert value=' '></Insert>)
    }
    else {
        if (props.typed === props.sample.substring(0, props.typed.length)){
            return (<Insert value={null} style = {{color:'rgb(255,229,204)'}} typed={props.typed} setTyped = {arg => props.setTyped(arg)}></Insert>)
        }
        else{
            return (<Insert value = {null} style = {{color:'rgb(255,153,153)'}} typed={props.typed} setTyped = {arg => props.setTyped(arg)}></Insert>)
        }
    }

}