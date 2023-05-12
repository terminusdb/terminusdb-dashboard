import React, { useState } from "react"
import { FrameObj } from "./frameInit"
import * as menu from "./menu.constants"
import Nav from 'react-bootstrap/Nav';
import { getType } from "./controller"

// Menu list 
const MENU_LIST = [
  menu.MANDATORY,
  menu.OPTIONAL,
  menu.SET,
  menu.LIST,
  menu.ARRAY,
  menu.MULTI_LANGUAGE,
  menu.CHOICE_CLASSES_SUBDOCUMENT_DOCUMENT,
  menu.CHOICE_CLASSES_DOCUMENT,
  menu.ONE_OF_DOCUMENT,
  menu.SYS_JSON,
  menu.RENDER_AS,
  menu.ORDER_BY
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