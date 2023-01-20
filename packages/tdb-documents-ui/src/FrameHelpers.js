import {makeMandatoryFrames} from "./mandatoryFrames"
import {makeOptionalFrames} from "./optionalFrames"
import {makeSetFrames} from "./setFrames"
import {makeListFrames} from "./listFrames"
import * as util from "./utils"
import * as CONST from "./constants"
import {makeArrayTypeFrames} from "./arrayTypeFrames/arrayTypeFrames"
import {makeFeatureCollectionTypeFrames} from "./arrayTypeFrames/featureCollectionTypeFrames"


export function getProperties (fullFrame, type, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation) {
    let properties = {}, propertiesUI = {}, required = []

    
    for(var item in frame) {

        if(item === "@id") continue
        else if(item === "@key") continue
        else if(item === "@type") continue 
        else if(item === "@id") continue
        else if(item === "@inherits") continue
        else if(item === CONST.SUBDOCUMENT) continue
        else if(item === CONST.DOCUMENTATION) continue
        else if(item === CONST.UNFOLDABLE) continue
        else if(util.isFeatureCollection(frame[item], mode)) {
            /**
             * treat featurecollection as a special type (since we combine all the set filled data to display
             * in a single map component)
             * This is applicable only in VIEW mode
             * in CREATE and EDIT mode the frames will be displayed as whatever type 
             * they have been defined - sets or optional etc.
             */
            let featureCollectionFrames=makeFeatureCollectionTypeFrames(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
            //set property layout & uiLayout
            properties[item] = featureCollectionFrames.layout
            propertiesUI[item] = featureCollectionFrames.uiLayout
        } 
        else if(util.isMandatory(frame, item)) {
            let mandatoryFrames=makeMandatoryFrames(fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation)
            
            //set property layout & uiLayout
            properties[item] = mandatoryFrames.layout
            propertiesUI[item] = mandatoryFrames.uiLayout
            //set property as required since Mandatory
            required.push(item)
        }
        else if(util.isOptional(frame, item)) { 
            let extractedFrames = util.extractFrames(frame, item)
            let optional = getProperties(fullFrame, item, extractedFrames, uiFrame, mode, formData, onTraverse, onSelect, documentation)
            let optionalFrames = makeOptionalFrames(optional, item, uiFrame, mode, formData, documentation) 
           
            //set property layout & uiLayout
            properties[item] = optionalFrames.layout
            propertiesUI[item] = optionalFrames.uiLayout
        }
        else if(util.isSet(frame, item)) {
            let extractedFrames = util.extractFrames(frame, item)
            let setFormData=formData && formData.hasOwnProperty(item) ? formData[item] : formData
            let extractedProperties = getProperties(fullFrame, item, extractedFrames, uiFrame, mode, setFormData, onTraverse, onSelect, documentation)
            let setFrames = makeSetFrames(extractedProperties, item, uiFrame, mode, setFormData, documentation) 
            
            //set property layout & uiLayout
            properties[item] = setFrames.layout
            propertiesUI[item] = setFrames.uiLayout
        }
        else if(util.isList(frame, item)) {
            let extractedFrames = util.extractFrames(frame, item)
            let setFormData=formData && formData.hasOwnProperty(item) ? formData[item] : formData
            let extractedProperties = getProperties(fullFrame, item, extractedFrames, uiFrame, mode, setFormData, onTraverse, onSelect, documentation)
            let listFrames = makeListFrames(extractedProperties, item, uiFrame, mode, setFormData, documentation) 
           
            //set property layout & uiLayout
            properties[item] = listFrames.layout
            propertiesUI[item] = listFrames.uiLayout
        }
        else if(util.isArrayType(frame, item)) {
            let arrayFrames=makeArrayTypeFrames({fullFrame, item, frame, uiFrame, mode, formData, onTraverse, onSelect, documentation})
            //set property layout & uiLayout
            properties[item] = arrayFrames.layout
            propertiesUI[item] = arrayFrames.uiLayout
        }
    }
 
    return {
        properties: properties,
        required: required,
        uiSchema: propertiesUI,
    }

}
