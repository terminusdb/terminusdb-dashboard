import React from "react"
import { FrameObj } from "./frameInit"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export const DocumentTypes = () => {
  const {
		frames,
    setType
	} = FrameObj()

  if(!frames) return <div/>
  let docTypes = []

  for(let docs in frames) {
    // display on classes 
    if(frames[docs].hasOwnProperty("@type") && 
      frames[docs]["@type"] === "Class" && 
      !frames[docs].hasOwnProperty("@subdocument")) {
        docTypes.push(<Button variant="secondary" key={docs} onClick={(e) => setType(docs)}>{docs}</Button>)
      }
  }

  return <ButtonGroup aria-label="Basic example" vertical>
    {docTypes}
  </ButtonGroup>

}