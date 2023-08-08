import { tree, hierarchy } from 'd3-hierarchy';
import { BiAlarmAdd } from 'react-icons/bi';
import {PROPERTY_TYPE_NAME, CLASS_TYPE_NAME, getRootIndexObj,PROPERTY_TYPE_BY_CLASS} from './utils/elementsName';
import {removeElementToArr,getNewNodeTemplate,getNewPropertyTemplate} from './utils/modelTreeUtils'

export const formatData =(dataProvider,dbName)=>{ 
	let _rootIndexObj=getRootIndexObj(dbName);
	_rootIndexObj.ROOT.children.push(_rootIndexObj[CLASS_TYPE_NAME.CHOICE_CLASSES]);
	//_rootIndexObj.ROOT.children.push(_rootIndexObj[CLASS_TYPE_NAME.OBJECT_CLASSES]);
	_rootIndexObj.ROOT.children.push(_rootIndexObj[CLASS_TYPE_NAME.DOCUMENT_CLASSES]);
    if(Array.isArray(dataProvider)){
		dataProvider.forEach((element)=>{
			const classId=element['@id'];
			_rootIndexObj[classId]=getNewNodeTemplate(classId,getType(element))
			_rootIndexObj[classId]['schema']= element
		})
		readSchema(_rootIndexObj,dataProvider)
	}
	//addElements(_rootIndexObj,dataProvider)

	return {rootIndexObj:_rootIndexObj};
}


export const formatDataForTreeChart =(rootElement)=>{
	const treeModel = tree();
	/*
	* When you set a size for the tree,Vtree$$1.size(size);
	* you are setting a fixed size so that the tree has to conform to that width and height.
	* When you set a nodeSize, the tree has to be dynamic so it resets the size of the tree.
	*/

   // treeModel.nodeSize([200,200]);

    treeModel.nodeSize([200,200]);
    //treeModel.size([5000, 1000])
    const data=hierarchy(rootElement);
    const d3Data = treeModel(data);

    const treeNode=d3Data.descendants();

    const descendantsNode = new Map();

    /*
    * list of all object class id
    */
    const objectTypeList=[];
    /*
    *list of all Document class id
    */
	const documentTypeList=[];


	const objectPropertyList=[];
	const objectChoiceList=[];

	//
	const classesPropertyList=[]


	//this._descendantsNode=new Map();
    for(let node of treeNode){
       /*if(node.data.type==='Group' && node.x && Math.abs(node.x)<200){
       		node.x=node.x*2;
       		//node.y=node.y/1.5;
       }*/
	   //to be review for new node
       if(!descendantsNode.has(node.data.name)){
	       if(node.data.type===CLASS_TYPE_NAME.DOCUMENT_CLASS){
			    //the document list for the parent list
	       		documentTypeList.push(node.data.name);
				//the list of all available class to create a link-property
	      		objectPropertyList.push({type:node.data.type,value:node.data.name,name:node.data.name,label:node.data.id})
	       }else if (node.data.type===CLASS_TYPE_NAME.OBJECT_CLASS){
	       		objectTypeList.push(node.data.name);
	       		objectPropertyList.push({type:node.data.type,value:node.data.name,name:node.data.name,label:node.data.id})
	       }else if (node.data.type===CLASS_TYPE_NAME.CHOICE_CLASS){
	       		objectChoiceList.push({value:node.data.name,name:node.data.name,label:node.data.name});
	       }
	   }
	   descendantsNode.set(node.data.name,node);
    }



    return [descendantsNode,objectTypeList,documentTypeList,objectPropertyList,objectChoiceList];
}

export const addElementToPropertyList=(elementsObj,objectPropertyList)=>{
   		objectPropertyList.push({type:elementsObj.type,
   								 value:elementsObj.name,
   								 name:elementsObj.name,
   								 label:elementsObj.id})

}


const getType = (element) =>{
	if(element['@type']==='Enum'){
		return  CLASS_TYPE_NAME.CHOICE_CLASS
	 }else if(element['@type']==='Class' && !isSubDocument(element)){
		return  CLASS_TYPE_NAME.DOCUMENT_CLASS
	 }else{
		return CLASS_TYPE_NAME.OBJECT_CLASS
	 }
}

export const getPropertyType = (itemName, itemValue,linkPropList,enumPropList) =>{
    let property
		if(itemName === "@oneOf") return  { value: itemValue, type: PROPERTY_TYPE_NAME.ONEOF_PROPERTY}
    if(typeof itemValue === 'string')property = itemValue
    else property = itemValue['@class']
    const getProp = (element) => element.name === property;
    //type rpoperty like string,num etc...
    if(property.indexOf(":")===3){
      return {value:property,type:PROPERTY_TYPE_BY_CLASS[property]}
    }else if(linkPropList.findIndex(getProp)>-1){
      return {value:property,type:PROPERTY_TYPE_NAME.OBJECT_PROPERTY}
    }else if(enumPropList.findIndex(getProp)>-1){
      return {value:property,type:PROPERTY_TYPE_NAME.CHOICE_PROPERTY}
    }else if(property === false){
		return {value:'',type:PROPERTY_TYPE_NAME.OBJECT_PROPERTY}
	}
	return {value:'',type:''}
}

function checkForPropertyKey(key) {
	if(key === "@oneOf") return true
	if(key.indexOf("@") === -1) return true
	return false
}


const getLinkedToType = (value, linkPropList, enumPropList) => {
	let type = null
	if(linkPropList && linkPropList.length) {
		let match = linkPropList.filter(arr => arr.value === value )
		if(match && match.length) return match[0].type
	}
	if(enumPropList && enumPropList.length) {
		let match = enumPropList.filter(arr => arr.value === value )
		if(match && match.length) return CLASS_TYPE_NAME.CHOICE_CLASS
	}
	return type
}

export const formatProperties = (dataProvider,linkPropList,enumPropList) => {
	//{classId:{listofProperty}} 

	const propertiesOfClass={}
	//{classLink:[classId]}
	const linkPropertyClass={}
	if(Array.isArray(dataProvider)){
		dataProvider.forEach((element)=>{
			const classId = element['@id']
			propertiesOfClass[classId]=[]
			Object.keys(element).forEach(key=>{
				//if(key.indexOf("@") === -1){
				if(checkForPropertyKey(key)) {
					//it is a property
					const property = element[key]
					let oneOfTemplate = []
					const {value, type} = getPropertyType(key,property,linkPropList,enumPropList)
					if(type === PROPERTY_TYPE_NAME.ONEOF_PROPERTY) {
						if(Array.isArray(value)) { 
							value.map( (eachVal, index) => {
								let propertyTemplate = {}
								for(let prop in eachVal) {
									const {value, type} = getPropertyType(prop, eachVal[prop], linkPropList, enumPropList)
									let eachValTemplate = getNewPropertyTemplate(type, prop)
									eachValTemplate["oneOfDomain"] = { key : index }
									propertyTemplate[prop] = eachValTemplate
								}
								oneOfTemplate.push(propertyTemplate)
							})
						}
						else {
							// one of can also be an object if only one entry of one of 
							let oneOfValue = value
							oneOfTemplate = {}
							for(let eachVal in oneOfValue) {
								let propertyTemplate = {}
								const {value, type} = getPropertyType(eachVal, oneOfValue[eachVal], linkPropList, enumPropList)
								let eachValTemplate = getNewPropertyTemplate(type, eachVal)
								eachValTemplate["oneOfDomain"] = { key : 0 }
								//propertyTemplate[eachVal] = eachValTemplate
								//oneOfTemplate.push(propertyTemplate)
								oneOfTemplate[eachVal] = eachValTemplate 
							}
						}
						let oneOfPropertyTemplate = getNewPropertyTemplate(type, key)
						oneOfPropertyTemplate["PropertyList"] = oneOfTemplate
						propertiesOfClass[classId].push(oneOfPropertyTemplate)
					}
					else if(type === PROPERTY_TYPE_NAME.OBJECT_PROPERTY || type ===PROPERTY_TYPE_NAME.CHOICE_PROPERTY){
						//value or range is the class linked
						if(!linkPropertyClass[value])linkPropertyClass[value]=[]
						linkPropertyClass[value].push({ 
							nodeName: classId, 
							propName: key, 
							linked_to_type: getLinkedToType(value, linkPropList, enumPropList) 
						})
						let propTemplate = getNewPropertyTemplate(type,key)
						// add linked_to_type - to store info of what type 
						// is the property linked to which can be used to 
						// get colored nodes in relationship tab
						propTemplate["linked_to_type"]= getLinkedToType(value, linkPropList, enumPropList) 
						propertiesOfClass[classId].push(propTemplate)//value,property))
					}
					else propertiesOfClass[classId].push(getNewPropertyTemplate(type,key))//value,property))

				}
			})
		})
	}

	return [propertiesOfClass,linkPropertyClass]
} 


const readSchema = ( _rootIndexObj, dataProvider=[]) =>{
	//add all the element in _rootIndexObj by id

	dataProvider.forEach((element)=>{
		const classId=element['@id'];
		//I add by parent
		switch(element['@type']){
			case 'Enum':
				_rootIndexObj[CLASS_TYPE_NAME.CHOICE_CLASSES].children.push(_rootIndexObj[classId])
				if(typeof element['@inherits'] === 'string'){
					const parent = element['@inherits']
					//it must be there but we check the same
					if(_rootIndexObj[parent]){
						_rootIndexObj[parent].allChildren.push(_rootIndexObj[classId])
						//id don't need this I can use @inherits field
						//to be review
						_rootIndexObj[classId].parent.push(parent)
					}
				}
				break;
			case 'Class':
				let ROOT_TYPE =CLASS_TYPE_NAME.DOCUMENT_CLASSES
				//it is a Document class
				//if(isSubDocument(element)){
					//ROOT_TYPE=CLASS_TYPE_NAME.OBJECT_CLASSES
				//}
				//let parentTypeDoc = false
				//no parents be child of the root document node
				if( typeof element['@inherits'] === 'string'){
					const parent = element['@inherits']
					if(_rootIndexObj[parent]){ 
					    _rootIndexObj[parent].children.push(_rootIndexObj[classId])
						_rootIndexObj[parent].allChildren.push(_rootIndexObj[classId])
						_rootIndexObj[classId].parents.push(parent)
					}else{
						throw new Error (`Node "${classId}" the parent Document "${parent}" doesn't exist`)
					}				

				}else if( typeof element['@inherits'] === "object"){
					element['@inherits'].forEach(parent=>{
						//I add only in the first parent or I'll get more than one link 
						if(_rootIndexObj[parent]){ 
							if(_rootIndexObj[classId].parents.length===0){
								_rootIndexObj[parent].children.push(_rootIndexObj[classId])
							}
							_rootIndexObj[parent].allChildren.push(_rootIndexObj[classId])
							_rootIndexObj[classId].parents.push(parent)
						}else{
							throw new Error (`Node "${classId}" the parent Document "${parent}" doesn't exist`)
						}

					})
				}
				//to be review or I see 2 node with the same name
				if(_rootIndexObj[classId].parents.length===0 ){//||
					//(ROOT_TYPE === CLASS_TYPE_NAME.DOCUMENT_CLASSES && parentTypeDoc === false)){
					_rootIndexObj[ROOT_TYPE].children.push(_rootIndexObj[classId])
				}
		}
	})
}

const isParentDoc = (element)=>{
	if(element.type === CLASS_TYPE_NAME.DOCUMENT_CLASS){
		return true
	}
	return false
}

const isSubDocument = (element)=>{
	return element['@subdocument'] ? true : false
}

export const availableChildrenList = (classObj,objectTypeList,documentTypeList,_rootIndexObj) => {
	const resultListObject={};
	
	resultListObject['documentClassArr']=removeRelatedElements(classObj,documentTypeList,_rootIndexObj);
	resultListObject['objectClassArr']=[]
	if(classObj.type===CLASS_TYPE_NAME.OBJECT_CLASS)
		resultListObject['objectClassArr']=removeRelatedElements(classObj,objectTypeList,_rootIndexObj);
	return resultListObject;
}
/*
*the list of available parents depends on the type of node
*the list can not have the node currents parents or the currents children
*Object Class type can inherit only from Ordinary Classes
*Enum Class Type can inherit only from Ordinary Classes
*Document Class type can inherit from Ordinary Classes and Entity Classes
*/

export const availableParentsList = (classObj,objectTypeList,documentTypeList,_rootIndexObj)=>{
	const resultListObject={};
	
	resultListObject['documentClassArr']=removeRelatedElements(classObj,documentTypeList,_rootIndexObj);
	resultListObject['objectClassArr']=[]
	if(classObj.type===CLASS_TYPE_NAME.OBJECT_CLASS)
		resultListObject['objectClassArr']=removeRelatedElements(classObj,objectTypeList,_rootIndexObj);
	return resultListObject;
}

const removeRelatedElements=(classObj,classesMap,_rootIndexObj)=>{
	if(classesMap.length===0)return [];

	const objectClassMap=classesMap.slice()

	removeElementToArr(objectClassMap,classObj.name);

	// not removing for now
	if(classObj.children && classObj.children.length>0){
		removeRelatedChildren(classObj.children,objectClassMap);
	}

	// not removing for now - coz required to show 
	if(classObj.parents && classObj.parents.length>0)
		removeRelatedParent(classObj.parents,objectClassMap,_rootIndexObj)

	const classList=[]

	objectClassMap.forEach((elementName)=>{
		const elementObj=_rootIndexObj[elementName];
		const label=elementObj.label || elementObj.id
		classList.push({name:elementName,value:elementName,label:label })

	})

	return classList; //[...objectClassMap.values()]
}

/*
* recursive remove related parents 
* parents=['parentName001','parentName002'...]
*/

const getParentObject = (parentName, _rootIndexObj) => {
	if(_rootIndexObj[parentName]) return _rootIndexObj[parentName]
	for(let item in _rootIndexObj) {
		if(_rootIndexObj[item].id === parentName) {
			// it will be a newly added parent in this stage which has not yet been saved in schema
			return _rootIndexObj[item]
		}
	}
	return {}
}

const removeRelatedParent=(parentsList,classesMap,_rootIndexObj)=>{
	parentsList.forEach((parentName,key)=>{
		/*if(classesMap.has(parentName)){
			classesMap.delete(parentName) 
		}*/
		removeElementToArr(classesMap,parentName);

		const parentObj=getParentObject(parentName, _rootIndexObj)
		removeRelatedParent(parentObj.parents,classesMap,_rootIndexObj);
	})
}

/*
* recursive remove related children
*/
const removeRelatedChildren=(childrenList,classList)=>{
	childrenList.forEach((childObj,key)=>{
		/*if(classList.has(childObj.name)){
			classList.delete(childObj.name)
		}*/
		removeElementToArr(classList,childObj.name)
		removeRelatedChildren(childObj.children,classList)
	})
}

//{classRangeName:[{nodeName:classId,propName:key}]
/**
 * Add, Remove or update the property link relationship object
 * @param {object} propertyObject
 * @param {object} propertyLinkDict
 * @param {string} nodeName - the selected node element's name (the current class)
 * @param {string} newLink  - the link property range
 * @param {string} previewLink - the old link property range
 */
export const checkLinkProperty=(propertyObject,propertyLinkDict,nodeName,newLink=undefined,previewLink=undefined)=>{
	//no a link property
	if(propertyObject.type !== PROPERTY_TYPE_NAME.OBJECT_PROPERTY &&
		propertyObject.type !==PROPERTY_TYPE_NAME.CHOICE_PROPERTY){
			return false
	}
	const propName=propertyObject.name

	/*
	* remove the relation
	*/
	if(previewLink){
		const arrList=propertyLinkDict[previewLink];
		if(arrList){
			if(arrList.length===1){
				delete propertyLinkDict[previewLink]
			}else{
				const index=arrList.findIndex((item)=>{return item.propName===propName && item.nodeName === nodeName })
				arrList.splice(index,1)
			}
		}
	}

	if(newLink){
		if(!propertyLinkDict[newLink]){
			propertyLinkDict[newLink]=[]
		}
		propertyLinkDict[newLink].push({proName:propName,nodeName:nodeName})
	}

}
