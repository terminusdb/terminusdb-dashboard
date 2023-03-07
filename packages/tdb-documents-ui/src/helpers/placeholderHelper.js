import * as CONST from "../constants"

/**
 * 
 * @param {*} frame frame defintion 
 * @returns placeholder for field
 */
export function getPlaceholder (frame)  {
  if(typeof frame === CONST.STRING_TYPE) return frame
  // Object 
  //if(!frame.hasOwnProperty(CONST.TYPE)) {
    //throw new Error(`Expected to have ${CONST.TYPE}... but received ${frame} instead`)
  //}
  return frame[CONST.CLASS]
} 