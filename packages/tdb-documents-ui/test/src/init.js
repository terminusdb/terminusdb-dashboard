import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const InitContext = React.createContext()
export const InitObj = () => useContext(InitContext)
import {getFrames, getDocumentClasses, getDocumentData} from "./utils"
import {CREATE} from "./constants"

export const InitProvider = ({children, config}) => {

    const [tdbClient, setTDBClient] = useState(false)
    const [connectionError, setConnectionError] = useState(false)
    const [frames, setFrames] = useState(false)

    // get document class list 
    const [documentClasses, setDocumentClassList]= useState(false)
    // get document ID 
    const [documentID, setDocumentID]=useState(false)
   
    // Frame Viewer constants 
    const [uiFrames, setUIFrames]=useState({})
    const [mode, setMode]=useState(CREATE)
    const [type, setType]=useState(false)
    const [data, setData]=useState({})

    // UI constants
    const [loading, setLoading]=useState(true)
    const [successMsg, setSuccessMsg]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)

    /* Connect to TerminusDB using TerminusDB Client */
    const initClient = async (setFrames, setConnectionError)=>{
        const client = new TerminusDBClient.WOQLClient(`${config.server}${config.team}/`, {
            user: config.user,
            organization: config.team
        })
        client.setApiKey(config.token)
        client.db(config.dataProduct)
        getFrames (client, config.dataProduct, setFrames, setConnectionError)
        getDocumentClasses(client, setDocumentClassList, setConnectionError)
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

    /* When document class type is selected from UI */
    useEffect(() => {
        if(!documentClasses) return 
        if(Array.isArray(documentClasses) && documentClasses.length > 0) { // by default show first document 
            setType(documentClasses[0]["@id"])
        }
    }, [documentClasses])

    /* When document ID is entered from UI */
    useEffect(() => {
        if(!documentID) return 
        if(!tdbClient) return
        if(mode === CREATE) setData({})
        else getDocumentData(tdbClient, documentID, setData, setConnectionError)
    }, [documentID, mode])
    
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
                setMode,
                mode,
                type,
                setType,
                uiFrames,
                setUIFrames,
                documentClasses,
                data, 
                setData,
                documentID, 
                setDocumentID
            }}
        >
            {children}
        </InitContext.Provider>
    )
}
