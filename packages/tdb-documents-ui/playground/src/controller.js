import { CREATE } from "./constants"
import * as menu from "./menu.constants"
import * as data from "./data.constants"

// function acts as a controller to point to document type based on menu chosen 
export function getType(selectedMenu) {
  if(selectedMenu === menu.MANDATORY) return "Person"
  else if(selectedMenu === menu.OPTIONAL) return "Person_Optional"
  else if(selectedMenu === menu.SET) return "UnorderedPerson"
  else if(selectedMenu === menu.LIST) return "OrderedPerson"
  else if(selectedMenu === menu.ARRAY) return "ArrayExamplePerson"
  else if(selectedMenu === menu.MULTI_LANGUAGE) return "Example"
  else if(selectedMenu === menu.CHOICE_CLASSES_SUBDOCUMENT_DOCUMENT) return "Student"
  else if(selectedMenu === menu.CHOICE_CLASSES_DOCUMENT) return "Guy"
  else if(selectedMenu === menu.ONE_OF_DOCUMENT) return "Graduate"
  else if(selectedMenu === menu.SYS_JSON) return "ComputerStudent"
  else if(selectedMenu === menu.RENDER_AS) return "metaDataExample"
  else if(selectedMenu === menu.ORDER_BY) return "OrderByExample"
  else return "Person"
}

// function acts as a controller to point to data based on menu chosen 
export function getFormData(selectedMenu) {
  if(selectedMenu === menu.MANDATORY) return data.MANDATORY_DOCUMENT
  else if(selectedMenu === menu.OPTIONAL) return data.MANDATORY_DOCUMENT
  else if(selectedMenu === menu.SET) return data.SET_DOCUMENT
  else if(selectedMenu === menu.LIST)  return data.LIST_DOCUMENT
  else if(selectedMenu === menu.ARRAY) return data.ARRAY_DOCUMENT
  else if(selectedMenu === menu.MULTI_LANGUAGE) return data.MULTI_LANGUAGE_DOCUMENT
  else if(selectedMenu === menu.CHOICE_CLASSES_SUBDOCUMENT_DOCUMENT) return data.CHOICE_SUB_DOCUMENT
  else if(selectedMenu === menu.CHOICE_CLASSES_DOCUMENT) return data.CHOICE_CLASSES_DOCUMENT
  else if(selectedMenu === menu.ONE_OF_DOCUMENT) return data.ONE_OF_DOCUMENT
  else if(selectedMenu === menu.SYS_JSON) return data.SYS_JSON_DOCUMENT
  else if(selectedMenu === menu.RENDER_AS) return data.METADATA_EXAMPLE_DOCUMENT
  else if(selectedMenu === menu.ORDER_BY) return data.ORDER_BY_EXAMPLE_DOCUMENT
  return {}
}

/**
 * 
 * @param {*} clicked callback function which returns back the ID of element clicked
 */
export function handleTraverse (clicked) {
  alert(`You have clicked on document ID ${clicked}`)
}