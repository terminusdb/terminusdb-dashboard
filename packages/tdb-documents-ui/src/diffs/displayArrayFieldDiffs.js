import React from "react"
import * as DIFFCONST from "./diff.constants"
import * as CONST from "../constants"
import * as util from "./diffComponents"
import {getDataFieldDiffs} from "./dataFieldDiffs"
import Card from 'react-bootstrap/Card';
import * as display from "./diffComponents"

/** 
 * 
 * @param {*} data - form data to be displayed 
 * @param {*} css - css to display in red or green for difss
 * @param {*} label - property name
 * @returns an input with diff css
 */
export const DataTypeDiff = ({data, css, label}) => { 
    return <span className="d-flex">
        <span className="opacity-0 control-label">{label}</span>
        <input value={data} className={`form-control ${css} mb-3`}/>
    </span>
}

/** checks if elements have been added or removed */
function checkIfElementsChanged(formData, tagUI, item) {
    let entiresCount=formData.length
    if(entiresCount === 1 && formData[entiresCount-1] === false) entiresCount=0
    let cssEntriesCount=tagUI[item].length
    // some elements have been added or removed 
    if(cssEntriesCount > entiresCount) {
        return cssEntriesCount-entiresCount
    }
    return false
}

/** displays removed elements icons */
const RemovedElements = ({formData, tagUI, item, info}) => {
    let displayElementPlaceholders=checkIfElementsChanged(formData, tagUI, item)
    if(displayElementPlaceholders === 0) return <div/>
    let elements=[]
    let tagIndex=formData.length
    for(let count=0; count < displayElementPlaceholders; count++) {
        let name=item, required=false
        if(typeof tagUI[item][tagIndex] === CONST.STRING_TYPE) {
            // check css in index of tagUI and display respective colored removed icons
            if(tagUI[item][tagIndex] === "tdb__diff__changed__removed") {
                elements.push( display.showRemovedElementChanged( {name, required}) )
            }
            // check css in index of tagUI and display respective colored removed icons
            else if(tagUI[item][tagIndex] === "tdb__diff__original__removed") {
                elements.push( display.showRemovedElementOriginal({name, required}) )
            }
        }
        else {
            break
        }
        
        tagIndex+=1
    }
    return elements
}

const NoValueSubDocumentElements = ({formData, tagUI, item, schema, info}) => {
    let displayElementPlaceholders=checkIfElementsChanged(formData, tagUI, item)
    if(!displayElementPlaceholders) displayElementPlaceholders=1
    // displayElementPlaceholders will serve as starting index to get removed elements info from tagUI
    let elements=[], css="text-danger" // original
    let firstProperty=Object.keys(tagUI[item][0])[0]
    if(tagUI[item][0][firstProperty] === "tdb__diff__changed__removed") 
        css="text-success"
    for(let count=0; count < displayElementPlaceholders; count++) {
        if(info === CONST.CHOICESUBCLASSES) { 
            elements.push(display.showRemovedChoiceSubDocument(schema, css))
        }
        else elements.push(display.showRemovedSubDocument(schema, css))
    }
    return elements
}

/** displays removed sub documents icons */
const RemovedSubDocumentElements = ({formData, tagUI, item, schema, info}) => {
    //if(isValid (formData)) return <div/>
    let displayElementPlaceholders=checkIfElementsChanged(formData, tagUI, item)
    if(!displayElementPlaceholders) {
        return <NoValueSubDocumentElements formData={formData} tagUI={tagUI} item={item} schema={schema} info={info}/>
    }
    //else return <div/>
    //if(!displayElementPlaceholders) return <div/>
    // displayElementPlaceholders will serve as starting index to get removed elements info from tagUI
    let elements=[], css="text-danger" // original
    let firstProperty=Object.keys(tagUI[item][displayElementPlaceholders][0])[0]
    if(tagUI[item][displayElementPlaceholders][0][firstProperty] === "tdb__diff__changed__removed") 
        css="text-success"
    let tagIndex=displayElementPlaceholders
    for(let count=0; count < displayElementPlaceholders; count++) {
        if(info === CONST.CHOICESUBCLASSES) { 
            elements.push(display.showRemovedChoiceSubDocument(schema, css))
        }
        else elements.push(display.showRemovedSubDocument(schema, css))
        tagIndex+=1
    }
    return elements
}

const LinkTypeDiff = ({data, css, label})=> {
    return <span className="d-flex">
        <span className="opacity-0 control-label">{label}</span>
        <span className={`${css}__diff__view mb-3`}>{data}</span>
    </span>
}

/**
 * 
 * @returns displays elements of subdocuments & choice sub documents 
 */
const DisplaySubElements = ({frameProperties, cssElement, data}) => {
    let elements=[]
    //for(let property in schema.items.properties) {
    for(let property in frameProperties) {
        if(property === "@type") continue
        if(frameProperties[property].info === CONST.DATA_TYPE) {
            let css="tdb__input"
            if(Array.isArray(cssElement)) {
                cssElement.map(arr => {
                    if(arr.hasOwnProperty(property)) css=arr[property] 
                })
            }
            else css=cssElement ? cssElement : "tdb__input"
            elements.push(<DataTypeDiff data={data[property]} css={css} label={property}/>)
        }
        if(frameProperties[property].info === CONST.DOCUMENT) {
            let css="tdb__input"
            if(Array.isArray(cssElement)) {
                cssElement.map(arr => {
                    if(arr.hasOwnProperty(property)) css=arr[property]
                })
            }
            else css=cssElement ? cssElement : "tdb__input"
            elements.push(<LinkTypeDiff data={data[property]} css={css} label={property}/>)
        }
    }
    return <Card bg="secondary" className=" p-4 mt-4 mb-4 tdb__subdocument__card">
        <Card.Body>
            {elements}
        </Card.Body>
    </Card>
}

/**
 * 
 * @param {*} data - subdocument form data to be displayed 
 * @param {*} cssArray - css array to display in red or green for difs per subdocuments in array 
 * @param {*} schema - schema of subdocument
 * @returns each subdocument card per array 
 */
const SubDocumentTypeDiff = ({data, cssElement, schema}) => {
    return <DisplaySubElements frameProperties={schema.items.properties} cssElement={cssElement} data={data}/>
}

/**
 * 
 * @returns each choice subdocument card per array 
 */
const ChoiceSubDocumentTypeDiff = ({data, cssElement, schema}) => {

    let choiceType = data["@type"]
    let anyOfArray=schema.items[0]["anyOf"]
    let choiceFrame=anyOfArray.filter( arr => arr.title === choiceType)
    //get the first layout of choice
    let choiceFrameRef=choiceFrame[0] 

    return <>
        <input value={choiceType} className={`form-control tdb__input mb-3 mt-2`} readOnly/>
        <DisplaySubElements frameProperties={choiceFrameRef["properties"]} cssElement={cssElement} data={data}/>
    </>
}


/**
 * 
 * @param {*} formData - filled data 
 * @returns returns false if data is invalid
 */
function isValid (formData) {
	let data = formData 
    console.log(formData)
    if(Array.isArray(formData) && formData[0]===false ) data=false
    if(Array.isArray(formData) && formData[0]===undefined ) data=false
    if(Array.isArray(formData) && 
        typeof formData[0]===CONST.OBJECT_TYPE && 
        !Object.keys(formData[0]).length) data=false
    return data 
}

/**
 * 
 * @param {*} formData - props.formData 
 * @param {*} item - property interested in 
 * @param {*} schema - props.schema
 * @param {*} tagUI - extracted classnames to show diffs
 * @returns elements with diff css 
 */
export function displayElements(formData, item, schema, tagUI) {  
    //console.log("props in doff", props, tagOriginalUI)

    let elements =[]
    if(!formData) {
        return <div/>
    }
    
    // display label only if formdata is legit
    if(isValid(formData)) {
        elements.push(<label class="">{item}</label>)
    }
    

    if(!schema.items) {
        throw new Error (`Expected array items here instead received ${schema}`)
    }

    if(schema.items.info === CONST.DATA_TYPE) {
        formData.map((data, index) => {
            let css = tagUI[item][index] ? tagUI[item][index] : "tdb__input"
            elements.push(<DataTypeDiff data={data} css={css} label={item}/>)
        })
        elements.push(<RemovedElements formData={formData} tagUI={tagUI} item={item}/>)
    }
    else if(schema.items.info === CONST.SUBDOCUMENT_TYPE) {
        formData.map((data, index) => { 
            if (Object.keys(data).length === 0) return
            let css=tagUI[item][index] //? tagUI[item][index] : "tdb__subdocument__card"
            elements.push(<SubDocumentTypeDiff data={data} cssElement={css} schema={schema}/>)
        })
        elements.push(<RemovedSubDocumentElements formData={formData} tagUI={tagUI} item={item} schema={schema}/>)
    }
    // we treat choice sub document a bit diffrent 
    else if(Array.isArray(schema.items) && schema.items.length && schema.items[0].info === CONST.CHOICESUBCLASSES) {
        formData.map((data, index) => {
            let css=tagUI[item][index] ? tagUI[item][index] : "tdb__input"
            elements.push(<ChoiceSubDocumentTypeDiff data={data} cssElement={css} label={item} schema={schema}/>)
        })
        elements.push(<RemovedSubDocumentElements formData={formData} tagUI={tagUI} item={item} schema={schema} info={CONST.CHOICESUBCLASSES}/>)
    }
    // we treat choice sub document a bit diffrent 
    else if(Array.isArray(schema.items) && !schema.items.length) {
        // check info of additional items to see if this is an empty choice sub document case
        if(schema.hasOwnProperty("additionalItems") && schema.additionalItems.info === CONST.CHOICESUBCLASSES) {
            elements.push(<NoValueSubDocumentElements formData={formData} tagUI={tagUI} item={item} schema={schema} info={CONST.CHOICESUBCLASSES}/>)
        }

    }
    else if(schema.items.info === CONST.DOCUMENT) {
        formData.map((data, index) => {
            let css=tagUI[item][index] ? tagUI[item][index] : "tdb__input"
            elements.push(<LinkTypeDiff data={data} css={css} label={item}/>)
        })
    }
    else if(schema.items.info === CONST.ENUM) {
        formData.map((data, index) => {
            let css=tagUI[item][index] ? tagUI[item][index] : "tdb__input"
            elements.push(<LinkTypeDiff data={data} css={css} label={item}/>)
        })
        elements.push(<RemovedElements formData={formData} tagUI={tagUI} item={item}/>)
    
    }
    return <div className="d-block w-100">{elements}</div>
}
