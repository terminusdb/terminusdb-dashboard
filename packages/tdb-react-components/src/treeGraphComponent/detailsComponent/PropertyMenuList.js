import React ,{useState} from 'react';
import {CLASS_PROPERTIES_LIST} from '../../constants/details-labels';
import {Dropdown,ButtonGroup,Button} from 'react-bootstrap';
import {PROPERTY_TYPE_NAME} from '../utils/elementsName'
import DropdownButton from 'react-bootstrap/DropdownButton';
 
export const PropertyMenuList =(props)=>  { 
    const propertyTypeList=Array.from(CLASS_PROPERTIES_LIST);
    
    const addNewProperty=(propertyType, propertyRange)=>{
        props.addNewProperty(propertyType,propertyRange)
    }

    const entries = propertyTypeList.map((item, index) =>{
             let onClick={onClick:()=>{addNewProperty(item.id, item.defaultRange)}}

             if(item.id===PROPERTY_TYPE_NAME.CHOICE_PROPERTY && props.enumDisabled===true){
                onClick={disabled:true}
             }
             return  <Dropdown.Item  {...onClick} key={item.id} id={item.id} >{item.label}</Dropdown.Item>
             
        })

    return <div className="tdb__panel__bar">
        <DropdownButton id="add_property" title={props.title} className="my-3" size="sm" variant={"light"}>
            {entries}
        </DropdownButton>
    </div>

	
}
