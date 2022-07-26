
import React from "react"
import {Alerts} from "./Alerts"
import {TERMINUS_DANGER} from "./constants"

export const QueryErrors = ({error}) => {

    console.log("error", error)
    return <Alerts message={"there is an error"}/>
}

export const ResultErrors = ({error}) => {
    if(!error) return 
    var message
    if(error && error.error && error.error.data["api:message"]) {
        message=error.error.data["api:message"]
    }
    else {
        message = error
    } 
    return <Alerts message={message} type={TERMINUS_DANGER}/>
}