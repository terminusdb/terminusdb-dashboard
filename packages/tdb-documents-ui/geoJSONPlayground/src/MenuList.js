import React, { useState } from "react"
import { FrameObj } from "./frameInit"
import * as menu from "./menu.constants"
import Stack from 'react-bootstrap/Stack';
import { getType } from "./controller"
import { Link } from "react-router-dom";

// Menu list 
export const MENU_LIST = [
  menu.GEO_FEATURE, 
  menu.GEO_FEATURE_COLLECTION,
  menu.GEO_GEOMETRY_COLLECTION,
  menu.GEO_POINT_DOCUMENT,
  menu.GEO_LINE_STRING_DOCUMENT,
  menu.GEO_POLYGON_DOCUMENT,
  menu.GEO_MULTIPOLYGON_DOCUMENT,
  menu.ADDRESS 
]

function getActiveClass (selectedMenu, menu) {
  if(selectedMenu === menu) return "bg-success"
  return ""
}

// Nav bar 
export const MenuList = () => {
  const {
		frames,
    setType, 
    setMenuItem,
    menuItem,
    mode,
    setData
	} = FrameObj() 
  const [activeKey, setActiveKey] = useState(menuItem)

  if(!frames) return <div/>
  let menuArray = []

  function handleNavClick(selectedKey) {
    setActiveKey(selectedKey)
    setMenuItem(selectedKey)
    setType(getType(selectedKey)) 
  }
 
  MENU_LIST.map((menu) => (
    menuArray.push(<Link to={menu} 
      className={`text-decoration-none text-white bg-primary rounded px-3 ${getActiveClass(menuItem, menu)} `}
      onClick={(key) => handleNavClick(menu)}>
      {menu}
    </Link>) 
  ))

  return <>
    <Stack direction="horizontal" gap={2} className="mt-5 d-flex flex-wrap">
      {menuArray}
    </Stack>
  </>

}