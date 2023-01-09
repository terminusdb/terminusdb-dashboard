import React, {useState, useEffect, useContext} from 'react'
export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
import {WOQLClientObj} from '../init-woql-client'
import * as CONST from "../components/constants"

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

    

    return (
        <DocumentControlContext.Provider
            value={{
                view, 
                setView,
                actionControl,
                jsonContent, 
                setJsonContent,
                showFrames, 
                setShowFrames
            }}
        >
            {children}
        </DocumentControlContext.Provider>
    )
}

