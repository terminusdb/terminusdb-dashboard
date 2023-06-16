
import React, { useState } from "react"
import Form from "react-bootstrap/Form";

export function SwitchOpenAi({status,changeOpenAIStatus}) {

  const [currentStatus,setStatus] = useState(status === "active" ? true : false)
  
  async function onChange(evt){
    const tmpStatus = evt.target.checked
    setStatus(tmpStatus)
    if(changeOpenAIStatus)changeOpenAIStatus(tmpStatus)
  }

  return (
        <Form.Check
          type="switch"
          checked={currentStatus}
          id="openai_switch"
          onChange={onChange}
        />
  );
}