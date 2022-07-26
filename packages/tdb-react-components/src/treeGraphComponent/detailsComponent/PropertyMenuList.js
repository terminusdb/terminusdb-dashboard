import React ,{useState} from 'react';
import {CLASS_PROPERTIES_LIST} from '../../constants/details-labels';
import {Dropdown} from '../../form/Dropdown'; 
import {PROPERTY_TYPE_NAME} from '../utils/elementsName'
export const PropertyMenuList =(props)=>  {

    const propertyTypeList=Array.from(CLASS_PROPERTIES_LIST);
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const addNewProperty=(propertyType,propertyRange)=>{
        toggle();
        props.addNewProperty(propertyType,propertyRange)
    }

    const entries = propertyTypeList.map((item, index) =>{
             let onClick={onClick:()=>{addNewProperty(item.id,item.defaultRange)}}

             if(item.id===PROPERTY_TYPE_NAME.CHOICE_PROPERTY && props.enumDisabled===true){
                onClick={disabled:true}
             }
             return <button {...onClick} className="tdb__dropdown__button" key={item.id} id={item.id}> {item.label}</button>
        })

	return(
		<div className="tdb__panel__bar">
            <Dropdown id="add_property"  toggle={toggle} isOpen={dropdownOpen} title="Add Property" className="nav__main__link tdb__commit__bar--drop" >                   
             {entries}
            </Dropdown>
		</div>
	) 	
}

