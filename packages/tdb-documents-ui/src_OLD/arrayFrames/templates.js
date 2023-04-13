import React, {useState, useEffect} from "react"
import {BiPlus} from "react-icons/bi"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {RiDeleteBin5Fill} from "react-icons/ri"
import {FaArrowDown, FaArrowUp} from "react-icons/fa"
import {getPropertyLabelFromDocumentation} from "../documentationTemplates"
import {getAnyOfOptions} from "../choiceDocumentTypeFrames/choiceDocumentTypeFrames"
import {getSelectComponent} from "../documentTypeFrames/helpers"
import * as CONST from "../constants"
import * as util from "../utils"

/**
 * 
 * @param {*} props - inbuild props from ArrayFieldTemplate 
 * @returns label from documentation if available else simply returns property name
 */
function fetchLabel (props) { 
    if(props.uiSchema.hasOwnProperty("ui:title")) return props.uiSchema["ui:title"]
    return props.title
}

/**
 * 
 * @param {*} props - inbuild props from ArrayFieldTemplate 
 * @returns label to be displayed in Add buttons of arrays
 */
function fetchArrayAddLabel(props) {
    var documentation
    if(props.uiSchema.hasOwnProperty("ui:title")) {
        if(props.uiSchema["ui:title"].hasOwnProperty("props") && 
            props.uiSchema["ui:title"].props.hasOwnProperty("documentation") && 
            props.uiSchema["ui:title"].props.documentation.length) {
                documentation=props.uiSchema["ui:title"].props.documentation
            }
        return getPropertyLabelFromDocumentation(props.title, documentation, true)
    }
    return props.title
}

export function ArrayFieldTemplate(props) {
	//console.log("props", props)
	var variant="dark"
	if(props.schema.info===CONST.SUBDOCUMENT_TYPE) variant="secondary"
    //let label=props.title  
    let label=fetchLabel(props)
    let arrayButtonLabel= fetchArrayAddLabel(props)
    // for sets and list we pass along the title
    /*if(props.hasOwnProperty("schema") && 
        props["schema"].hasOwnProperty("@name")){
        label=props["schema"]["@name"]
    }*/
    //console.log("label templae", label, props)
	return  <div className={`${props.className} w-100`}>
        <span className="array-contorl-label d-flex">{label}</span>
        {/*<span className="control-label d-flex">{props.title}</span>*/}
        {/*<p className="text-muted fw-bold">{`${props.title} is a Set. To add ${props.title} click on the Add button`}</p>*/}
        {props.items &&
            props.items.map(element => (
                <div key={element.key} className={`${element.className} align-items-baseline w-100`}>
                    {<div>{element.children}</div>}
                    {element.hasMoveDown && (
                        <Button variant={variant} 
                            className="mb-3 tdb__array__item__list bg-transparent border-0" 
                            title="Move Down"  
                            onClick={element.onReorderClick(
                                element.index,
                                element.index + 1
                            )}>
                            <FaArrowDown className="text-light" style={{fontSize: "20px"}}/>
                        </Button>
                    )}
                    {element.hasMoveUp && (
                        <Button variant={variant} title="Move Up"  
                            className="mb-3 tdb__array__item__list bg-transparent border-0" 
                                onClick={element.onReorderClick(
                                element.index,
                                element.index - 1
                            )}>
                        <FaArrowUp className="text-light" style={{fontSize: "20px"}}/>
                    </Button>
                    )}

                    {element.hasRemove && <Button  variant={variant} 
                        className="mb-3 tdb__array__item__list bg-transparent border-0 " 
                        title="Delete" 
                        onClick={element.onDropIndexClick(element.index)}>
                        <RiDeleteBin5Fill className="text-danger" style={{fontSize: "25px"}}/>
                    </Button>}
                </div>
        ))} 

        {props.canAdd && (
            <div className="row">
                <p className="col-xs-3 col-xs-offset-9 array-item-add text-right"> 
                    <Button data-cy={`add_${label}`} variant="light" className="btn-sm text-dark" type="button" onClick={props.onAddClick}>
                        <BiPlus className="mr-2"/> <label>{`Add `} {arrayButtonLabel}</label>
                    </Button> 
                </p>
            </div>
        )}
    </div>

}


/**
 * 
 * @param {*} data - form data for choice document which is an array 
 * @param {*} label - label
 * @param {*} onTraverse - on Traverse function 
 * @param {*} description - description of field
 * @param {*} selectStyle - custom select style
 * @returns custom ui for Array choice documents with filled data 
 */
/*export function ViewArrayDocumentLinks (data, label, onTraverse, description, selectStyle) {
    let elements = []
    data.map( val => {
        elements.push( <div className="d-flex">
            <div className="control-label opacity-0 col-md-1">
                {label}
            </div>
            <span className={`tdb__span__select text-light text-break`}>
                {val}
            </span>
        </div>)
    })
    return  <div className="d-block mb-3">
        <div className="control-label">
            {label}
        </div>
        {elements}
       
    </div>

}

function getEachChoiceDocumentUI (choicesArray, data, uiFrame, onChange, placeholder, required, label, description, onSelect, selectStyle) {
    const [selected, setSelected]=useState(data ? util.extractChoiceTypeFromID (data) : "")
    const [formDataValue, setFormDataValue]=useState(data ? data : false)

    let choiceType=util.extractChoiceTypeFromID(formDataValue)

    useEffect(()=>{
        if(formDataValue) {
            choiceType=util.extractChoiceTypeFromID(formDataValue)
            setSelected(choiceType)
        }
    }, [formDataValue])

    function changeSelection (e) {
        if(selected !== e.target.value) {
            setFormDataValue(false)
        }
        setSelected(e.target.value) 
    }

    return <Card bg="secondary" className="p-4 w-100 tdb__margin__adjust__documents mb-3">
        <Form.Select aria-label="choice document array form" 
            className="mb-3 tdb__choice__doc__select border-light"
            defaultValue={selected}
            onChange={changeSelection}>
            {getAnyOfOptions(choicesArray, label)}
        </Form.Select>
        {getSelectComponent(onChange, `Select ... `, required, formDataValue, selected, selected, description, onSelect, selectStyle)}
    </Card>
}*/

/*function getAdditionalChoiceDocumentUI(choicesArray, value, uiFrame, onChange, placeholder, required, label, description, onSelect, selectStyle)  {
    
    function changeSelection (e) {
        if(onChange) onChange(e.target.value)
    }
    
    return <Card bg="secondary" className="p-4 w-100 tdb__margin__adjust__documents mb-3">
        <Form.Select aria-label="choice document array form" 
            className="mb-3 tdb__choice__doc__select border-light"
            onChange={changeSelection}>
            {getAnyOfOptions(choicesArray, label)}
        </Form.Select>
        {getSelectComponent(onChange, `Select ... `, required, formDataValue, selected, selected, description, onSelect, selectStyle)}
    </Card>
}*/
        

/*
export function getDisplayArrayChoiceDocumentFunctionUI (choicesArray, data, uiFrame, onChange, placeholder, required, label, description, onSelect, selectStyle) {
    let elements = [], additionalItems=[]

    const [clickedAdditional, setClickedAdditional]=useState(0)
    
    additionalItems.push(
        getEachChoiceDocumentUI (choicesArray, "", uiFrame, onChange, placeholder, required, label, description, onSelect, selectStyle) 
    )


    function displayAdditionalItems(e) {
        setClickedAdditional(clickedAdditional + 1)
    }

    data.map( choice => {
        elements.push(
            getEachChoiceDocumentUI (choicesArray, choice, uiFrame, onChange, placeholder, required, label, description, onSelect, selectStyle) 
        )
    })

    const AdditionalItems = ({clickedAdditional}) => {
        if(clickedAdditional === 0)return <div/>
        return <div id={clickedAdditional}>
            {getEachChoiceDocumentUI (choicesArray, "", uiFrame, onChange, placeholder, required, label, description, onSelect, selectStyle)}
        </div>
    }

    return <div className="w-100 d-block">
        <span className="col-md-1">
            <Form.Label>{label}</Form.Label>
        </span>
        {elements}
        <AdditionalItems clickedAdditional={clickedAdditional}/>
        <Button data-cy={`add_${label}`} variant="light" className="text-dark" type="button" onClick={displayAdditionalItems}>
            <BiPlus className="mr-2"/> <label> {`Add ${label}`}</label>
        </Button> 
    </div>
    
}*/
