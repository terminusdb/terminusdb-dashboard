import * as util from "../utils"
import { getInputUI } from "./inputWidgetHelper"


export const uiHelper = (args, property) => {

  let { documentFrame } = args  

  if(util.isMandatory(documentFrame, property)) {
    // DATA TYPE
    return getInputUI(args, property)
  }
}