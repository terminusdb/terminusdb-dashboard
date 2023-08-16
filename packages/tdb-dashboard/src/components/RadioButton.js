import React from "react"
import ButtonGroup from "react-bootstrap/ButtonGroup" 
import ToggleButton from "react-bootstrap/ToggleButton"


export const RadioButton = ({ radioList, radioValue, getActiveClassName, onChange }) => {
  return <>
    <ButtonGroup className="ms-auto">
      {radioList.map((radio, idx) => ( 
      <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          style={{height: "2.5rem"}}
          className={`${radio.className} ${getActiveClassName(radio.label, radioValue)}`}
          data-cy={radio.dataCy}
          title={radio.title}
          variant={"secondary"}
          name={radio.name} // used for cypress testing
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => onChange(e.currentTarget.value)}
      >
          {radio.label.toUpperCase()}
      </ToggleButton>
      ))}
  </ButtonGroup>
  </>
}