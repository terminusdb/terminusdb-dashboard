import * as NODE_ACTION_NAME from '../utils/actionType'
import {CLASS_TYPE_NAME} from '../utils/elementsName'

const getElementsStyle=()=>{
	const elementsStyleTmp={}
	elementsStyleTmp[CLASS_TYPE_NAME.DOCUMENT_CLASSES]={ fillColor:"#cccccc",lineColor:"#ffb266",lineSize:6}
	elementsStyleTmp[CLASS_TYPE_NAME.OBJECT_CLASSES] = { fillColor:"#cccccc",lineColor:"#96e997",lineSize:6}
	elementsStyleTmp[CLASS_TYPE_NAME.CHOICE_CLASSES] = {fillColor:"#cccccc",lineColor:"#17becf",lineSize:6}
	elementsStyleTmp[CLASS_TYPE_NAME.DOCUMENT_CLASS]={fillColor_ab:"#fcdbba", fillColor:"#ffb266",lineColor:"#ffb266",lineSize:2}
	elementsStyleTmp[CLASS_TYPE_NAME.OBJECT_CLASS]= {fillColor_ab:"#bdf8be", fillColor:"#96e997",lineColor:"#96e997",lineSize:2}
	//elementsStyleTmp[CLASS_TYPE_NAME.CHOICE_CLASS] =  {fillColor:"#a783c9",lineColor:"#a783c9",lineSize:2}
elementsStyleTmp[CLASS_TYPE_NAME.CHOICE_CLASS] =  {fillColor:"#17becf",lineColor:"#17becf",lineSize:2}

	elementsStyleTmp[CLASS_TYPE_NAME.SCHEMA_ROOT] ={fillColor:"#cccccc",lineColor:"#cccccc",lineSize:2}

	return elementsStyleTmp;
}


export const elementsStyle=getElementsStyle()

export const groupMenuList={'ROOT':[{id:NODE_ACTION_NAME.ADD_NEW_ENTITY, label: "Add Document"},
					  				/*{id:NODE_ACTION_NAME.ADD_NEW_CLASS, label: "Add Object"},*/
					  				{id:NODE_ACTION_NAME.ADD_NEW_CHOICE_CLASS, label: "Add Enum"}],
					  /*'ObjectClasses':[{id:NODE_ACTION_NAME.ADD_NEW_CLASS, label: "Add Object"}],*/
					  'ChoiceClasses':  [{id:NODE_ACTION_NAME.ADD_NEW_CHOICE_CLASS, label: "Add Enum"}],
					  'DocumentClasses':[{id:NODE_ACTION_NAME.ADD_NEW_ENTITY, label: "Add Document"},
					  					 {id:NODE_ACTION_NAME.ADD_NEW_CLASS, label: "Add Subdocument"}]}

export const nodeMenuList=[{id:NODE_ACTION_NAME.ADD_PARENT, label: "Add Parent"},
				  		   {id:NODE_ACTION_NAME.ADD_CHILD, label: "Add Child"}]
