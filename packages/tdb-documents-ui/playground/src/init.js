import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const InitContext = React.createContext()
export const InitObj = () => useContext(InitContext)
import {getFrames} from "./utils"
import {MANDATORY, MANDATORY_DOCUMENT, DIFF_VIEWER} from "./menu.constants"
import {CREATE} from "./constants"
import {
    setDocumentType, 
    setExampleCodeData,
    setModeData,
    setLinkData,
    getInfoMessage,
    setExampleUIFrames
} from "./actions"

export const InitProvider = ({children, config}) => {

    const [tdbClient, setTDBClient] = useState(false)
    const [connectionError, setConnectionError] = useState(false)
    const [frames, setFrames] = useState(false)
    const [menuItem, setMenuItem] = useState(MANDATORY)
    
    // Frame Viewer constants 
    const [uiFrames, setUIFrames]=useState({})
    const [mode, setMode]=useState(CREATE)
    const [type, setType]=useState(MANDATORY_DOCUMENT)
    const [data, setData]=useState({})

    // more info off canvas constants 
    const [showCode, setShowCode]=useState(Date.now())
    const [showMoreInfo, setShowMoreInfo]=useState(false)
    const [exampleCode, setExampleCode]=useState(false)
    const [links, setLinks]=useState(false)
    const [infoMessage, setInfoMessage]=useState(false)

    // UI constants
    const [loading, setLoading]=useState(true)
    const [successMsg, setSuccessMsg]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)

    // language constants
    const [language, setLanguage]=useState(false)

    /* Connect to TerminusDB using TerminusDB Client */
    const initClient = async (setFrames, setConnectionError)=>{
        const client = new TerminusDBClient.WOQLClient(`${config.server}${config.team}/`, {
            user: config.user,
            organization: config.team
        })
        client.setApiKey(config.token)
        client.db(config.dataProduct)
        getFrames (client, config.dataProduct, setFrames, setConnectionError)
        setTDBClient(client)
    }

    /* Initialize client */
    useEffect(() => {
        try{
            initClient(setFrames, setConnectionError)
            setLoading(false)
        }
        catch(e) {
            setConnectionError(e)
        }
    }, [])

    /**
     * clears on constanst on change in UI 
     */
    function clearBuffers () {
        setInfoMessage(false)
        setType(MANDATORY_DOCUMENT)
        setData({})
        setExampleCode(false)
        setLinks(false)
        setUIFrames({})
    }

    useEffect (() => {
        if(!frames) return
        clearBuffers()
        getInfoMessage(menuItem, setInfoMessage)
        setDocumentType(menuItem, setType)
        setModeData(menuItem, mode, setData)
        setExampleUIFrames(menuItem, mode, setUIFrames)
        setExampleCodeData(uiFrames, data, menuItem, mode, setExampleCode, language)
        setLinkData(menuItem, mode, setLinks)
    }, [menuItem, mode, frames, language])

    useEffect(() => { // on click of show more info 
        setExampleCodeData(uiFrames, data, menuItem, mode, setExampleCode)
        setLinkData(menuItem, mode, setLinks)
    }, [showCode])

    
    return (
        <InitContext.Provider
            value={{
                tdbClient,
                frames,
                setFrames,
                connectionError,
                successMsg,
                setSuccessMsg,
                errorMsg,
                setErrorMsg,
                loading,
                setLoading,
                menuItem,
                setMenuItem,
                setMode,
                mode,
                type,
                setType,
                uiFrames,
                setUIFrames,
                data,
                setData,
                showMoreInfo, 
                setShowMoreInfo,
                exampleCode,
                links,
                infoMessage,
                setShowCode,
                language, 
                setLanguage
            }}
        >
            {children}
        </InitContext.Provider>
    )
}
