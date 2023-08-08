import React,{useState,useEffect, Fragment} from 'react';
import {ELEMENT_BASE_CONST,ELEMENT_HELP}  from '../../constants/details-labels.js';
import {RemoveElementComponent} from './RemoveElementComponent';
import PropTypes from "prop-types";
import {BaseInputElement} from './BaseInputElement';
import {BaseTextareaElement} from './BaseTextareaElement';
import {BaseCheckboxElement} from './BaseCheckboxElement';
import {KeyComponent} from './KeyComponent';
import {BaseAddParentElement} from "./BaseAddParentElement"
import {BaseAddChildElement}  from "./BaseAddChildElement"
import {CLASS_TYPE_NAME} from "../utils/elementsName"

export const BaseElement = (props)=>{	
    const [indexError,setIndexError]=useState(false);
    const nodeJsonData=props.nodeJsonData || {}
    const nodeSchemaData=props.nodeSchemaData || {}
    //const subdocument_disabled = nodeSchemaData.subdocument_disabled === true ? {disabled:true} : {}

    const changeElement=(name,value)=>{
        
        let val=value;
        //val = value.trim();
        try{
            if(name === 'id'){
                setIndexError(false);           
                if(val.indexOf(" ")>-1){
                    setIndexError("Please remove all the white space");              
                    return;
                }
                if(val===""){
                    setIndexError("Please enter a valid ID");
                    return;
                }               
            }
            if(props.updateValue){  
                props.updateValue(name,val)
            }
        }catch(err){
            setIndexError(err.message);    
        }
    }

    useEffect(() => {
        setIndexError(false); 
    },[nodeJsonData]) 

    function isPropertyType (type) {
        if(nodeJsonData.type===CLASS_TYPE_NAME.DOCUMENT_CLASS) return false
        if(nodeJsonData.type===CLASS_TYPE_NAME.OBJECT_CLASS) return false
        if(nodeJsonData.type===CLASS_TYPE_NAME.CHOICE_CLASS) return false
        return true
    }

    return( <>
        {/** not providing delete option for one of (temporary) */}
        {nodeJsonData && isPropertyType(nodeJsonData.type) && !nodeJsonData.oneOfDomain && <RemoveElementComponent 
            hasConstraints={props.hasConstraints} 
            elementId={nodeJsonData.name}
            displayAsIcon={false}
            size={"17"}
            isDisabled={props.isDisabled}
            className={'btn-sm border-0 bg-transparent float-right'}
            elementType={nodeJsonData.type} 
            removeElement={props.removeElement}
            />}
   	    <div className="tdb__panel__box tdb__panel__box--edit">
             

            {props.isNodeObject && nodeJsonData.type!=='ChoiceClass' && 
                <Fragment>
                    <BaseCheckboxElement labelClassName={"mb-0"}
                        view={props.view}
                        title={'Abstract'} help={"abstract"} name='abstract' defaultValue={nodeSchemaData.abstract} onBlur={changeElement} />
                </Fragment>
            }
            <BaseInputElement 
                autoFocus={true} 
                disabled={!nodeJsonData.newElement}
                title={`${ELEMENT_BASE_CONST.ID_TEXT} *` }
                placeholder={ELEMENT_BASE_CONST.ID_PLACEHOLDER}
                name='id'
                view={props.view}
                panelName={nodeJsonData.name}
                help={ELEMENT_HELP.class_id}
                onBlur={changeElement}
                defaultValue={nodeSchemaData.id}
                itemError={indexError }//|| props.indexError}
                />
                
            {props.isNodeObject  && nodeJsonData.type!=='ChoiceClass' && 
                <KeyComponent view={props.view}/>
            } 
            {props.children}
            <BaseTextareaElement
                isDisabled={props.isDisabled}
                placeholder={ELEMENT_BASE_CONST.DESCRIPTION_PLACEHOLDER} 
                title={ELEMENT_BASE_CONST.DESCRIPTION_TEXT}
                name='comment'
                view={props.view}
                help={ELEMENT_HELP.class_comment}
                onBlur={changeElement}
                defaultValue={nodeSchemaData.comment || ''}
            />

			<BaseAddParentElement {...props}/>
			<BaseAddChildElement {...props}/>

           
    	</div>
        </>
    )
}

BaseElement.propTypes = {
    nodeJsonData:PropTypes.object,
    nodeSchemaData:PropTypes.object,
    isNodeObject:PropTypes.bool,
    hasConstraints:PropTypes.bool
}

BaseElement.defaultProps = {
    nodeJsonData: {},
    nodeSchemaData:{},
    isNodeObject:true,
    hasConstraints:false
};