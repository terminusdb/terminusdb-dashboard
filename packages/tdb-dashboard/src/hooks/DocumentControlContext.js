import React, {useState, useEffect, useContext} from 'react'
export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
import {WOQLClientObj} from '../init-woql-client'
import * as CONST from "../components/constants"
import { ErrorDisplay } from "../components/ErrorDisplay"
import Stack from "react-bootstrap/Stack"


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
        let message = error["api:message"]
        let errorElements = []
        if(error["api:error"]) {
            if(Array.isArray(error["api:error"]["api:witnesses"])) {
                error["api:error"]["api:witnesses"].map(err => {
                    errorElements.push(<Stack className="mb-3">
                        <div className="fw-bold d-flex">
                            {`${err["@type"]} on `}
                            <pre className="alert_danger_border ml-1 p-1 rounded">{err["constraint_name"]}</pre>
                        </div>
                        <div>{err.message}</div>
                    </Stack>)
                })
            }
        }
        return <ErrorDisplay errorData={errorElements} message={message}/>
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

