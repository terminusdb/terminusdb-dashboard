import React, {useState} from "react"
import * as CONST from "./constants"
import { ErrorDisplay } from "./ErrorDisplay"
import { DisplayErrorPerProperty } from "./ErrorDisplay"
import {Alerts} from "./Alerts"

// I put the listener for error in another component so we not lost the data inside the 
// form
// we review this better 
export const ErrorMessageReport = ({error,setError})=>{
     return <FormatErrorMessages error={error} setError={setError}/>
}

const checkType = (error) =>{
    let className
    let predicate
    switch(error["@type"]){
        case "instance_not_cardinality_one":
            className = error['instance']
            let classId
            if(typeof className === "string"){
            classId= className.substring(0, className.lastIndexOf("/")+1)
            }
            error.message = `you can not add a MANDATORY property, there are instances of the Document  ${classId}`
            break;
        case "invalid_predicate":
            className = error['class']
            predicate = error['predicate']
            error.message =  `There are instances of the document ${className} `
            break;
        case "not_a_class_or_base_type":
            className = error['class']
            predicate = error['predicate']
            error.message = `${className} is not a class or a base type`
            break;
  }
}

export const FormatErrorMessages = ({error, setError}) => {
    function getMessage(){
        if(!error) return "No error message"
        // if it is not an object I return the error 
        if(typeof error !== "object") return error
        // if is an object but do not have message I return the json stringfy
        if(!error.hasOwnProperty("api:message")) {
            return JSON.stringify(error)
        }

        let message = error["api:message"]
        let errorElements = []
        if(error["api:error"]) {
            if(Array.isArray(error["api:error"]["api:witnesses"])) {
                error["api:error"]["api:witnesses"].map((err,index) => {

                if(err.hasOwnProperty("constraint_name")) {
                            // CONSTRAINT ERRORS
                    let propertyName = err["constraint_name"]
                    let errorType = `${err["@type"]} on `
                    let message = err.message

                            errorElements.push(
                                <DisplayErrorPerProperty key={`error__${index}`} propertyName={propertyName} message={message} errorType={errorType}/>
                            )
                        }
                        else {
                            if(err.hasOwnProperty("@type")) {
                                checkType(err)
                                errorElements.push(
                                    JSON.stringify(err, null, 2)
                                )
                            }
                            else {
                                // OTHER TYPE ERRORS
                                for(let items in err) {
                                    let propertyName = items
                                    let errorType = err[propertyName].hasOwnProperty("@type") ? `${err[propertyName]["@type"]} on ` : `Error occured on`
                                    let message = JSON.stringify(err[propertyName], null, 2)
                                    errorElements.push(
                                        <DisplayErrorPerProperty key={`error__${index}`} propertyName={propertyName} message={message} errorType={errorType}/>
                                    )
                                }
                            }
                        }
                    })   
                }else{
                    const errorObj = error["api:error"]
                    if(errorObj.hasOwnProperty("@type")) {
                        checkType(errorObj)
                        errorElements.push(
                            JSON.stringify(errorObj, null, 2)
                        )
                    }
                }
            }
        return <ErrorDisplay errorData={errorElements} message={message} css={CONST.ERROR_MORE_INFO_CLASSNAME}/>
    }

    const errorComp = getMessage()
    return <Alerts message={errorComp} type={CONST.TERMINUS_DANGER} onCancel={setError}/>
}


