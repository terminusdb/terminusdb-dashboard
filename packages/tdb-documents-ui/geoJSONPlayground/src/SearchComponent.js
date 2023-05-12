import React from "react"
import Row from "react-bootstrap/Row"

/** component to display  */
export const Search = ({ setSelected }) => {

  function handleClick(e){
    if(setSelected) setSelected({ id: e.target.id, label: e.target.name })
  }
 
  return <>
    Search this dummy result ....
    <Row className="w-100 border" id={"ID 1"} name="first id" onClick={handleClick}>{"ID 1"}</Row>
    <Row className="w-100 border" id={"ID 2"} name="second id" onClick={handleClick}>{"ID 2"}</Row>
    <Row className="w-100 border" id={"ID 3"} name="third id" onClick={handleClick}>{"ID 3"}</Row>
</>
}