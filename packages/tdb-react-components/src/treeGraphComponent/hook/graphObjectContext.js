import React, {useState,useEffect,useContext} from "react";
import {MainGraphObject} from "../MainGraphObject"
import {CLASS_TYPE_NAME} from "../utils/elementsName"
import { ADD_PARENT } from '../utils/actionType' 

export const GraphContext = React.createContext()
export const GraphContextObj = () => useContext(GraphContext)

export const GraphObjectProvider = ({mainGraphDataProvider,children,dbName,setError}) => {

	const [graphDataProvider, setGraphDataProvider] = useState(null);
	const [selectedNodeObject, setSelectedNodeObject] = useState({});
	const [nodePropertiesList, setNodePropertiesList] = useState([]); 

	const [isFocusOnNode, setFocusOnNode] = useState(false);
	const [objectPropertyToRange,setObjectPropertyToRange]=useState({})

	const [objectChoicesList, setObjectChoicesList] = useState([]);
	const [objectPropertyList, setObjectPropertyList] = useState([]);

	const [objPropsRelatedToClass,setObjPropsRelatedToClass]=useState([]);

	const [mainGraphObj, setMainGraphObj] = useState(null);

	const [graphUpdateLabel, setGraphUpdateLabel] = useState(null);

	const [classesListArr, setClassesListArr] = useState(null);
	const [entitiesListArr, setEntitiesListArr] = useState(null);
	const [availableParentsList, setAvailableParentsList] = useState({})
	const [availableChildrenList, setAvailableChildrenList]= useState({})
	

	const [needToSave, setNeedToSave] = useState(false)
	const [resetGraph, setResetGraph] = useState()
	//let mainGraphObj;


	const updateMainGraphData = (mainGraph) =>{
		const mainGraphObject= new MainGraphObject(mainGraph,dbName);
		setMainGraphObj(mainGraphObject)
		//console.log("mainGraphObject.getDescendantsNode()", mainGraphObject.getDescendantsNode())
		//console.log("mainGraphObject.getObjectChoices()", mainGraphObject.getObjectChoices())
		//console.log("mainGraphObject.getObjectProperties()", mainGraphObject.getObjectProperties())
		//console.log("mainGraphObject.objectPropertyToRange()", mainGraphObject.objectPropertyToRange())
		setGraphDataProvider(mainGraphObject.getDescendantsNode()) 
		setObjectPropertyList(mainGraphObject.getObjectProperties())
		setObjectChoicesList(mainGraphObject.getObjectChoices()) 
		setObjectPropertyToRange(mainGraphObject.objectPropertyToRange())
		resetSelection() 
	}
	/*
	* create the mainGraphObject and format the data
	*/
	useEffect(() => {
		try{
			//setGraphDataProvider(null)
			updateMainGraphData(mainGraphDataProvider)
		//}
		}catch(err){
			setGraphDataProvider(null)
			resetSelection()
			if(setError)setError({status:'error',message:`ERROR IN DRAWING SCHEMA:  ${err.message}`})
			console.log("READ SCHEMA ERROR",err.message)
		}

	}, [mainGraphDataProvider,resetGraph])

	const resetSelection=()=>{
		setSelectedNodeObject({})
		setNodePropertiesList([])
		setObjPropsRelatedToClass([])
		setAvailableParentsList({})
		setAvailableChildrenList({})
	}

	const changeCurrentNode=(nodeId,focusOnNode=false)=>{
		if(selectedNodeObject.type===CLASS_TYPE_NAME.CHOICE_CLASS && 
			selectedNodeObject.choices && selectedNodeObject.choices.length===0){
			
			alert(`Please add at least one value at the node ${selectedNodeObject.label || selectedNodeObject.id}`)
			return
		}
		setFocusOnNode(focusOnNode);
		if(nodeId===null){
			resetSelection() 
		}else if(mainGraphObj && mainGraphObj.getElement(nodeId)){
			setSelectedNodeObject(mainGraphObj.getElement(nodeId));
			//I not need this there are inside the json schema
			 
			setNodePropertiesList(mainGraphObj.getPropertyListByDomain(nodeId)); 
			setObjPropsRelatedToClass(mainGraphObj.getObjPropsRelatedToClass(nodeId))
			
			//I NEED THE AVALAIBLE PARENT LIST 
			setAvailableParentsList(mainGraphObj.getAvailableParentsList(nodeId))
			// SET AVAILABLE CHILDREN LIST 
			setAvailableChildrenList(mainGraphObj.getAvailableChildrenList(nodeId))
		}
	}

	const setNodeAction=(actionName,nodeName=null,focusOnNode=false)=>{
		const node_name=nodeName || selectedNodeObject.name;
		const nodeObject=mainGraphObj.nodeApplyAction(actionName,node_name);
		changeCurrentNode(nodeObject.name,focusOnNode);
	}

	function getOneOfPropertyList(tempPropertiesList) {
		let oneOfFiltered = tempPropertiesList.filter(arr => arr.id === "@oneOf") 
		if(oneOfFiltered.length && 
			oneOfFiltered[0].hasOwnProperty("PropertyList") && 
			oneOfFiltered[0]["PropertyList"]) return oneOfFiltered[0]["PropertyList"]
		else return []
	}

	const addNewProperty=(propertyType, propertyRange, oneOfDomain)=>{ 
		const propertiesList=mainGraphObj.addNewPropertyToClass(selectedNodeObject.name, propertyType, propertyRange, oneOfDomain);
		let tempPropertiesList = [...propertiesList]
		let oneOfProperties=getOneOfPropertyList(tempPropertiesList), newPropertiesList=[] 
		tempPropertiesList.map(arr => {
			if(arr.oneOfDomain) {
				if(!oneOfProperties[arr.oneOfDomain.key]) {
					oneOfProperties[arr.oneOfDomain.key] = {}
					oneOfProperties[arr.oneOfDomain.key][arr.name] = arr
				}
				else { 
					oneOfProperties[arr.oneOfDomain.key][arr.name] = arr
				}
				//oneOfProperties.push(arr)
			}
			else newPropertiesList.push(arr)
		})
		if(oneOfProperties.length) {
			newPropertiesList.map(newProps => {
				if(newProps.type === 'OneOfProperty') {
					newProps["PropertyList"]=oneOfProperties
				}
			})
		}
		

		setNodePropertiesList(newPropertiesList)
		//setNodePropertiesList(propertiesList)
	}
	
	const removeElement=(elementId,elementType)=>{
		switch(elementType){
			case CLASS_TYPE_NAME.OBJECT_CLASS:
			case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			case CLASS_TYPE_NAME.CHOICE_CLASS:
				mainGraphObj.removeElementInMainGraph(selectedNodeObject.name);
				resetSelection()
				break; 
			default:
				const propertiesList=mainGraphObj.removePropertyToClass(selectedNodeObject.name,elementId);
				setNodePropertiesList(propertiesList);
		}
		
	}

	const updateGraphNode = ()=>{setGraphUpdateLabel(Date.now())}
	
	const updateParentsList =(parentName, action)=>{  
		mainGraphObj.updateNodeParents(selectedNodeObject.name, parentName, action) 
		setAvailableParentsList(mainGraphObj.getAvailableParentsList(selectedNodeObject.name))
		setGraphUpdateLabel(Date.now());
	}

	const updateChildrenList = (currentNode, childName, action) => {
		if(currentNode.type==="Group"){
			//no need to add in the schema 
			currentNode.children.push(newNodeObj);
		} 
		else {
			mainGraphObj.updateNodeChildren(selectedNodeObject.name, childName, action)
			// currentNode is the parent node
			//currentNode.children.push(childName);
	    //currentNode.allChildren.push(childName);
			// review 
			//mainGraphObj.updateNodeParents(childName, currentNode.name, ADD_PARENT)
		}
		/**
		 * //add children action 
        	 	newNodeObj=getNewNodeTemplate(null,elementType)//_graphUpdateObject.addNodeToTree(currentNode,null,isChoiceClass);

        	 	if(currentNode.type==="Group"){
					//not need to add in the schema 
        	 		currentNode.children.push(newNodeObj);
	        	}else {
	        		/*
	        		* currentNode is the parent node
	        	 	*/
	        	 	/*currentNode.children.push(newNodeObj);
	        	 	currentNode.allChildren.push(newNodeObj);
					
					newNodeObj.schema['@inherits']=currentNode.id
					//name is the node name it can be different form the id
					//we use name for identify in unique way the node
					newNodeObj.parents.push(currentNode.name)

	        	}
        	 }
		 */
	}
	

	const getSchemaGraph=()=>{
		if(!mainGraphObj) return
		return mainGraphObj.getSchema()
	}

	const resetTreeModel=()=>{
		updateMainGraphData(mainGraphDataProvider) 
	}


	// returns back order_by list to display property 
	const getDocumentOrdering = () => {
		if(selectedNodeObject && 
			selectedNodeObject.schema && 
			selectedNodeObject.schema.hasOwnProperty("@metadata") && 
			selectedNodeObject.schema["@metadata"].hasOwnProperty("order_by"))
			return selectedNodeObject.schema["@metadata"]["order_by"]
		return null
	}



	return (
		<GraphContext.Provider
            value={{
			updateGraphNode,
            resetTreeModel,
						getDocumentOrdering,
            mainGraphObj,
            objectPropertyToRange,
	        graphDataProvider, 
	        selectedNodeObject,
	        nodePropertiesList,
	        graphUpdateLabel,
	        changeCurrentNode,
	        setNodeAction,
	        addNewProperty,
	        removeElement,
	        objectPropertyList,
	        objPropsRelatedToClass,
	        getSchemaGraph,
	        updateParentsList,
					updateChildrenList,
	        availableParentsList,
					availableChildrenList,
	        objectChoicesList,
	        isFocusOnNode,
	        needToSave,
					dbName,
			updateMainGraphData
	    	}}>
	     {children}
        </GraphContext.Provider>

        //entitiesListArr,
        //classesListArr
    )
}	

