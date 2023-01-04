import React from "react"
import * as DIFFCONST from "./diff.constants"
import * as CONST from "../constants"
import * as util from "./diffComponents"
import {getDataFieldDiffs} from "./dataFieldDiffs"
import Card from 'react-bootstrap/Card';
import {showRemovedSubDocument, showRemovedElementOriginal, showRemovedElementChanged} from "./diffComponents"

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
    let cssEntriesCount=tagUI[item].length
    // some elements have been added or removed 
    if(cssEntriesCount > entiresCount) {
        return cssEntriesCount-entiresCount
    }
    return false
}

/** displays removed elements icons */
const RemovedElements = ({formData, tagUI, item}) => {
    let displayElementPlaceholders=checkIfElementsChanged(formData, tagUI, item)
    if(displayElementPlaceholders === 0) return <div/>
    let elements=[]
    let tagIndex=formData.length
    for(let count=0; count < displayElementPlaceholders; count++) {
        let name=item, required=false
        // check css in index of tagUI and display respective colored removed icons
        if(tagUI[item][tagIndex] === "tdb__diff__changed__removed") {
            elements.push(
                showRemovedElementChanged( {name, required} )
            )
        }
        // check css in index of tagUI and display respective colored removed icons
        else if(tagUI[item][tagIndex] === "tdb__diff__original__removed") {
            elements.push(
                showRemovedElementOriginal( {name, required} )
            )
        }
        tagIndex+=1
    }
    return elements
}

/** displays removed sub documents icons */
const RemovedSubDocumentElements = ({formData, tagUI, item, schema}) => {
    let displayElementPlaceholders=checkIfElementsChanged(formData, tagUI, item)
    if(!displayElementPlaceholders) return <div/>
    // displayElementPlaceholders will serve as starting index to get removed elements info from tagUI
    let elements=[], css="text-danger" // original
    let firstProperty=Object.keys(tagUI[item][displayElementPlaceholders][0])[0]
    if(tagUI[item][displayElementPlaceholders][0][firstProperty] === "tdb__diff__changed__removed") 
        css="text-success"
    let tagIndex=displayElementPlaceholders
    for(let count=0; count < displayElementPlaceholders; count++) {
        elements.push(showRemovedSubDocument(tagUI[item][displayElementPlaceholders], schema, css))
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
 * @param {*} param0 data - subdocument form data to be displayed 
 * @param {*} cssArray - css array to display in red or green for difs per subdocuments in array 
 * @param {*} schema - schema of subdocument
 * @returns each subdocument card per array 
 */
const SubDocumentTypeDiff = ({data, cssArray, schema}) => {
    let elements=[]
    for(let property in schema.items.properties) {
        if(property === "@type") continue
        if(schema.items.properties[property].info === CONST.DATA_TYPE) {
            let css="tdb__input"
            cssArray.map(arr => {
                if(arr.hasOwnProperty(property)) css=arr[property]
            })
            elements.push(<DataTypeDiff data={data[property]} css={css} label={property}/>)
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
 * @param {*} formData - props.formData 
 * @param {*} item - property interested in 
 * @param {*} schema - props.schema
 * @param {*} tagUI - extracted classnames to show diffs
 * @returns elements with diff css 
 */
export function displayElements(formData, item, schema, tagUI) {  
    //console.log("props in doff", props, tagOriginalUI)
    if(!formData) return <div/>

    let elements =[]
    elements.push(<label class="">{item}</label>)

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
            let css=tagUI[item][index]
            elements.push(<SubDocumentTypeDiff data={data} cssArray={css} schema={schema}/>)
        })
        elements.push(<RemovedSubDocumentElements formData={formData} tagUI={tagUI} item={item} schema={schema}/>)
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
