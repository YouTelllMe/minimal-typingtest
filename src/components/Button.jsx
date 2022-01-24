import React from "react";
import './Button.css'



export default function Button (props){
    
    
    if (props.type === 'START'){
        return <button className='button' onClick={()=>{props.setStart(true)
        }}>{props.type}</button>
    }

    else if (props.type === 'RESET'){
        return (<button id='results' className='button' onClick={(event)=>{
            props.setRandomize(true)
            props.setTyped('')
            props.setDisplayTimer(-500)
            props.setStart(false)
            props.setSource(false)
            props.setData({})
        }}>{props.type}</button>)
    }
}