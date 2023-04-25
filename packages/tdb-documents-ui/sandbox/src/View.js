import React from "react"
import Card from "react-bootstrap/Card"
import { FrameObj } from "./frameInit"
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'
import { getFormData, handleTraverse } from "./controller"

export const View = () => { 

  const {
    frames,
    type,
    mode,
    setData 
  } = FrameObj()

  function handleSubmit(data) {
    setData(data)
  }

  return <Card className="w-100">
    <Card.Header className="d-flex">
      <div> {`Document Type - `}</div>
      <div className="text-warning fw-bolder">{type}</div>
    </Card.Header>
    <Card.Body>
      <FrameViewer frame={frames}
        mode={mode}
        formData={getFormData(mode, type)}
        onTraverse={handleTraverse}
        //onSelect={handleSelect}
        theme="darkly"
        onSubmit={handleSubmit}
        type={type}
      />
    </Card.Body>
  </Card>
}