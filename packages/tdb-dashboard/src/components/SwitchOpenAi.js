
import React, { useState } from "react"
import Form from "react-bootstrap/Form";

export function SwitchOpenAi({ status, changeOpenAIStatus, title }) {

  const [currentStatus,setStatus] = useState(status === "active" ? true : false)
  
  async function onChange(evt){
    const tmpStatus = evt.target.checked 
    setStatus(tmpStatus)
    if(changeOpenAIStatus)changeOpenAIStatus(tmpStatus)
  }

  return <Form>
    <div key={`default-checkbox`} className="mb-3">
      <Form.Check // prettier-ignore
        type={`checkbox`}
        id={`default-checkbox`}
        className="openai_checkbox"
        label={title}
        checked={currentStatus}
        onChange={onChange}
      />
    </div>
  </Form>
  

  return <Form.Check
      type="checkbox"
      checked={currentStatus}
      id="openai_switch"
      onChange={onChange}/>
  
}