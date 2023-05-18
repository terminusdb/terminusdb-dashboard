import React, { useState } from "react"
import { FrameObj } from "./frameInit"
import * as menu from "./menu.constants"
import Container from 'react-bootstrap/Container'; 
import Stack from 'react-bootstrap/Stack'; 
import { getType } from "./controller"
import { Link } from "react-router-dom";

// Menu list 
export const MENU_LIST = [
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