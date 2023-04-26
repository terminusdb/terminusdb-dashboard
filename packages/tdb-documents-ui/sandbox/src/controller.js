import { CREATE } from "./constants"
import * as lego from "./lego.constants"


export function getFormData(mode, type, setData) {
  if(mode === CREATE) return {}
  let data = null
  if(type === "Color")  data = lego.COLOR_DATA
  else if(type === "Element") data =  lego.ELEMENT_DATA
  else if(type === "Inventory") data =  lego.INVENTORY_DATA
  else if(type === "LegoSet") data =  lego.LEGO_SET_DATA
  else if(type === "Minifig") data =  lego.MINIFIG_DATA
  else if(type === "Part") data =  lego.PART_DATA
  else if(type === "PartRelation") data =  lego.PART_RELATION_DATA
  else if(type === "Theme") data =  lego.THEME_DATA
  if(setData) setData(data)
  return data
}

/**
 * 
 * @param {*} clicked callback function which returns back the ID of element clicked
 */
export function handleTraverse (clicked) {
  alert(`You have clicked on document ID ${clicked}`)
}