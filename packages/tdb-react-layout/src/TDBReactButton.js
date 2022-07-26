import React from "react"
//import {Button} from '@themesberg/react-bootstrap';
import {Button} from 'react-bootstrap';
import {TDBReactBadge} from "./TDBReactBadge"

export const TDBReactButton= (props) =>{
    let config=props.config || {}
    let size=config.size || "sm" 
    var icCss
    if(config.icon && config.label) icCss="me-2"
    else icCss=""
    const iconName=config.icon ? `${config.icon} ${icCss}` : null
    let css = props.className || ''
    

  /*  const onClick = (evt)=>{
      const id = evt.currentTarget.id
      if(props.onClick)props.onClick(id)
      
    }

    return <Button id={props.id} onClick={onClick} bsPrefix="text" href="#primary"  className="m-1" key={`Buttons_${config.title}`} size={size}>
      <i className=iconName}/>
      {config.title}
    </Button>*/

    function handleOnClick(e) {
      if(props.onClick) props.onClick(e.target.id)
    }

    return <React.Fragment>
        {(config.type == "link") && <Button className={"mr-1 mb-1 m-1 " + css} 
            key={`Buttons_${config.title}`} 
            size={size} 
            variant={config.variant} 
            title={config.title}
            id={config.id} 
            bsPrefix="text" 
            href="#primary" 
            onClick={handleOnClick}>
              {iconName && <i className={iconName}/>}
              {config.label}
        </Button>}
        {(config.type != "link") && 
         <Button className={"mr-1 mb-1 m-1 " + css} key={`Buttons_${config.title}`} size={size} variant={config.variant} title={config.title} id={config.id} onClick={handleOnClick}>
          {iconName && <i className={iconName}/>}
          {config.label}
          {props.badge && <TDBReactBadge title={config.count}/>}
        </Button>}
    </React.Fragment>
}
