import React from "react"
import Button from "react-bootstrap/Button"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"

export const CollpaseButton = ({ setCollapseSideBar, collapseSideBar }) => {

  const style = {
      userSelect: "none",
      zIndex: 99999,
      boxSizing: "border-box",
      appearance: "none",
      position: "absolute",
      display: "inline-flex",
      webkitBoxAlign: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "middle",
      alignSelf: "center",
      textDecoration: "none",
      fontWeight: 500,
      /* margin: 0px; */
      top: "50%",
      borderRadius: "9999px",
      webkitBoxPack: "center",
      justifyContent: "center",
      boxShadow:"rgba(0, 0, 0, 0.05) 0px 2px 4px",
      /* top: 80px; */
      left: "19.5rem",
      fontSize: "12px",
      lineHeight: "16px",
      height: "24px",
      minWidth: "24px",
      color: "rgb(195 196 201)",
      backgroundColor: "rgb(100 100 100)",
      border: "1px solid rgb(208, 213, 231) !important",
      padding: "0px !important"
  }

  const hiddenStyle = {
      display: "block",
      zIndex: 99999,
      borderLeft: "1px solid #484848",
      borderRight: "1px solid #484848"
  }

  function handleCollapse() {
    setCollapseSideBar(!collapseSideBar)
    localStorage.setItem(`Terminusdb-SideBar-Collapsed`, !collapseSideBar)
  }

  return <Button //className="btn-btn-lg bg-transparent border border-0 ml-3"
      variant="dark"
      style={collapseSideBar ? hiddenStyle : style}
      title={collapseSideBar ? "Show Sidebar" : "Hide Sidebar" }
      onClick={handleCollapse}>
      {collapseSideBar && <HiChevronDoubleRight size={20}/>}
      {!collapseSideBar && <HiChevronDoubleLeft size={20}/>}
  </Button> 
} 
