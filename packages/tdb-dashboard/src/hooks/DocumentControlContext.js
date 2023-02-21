import React, {useState, useEffect, useContext} from 'react'
export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
import {WOQLClientObj} from '../init-woql-client'
import * as CONST from "../components/constants"
import { ErrorDisplay } from "../components/ErrorDisplay"
import { DisplayErrorPerProperty } from "../components/ErrorDisplay"

export const DocumentControlProvider = ({children}) => {

    const { 
        accessControlDashboard
    } = WOQLClientObj()

    // access control constants based on access control priviliges
    const [actionControl, setActionControl]=useState({})
    // constants to display document body in Form or JSON View
    const [view, setView]=useState(CONST.FORM_VIEW)
    // constant to maintain state of json object between form & JSON View
    const [jsonContent, setJsonContent]=useState(false)
    // constant to show document frames in document interface
    const [showFrames, setShowFrames]=useState(false)

    useState(() => {
        if(accessControlDashboard) { 
            let control={
                read: false,
                write: false
            }
            if(accessControlDashboard.instanceRead()) {
                control.read=true
            }
            if(accessControlDashboard.instanceWrite()) {
                control.write=true
            }
            setActionControl(control)
        }
    }, [accessControlDashboard])

    

    // function to format and display errors in document Interface
    function formatErrorMessages (error) {

        if(!error.hasOwnProperty("api:message")) return error

        let message = error["api:message"]
        let errorElements = []
        if(error["api:error"]) {
            if(Array.isArray(error["api:error"]["api:witnesses"])) {
                error["api:error"]["api:witnesses"].map(err => {

                    if(err.hasOwnProperty("constraint_name")) {
                        // CONSTRAINT ERRORS
                        let propertyName = err["constraint_name"]
                        let errorType = `${err["@type"]} on `
                        let message = err.message

                        errorElements.push(
                            <DisplayErrorPerProperty propertyName={propertyName} message={message} errorType={errorType}/>
                        )
                    }
                    else {
                        if(err.hasOwnProperty("@type")) {
                            errorElements.push(
                                <pre>{JSON.stringify(err, null, 2)}</pre>
                            )
                        }
                        else {
                            // OTHER TYPE ERRORS
                            for(let items in err) {
                                let propertyName = items
                                let errorType = err[propertyName].hasOwnProperty("@type") ? `${err[propertyName]["@type"]} on ` : `Error occured on`
                                let message = JSON.stringify(err[propertyName], null, 2)
                                errorElements.push(
                                    <DisplayErrorPerProperty propertyName={propertyName} message={message} errorType={errorType}/>
                                )
                            }
                        }
                    }
                })   
            }
        }
        return <ErrorDisplay errorData={errorElements} message={message} css={CONST.ERROR_MORE_INFO_CLASSNAME}/>
    }

    return (
        <DocumentControlContext.Provider
            value={{
                view, 
                setView,
                actionControl,
                jsonContent, 
                setJsonContent,
                showFrames, 
                setShowFrames,
                formatErrorMessages
            }}
        >
            {children}
        </DocumentControlContext.Provider>
    )
}

