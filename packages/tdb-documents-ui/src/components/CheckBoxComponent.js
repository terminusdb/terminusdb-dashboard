
import React from "react"
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

export const TDBCheckBox = ({ checked, checkBoxKey, name, onChange }) => {
  
  /*return <> 
    <input type="radio" 
      id={checkBoxKey} 
      checked={ checked === name ? true : false }
      onChange={(e) => onChange(name)}
      /> 
    <label for={checkBoxKey}>{name}</label>
  </>*/

 return <Form.Check
    inline
    checked={ checked === name ? true : false }
    label={name}
    name={checkBoxKey}
    htmlFor={checkBoxKey}
    for={checkBoxKey}
    type={"radio"} 
    id={checkBoxKey}
    key={checkBoxKey}
    onChange={(e) => onChange(name)}
  /> 
}