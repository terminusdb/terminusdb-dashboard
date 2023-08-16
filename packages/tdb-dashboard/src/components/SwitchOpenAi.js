
import React, { useState } from "react"
import Form from "react-bootstrap/Form";
import { RadioButton } from "./RadioButton"
import Stack from "react-bootstrap/Stack";
import * as cyCONST from "../cypress.constants"

export function SwitchOpenAi({ status, changeOpenAIStatus, title, isAdmin }) {
  const [currentStatus,setStatus] = useState(status === "active" ? true : false)

  async function onChange(action){
    let stat = action==="Active" ? true : false
    setStatus(stat)
    if(changeOpenAIStatus)changeOpenAIStatus(stat)
  }

  const getActiveClassName = (radioLabel, radioValue) => {
    if(radioLabel === "ON" && radioValue) return `btn fw-bold bg-success text-black`
    if(radioLabel === "OFF" && !radioValue) return `btn fw-bold bg-warning text-black`
    return `bg-secondary text-white`
}

  const radios = [
    { name: 'OpenAI Active', label: "ON", value: 'Active' , title:'Activate Indexing', dataCy: cyCONST.OPENAI_ACTIVE, className: 'rounded-left'},
    { name: 'OpenAI Inactive', label: "OFF", value: 'Inactive' , title:'Deactivate Indexing', dataCy: cyCONST.OPENAI_INACTIVE, className: 'rounded-right'},
  ];

  if(!isAdmin) return <div/>

  return <Stack direction="horizontal" gap={2}>
    <label title="title">{title}</label>
    <RadioButton radioList={radios} 
      radioValue={currentStatus} 
      onChange={onChange}
      getActiveClassName={getActiveClassName}/>
  </Stack>

  /*return <Form> 
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
      onChange={onChange}/>*/
  
}