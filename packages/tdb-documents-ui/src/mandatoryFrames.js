import * as CONST from "./constants"
import * as util from "./utils"
import { uiHelper } from "./helpers/uiHelper"
import { getPlaceholder } from "./helpers/placeholderHelper"
import { typeHelper } from "./helpers/typeHelper"
import { addGeoJSONLayout } from "./addGeoJSONLayout"

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property 
 * @param {*} uiFrame - custom UI to change appearance
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} formData - filled data to be displayed in form 
 * @param {*} documentation - formData - filled data to be displayed in form 
 * @returns a data field 
 */
export function makeMandatoryFrames (args, property) {

   
  let { documentFrame, fullFrame } = args

  let placeholder=getPlaceholder(args.documentFrame[property]),
  isArray=false

  /** gather layout of property  */ 
  let layout = { 
    "type": typeHelper(documentFrame, property, fullFrame, isArray),
    "title": property,
    [CONST.PLACEHOLDER]: placeholder
  } 

  if(util.isInherritedFromGeoJSONTypes(documentFrame)) {
    addGeoJSONLayout(layout, documentFrame, property)
  }
  if(util.isSysUnitDataType(documentFrame[property])) {
    // assign default value if sys unit
    layout["default"]=[]
  }


  let uiLayout = uiHelper(args, property)
  
  return { layout, uiLayout }
}
