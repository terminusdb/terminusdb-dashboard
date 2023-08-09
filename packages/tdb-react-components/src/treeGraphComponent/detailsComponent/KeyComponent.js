import React,{useState} from 'react'
import {GraphContextObj} from '../hook/graphObjectContext'
import {ListComponent} from './ListComponent'
import {BaseSelectComponent} from './BaseSelectComponent'
import {BaseSelectReactElement} from './BaseSelectReactElement'
import {removeElementToArr} from '../utils/modelTreeUtils'
import {ELEMENT_HELP} from '../../constants/details-labels';
import { FormGroupComponent } from "./FormGroupComponent"
import { HelpComponent } from "./HelpComponent"
import Card from "react-bootstrap/Card"

export const KeyComponent = (props) => {  
    const {mainGraphObj,selectedNodeObject} = GraphContextObj()
    const {type,fields} = mainGraphObj.getClassKey(selectedNodeObject)

    const [needUpdate,setNeedUpdate] = useState(0) 
    
    var keyTypeArr = ['Lexical','Hash','Random','ValueHash']
    // if selected node is a subdocument then we allow key to be only Random/ValueHash
    // if(selectedNodeObject.schema["@subdocument"]) {
    //     keyTypeArr = ['Random','ValueHash']
    // }
    

    const proDataP = mainGraphObj.getPropertyAsList(selectedNodeObject)

    const removekey=(value)=>{
        if(removeElementToArr(fields,value)){
            setNeedUpdate(Date.now())
            ;
        }
    }
    const changeKeyType=(name,value)=>{
        let keyArr = fields
        if(value==='Random' || value === 'ValueHash'){
            keyArr=null
        }
        mainGraphObj.setClassKey(value,keyArr)
        setNeedUpdate(Date.now()) 
        ;
    }

    const addKeyItem=(name,value)=>{
        const index = fields.findIndex(function(item){return item===value})
        if(index===-1){          
            fields.push(value)
            setNeedUpdate(Date.now())
            ;
        }
    }

		const ShowKeyComponent = () => {
			return <Card className='w-100'>
				<Card.Body>
					{fields.length ? <ListComponent removeItem={removekey} 
						elementId='fields' 
						elementType='node'
						isKey={true}
						dataProvider={fields}/>	: <label className='text-muted small fst-italic'>{`No Property Key set`}</label>}
					<BaseSelectComponent
						view={props.view}
						defaultValue={type} 
						dataProvider={keyTypeArr} 
						optionChange={changeKeyType} 
						showLabel={false} 
						title={`Key Type`}
						help={ELEMENT_HELP.key_type} 
						name='elementsType'/>
					{(type !== 'Random' && type !== 'ValueHash') && <BaseSelectReactElement
						name="addKey"
						help={ELEMENT_HELP.key_fields}
						resetSelection={true} 
						view={props.view}
						isClearable={false} 
						title={`Select Property`}
						onChange={addKeyItem} 
						placeholder={'Select Property'} 
						dataProvider={proDataP} 
						optionChange={addKeyItem}/>}
				</Card.Body>
			</Card>
		}


    if(props.view === `UI_VIEW`) {

			return <React.Fragment>  
				<FormGroupComponent groupClassName={`${props.groupClassName} mb-3 mt-2`}
				labelComponent = {<label className={`mr-3`} htmlFor={"Document Key"}>{"Document Key"}</label>}
				helpComponent = {<HelpComponent text={`Selected Key`}/>}
				fieldComponent = {<ShowKeyComponent/>}
				/> 
			</React.Fragment>  

    }
	
		return <div className='mb-3'>
			<div className='d-flex'>
				<label className={`mr-3`} htmlFor={"Document Key"}>{"Document Key"}</label>
				<HelpComponent text={`Selected Key`}/>
			</div>
			<ShowKeyComponent/>
		</div>

	return <React.Fragment>   
		<div className="tdb__panel__title tdb__panel__title--parent">
			{"Document Key"}
		</div>
		{fields.length===0 && 'No Property Keys'}
		<ListComponent removeItem={removekey} 
			elementId='fields' 
			elementType='node'
			dataProvider={fields}/>	
		<BaseSelectComponent
			defaultValue={type} 
			dataProvider={keyTypeArr} 
			optionChange={changeKeyType} 
			showLabel={false} 
			help={ELEMENT_HELP.key_type} 
			name='elementsType'/>
		{(type !== 'Random' && type !== 'ValueHash') && <BaseSelectReactElement
			name="addKey"
			help={ELEMENT_HELP.key_fields}
			resetSelection={true} 
			isClearable={false} 
			onChange={addKeyItem} 
			placeholder={'Select Property'} 
			dataProvider={proDataP} 
			optionChange={addKeyItem}/>}

	</React.Fragment> 
}
