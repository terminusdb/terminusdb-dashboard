import React,{useState,useEffect} from 'react';
import {ADD_PARENT,REMOVE_PARENT} from '../utils/actionType'
import {ListComponent} from './ListComponent'
import {BaseSelectReactElement} from './BaseSelectReactElement'
import {BaseSelectComponent} from './BaseSelectComponent'
import {ParentsElementViewMode} from './viewMode/ParentsElementViewMode'
import {GraphContextObj} from '../hook/graphObjectContext';
import {Accordion} from  '../../form/Accordion';
import {CLASS_TYPE_NAME,CLASS_TYPE_NAME_LABEL,getLabelByName} from '../utils/elementsName'

export const ParentsFilter = (props) => {
	const {selectedNodeObject,graphDataProvider,updateParentsList,availableParentsList} = GraphContextObj();
	
	const [classType,setClassType]=useState(CLASS_TYPE_NAME.OBJECT_CLASSES)
	const [dataProvider,setDataProvider]=useState(null)
	const [showAddParentsBox, setShowAddParentsBox]= useState(false)
	const [showComboObjectType,setShowComboObjectType]= useState(false);

	const parentClassType=selectedNodeObject.type 

	const placeholder=`Add ${getLabelByName(classType)}  as Parent`

	/*
	* classTypeName is the current selected element in the combo
	*/
	const getClassDataProvider=(classTypeName)=>{
		let dataProvider=[];		
		switch(classTypeName){
			case CLASS_TYPE_NAME.OBJECT_CLASS:
				 classTypeName=CLASS_TYPE_NAME.OBJECT_CLASSES;
				 if(availableParentsList.documentClassArr.length===0){
				 	setShowComboObjectType(false);
				 }else{
				 	setShowComboObjectType(true);
				 }
			case CLASS_TYPE_NAME.OBJECT_CLASSES:
		    	  dataProvider=availableParentsList.objectClassArr
		    	  break;
		    case CLASS_TYPE_NAME.CHOICE_CLASS:
		    case CLASS_TYPE_NAME.DOCUMENT_CLASS:
		    	/*
		    	* if the object type === "Object"
		    	*/
		    	setShowComboObjectType(false);
		    default:
		    	
		        dataProvider=availableParentsList.documentClassArr;//.concat(props.ordinaryClassDataP)
				break;
		        	
		}
		setClassType(classTypeName)
		setDataProvider(dataProvider)
	}

	useEffect(() => {
		if(!availableParentsList || (availableParentsList.objectClassArr.length===0 && 
			availableParentsList.documentClassArr.length===0)){
			setShowAddParentsBox(false);
		}else{				
			setShowAddParentsBox(true);
			
			getClassDataProvider(selectedNodeObject.type)
		}					 	
	},[availableParentsList])


	const changeParentList=(elementId,elementValue)=>{
		getClassDataProvider(elementValue);
	}

	/*
	* to be review the parameter orders
	*/
	const addParent=(elementId,parentName)=>{
		updateParentsList(parentName,ADD_PARENT)
	}

	const removeParent=(selectedValue)=>{
		updateParentsList(selectedValue,REMOVE_PARENT)
	}
		
	const elementClassList=[{label:CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES,
							value:CLASS_TYPE_NAME.DOCUMENT_CLASSES},
							{label:CLASS_TYPE_NAME_LABEL.OBJECT_CLASSES,
							value:CLASS_TYPE_NAME.OBJECT_CLASSES}]

		
    const elementId=selectedNodeObject.name;
    const elementType=selectedNodeObject.type;

    const title='Edit Parents';
    const tooltip='Tooltip';

    

    const getParentList=()=>{
    	const parents=selectedNodeObject.parents || [];
    	const listParent=[]
    	parents.forEach((parentName,index)=>{
    		const elementObj=graphDataProvider.get(parentName);
			const elementData=elementObj.data;
			const label=elementData.label || elementData.id
    		listParent.push({name:elementData.name,label:label})
    	})
    	return listParent;
   }
    const listDataProvider=getParentList();
    
    

	return (	<>
				<div className="tdb__panel__title tdb__panel__title--parent">
		  	 		Parent List
		  	 	</div>
		  	 	{listDataProvider.length>0 &&
					<ParentsElementViewMode />
				}

				<Accordion titleClassName="tdb__accordion__head"
									title="Add/Remove Parents"  
									tooltip="Add/Remove Parents">
				<div className="tdb__panel__box">
				    <div className="tdb__list">
			     		<div className="tdb__list__items" >
			     			{listDataProvider.length===0 && 'No Parents'}
 			     			<ListComponent removeItem={removeParent} elementId={elementId} elementType={elementType} dataProvider={listDataProvider}/>					 
						 </div>
						 {showAddParentsBox &&	
							 <>					 
							 {showComboObjectType && 					 	
								<BaseSelectComponent
									defaultValue={classType} 
									dataProvider={elementClassList} 
									optionChange={changeParentList} 
									showLabel={false}  
									name='elementsType'
									setEnableSave={props.setEnableSave}/>					 	
							 }
							 	<BaseSelectReactElement
								 	name="addParent"
								 	resetSelection={true} 
									isClearable={false} 
									onChange={addParent} 
									placeholder={placeholder} 
									dataProvider={dataProvider} 
									optionChange={addParent}/>
							</>
						}
					</div>
				</div>	
				</Accordion>
				</>
				
	)
}