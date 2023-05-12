import React, { useState } from "react"
import { FrameObj } from "./frameInit"
import * as menu from "./menu.constants"
import Nav from 'react-bootstrap/Nav';
import { getType } from "./controller"

// Menu list 
const MENU_LIST = [
  menu.GEO_FEATURE,
  menu.GEO_FEATURE_COLLECTION,
  menu.GEO_GEOMETRY_COLLECTION,
  menu.GEO_POINT_DOCUMENT,
  menu.GEO_LINE_STRING_DOCUMENT,
  menu.GEO_POLYGON_DOCUMENT,
  menu.GEO_MULTIPOLYGON_DOCUMENT
]

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

  MENU_LIST.map(menu => {
    menuArray.push(<Nav.Item>
      <Nav.Link eventKey={menu}>{menu}</Nav.Link>
    </Nav.Item>)
  })

  return <Nav
    activeKey={activeKey}
    variant="pills"
    className="mb-4"
    onSelect={(selectedKey) => handleNavClick(selectedKey)}
  >
    {menuArray}
  </Nav>

}