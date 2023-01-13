import React from "react"
import * as CONST from "../constants"
import * as util from "../utils"
import * as helper from "./helpers"
import {displayMapComponent} from "../arrayTypeFrames/viewGeoArrayTypeFrames"

export function getUILayout(anyOfFrames, frame, item, uiFrame, mode, formData, onSelect, onTraverse, documentation) {
    
    //let subDocuemntBg = util.extractUIFrameSubDocumentTemplate(uiFrame) ? util.extractUIFrameSubDocumentTemplate(uiFrame) : 'bg-secondary'
    anyOfFrames.uiSchema["classNames"]=` card p-4 mt-4 mb-4`

    let selectStyle = util.extractUIFrameSelectTemplate(uiFrame) ? util.extractUIFrameSelectTemplate(uiFrame) : CONST.SELECT_STYLES
    
    // displays select or search component 
    function displayLinkedDocument(props) {
        //console.log("props in choice doc ui", props)

        if(props.hasOwnProperty("name")) return <div>{props.name}</div>
        if(props.schema.title === item) return <div>{item}</div>

        let choiceType=props.schema.title
        let placeholder=`Start typing ${choiceType}`
        let data = (props.formData && Object.keys(props.formData).length) ? props.formData : ""
        return helper.displayLinkedDocumentUI(props.onChange, placeholder, props.required, data, choiceType, choiceType, "", onSelect, selectStyle)
    }

    // display geo json properties like geo collection in Map (VIEW Mode only ...)
    function displayLinkedGeoDocument (props) {
        console.log("props geo", props) 

        // if no form data then we dont load the map 
        if(props.formData === undefined) return <div/>
        if(!props.hasOwnProperty("name")) return <div/>
        if(!Object.keys(props.formData).length) return <div/>

        let data = props.formData.hasOwnProperty(CONST.COORDINATES) ? props.formData[CONST.COORDINATES] : null
        let type = props.formData.hasOwnProperty("@type") ? props.formData["@type"] : null
        let property=props.schema.title

        if(props.hasOwnProperty("index")) {
            // hide any of selector from VIEW mode
            return <div/>
        }

        //if(!type) type=checkIfFeatureCollection(frame)
        return <>
            {/*<span className="control-label">{CONST.GEOMETRY_COLLECTION}</span>*/}
            {/*<span>{type}</span>*/}
            {displayMapComponent(data, formData, property, type)}
        </>

    }
 
    // check if geo property
    let isGeoProperty=util.checkIfGeoArray(frame, item, mode)

    // this is a geo collection 
    // we treat this separately since we get unfolded object from terminusdb 
    // so we have to extract the geo collection ID from the entire object & display a map in View mode
    if(isGeoProperty && mode === CONST.VIEW) {
        anyOfFrames.uiSchema["classNames"]="tdb__view__map"
        anyOfFrames.uiSchema["ui:field"] = displayLinkedGeoDocument
        return anyOfFrames.uiSchema
    } 

    anyOfFrames.uiSchema["ui:field"] = displayLinkedDocument
    return anyOfFrames.uiSchema

}