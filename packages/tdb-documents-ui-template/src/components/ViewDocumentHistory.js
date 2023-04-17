import React, { useState }  from "react";
import { Button, Card } from "react-bootstrap"
import { CloseFrameDisplay } from "./ViewDocumentFrames"
import { trimID } from "../utils"
import { CloseInfoButton } from "./infoCloseButton"

export const ViewDocumentHistory = ({ setShowInfo, showInfo, documentID }) => {
  if(!showInfo.history) return <React.Fragment/>

  return <Card className="tdb__frame__display" style={{width: "50%"}}>
    <Card.Header>
      <label>{`History of ${trimID(documentID)}`}</label>
      <CloseInfoButton setShowInfo={setShowInfo}/>
    </Card.Header>
    <Card.Body>
      CONTENT
    </Card.Body>
  </Card>

}