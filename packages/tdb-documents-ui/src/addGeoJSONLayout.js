import * as CONST from "./constants"
import * as util from "./utils"

export function addGeoJSONLayout (layout, documentFrame, property) {
  // GEO JSON types so set items in layout 
  let field = documentFrame[property]
    
  if(util.isPointType(field)) {
    // display 2 (CONST.POINT_MIN_ITEMS) items for lat & lng for point
    layout["items"]= { type: CONST.STRING_TYPE }
    layout["minItems"] = util.getMinItems(documentFrame, property)
  }
  else if (util.isLineStringType(field)) {
    layout["items"]= { 
      "type": CONST.ARRAY_TYPE,
      "items": { type: CONST.STRING_TYPE },
      "minItems": CONST.POINT_MIN_ITEMS 
    }
    layout["additionalItems"]= { 
      "type": CONST.ARRAY_TYPE,
      "items": { type: CONST.STRING_TYPE },
      "minItems": CONST.POINT_MIN_ITEMS 
    }
  } 
  else if (util.isPolygonType(field) && util.isPolygon(documentFrame)) {
    layout["items"]= {
      "type": CONST.ARRAY_TYPE,
      "items": {
        "type": CONST.ARRAY_TYPE,
        "items": { type: CONST.STRING_TYPE },
        "minItems": CONST.POINT_MIN_ITEMS  
      }
    }
  } 
  else if (util.isPolygonType(field) && util.isMultiPolygon(documentFrame)) {
    layout["items"]= {
      "type": CONST.ARRAY_TYPE,
      "items": {
        "type": CONST.ARRAY_TYPE,
        "items": { type: CONST.STRING_TYPE },
        "minItems": CONST.POINT_MIN_ITEMS  
      }
    }
  } 
}