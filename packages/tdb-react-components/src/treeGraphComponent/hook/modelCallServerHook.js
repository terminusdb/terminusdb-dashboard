import React, {useState,useEffect} from "react";
import MainGraphObject from "../MainGraphObject"
import {errorMessageFormatter} from "../../errorMonitoring/ResponseMessageDecoder"

export const modelCallServerHook = (woqlClient,branch,ref,dbId, pendoMsgAfterCreateSchema) => {

	//const [mainGraphDataProvider, setResultMainGraph] = useState({classesResult:null,propsResult:null,restResult:null});*/
	const [mainGraphDataProvider, setResultMainGraph] = useState(false)
	const [reloadGraph, setReloadGraph] = useState(null);

	const [callServerLoading, setLoading] = useState(false);

	const [reportMessage, setReport] = useState(false);


	/*
	* create the mainGraphObject and format the data
	*/
	useEffect(() => {
		const loadGraphData= async ()=> {
			setLoading(true)
			setReport(false)
			let jsonSchema=[]
			const ts = Date.now()
			try{
				
				const params={"as_list":true,"graph_type":"schema"}
				//save with all the context so we can use it for update the schema
				jsonSchema = await woqlClient.getDocument(params)
			}catch(err){
				//tobe review
				const message = errorMessageFormatter(err,err.message)	
				//I have to reset the schema here not in finally 						
				setReport({message:message, status: "error",err: err,time: Date.now() - ts,})
			}finally{
				setResultMainGraph(jsonSchema);
				setLoading(false)
			}	
    	}
    	if(woqlClient)loadGraphData()

	}, [reloadGraph,branch,ref,dbId])

	//lets see how use it

	const validateJSONSchema = (jsonSchema) => { 

		jsonSchema = JSON.parse(jsonSchema);
		// remove context element from array
		jsonSchema.shift();

		for (const element of jsonSchema) {
			//maybe we can trim and remove all the space start and end
			if (!element['@id'] || element['@id'] === '' || element['@id'].indexOf(" ") > -1) {
				throw  {name : "ValidationError", message :'Please enter a valid ID'};
			} 
			
			/*else if (!element['@key'] && element['@type'] === 'Class') {
				throw  {name : "ValidationError", message :`Please enter valid Key in '${element['@id']}' document`};
			} else if (element['@type'] === 'Class' && (element['@key']['@type'] === 'Hash' || element['@key']['@type'] === 'Lexical')) {
				if (!(element['@key']['@fields'] && element['@key']['@fields'].length > 0)) {
					throw  {name : "ValidationError", message :`Please add valid fields for key in '${element['@id']}' document`};
				}
				
				element['@key']['@fields'].forEach(property => {
					if (!Object.getOwnPropertyNames(element).includes(property)) {
						throw  {name : "ValidationError", message :`Field '${property}' does not exists in the document '${element['@id']}'`};
					}
				});			
			}*/ 
			
			else if(element['@type'] === 'Enum' && (!element['@value'] || element['@value'].length === 0)) {
				throw  {name : "ValidationError", message :`Please add '@value' to enum '${element['@id']}'`};
			}

			for (const key in element) {
				if(key===''){
					throw  {name : "ValidationError", message :`Please add a valid property name`};
				}
				if (key.indexOf(" ")>-1) {
					throw  {name : "ValidationError", message :`Please remove all the white space from '${key}' property`};
				}
			}
		}
	}
	
	const saveGraphChanges= async (newSchema,commitMessage)=>{
		if(newSchema!==undefined){
			let ts = Date.now()
			setLoading(true)
			setReport(false)
			const params = {graph_type:'schema',"full_replace":true}
			const commitM=commitMessage || "Update from model builder"
			try{
				validateJSONSchema(newSchema);
				await woqlClient.addDocument(newSchema,params,null,commitM)					

				let msg = `Successfully updated schema graph`
				setReport({
					status: 'success',
					message:  msg,
					time: Date.now() - ts,
				})
     
	            setReloadGraph(Date.now())
			}catch(err){
				//console.log("err", err.message)
				//setError(err.message)
                const message = errorMessageFormatter(err,err.message)	
				//I have to reset the schema here not in finally 						
				setReport({message:message, status: "error",err: err,time: Date.now() - ts,})
			}finally{
				setLoading(false)
			}
		}
	}
	
	return {
        mainGraphDataProvider,
        saveGraphChanges,
        reportMessage,
        callServerLoading,
		setReport,
		setReloadGraph
    }
}	

