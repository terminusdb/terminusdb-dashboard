import React, {  useState } from "react"
import * as util from "../utils"
import { TDBInput } from "../widgets/inputWidgets"
import { TDBBoolean } from "../widgets/booleanWidget"
import { TDBDateTime, TDBDate } from "../widgets/dateWidgets"
import * as TYPE from "../dataType.constants"
import { TDBMarkdown } from "../widgets/markdownWidget"


/** displays widgets according to dataType */
export function display (config) {
  switch(config.dataType) { 
    case TYPE.XSD_BOOLEAN: 
      //XSD_BOOLEAN
      return <TDBBoolean name={config.name} 
        hideFieldLabel={config.hideFieldLabel}
        label={config.documentation.label}
        comment={config.documentation.comment}
        value={config.formData} 
        isKey={config.isKey}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>
    
    case TYPE.XSD_DATE_TIMESTAMP: 
      //XSD_DATE_TIME_STAMP
      return <TDBDateTime name={config.name} 
      value={config.formData} 
      hideFieldLabel={config.hideFieldLabel}
      isKey={config.isKey}
      label={config.documentation.label}
      comment={config.documentation.comment}
      required={config.required}
      mode={config.mode} 
      id={config.id}
      placeholder={config.placeholder} 
      className={config.className} 
      onChange={config.onChange}/>
    
    case TYPE.XSD_DATE_TIME:
      //XSD_DATE_TIME
      return <TDBDateTime name={config.name} 
      value={config.formData} 
      hideFieldLabel={config.hideFieldLabel}
      isKey={config.isKey}
      label={config.documentation.label}
      comment={config.documentation.comment}
      required={config.required}
      mode={config.mode} 
      id={config.id}
      placeholder={config.placeholder} 
      className={config.className} 
      onChange={config.onChange}/>

    case TYPE.XSD_DATE:
        //XSD_DATE
        return <TDBDate name={config.name} 
        value={config.formData} 
        hideFieldLabel={config.hideFieldLabel}
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        isKey={config.isKey}
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>

    case TYPE.MARKDOWN: 
      return <TDBMarkdown name={config.name} 
        value={config.formData} 
        hideFieldLabel={config.hideFieldLabel}
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        id={config.id}
        className={config.className} 
        onChange={config.onChange}/>

    default: 
      // ALL OTHER DATA TYPES
      return <TDBInput name={config.name} 
        value={config.formData} 
        hideFieldLabel={config.hideFieldLabel}
        label={config.documentation.label}
        comment={config.documentation.comment}
        required={config.required}
        mode={config.mode} 
        isKey={config.isKey}
        inputKey={config.key}
        id={config.id}
        placeholder={config.placeholder} 
        className={config.className} 
        onChange={config.onChange}/>
    
  }
}