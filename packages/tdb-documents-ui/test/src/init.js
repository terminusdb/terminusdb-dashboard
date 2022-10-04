import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const InitContext = React.createContext()
export const InitObj = () => useContext(InitContext)
import {getFrames, getDocumentClasses, getDocumentData} from "./utils"
import {CREATE} from "./constants"


export const InitProvider = ({children, config}) => {

    let feature={   
      "@id": "FeatureCollection/ca76d705a0c007493a2f4884bb04aa9b8aaf741cfbe0c0dfef87e8a499d78f1c",
      "@type": "FeatureCollection",
      "type": "FeatureCollection",
      "properties": {},
      "crs": {},
      "features": [
        {
          "@id": "Feature/a43c45ab08988b464908939436d3424343050aa9ba63bdb45c5d921ca815687a",
          "@type": "Feature",
          "type": "Feature",
          "centerline": {
            "@id": "LineString/50f8181931ac9c650a73d279ee20a386a83aa7793e92a8dc0c03521ee783849a",
            "@type": "LineString",
            "coordinates": [
              [
                51.505,
                -0.09
              ],
              [
                51.51,
                -0.1
              ],
              [
                51.51,
                -0.12
              ]
            ],
            "type": "LineString"
          },
          "geometry": {
            "@id": "LineString/50f8181931ac9c650a73d279ee20a386a83aa7793e92a8dc0c03521ee783849a",
            "@type": "LineString",
            "coordinates": [
              [
                51.505,
                -0.09
              ],
              [
                51.51,
                -0.1
              ],
              [
                51.51,
                -0.12
              ]
            ],
            "type": "LineString"
          },
          "id": "featuretest",
          "properties": {},
          "title": "feature"
        },
        {
          "@id": "Feature/2354697e35684f9b0d84679ffc03882b0a5135a420dafe4d8ddf76ccc4b7fb77",
          "@type": "Feature",
          "type": "Feature",
          "centerline": {
            "@id": "Point/909d8b2c68bfb0fd0d144e0ea41cdc0e1a8b04fd44d0e393dfd623ecc5f3939a",
            "@type": "Point",
            "coordinates": [
              10.1238838,
              76.30943
            ],
            "type": "Point"
          },
          "geometry": {
            "@id": "Point/909d8b2c68bfb0fd0d144e0ea41cdc0e1a8b04fd44d0e393dfd623ecc5f3939a",
            "@type": "Point",
            "coordinates": [
              10.1238838,
              76.30943
            ],
            "type": "Point"
          },
          "id": "featurePointInds",
          "properties": {},
          "title": "featurePointInds"
        }
      ],
      "name": "featurecollectiontest"
    }

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
    const [data, setData]=useState(feature)

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
