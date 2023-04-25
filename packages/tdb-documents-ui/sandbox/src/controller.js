import { CREATE } from "./constants"
import * as lego from "./lego.constants"


export function getFormData(mode, type) {
  if(mode === CREATE) return {}

  if(type === "Color")  return lego.COLOR_DATA
  else if(type === "Element") return lego.ELEMENT_DATA
  else if(type === "Inventory") return lego.INVENTORY_DATA
  else if(type === "LegoSet") return lego.LEGO_SET_DATA
  else if(type === "Minifig") return lego.MINIFIG_DATA
  else if(type === "Part") return lego.PART_DATA
  else if(type === "PartRelation") return lego.PART_RELATION_DATA
  else if(type === "Theme") return lego.THEME_DATA
}

/**
 * 
 * @param {*} clicked callback function which returns back the ID of element clicked
 */
export function handleTraverse (clicked) {
  alert(`You have clicked on document ID ${clicked}`)
}