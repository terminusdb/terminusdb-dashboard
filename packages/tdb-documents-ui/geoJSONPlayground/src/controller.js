import { CREATE } from "./constants"
import * as menu from "./menu.constants"
import * as data from "./data.constants"

// function acts as a controller to point to document type based on menu chosen 
export function getType(selectedMenu) { 
  if(selectedMenu === menu.GEO_FEATURE) return "Feature"
  else if(selectedMenu === menu.GEO_FEATURE_COLLECTION) return "FeatureCollection"
  else if(selectedMenu === menu.GEO_GEOMETRY_COLLECTION) return "GeometryCollection"
  else if(selectedMenu === menu.GEO_POINT_DOCUMENT) return "Point"
  else if(selectedMenu === menu.GEO_LINE_STRING_DOCUMENT) return "LineString"
  else if(selectedMenu === menu.GEO_POLYGON_DOCUMENT) return "Polygon"
  else if(selectedMenu === menu.GEO_MULTIPOLYGON_DOCUMENT) return "MultiPolygon"
  else return "Point"
}

// function acts as a controller to point to data based on menu chosen 
export function getFormData(selectedMenu) {
  if(selectedMenu === menu.GEO_FEATURE) return data.GEO_FEATURE_DOCUMENT
  else if(selectedMenu === menu.GEO_FEATURE_COLLECTION) return data.GEO_FEATURE_COLLECTION_DOCUMENT
  else if(selectedMenu === menu.GEO_GEOMETRY_COLLECTION) return data.GEO_GEOMETRY_COLLECTION_DOCUMENT
  else if(selectedMenu === menu.GEO_POINT_DOCUMENT) return data.GEO_POINT_DOCUMENT
  else if(selectedMenu === menu.GEO_LINE_STRING_DOCUMENT) return data.GEO_LINE_STRING_DOCUMENT
  else if(selectedMenu === menu.GEO_POLYGON_DOCUMENT) return data.GEO_POLYGON_DOCUMENT
  else if(selectedMenu === menu.GEO_MULTIPOLYGON_DOCUMENT) return data.GEO_MULTIPOLYGON_DOCUMENT
  return {}
}

/**
 * 
 * @param {*} clicked callback function which returns back the ID of element clicked
 */
export function handleTraverse (clicked) {
  alert(`You have clicked on document ID ${clicked}`)
}