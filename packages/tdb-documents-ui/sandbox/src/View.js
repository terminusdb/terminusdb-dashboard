import React from "react"
import Card from "react-bootstrap/Card"
import { FrameObj } from "./frameInit"
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

export const View = () => { 

  const {
    frames,
    type,
    mode
  } = FrameObj()

  return <Card className="w-100">
    <Card.Header>{`Document Type - ${type}`}</Card.Header>
    <Card.Body>
      <FrameViewer frame={frames}
        mode={mode}
        theme="darkly"
        type={type}
      />
    </Card.Body>
  </Card>
}