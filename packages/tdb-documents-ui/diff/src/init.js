import React, {useState, useEffect, useContext} from 'react'
const TerminusDBClient = require("@terminusdb/terminusdb-client")
export const InitContext = React.createContext()
export const InitObj = () => useContext(InitContext)
import {getFrames, getDocumentClasses} from "./functions"


export const InitProvider = ({children, config}) => { 
 
	const [tdbClient, setTDBClient] = useState(false)
	const [connectionError, setConnectionError] = useState(false)
	const [frames, setFrames] = useState(false)

	// connected data product constants
	const [dataProduct, setDataProduct]=useState(config.dataProduct)

	// get document class list 
	const [documentClasses, setDocumentClassList]= useState(false)
	
	// Frame Viewer constants 
	const [type, setType]=useState(false)

	// Message constants
	const [message, setMessage]=useState(false)

	// diff constants 
	const [diff, setDiff]=useState(false)
    const [doc, setDoc]=useState(false)
	
	/* Connect to TerminusDB using TerminusDB Client */
	const initClient = async (setFrames, setConnectionError)=>{
		const client = new TerminusDBClient.WOQLClient(`${config.server}${config.team}/`, {
			user: config.user,
			organization: config.team
		})
		client.setApiKey(config.token)
		setDataProduct(config.dataProduct)
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

	/* Connect to data product */
	useEffect(() => { 
		if(dataProduct && tdbClient) {
			clear()
			tdbClient.db(dataProduct)
			getFrames (tdbClient, dataProduct, setFrames, setConnectionError)
			getDocumentClasses(tdbClient, setDocumentClassList, setConnectionError)
		}
	}, [tdbClient, dataProduct])

	/* When document class type is selected from UI */
	useEffect(() => {
		if(!documentClasses) return 
		if(Array.isArray(documentClasses) && documentClasses.length > 0) { // by default show first document 
			setType(documentClasses[0]["@id"])
		}
	}, [documentClasses])

	/** function to clear constants */
	const clear = () => {
		setDiff(false)
        setDoc(false)
	}

	return (
		<InitContext.Provider
			value={{
				tdbClient,
				frames,
				setFrames,
				connectionError,
				type,
				setType,
				documentClasses,
				dataProduct, 
				setDataProduct,
				message, 
				setMessage,
				diff, 
				setDiff,
    			doc, 
				setDoc,
				clear
			}}
		>
			{children}
		</InitContext.Provider>
	)
}
