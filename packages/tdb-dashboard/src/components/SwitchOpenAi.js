
import React, { useState } from "react"
import Form from "react-bootstrap/Form";

export function SwitchOpenAi({ status, changeOpenAIStatus, title, isAdmin }) {

  const [currentStatus,setStatus] = useState(status === "active" ? true : false)
  
  async function onChange(evt){
    const tmpStatus = evt.target.checked 
    setStatus(tmpStatus)
    if(changeOpenAIStatus)changeOpenAIStatus(tmpStatus)
  }

  return <Form>
    <div key={`default-checkbox`} className="mb-3">
      {isAdmin && <Form.Check // prettier-ignore
        type={`checkbox`}
        id={`default-checkbox`}
        className="openai_checkbox"
        label={title}
        checked={currentStatus}
        onChange={onChange}
      />}
      {!isAdmin && <div class="mb-3"><div class="openai_checkbox form-check">
        <label title="" for="default-checkbox" class="form-check-label">{title}</label>
        </div>
      </div>}
    </div>
  </Form>
  

  return <Form.Check
      type="checkbox"
      checked={currentStatus}
      id="openai_switch"
      onChange={onChange}/>
  
}