import React, {useState, useEffect, useContext} from 'react'
import {WOQLClientObj} from '../init-woql-client'
import * as CONST from "../components/constants"
import {sortAlphabetically} from "../components/utils"
import {getTotalNumberOfDocuments} from "../queries/GeneralQueries"
import {useParams} from "react-router-dom"

export const DocumentControlContext = React.createContext()
export const DocumentControlObj = () => useContext(DocumentControlContext)
export const DocumentControlProvider = ({children}) => {
    const {dataProduct,id} = useParams()
    const { 
        accessControlDashboard,
        woqlClient
    } = WOQLClientObj()

    // access control constants based on access control priviliges
    const [actionControl, setActionControl]=useState({})
    // constants to display document body in Form or JSON View
    const [view, setView]= useState(CONST.FORM_VIEW)
    // constant to maintain state of json object between form & JSON View
    const [jsonContent, setJsonContent]=useState(false)
    // constant to show document frames in document interface
    const [showFrames, setShowFrames]=useState(false)

    const [error, setError] = useState(false)
    // when we are doing some server call
    const [loading, setLoading] = useState(false)

    const [documentClasses, setDocumentClasses] = useState(false)
    const [perDocumentCount, setPerDocument]=useState(false)
    const [totalDocumentCount, setTotalDocumentCount]=useState(false)
    // null nothing is done
    // object - complete
    // false - failed
    const [documentTablesConfig,setDocumentTablesConfig]=useState(null)
    const [frames, setFrames]=useState(null)

    //get all the Document Classes (no abstract or subdocument)
    // I can need to call this again
    // improve performance with check last commit
    async function getUpdatedDocumentClasses() {
        try{
        // to be review I'm adding get table config here
            if(woqlClient){
                setLoading(true)
                const dataProduct = woqlClient.db()
                // the list of classes
                const classDocumentsResult = await woqlClient.getClassDocuments(dataProduct)
                const classDocumentOrder=sortAlphabetically(classDocumentsResult, true) 
                const totalQ=getTotalNumberOfDocuments(classDocumentsResult)
                //give me back count with the total documents number and total for classes too
                const totalDocumentCount = await woqlClient.query(totalQ)
                //get the total number
                const getTotal = totalDocumentCount.bindings[0].Count["@value"]
                delete totalDocumentCount.bindings[0].Count
                
                setDocumentClasses(classDocumentOrder)
                setTotalDocumentCount(getTotal)
                //pass the count per class
                setPerDocument(totalDocumentCount.bindings[0])
                setLoading(false)
            } 
        }catch(err){
            setError(err.message)
            setLoading(false)
            console.log("Error in init woql while getting classes of data product", err.message)
        }
    }
    // I need this in all the page, 
    // so I get this in the context at the start
    // this will be available in all the page
    // but he need to be change if something is updated ???
    useEffect(() => {
        getUpdatedDocumentClasses()
    },[dataProduct])

    //we do this call anly ones if there is any document id and the
    //frame is not set 
    useEffect(() => {
        // data product change this have to change too
        if(id && frames === null) getUpdatedFrames()
    },[id])

    function getGraphqlTableConfig ( ){
        if(woqlClient){
            setLoading(true)
            const clientCopy = woqlClient.copy()
            clientCopy.connectionConfig.api_extension = 'api/'
            const baseUrl = clientCopy.connectionConfig.dbBase("tables")
            clientCopy.sendCustomRequest("GET", baseUrl).then(result=>{
                setDocumentTablesConfig(result)  
            }).catch(err=>{
                console.log(err)
                setDocumentTablesConfig(false)
            }).finally(setLoading(false))
        }
    }

    //when I change a dataProduct I change the user actions
    function getUpdatedFrames() {
        if(woqlClient){
            const dataProduct = woqlClient.db()
            woqlClient.getSchemaFrame(null, dataProduct).then((res) => {
                setFrames(res)
            })
            .catch((err) =>  {
                setFrames(false)
                console.log("Error in init woql while getting data frames of data product", err.message)
            })
        }
    }

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
                getUpdatedFrames,
                actionControl,
                jsonContent, 
                setJsonContent,
                showFrames, 
                setShowFrames,
                loading,
                getUpdatedDocumentClasses,
                error,
                perDocumentCount,
                totalDocumentCount,
                documentClasses,
                getGraphqlTableConfig,
                documentTablesConfig,
                frames

            }}
        >
            {children}
        </DocumentControlContext.Provider>
    )
}

