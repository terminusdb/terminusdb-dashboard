import React from "react"
import { FORM_GROUP_STYLE } from "../../constants/component-styles"

export const FormGroupComponent = ({ groupClassName, labelComponent, helpComponent, errorComponent, fieldComponent }) => {
  return  <>
    <div className={`${groupClassName} d-flex`}>
      {labelComponent && <div style={FORM_GROUP_STYLE} >
        {labelComponent}
        {helpComponent}
      </div>}
      {fieldComponent}
    </div>
    <div>{errorComponent}</div>
  </>
}