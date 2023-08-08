import * as NODE_ACTION_NAME from './utils/actionType';
import {removeElementToArr} from './utils/modelTreeUtils'
import {formatData,
		formatProperties,
		formatDataForTreeChart,
		availableChildrenList,
		availableParentsList,checkLinkProperty,
		addElementToPropertyList} from './FormatDataForTree';
import {getNewNodeTemplate,getNewPropertyTemplate} from './utils/modelTreeUtils'
import {CLASS_TYPE_NAME} from './utils/elementsName' 
import {MANDATORY_PROP, UNIT_TYPE_DATAPROVIDER} from "../constants/details-labels"
import { BiMessageAltError } from 'react-icons/bi';

export const MainGraphObject = (mainGraphDataProvider,dbName)=>{

	//set current node
	let _currentNode = null
	
	let _objectTypeList=[];

	let _documentTypeList=[];

	let _objectChoiceList =[]

	/*
	* properties organized by domain
	* all the properties of a class
	* {domaidName:[{propertyObj001},{propertyObj002}]}
	*/
	let _domainToProperties={};

	/*
	* the list of all the class for the link properties 
	*/
	let _objectPropertyList=[];

	/*
	* Link Properties/Enum Property organized by range
	* {linkedClass:[{nodeName:classId,nodeId:classId,propName:key,propId:key}]
	* LINK PROPERTIES
	*/
	let _objectPropertyToRange={};

	/*
	* all the node elements
	*/
	let _rootIndexObj={}

	let _descendantsNode=new Map();
	// this is an array of objects
	let _mainGraphElementsJson=[];

	const deleteDocList = []
	/*
	* this object registers all the graph changes 
	*/
	//let _graphUpdateObject= new graphUpdateObject();

	//const currentNode = {}

	const getElementsNumber=()=>{
		return {//properties:_propertiesList.size,
		        entities:_documentTypeList.length,
		        classes:_objectTypeList.length,
		    	choiceClasses:_objectChoiceList.length}
	}

	const getObjectProperties=()=>{
		return _objectPropertyList;
	}

	const getObjectChoices=()=>{
		return _objectChoiceList;
	}

	const getRoot=(type=null)=>{
		switch(type){
			case CLASS_TYPE_NAME.OBJECT_CLASS:
			//case CLASS_TYPE_NAME.OBJECT_CLASSES:
				//return _rootIndexObj[CLASS_TYPE_NAME.OBJECT_CLASSES]
			case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			case CLASS_TYPE_NAME.DOCUMENT_CLASSES:
				return _rootIndexObj[CLASS_TYPE_NAME.DOCUMENT_CLASSES]
			case CLASS_TYPE_NAME.CHOICE_CLASS:
			case CLASS_TYPE_NAME.CHOICE_CLASSES:
				return _rootIndexObj[CLASS_TYPE_NAME.CHOICE_CLASSES];
			default:
			 	return _rootIndexObj.ROOT;
		}		
	}

	const objectPropertyToRange=()=>{
		return _objectPropertyToRange;
	}

	const getObjPropsRelatedToClass=(nodeId)=>{
		if(_objectPropertyToRange[nodeId]){
			return _objectPropertyToRange[nodeId]
		}
		return []
	}

	const getDescendantsNode=()=>{
		return _descendantsNode;
	}

	const getObjectProperty = (nodeName,proName)=>{
		//const objProperties = (nodeId)
		const nodeProperties = _domainToProperties[nodeName]
		if(nodeProperties)
			return nodeProperties.find(element => element.name===proName) || {}

		return undefined
	}

	/*
	* maybe I have to get it from _descendantsNode
	* maybe change in setCurrentNode ?? check the use 
	*/
	const getElement=(key,setCurrent=true)=>{
		if(_rootIndexObj && _rootIndexObj[key]){
			if(setCurrent)_currentNode = _rootIndexObj[key]
			return _rootIndexObj[key];
		}
		return undefined;
	}

	
	const createNewMainGraph=()=>{
		let noContext = null
		//I remove the context
		if(Array.isArray(mainGraphDataProvider)){
			noContext= mainGraphDataProvider.slice(1)
		}
		_mainGraphElementsJson=mainGraphDataProvider;
		const {rootIndexObj,linkPropertyClasses}=formatData(noContext,dbName);		
		_rootIndexObj=rootIndexObj
		//console.log(_rootIndexObj)
		formatDataForTree()
	}

	createNewMainGraph();
	
	const getAvailableParentsList=(nodeId)=>{ 
		const nodeObject=getElement(nodeId);
		return  availableParentsList(nodeObject,_objectTypeList,_documentTypeList,_rootIndexObj)
	}

	const getAvailableChildrenList=(nodeId)=>{ 
		const nodeObject=getElement(nodeId);
		return  availableChildrenList(nodeObject,_objectTypeList,_documentTypeList,_rootIndexObj)
	}


	/*
	* add a new property in the class property list 
	*/ 
	const addNewPropertyToClass = (nodeName, propertyType, propertyRange, oneOfDomain)=>{
		if(nodeName!==null && _rootIndexObj[nodeName]){ 
			const newProperty=getNewPropertyTemplate(propertyType) //_graphUpdateObject.addPropertyToClass(nodeName,propertyType,propertyRange);
			newProperty['oneOfDomain']=oneOfDomain
			if(!_domainToProperties[nodeName]){
				_domainToProperties[nodeName]=[]; 
			}
			if(newProperty['oneOfDomain']) {
				// this is a one of property
				_domainToProperties[nodeName].map(arr => {
					if( arr.type === "OneOfProperty") {
						if(!arr.hasOwnProperty("PropertyList")) {
							arr["PropertyList"] = []
						}
						if(Array.isArray(arr["PropertyList"])){
							arr["PropertyList"].push(newProperty)
						}
						else { 
							// single entry 
							let key = Object.keys(arr["PropertyList"])[0]
							let singleEntry = arr["PropertyList"][key]
							arr["PropertyList"] = {}
							arr["PropertyList"][key] = singleEntry
							arr["PropertyList"][newProperty.id] = newProperty
						}
					}
				})
			}
	
			_domainToProperties[nodeName].unshift(newProperty);
			return  _domainToProperties[nodeName].slice();
			
			//_propertiesList.set(newProperty.name,newProperty);
			
		}
		return [];
	}
 

	const nodeApplyAction=(actionName,nodeName)=>{ 
		if(nodeName!==null && _rootIndexObj[nodeName]){ 
            //the current selected node 
			let currentNode=_rootIndexObj[nodeName];
            
			let elementType=currentNode.type;
            let actionType=actionName;         
   			let isChoiceClass= false;

            switch (actionName){
              case NODE_ACTION_NAME.ADD_NEW_ENTITY:
                   elementType=CLASS_TYPE_NAME.DOCUMENT_CLASS;
                   nodeName=CLASS_TYPE_NAME.DOCUMENT_CLASSES;
                   /*
                   * I get as currentNode the DocumentClasses node 
                   */
                   currentNode=getRoot(nodeName);
                   
                   actionType=NODE_ACTION_NAME.ADD_CHILD;
                   
                   break;
              case NODE_ACTION_NAME.ADD_NEW_CLASS:
                   elementType=CLASS_TYPE_NAME.OBJECT_CLASS
                   nodeName=CLASS_TYPE_NAME.DOCUMENT_CLASSES
                   currentNode=getRoot(nodeName);
                   actionType=NODE_ACTION_NAME.ADD_CHILD;                 
                   break;

              case  NODE_ACTION_NAME.ADD_NEW_CHOICE_CLASS:
              		elementType=CLASS_TYPE_NAME.CHOICE_CLASS
                    nodeName=CLASS_TYPE_NAME.CHOICE_CLASSES
                    currentNode=getRoot(elementType)
                    actionType=NODE_ACTION_NAME.ADD_CHILD
              		isChoiceClass=true
              		break
            } 
        	 let newNodeObj={};
        	 if(actionName===NODE_ACTION_NAME.ADD_PARENT){

        	 	/*
        	 	*I have two case current node child of one Group Node
        	 	*NEW PARENT IS CHILD OF Group Node and has as child the currentNode
        	 	*/
        	 	const rootParentNode=getRoot(elementType);

        	 	newNodeObj=getNewNodeTemplate(null,elementType)
						
				 		//_graphUpdateObject.addNodeToTree(rootParentNode,currentNode);
        		

        	 	rootParentNode.children.push(newNodeObj);

        	 	newNodeObj.children.push(currentNode);
        	 	newNodeObj.allChildren.push(currentNode);  

				currentNode.parents.push(newNodeObj.name)
				//I can not add in the inherits because I do not have the node id 
				
				//=currentNode.id

        	 	/*
    	 		* check if I have to remove the child from the root node
    	 		*/
        	 	removeChildFromRoot(currentNode)
        	 	
        	 	nodeName=rootParentNode.name;
        	 }else{
				//add children action 
        	 	newNodeObj=getNewNodeTemplate(null,elementType)//_graphUpdateObject.addNodeToTree(currentNode,null,isChoiceClass);

        	 	if(currentNode.type==="Group"){
					//not need to add in the schema 
        	 		currentNode.children.push(newNodeObj);
	        	}else {
	        		/*
	        		* currentNode is the parent node
	        	 	*/
	        	 	currentNode.children.push(newNodeObj);
	        	 	currentNode.allChildren.push(newNodeObj);
					
					newNodeObj.schema['@inherits']=currentNode.id
					//name is the node name it can be different form the id
					//we use name for identify in unique way the node
					newNodeObj.parents.push(currentNode.name)

	        	}
        	 }
        	 _rootIndexObj[newNodeObj.name]=newNodeObj;

        	 /*
        	 * to be review...
        	 */
        	 addNodeToclassList(newNodeObj);
        	 
        	 setNewElementPosition(nodeName,newNodeObj);
        	 return newNodeObj;
         }
	}

	const addNodeToclassList=(elementObj)=>{
		switch(elementObj.type){
			case CLASS_TYPE_NAME.DOCUMENT_CLASS:
				_documentTypeList.push(elementObj.name)
				addElementToPropertyList(elementObj,_objectPropertyList);
				break;
			case CLASS_TYPE_NAME.OBJECT_CLASS:
				_objectTypeList.push(elementObj.name)
				addElementToPropertyList(elementObj,_objectPropertyList);
				break;
			case CLASS_TYPE_NAME.CHOICE_CLASS:
				addElementToPropertyList(elementObj,_objectChoiceList);
				break;
				//_classesList.set(elementObj.name,{value:node.data.name,name:node.data.name,label:node.data.label});
		}
	}
	
	/*
    *I have to check if the new parent and the node have the same parents.....
    *in this case I have to remove the direct parent
    */
    const checkRelatedParents=(elementObjClass,parentObjClass)=>{
			if(!parentObjClass) return 
			if(!parentObjClass.parents) return
    	parentObjClass.parents.forEach((parentName)=>{
    		const parentOfParentObj=_rootIndexObj[parentName];
    		const parentRelated=removeElementToArr(elementObjClass.parents,parentName);    		
	    	if(parentRelated){
	    		
	    		/*
	    		* remove child from parent
	    		*/
	    		removeElementToArr(parentOfParentObj.children,elementObjClass.name)
	    		if(parentOfParentObj.allChildren){
	    			removeElementToArr(parentOfParentObj.allChildren,elementObjClass.name)
	    		}
				/*
				* register to be save to schema
				*/
				//_graphUpdateObject.changeNodeParent(elementObjClass.name,parentName,NODE_ACTION_NAME.REMOVE_PARENT)
	    	}
	    	checkRelatedParents(elementObjClass,parentOfParentObj)
	    })
	}

	const updateNodeChildren = (elementName, childName, actionName) => {
		const elementObjClass=_rootIndexObj[elementName];
		const childObjClass=_rootIndexObj[childName];

		if(actionName===NODE_ACTION_NAME.ADD_CHILD){
		
			childObjClass.parents.push(elementObjClass.name);
			elementObjClass.allChildren.push(childObjClass);
			elementObjClass.children.push(childObjClass);
			
		}
		else { 
			// remove child
			removeElementToArr(childObjClass.parents, elementName);
			removeElementToArr(elementObjClass.children, childName);
			if(elementObjClass.allChildren)
				removeElementToArr(elementObjClass.allChildren, childName);
		}

		if(childObjClass.parents.length===0 && childObjClass.schema['@inherits']){
		  delete childObjClass.schema['@inherits']
	  }
		else if(childObjClass.parents.length === 1){
		  childObjClass.schema['@inherits'] = childObjClass.parents[0]
	  }
		else{
		  childObjClass.schema['@inherits']=childObjClass.parents
	  }
		return elementObjClass;
	}

	const fetchParentObject = (parentName) => {
		if(_rootIndexObj[parentName]) return _rootIndexObj[parentName]
		for(let obj in _rootIndexObj) {
			if(_rootIndexObj[obj].id && _rootIndexObj[obj].id === parentName) return _rootIndexObj[obj]
		}
		return {}
	}

	const updateNodeParents=(elementName, parentName, actionName)=>{
		const elementObjClass=_rootIndexObj[elementName];
		const parentObjClass=fetchParentObject(parentName);
		
		checkRelatedParents(elementObjClass, parentObjClass);

		if(actionName===NODE_ACTION_NAME.ADD_PARENT){
		 //the node could be children of another node or children of root node 
		 if(parentObjClass.type===elementObjClass.type){
				 removeChildFromRoot(elementObjClass);
				 if(elementObjClass.parents.length===0){
				 parentObjClass.children.push(elementObjClass);
				 }
		 }			
		 //elementObjClass.parents.push(parentObjClass.name);
		 //elementObjClass.parents.push(parentObjClass.name);
		 elementObjClass.parents.push(parentName); 
		 parentObjClass.allChildren.push(elementObjClass);

	 	}
		else {
			removeElementToArr(elementObjClass.parents, parentName);
			removeElementToArr(parentObjClass.children, elementName);
			if(parentObjClass.allChildren)
				removeElementToArr(parentObjClass.allChildren, elementName);

		
			if(elementObjClass.parents.length===0){
				parentName=addToParentGroup(elementObjClass)
			} 
			else if(elementObjClass.type===CLASS_TYPE_NAME.DOCUMENT_CLASS){
				const docParent=elementObjClass.parents.findIndex((pName)=>{
							const pElement=_rootIndexObj[pName];

							return pElement.type===CLASS_TYPE_NAME.DOCUMENT_CLASS
						})
				if(docParent===-1){
					parentName=addToParentGroup(elementObjClass)
				}
			}
		}

	  // save changes
	  if(elementObjClass.parents.length===0 && elementObjClass.schema['@inherits']){
		  delete elementObjClass.schema['@inherits']
	  }else if(elementObjClass.parents.length===1){
		  elementObjClass.schema['@inherits']=elementObjClass.parents[0]
	  }else{
		  elementObjClass.schema['@inherits']=elementObjClass.parents
	  }
	 
	  //moveNodeUnderParent(parentName,elementName);
	  return elementObjClass;
 }

	const addToParentGroup=(elementObjClass)=>{
		const parentRoot=getRoot(elementObjClass.type);
		parentRoot.children.push(elementObjClass);
		/*if(elementObjClass.type==='Document'){
			_graphUpdateObject.changeNodeParent(elementObjClass.name,'Document',NODE_ACTION_NAME.ADD_PARENT);
		}*/
		return parentRoot.name;
	}

	const _removeClassElement=(elementName)=>{
		const classElement=_rootIndexObj[elementName];
		if(classElement){			
			// I have to remove the node from the nodeParents list
			classElement.parents.forEach((parentName)=>{
				const parentObj=_rootIndexObj[parentName];
				removeElementToArr(parentObj.children,elementName)
				if(parentObj.allChildren)
					removeElementToArr(parentObj.allChildren,elementName)
			})

			/*
			* I have to remove from the itemlists
			*/
			delete _rootIndexObj[elementName];
			const nodeElement=_descendantsNode.get(elementName);			
			_descendantsNode.delete(elementName);
			
			switch(classElement.type){
				case CLASS_TYPE_NAME.OBJECT_CLASS:
					removeElementToArr(_objectTypeList,elementName)
					removeElementToArr(_objectPropertyList,elementName) //_classesList.delete(elementName);
					break;
			    case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			    	removeElementToArr(_documentTypeList,elementName)
			    	removeElementToArr(_objectPropertyList,elementName)
			    	break;
			    case CLASS_TYPE_NAME.CHOICE_CLASS:
			    	removeElementToArr(_objectChoiceList,elementName)
			}
			if(!classElement.newElement){
				deleteDocList.push(classElement.id)
			}	

			return nodeElement;
		}
	}

	/*
	* I can remove a node if it hasn't
	* children and it is not a target in a relationship 
	* (this node can not be a range in a property link)
	*/
	const removeElementInMainGraph=()=>{
		//delete all the class propertis
		const elementName = _currentNode.name 
		const listOfProperty=_domainToProperties[elementName] ? _domainToProperties[elementName].slice() : [];
		if(listOfProperty.length>0){
			listOfProperty.forEach((property,key)=>{
				removePropertyToClass(elementName,property.name);
			})
			
		}
		return _removeClassElement(elementName);
	}

	const extractDomainProperties = (propertyByDomain) => {
		let oneOfArrayList = propertyByDomain.filter(arr => arr.id === "@oneOf")
		if(oneOfArrayList.length) {
			let oneOfPropertyList = []
			oneOfArrayList[0]["PropertyList"].map( arr => {
				let propertyName = Object.keys(arr)[0]
				oneOfPropertyList.push(arr[propertyName])
			})
			return oneOfPropertyList
		}
		else return propertyByDomain
		//return oneOfArrayList.length ? oneOfArrayList[0]["PropertyList"] : propertyByDomain
	}

	const removePropertyToClass=(domainClassName,propertyName)=>{
		const propertyByDomain=_domainToProperties[domainClassName] || [];	 
		
		//remove the property from the class properties list
	
		//let propertyByDomainList = extractDomainProperties(propertyByDomain)
		//const propertyObject=removeElementToArr(propertyByDomain,propertyName)
		const propertyObject=removeElementToArr(propertyByDomain,propertyName)
		
		const range = getPropertyClassFromSchema(propertyObject.id)
		//if this is a property link this method remove it from the link properties list 
		checkLinkProperty(propertyObject,_objectPropertyToRange,_currentNode.name,null,range)
			
		//remove from the json Object
		if(_currentNode && _currentNode.schema[propertyObject.id]){
			delete _currentNode.schema[propertyObject.id]
		}
		//remove property from documentation
		setPropertyComment(propertyObject.id,'')
		return propertyByDomain.slice();
	}

	/*
      *if I remove a parent 
      *I have to remove child from parent too(children Obj)  
      */
    const removeChildFromRoot=(currentNode)=>{
      	const rootNode=getRoot(currentNode.type);
      	if(!rootNode.children || rootNode.children.length===0)return;
      	removeElementToArr(rootNode.children,currentNode.name);
    }
    

    const moveNodeUnderParent=(parentId,nodeId)=>{
    	let parentNode=_descendantsNode.get(parentId);
    	let elementNode=_descendantsNode.get(nodeId);
        elementNode.parent=parentNode
        elementNode.depth=parentNode.depth+1;
        elementNode.x=parentNode.x+100;
        elementNode.y=parentNode.y+100;
    }

	const setNewElementPosition=(parentId,newNodeObj,asType)=>{
		let parentNode=_descendantsNode.get(parentId);
        let yStep=parentNode.y+100;
        let xStep=parentNode.x+100;
        let newNode={}
        newNode.parent=parentNode
        newNode.depth=parentNode.depth+1;
        newNode.x=xStep;
        newNode.y=yStep;
        newNode.data=newNodeObj;
        _descendantsNode.set(newNodeObj.name,newNode);
	}

	const getPropertyListByDomain=(domainClassName)=>{
		if(_domainToProperties[domainClassName]) return _domainToProperties[domainClassName];
		return []
	}

	function formatDataForTree(){
		const [descendantsNode, 
			  objectTypeList,
			  documentTypeList,
			  objectPropertyList,
			  objectChoiceList] = new formatDataForTreeChart(getRoot());
		_descendantsNode=descendantsNode;
		_documentTypeList=documentTypeList 
		_objectTypeList=objectTypeList
		_objectPropertyList=objectPropertyList;
		_objectChoiceList=objectChoiceList;

		const  [propertiesOfClass,linkPropertyClass] = formatProperties(_mainGraphElementsJson,_objectPropertyList,_objectChoiceList)
		_domainToProperties=propertiesOfClass
		_objectPropertyToRange=linkPropertyClass
	}


	const updateObjectPropertyListLabel=(elementObj)=>{
		let objectPropList = _objectPropertyList
		if(elementObj.type === CLASS_TYPE_NAME.CHOICE_CLASS){
			objectPropList = _objectChoiceList;
		}
		const index=objectPropList.findIndex(function(item){
			if(item.name===elementObj.name){
				item.label=elementObj.id 
			}
			return item.name===elementObj.name
		})     	
	}


	const getObjectTypeList=()=>{
		return _objectTypeList;
	}

	const getDocumentTypeList=()=>{
		return _documentTypeList;
	}
	
	// new functions
	const getClassKey=()=>{
		if(!_currentNode) return {type:'Lexical',fields:[]}
		if(_currentNode.schema['@key']){
			const keyObj= _currentNode.schema['@key'];
			return {type : keyObj["@type"],fields: keyObj['@fields'] || []}
		}
		return {type:'Lexical',fields:[]}
	}

	const setClassKey=(type,fields)=>{
		_currentNode.schema['@key']={}
		if(type)_currentNode.schema['@key']['@type']=type
		if(fields)_currentNode.schema['@key']['@fields']=fields
	}
	
	const getPropertyAsList=()=>{
		const id= _currentNode['name']
		const proArr=[]
		if(_domainToProperties[id]){
			Object.values(_domainToProperties[id]).forEach(element=>{
				proArr.push({label:element.id,value:element.id})
			})
			return proArr
		}
		return []
	}
	/*
	"@properties" : [
      { "aliases" : "An (ordered) list of pseudonyms" },
      { "name" : "The name of the criminal" }
    ] }*/

	const getNodeData = () =>{
		let node = {}
		if(_currentNode.schema){
			
			const doc = _currentNode.schema['@documentation']
			if(doc){
				node.comment = doc['@comment'] || ''
			}
			const metadata = _currentNode.schema['@metadata']
			if(metadata){
				node.metadata = metadata 
			}
			node.abstract=_currentNode.schema['@abstract'] ? true : false
			node.id = _currentNode.schema['@id'] || ''
			node.subdocument = _currentNode.schema['@subdocument'] ? true : false
		}

		return node
	} 	



	const setAbstract = (value)=>{
		if(_currentNode.schema){
			if(value === true ){
				_currentNode.schema['@abstract']=[]
			}else if(_currentNode.schema['@abstract']){
				delete _currentNode.schema['@abstract'];
			}
		}
	}

	
	const setId = (newId)=>{
		if(!_currentNode.schema || _currentNode.id === newId) return 
		const findEl = Object.values(_rootIndexObj).find((element)=>element.id &&  element.id === newId)	
		if(findEl){
			throw new Error ("Please enter an unique id")	
		}
		_currentNode.id = newId
		_currentNode.schema['@id'] =  newId
	//review childName
		if(_currentNode.newElement === true && _currentNode.allChildren.length>0){
			_currentNode.allChildren.forEach((childElement)=>{
				const inherits = []
				childElement.parents.forEach((parentName)=>{
					const parentElement = _rootIndexObj[parentName]
					inherits.push(parentElement.id)
				})
				childElement.schema['@inherits']= inherits.length === 1 ? inherits[0] : inherits 
			})				
			//const 			
		}
		updateObjectPropertyListLabel(_currentNode)		
	}
	
    //maybe the best things to do is post with full_replace
	//to be review

	const getDefaultPropertyTemplate = (rangePropValue) => {
		// if property is sys:Unit return template 
		// as of now we dont provide sys unit as optional or as arrays
		if(rangePropValue === UNIT_TYPE_DATAPROVIDER) return rangePropValue
		return {"@class": rangePropValue,"@type": "Optional"}
	}
	 
	const setPropertyId = (propertyObj, newPropId, rangePropValue) =>{
		if(propertyObj.id === newPropId)return
		if( _currentNode.schema[newPropId]!== undefined){
			throw new Error ("Please enter an unique property id")
		}

		const oldPropId = propertyObj.id
		let currentPropertyValue = _currentNode.schema[oldPropId] 
		if(currentPropertyValue!== undefined){
			delete _currentNode.schema[oldPropId]
		}
		propertyObj.id = newPropId
		//I set as Optional
		let propertyTemplate = currentPropertyValue || getDefaultPropertyTemplate(rangePropValue)
		if(propertyObj.hasOwnProperty("oneOfDomain") && propertyObj["oneOfDomain"]) {
			let oneOfIndex = propertyObj["oneOfDomain"]["key"]
			if(!_currentNode.schema["@oneOf"]) _currentNode.schema["@oneOf"] = []
			
			if(!_currentNode.schema["@oneOf"][oneOfIndex]) {
				_currentNode.schema["@oneOf"].push( { [newPropId]: propertyTemplate } )
			}
			else {
				if(Array.isArray(_currentNode.schema["@oneOf"])) {
					_currentNode.schema["@oneOf"][oneOfIndex][newPropId] = propertyTemplate 
				}
				else { 
					// one of is an object (single entry)
					let singleEntry = _currentNode.schema["@oneOf"] 
					// make the entry an array 
					_currentNode.schema["@oneOf"] = []
					_currentNode.schema["@oneOf"].push(singleEntry)
					// new entry
					_currentNode.schema["@oneOf"].push( { [newPropId]: propertyTemplate } )
				}
			}
		}
		else _currentNode.schema[newPropId] = propertyTemplate
		//_currentNode.schema[newPropId] = currentPropertyValue || {"@class": rangePropValue,"@type": "Optional"}
	}

	const getEnumValues =()=>{
		if(_currentNode.schema['@value']){
			return _currentNode.schema['@value']
		}
		return []
	}

	/*
	* return the p
	*/
	const getPropertyClassFromSchema = (propId)=>{
		switch(typeof _currentNode.schema[propId]){
			case 'string':
				return _currentNode.schema[propId]
			case 'object':_currentNode.schema[propId]['@class']
				return 
		}
	}

	const extractPropertyInfo = (propertyInfo, propId) => {
		let obj = {}
		switch(typeof propertyInfo){
			case 'string':
				obj= { range:propertyInfo, option: '', id: propId }
				break;
			case 'object':
				const propInfo = propertyInfo
				obj = { range: propInfo['@class'], option: propInfo['@type'], id: propId } 				
				if(propInfo['@type'] === 'Cardinality'){
					obj['cardinality'] = propInfo['@cardinality']
				}else if(propInfo['@type'] === 'Cardinality_Between'){
					obj['min_cardinality'] = propInfo['@min_cardinality']
					obj['max_cardinality'] = propInfo['@max_cardinality']
				}
				break
			default:
				obj= { id: propId }
		}
		obj['comment'] = getPropertyComment(propId)
		return obj 
	}

	const checkIfPropertyExistsInOneOf = (currentSchema, propId) => {
		if(!currentSchema["@oneOf"]) return {}
		// check if property is part of @oneOf 
		if(Array.isArray(currentSchema["@oneOf"])) {
			let propertyFound=currentSchema["@oneOf"].filter( arr => arr.id === propId)
			return extractPropertyInfo(propertyFound, propId)
		}
		else if(currentSchema["@oneOf"].hasOwnProperty(propId)) {
			return extractPropertyInfo(_currentNode.schema["@oneOf"][propId], propId)
		}
		return {}
	}
	

	const getPropertyInfo = (propId)=>{
		if(!_currentNode.schema[propId]) {
			// check if current property is a property of OneOfProperty
			let oneOfProperties = checkIfPropertyExistsInOneOf(_currentNode.schema, propId)
			if(Object.keys(oneOfProperties).length) return oneOfProperties
			// check if current property is a property in their parents - we display inheritted properties in 
			// <PropertiesComponent/>
			if(_currentNode.parents && _currentNode.parents.length) {
				let inheritedProperies = {}
				_currentNode.parents.map(parentName => {
					if(_rootIndexObj[parentName] && _rootIndexObj[parentName].schema.hasOwnProperty(propId)){
						// property is inherritted 
						inheritedProperies= extractPropertyInfo(_rootIndexObj[parentName].schema[propId], propId)
						
					}
				})
				if(Object.keys(inheritedProperies).length) return inheritedProperies
			}
		}
		return extractPropertyInfo(_currentNode.schema[propId], propId)
	}

	// sets metadata render_as markdown
	const setPropertyMarkDownInfo = (currentpropertyID) => {
		if(!_currentNode.schema) return
		if(_currentNode.schema.hasOwnProperty("@metadata") && 
			_currentNode.schema["@metadata"].hasOwnProperty("render_as")) {
			_currentNode.schema["@metadata"]["render_as"][currentpropertyID] = "markdown"
		}
		else {
			// initialize metadata & render as for propertyObj
			_currentNode.schema["@metadata"] = {
				"render_as": {
					[currentpropertyID]: "markdown"
				}
			}
		}
	} 

	const removePropertyMarkDownInfo = (currentpropertyID) => {
		if(!_currentNode.schema) return
		if(_currentNode.schema.hasOwnProperty("@metadata")) {
			if(Object.keys(_currentNode.schema["@metadata"]).length === 1 && 
			Object.keys(_currentNode.schema["@metadata"]["render_as"]).length === 1 ) {
				delete _currentNode.schema["@metadata"]
			}
			else delete _currentNode.schema["@metadata"]["render_as"][currentpropertyID] 
		}
	}

	const setDocumentOrdering = (orderedPropertyList) => {
		//console.log("_currentNode", _currentNode)
		if(!_currentNode.schema) return
		if(_currentNode.schema.hasOwnProperty("@metadata")) {
			//_currentNode.schema["@metadata"]["render_as"][currentpropertyID] = "markdown"
			_currentNode.schema["@metadata"]["order_by"] = orderedPropertyList
		}
		else {
			// initialize metadata & render as for propertyObj
			_currentNode.schema["@metadata"] = { 
				"order_by": orderedPropertyList
			}
		}
	}

	//range 
	//option
	//what happen if I change something before setting the id???
	const setPropertyInfo = (propertyObj,fieldName,fieldValue)=>{
		const propId=propertyObj.id
		if(!_currentNode.schema[propId])return
		switch(fieldName){
			//this is the property's type like string, num ....
			case 'range':{
				//if it is a class
				if( _rootIndexObj[fieldValue]!==undefined){
					const oldRange = typeof _currentNode.schema[propId] === 'object' ? _currentNode.schema[propId]['@class'] : _currentNode.schema[propId] 
					checkLinkProperty(propertyObj,_objectPropertyToRange,_currentNode.name,fieldValue,oldRange)
					//if not saved the name and the id are different
					//name is only for internal reference
					if(_rootIndexObj[fieldValue].newElement){
						fieldValue = _rootIndexObj[fieldValue].schema['@id']
					}
				}
				if(typeof _currentNode.schema[propId] === 'string'){
					_currentNode.schema[propId]=fieldValue
				}else{
					_currentNode.schema[propId]['@class']=fieldValue
				}
				
				break

			}
			//like Optional, Cardinality, Cardinality_beetween,List ...
			case 'option':{
				if(fieldValue === MANDATORY_PROP){
					//remove extra options
					if(typeof _currentNode.schema[propId] === 'object'){
						const currentClass = _currentNode.schema[propId]['@class']
						_currentNode.schema[propId]=currentClass
					}
				}else if(typeof _currentNode.schema[propId] === 'string'){
					const currentClass = _currentNode.schema[propId]
					_currentNode.schema[propId]={'@class':currentClass,'@type':fieldValue}
				}else{
					const currentClass = _currentNode.schema[propId]['@class']
					_currentNode.schema[propId]={'@class':currentClass,'@type':fieldValue}
				}
				break;
			}
			//if we enter at this point the element is an object
			case 'max_cardinality':
			case 'min_cardinality':
			case 'cardinality':{
				_currentNode.schema[propId][`@${fieldName}`]=fieldValue
				break;
			}
			case 'comment':
				setPropertyComment(propId,fieldValue)
			    break
		}
	}

	const setComment=(comment)=>{	
		if(_currentNode.schema ){
			const value = typeof comment === "string" ? comment.trim() : ''
			if(value === '' && !_currentNode.schema['@documentation'])return
			if(!_currentNode.schema['@documentation']){
				_currentNode.schema['@documentation'] = {}
			}
			_currentNode.schema['@documentation']['@comment']=value
			checkDocumentation()			
		}
	}

	const setPropertyComment = (propId,comment) =>{
		//no documentation and comment empty
		if((!_currentNode.schema['@documentation'] || !_currentNode.schema['@documentation']['@properties'])
			&& typeof comment === "string" && comment.trim()==='')return
		if(!_currentNode.schema['@documentation']){
			_currentNode.schema['@documentation']={'@comment':''}
		}
		if(!_currentNode.schema['@documentation']['@properties'])
			_currentNode.schema['@documentation']['@properties']={}		
		//check if I have to delete the comment
		if(typeof comment === "string" && comment.trim()!==''){
			_currentNode.schema['@documentation']['@properties'][propId]=comment
		}else if(_currentNode.schema['@documentation']['@properties'][propId]){
			delete _currentNode.schema['@documentation']['@properties'][propId]
			//check if I have to remove all the documentation Object
			checkDocumentation()
		}
		//properties
	}

	const checkDocumentation=()=>{
		if(_currentNode.schema['@documentation']){
			const propDocument = _currentNode.schema['@documentation']['@properties']
			if(propDocument && JSON.stringify(propDocument) === "{}"){
				delete _currentNode.schema['@documentation']['@properties']
			}
			//comment is mandatory if you add documentation
			if(JSON.stringify(_currentNode.schema['@documentation'])  === '{"@comment":""}'){
				delete _currentNode.schema['@documentation']
			}
		}
	}

	const getPropertyComment = (propId) =>{
		if(_currentNode.schema['@documentation'] && 
		   _currentNode.schema['@documentation']['@properties'] &&
		   _currentNode.schema['@documentation']['@properties'][propId]){
			return _currentNode.schema['@documentation']['@properties'][propId]
		}
		return ''
		//properties
	}

	const updateEnumValues = (enumArr) =>{
		_currentNode.schema['@value'] = enumArr
	}



	const getSchema = () =>{ 
		const schemaArr=[]
		schemaArr.push(_mainGraphElementsJson[0])
	
		Object.values(_rootIndexObj).forEach(item=>{
			if(item.schema) 
				schemaArr.push(item.schema)
		}) 
		//console.log("schema", schema)
		return JSON.stringify(schemaArr,null,4)
	}

	return {createNewMainGraph,
			setId,getPropertyInfo,setPropertyInfo, 
			setPropertyMarkDownInfo, 
			setDocumentOrdering, 
			removePropertyMarkDownInfo, 
			getNodeData,
			objectPropertyToRange,setClassKey,getPropertyAsList,getClassKey,
			setComment,setAbstract,setPropertyId,
			getEnumValues,updateEnumValues,getObjectProperty,
			getObjectChoices,
			getObjectTypeList,
			getDocumentTypeList,
			getSchema,
			getElementsNumber,getElement,getPropertyListByDomain,getObjPropsRelatedToClass,getAvailableParentsList,
			getAvailableChildrenList,
      		nodeApplyAction,addNewPropertyToClass, removePropertyToClass,
      		updateNodeParents, updateNodeChildren, getObjectProperties,getDescendantsNode,removeElementInMainGraph}
}
