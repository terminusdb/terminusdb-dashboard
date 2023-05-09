import React from "react"
import { DiffViewer } from '@terminusdb/terminusdb-documents-ui' 
import Stack from "react-bootstrap/Stack"
import { getFormattedTime } from "../utils"
import { BiGitCommit, BiMessageDetail, BiTime, BiUser } from "react-icons/bi"

const Header = ({ compareChecked }) => {
  return <Stack direction="horizontal">
    <Stack direction="horizontal" gap={2}>
      <BiGitCommit/>
      <label className="control-label w-100">{compareChecked.identifier}</label>
    </Stack>
    <Stack direction="horizontal" gap={2} className="ms-auto">
      <BiTime className="mb-1"/><label className="w-100">{getFormattedTime(compareChecked.timestamp)}</label>
    </Stack>
  </Stack>
}


export const DocumentDiffView = ({ diffObject, frames, type, compareChecked }) => {
  return <DiffViewer 
    oldValue={diffObject.originalValue} 
    newValue={diffObject.changedValue}
    oldValueHeader={<Header compareChecked={compareChecked.curr}/>}
    newValueHeader={<Header compareChecked={compareChecked.prev}/>}
    frame={frames}
    //onTraverse={handleTraverse}
    type={type}
    diffPatch={diffObject.diff}/>
}