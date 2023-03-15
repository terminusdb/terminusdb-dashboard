import React, {useState} from "react"
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap';

export const TDBToggleButtonGroup = (props) => {

    let config = props.config || []
    function handleOnClick(id) {
       // e.preventDefault()
       // e.stopPropagation()
        if(props.onClick) props.onClick(id)
      }
    
    const buttonType = props.type || "radio"

    return <ToggleButtonGroup type="radio" name="options" value={props.selected} >
            {config.buttons.map((item) => 
                  <ToggleButton key={`item__${item.id}`} value={item.id} key={item.id}
                    id={item.id} className="btn-light btn-sm mt-1" onClick={(e)=>handleOnClick(item.id)} >
                    {item.icon && <i className={item.icon}/>}
                    {item.label}
                  </ToggleButton>
    
            )}
        </ToggleButtonGroup>
}