import * as NODE_ACTION_NAME from './actionType'
import {UTILS} from "@terminusdb/terminusdb-client"
import {PROPERTY_TYPE_BY_CLASS,PROPERTY_TYPE_NAME,CLASS_TYPE_NAME} from './elementsName'

export const removeElementToArr=(arrayList,elementName)=>{
    if(!arrayList)return undefined
    const index=arrayList.findIndex(function(item){return item===elementName || item.name===elementName})
    if(index>-1){
       //method changes the contents of an array by removing or replacing existing elements
        //return the removedObject
        const elementObj= arrayList.splice(index,1);
        return elementObj[0];
    }
    return undefined;
}

export const getNewPropertyTemplate=(type,name=null)=>{
    const proId = name ||  ""
    const propName= name || `PROP_${(new Date()).getTime()}`;
    let extraVal = '' 
    const newProp = {
                  id:proId,
                  name:propName,
                  type:type,
                  newElement:true,
                  //I need this extra fields for the property list object
                  label:proId,
                  value:proId,
                }
      if(name) newProp['newElement'] = false
    return newProp;
}
 

export const getNewNodeTemplate=(name=null,type=null,parent)=>{ 
	  const nodeId = name ||  ""
    const nodeName= name || `CLASS_${(new Date()).getTime()}`;
    
    const newObj = {
                     id:nodeId,
                     name:nodeName,
                     parents:[],
                     newElement:true,
                     needToSave:false,
                     children:[],
                     type:type,
                     allChildren:[],
                     schema:{'@type':'Class', '@id':'','@key':{'@type' : 'Random'}}
                    }
    if(type===CLASS_TYPE_NAME.CHOICE_CLASS){
      //the enum element doesn't have the id
      newObj.schema['@type']='Enum'
      delete newObj.schema['@key']
    }else if (type===CLASS_TYPE_NAME.OBJECT_CLASS){
      newObj.schema['@subdocument']=[]
    }
    if(name!==null)newObj['newElement']=false;
	return newObj;
}

export const treeModelApplyAction=(nodeName,actionName,graphData,nodeIndex)=>{
    if(!nodeName)return false;


            
            //const newName='new_'+index_newObj++;
            const currentNode=this.state.graphData[nodeName];


            const currentDataProviderNode=this.nodeIndex[nodeName];

            const indexNewObj={name: newName, "label": "NEW NODE", type:'node',type:currentNode.data.type};

            if(actionName===NODE_ACTION_NAME.ADD_NEW_ENTITY){
               indexNewObj.type='EntityClass';
               actionName=NODE_ACTION_NAME.ADD_CHILD;

             }else if(actionName===NODE_ACTION_NAME.ADD_NEW_CLASS){
               indexNewObj.type='OrdinaryClass';
               actionName=NODE_ACTION_NAME.ADD_CHILD;
             }
             //else if(actionName===NODE_ACTION_NAME.ADD_NEW_RELATIONSHIP){
               // indexNewObj.type='Relationship';
               // actionName=NODE_ACTION_NAME.ADD_CHILD;
             //}
            //this.nodeIndex[newName]=indexNewObj;
            switch (actionName ){ 
              case NODE_ACTION_NAME.ADD_CHILD:

                newObj.parent=currentNode
                newObj.data=indexNewObj //{"name": newName, "label": "NEW NODE"}
                newObj.depth=currentNode.depth+1;
                newObj.x=currentNode.x-100;
                newObj.y=currentNode.y+100;


                if(!currentNode.children)currentNode.children=[];
                currentNode.children.push(newObj);
                this.state.graphData[newName]=newObj;

                if(!currentDataProviderNode.children)currentDataProviderNode.children=[];
                currentDataProviderNode.children.push(indexNewObj);
                this.nodeIndex[newName]=indexNewObj

                this.state.dataEdges[currentNode.data.name+'_'+newObj.data.name]={source:currentNode.data.name,target:newObj.data.name}

                this.state.nodes.push(newObj);
                break;

              case NODE_ACTION_NAME.ADD_PARENT:

                 const parentObj=currentNode.parent;

                 //const parentObj=this.state.graphData[parentName];
                 
                 parentObj.children.push(indexNewObj);

                 this._removeLink(currentNode.parent,currentNode);
                 newObj.data=indexNewObj;//{"name": newName, "label": "NEW NODE"}
                 newObj.depth=currentNode.depth;
                 newObj.x=currentNode.x-100;
                 newObj.y=currentNode.y-100;
                 newObj.children=[];
                 newObj.children.push(currentNode);
                 newObj.parent=currentNode.parent;
                 currentNode.parent=newObj;
                 currentNode.depth=newObj.depth+1;

                this.state.graphData[newName]=newObj;

                
                //currentDataProviderNode

                const currentParentDatap=this.nodeIndex[currentDataProviderNode.parent];

                /*remove the old choldren*/
                const currentParentDatapTmp=currentParentDatap.children.filter(dataItem => dataItem.name !== nodeName);
                
                currentParentDatap.children=currentParentDatapTmp;
                currentParentDatap.children.push(indexNewObj);


                indexNewObj.children=[];
                indexNewObj.children.push(currentDataProviderNode);

                this.nodeIndex[currentNode.parent]=currentParentDatapTmp;
                this.nodeIndex[newName]=indexNewObj

                
                if(this.state.dataEdges[parentObj.data.name+'_'+currentNode.data.name]){
                  delete this.state.dataEdges[parentObj.data.name+'_'+currentNode.data.name];
                }
                this.state.dataEdges[newObj.data.name+'_'+currentNode.data.name]={source:currentNode.data.name,target:newObj.data.name}
                this.state.dataEdges[parentObj.data.name+'_'+newObj.data.name]={source:parentObj.data.name,target:newObj.data.name}

                this.state.nodes.push(newObj);
                break;

            }
}

export const getPropertyType = (itemName, itemValue,linkPropList,enumPropList) =>{
    let property
    if(typeof itemValue === 'string')property = itemValue
    else property = itemValue['@class']
    
    const getProp = (element) => element === property;
    //type rpoperty like string,num etc...
    if(property.indexOf(":")===3){
      return PROPERTY_TYPE_BY_CLASS[itemValue]
    }else if(linkPropList.findIndex(getProp)){
      return PROPERTY_TYPE_NAME.OBJECT_PROPERTY
    }else if(enumPropList.findIndex(getProp)){ 
      return PROPERTY_TYPE_NAME.CHOICE_PROPERTY
    }
}

