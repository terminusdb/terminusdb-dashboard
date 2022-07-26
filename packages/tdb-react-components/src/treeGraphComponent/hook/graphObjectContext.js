import React, {useState,useEffect,useContext} from "react";
import {MainGraphObject} from "../MainGraphObject"
import {CLASS_TYPE_NAME} from "../utils/elementsName"

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

	const [needToSave, setNeedToSave] = useState(false)
	const [resetGraph, setResetGraph] = useState()
	//let mainGraphObj;


	const updateMainGraphData = (mainGraph) =>{
		const mainGraphObject= new MainGraphObject(mainGraph,dbName);
		setMainGraphObj(mainGraphObject)
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
		}
	}

	const setNodeAction=(actionName,nodeName=null,focusOnNode=false)=>{
		const node_name=nodeName || selectedNodeObject.name;
		const nodeObject=mainGraphObj.nodeApplyAction(actionName,node_name);
		changeCurrentNode(nodeObject.name,focusOnNode);
	}

	const addNewProperty=(propertyType,propertyRange)=>{
		const propertiesList=mainGraphObj.addNewPropertyToClass(selectedNodeObject.name,propertyType,propertyRange);
		setNodePropertiesList(propertiesList)
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
	
	const updateParentsList =(parentName,action)=>{
		mainGraphObj.updateNodeParents(selectedNodeObject.name,parentName,action)
		setAvailableParentsList(mainGraphObj.getAvailableParentsList(selectedNodeObject.name))
		setGraphUpdateLabel(Date.now());
	}

	const saveSchemaGraph=()=>{
		return mainGraphObj.getSchema()
	}

	const resetTreeModel=()=>{
		updateMainGraphData(mainGraphDataProvider)
	}


	return (
		<GraphContext.Provider
            value={{
			updateGraphNode,
            resetTreeModel,
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
	        saveSchemaGraph,
	        updateParentsList,
	        availableParentsList,
	        objectChoicesList,
	        isFocusOnNode,
	        needToSave
	    	}}>
	     {children}
        </GraphContext.Provider>

        //entitiesListArr,
        //classesListArr
    )
}	

