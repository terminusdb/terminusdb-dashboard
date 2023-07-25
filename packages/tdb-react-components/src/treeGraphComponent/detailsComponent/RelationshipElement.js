import React from "react"
import Card from "react-bootstrap/Card"
import  RelationshipGUI  from "../ReactFlowComponents/RelationshipGUI"

export const RelationShipElement = (props) => {

  return <Card bg="dark" className="mt-3">
    <Card.Body className='p-2'>
      <RelationshipGUI nodeData={props.nodeData} view={props.view}/>
    </Card.Body>
  </Card>
  
}