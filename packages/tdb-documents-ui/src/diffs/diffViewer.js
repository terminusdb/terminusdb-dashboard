import React from "react"
import { FrameViewer } from "../FrameViewer"
import * as CONST from "../constants"
import { Card, Row, Col } from "react-bootstrap"
import { OldValueHeader, NewValueHeader } from "./Headers"
import * as DIFFCONST from "./diff.constants"
import { generateDiffUIFrames } from "./diffHelpers"

export const DiffViewer = (args) => {

  let { frame, type, oldValue, newValue, diffPatch, oldValueHeader, newValueHeader }=args

  if(!frame) return <div>{"Include frames to view Diffs"}</div>
  if(!type) return <div>{"Include document type to view Diffs"}</div>
  if(!diffPatch) return <div>{"Include diff patch JSON Object to view diffs"}</div>
  if(!frame.hasOwnProperty(type)) return <div>{`Frame of type ${type} not found`}</div>

  const frame_ref_1 = frame
  const frame_ref_2 = frame

  return <Row> 
    <Col md={6}>
      <Card>  
        <Card.Header>
          <OldValueHeader oldValueHeader={oldValueHeader}/>
        </Card.Header>
        <Card.Body> 
          <FrameViewer
            frame={frame_ref_1}
            uiFrame={generateDiffUIFrames(diffPatch, DIFFCONST.BEFORE)}
            type={type}
            formData={oldValue}
            compareFormData={newValue}
            mode={CONST.VIEW}
            hideSubmit={true}
          />
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card>
        <Card.Header>
          <NewValueHeader newValueHeader={newValueHeader}/>
        </Card.Header>
        <Card.Body> 
          <FrameViewer
            frame={frame_ref_2}
            uiFrame={generateDiffUIFrames(diffPatch, DIFFCONST.AFTER)}
            type={type}
            formData={newValue}
            compareFormData={oldValue}
            mode={CONST.VIEW}
            hideSubmit={true}
          />
        </Card.Body>
      </Card>
  </Col>
</Row>
}