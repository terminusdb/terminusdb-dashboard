import React from "react"
import { Form, InputGroup } from '@themesberg/react-bootstrap';

export const TDBReactTextArea = (props) =>{
    let config=props.config || {}
    let label=props.config.label || ""
    let type=props.config.type || "text"
    let placeholder=props.config.placeholder || ""
    var icCss
    if(config.icon && config.label) icCss="me-2"
    else icCss=""
    const iconName=config.icon ? `${config.icon} ${icCss}` : null

    function handleOnChange(e) {
      if(props.onChange) props.onChange(e.target.value)
    }

    

    return <Form>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          {/*iconName && <i className={iconName}/>*/}
          <Form.Control type={type} placeholder={placeholder} onChange={(e) => handleOnChange(e)}/>
        </InputGroup>
      </Form.Group>
    </Form>
}
