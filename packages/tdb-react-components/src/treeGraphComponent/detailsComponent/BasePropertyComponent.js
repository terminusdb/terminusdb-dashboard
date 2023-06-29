import React,{useState} from 'react'
import {BaseElement} from './BaseElement';
import {Accordion} from '../../form/Accordion';
import { BaseRenderAsComponent } from "./BaseRenderAsComponent"
import {GET_ICON_NAME} from '../../constants/details-labels';
import {BaseSelectComponent} from './BaseSelectComponent';
import PropTypes from "prop-types";
import {PropertyExtraInfo} from './PropertyExtraInfo'
import {GraphContextObj} from '../hook/graphObjectContext';
import Badge from 'react-bootstrap/Badge'; 
import Stack from 'react-bootstrap/Stack'; 

export const BasePropertyComponent = (props)=> {
		const {mainGraphObj} =GraphContextObj()
		//const extraInfoValue = props.extraInfoValue || {}
		//all the information about the property in the 
		const nodeSchemaData = props.nodeSchemaData || {}
		const currentNodeJson=props.currentNodeJson || {}
		let currentPropId = nodeSchemaData.id
		const viewBaseSchema=props.viewBaseSchema===false ? false : true;
		const showAllButton=props.showAllButton || {};
		const leftIconClassName=GET_ICON_NAME[currentNodeJson.type] || "custom-img-string"
		
		const [propId,setPropId] =  useState(currentPropId)
		//const [idError,setIdError] =  useState(false)

		const changePropertyValue=(propName,propValue)=>{
			// display render as option if string is a property 
			//if(propValue === "xsd:string") setDisplayRenderAs(Date.now())
			//else setDisplayRenderAs(false)
			mainGraphObj.setPropertyInfo(currentNodeJson,propName,propValue)
		}
		
		const updateBaseValue = (propName,propValue)=>{
			if(propName === 'id'){
				const defaultValue = props.selectDataProvider ? props.selectDataProvider.options[0].value : false
					//set the id and the type of the property 
				mainGraphObj.setPropertyId(currentNodeJson,propValue,defaultValue)
				setPropId(propValue)				
			}else if(propName === 'comment'){
				mainGraphObj.setPropertyInfo(currentNodeJson,propName,propValue)				
			}
		}

		function getAccordianTitle() {
			return <Stack direction='horizontal' className='w-100'>
				<label className='mr-3'>{propId}</label>
				<div className='ms-auto text-right'>
					{currentNodeJson && nodeSchemaData && <Badge bg="dark" className='text-warning mr-2'>
						{`${currentNodeJson.type}   |   ${nodeSchemaData.range}`}
					</Badge>}
					{nodeSchemaData && <Badge bg="dark" className='text-info  mr-2'>
						{nodeSchemaData.option === "" && `Mandatory`}
						{nodeSchemaData.option !== "" && nodeSchemaData.option}
					</Badge>}
				</div>
			</Stack>
		}
		
		return(
			<Accordion showBody={props.showBody} 
					   arrowOpenClassName = "accordion__arrow fa fa-caret-up"
					   arrowCloseClassName = "accordion__arrow fa fa-caret-down"
					   title={getAccordianTitle()}
						 className='w-100'
					   leftIconClassName={leftIconClassName}
					   tooltip={currentNodeJson.type || ''}>

							  
				{viewBaseSchema && <BaseElement updateValue={updateBaseValue}
										   removeElement={props.removeElement} 
										   nodeJsonData={currentNodeJson} 
											 view={props.view}
										   showAllButton={showAllButton}
										   nodeSchemaData={nodeSchemaData}
										   isNodeObject={false}
										  // indexError={idError}
										   
										   
								   >
								   {props.selectDataProvider &&
									<BaseSelectComponent
			                            help={props.help}
										optionChange={changePropertyValue}
										view={props.view}
			                            title={props.selectDataProvider.label}
					            		dataProvider={props.selectDataProvider.options}
					            		name={props.selectDataProvider.id}
					               		defaultValue={nodeSchemaData.range || ''}
										
					               		/>
	               					}

									<BaseRenderAsComponent nodeSchemaData={nodeSchemaData} 
										currentNodeJson={currentNodeJson}/> 

									{props.typeDescription &&
									<div className="tdb__form__label">
										<label className={props.labelClassName}>{props.typeDescription}</label>
									</div>
									}
									
	               					{props.children}
									{props.showCardinality &&
	               	  				 <PropertyExtraInfo extraInfoValue={nodeSchemaData} propObj={currentNodeJson} view={props.view} />
	               					}
								   </BaseElement>}
			</Accordion>
		)
}

/*
<Fragment>
							<BaseInputElement itemError={minError} help="card_min" defaultValue={currentNodeJson.min || ''} name='min' title={CARDINALITY_MIN_TITLE} onBlur={changePropertyValue} checkValue={cardCheckValue}/>
                			<BaseInputElement itemError={maxError} help="card_max" defaultValue={currentNodeJson.max || ''} name='max' title={CARDINALITY_MAX_TITLE} onBlur={changePropertyValue} checkValue={cardCheckValue}/>
	               		</Fragment>*/

BasePropertyComponent.propTypes = {
    showCardinality:PropTypes.bool
}

BasePropertyComponent.defaultProps = {
    showCardinality: true,
};