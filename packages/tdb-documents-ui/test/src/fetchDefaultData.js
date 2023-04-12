import React from "react"
import * as CONST from "./constants"
import * as CAMS from "./cams.constants"
import * as GEO from "./geo.constants"

export function getDefaultDocumentData(mode, dataProduct, type, setData) {
  
    if(dataProduct === CONST.CAMS_DATA_PEODUCT) {
        if(CAMS.DATA.hasOwnProperty(type)) {
            //console.log("CAMS.DATA", CAMS.DATA)
            let data = CAMS.DATA[type][mode]
            setData(data)
        }
    }
    else if(dataProduct === CONST.GEO_DATA_PRODUCT) {
        if(GEO.DATA.hasOwnProperty(type)) {
            let data = GEO.DATA[type]
            setData(data)
        }
    }
    

}