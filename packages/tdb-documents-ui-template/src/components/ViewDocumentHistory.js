import React, { useState, useEffect }  from "react";
import { Button, Card, Stack } from "react-bootstrap"
import { DocumentDiffView } from "./DocumentDiffView"
import { trimID, getFormattedTime } from "../utils"
import { CloseInfoButton } from "./infoCloseButton"
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Pagination from 'react-bootstrap/Pagination'
import { BiGitCommit, BiMessageDetail, BiUser } from "react-icons/bi"
import { RadioButtonControllers } from "./RadioButtonControllers"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const DisplayHistoryDocumentID = ({ documentID, title }) => {
	return <div> 
		<strong className="text-light">
			<span className="mr-1 h6 fst-italic">{title}: </span> 
			{documentID && <span className="fw-bolder h6 text-success"> {documentID} </span>}
		</strong>
	</div> 
}

const DiffViewModal = ({ showDiff, setShowDiff, compareChecked,  diffObject, frames, type, documentID }) => {

  const handleClose = () => setShowDiff(false);
 
  return <Modal size="xl" show={showDiff} onHide={handleClose} fullscreen={true}>
    <Modal.Header closeButton>
      <DisplayHistoryDocumentID documentID={documentID} title={`Diff View between commits ${compareChecked.curr.identifier} | ${compareChecked.prev.identifier}`}/>
    </Modal.Header>
    <Modal.Body className="p-5">
      <DiffDetailedHeaderMessage compareChecked={compareChecked}/>
      <DocumentDiffView diffObject={diffObject}
        type={type}
        compareChecked={compareChecked}
        frames={frames}/>
    </Modal.Body>
  </Modal>
}

const DiffHeaderMessage = ({ compareChecked }) => {
  return <Stack direction="vertical" className="mb-3 w-100 text-center" gap={1}>
    <label>{`Diff between`}</label>
    <label className="control-label w-100 text-center">{compareChecked.curr.identifier}</label>
    <div className="">{"&"}</div>
    <label className="control-label w-100 text-center">{compareChecked.prev.identifier}</label>
  </Stack>
}


const DisplayInfoPerVersion = ({ compareChecked }) => {
  return <>
    <Stack direction="horizontal" gap={2} className="ml-2"><BiUser/><label className="text-white w-100">{compareChecked.author}</label></Stack>
    <Stack direction="horizontal" gap={2} className="ml-2"><BiMessageDetail/><label className="text-white w-100">{compareChecked.message}</label></Stack>
  </>
}

const DiffDetailedHeaderMessage = ({ compareChecked }) => {
  return <Row className="w-100 mb-3">
    <Col md={6}><DisplayInfoPerVersion compareChecked={compareChecked.curr}/></Col>
    <Col md={6}><DisplayInfoPerVersion compareChecked={compareChecked.prev}/></Col>
  </Row>
}


const DiffInformation = ({ compareChecked, setShowDiff, setDiffCommitObject }) => {

  function handleViewDiff () {
    setDiffCommitObject({ beforeVersion: compareChecked.prev.identifier , afterVersion: compareChecked.curr.identifier })
    setShowDiff(Date.now())
  }

  if(compareChecked.curr.identifier && compareChecked.prev.identifier) {
    return <Card border="light" className="p-2">
      <Stack className="mb-3" gap={3}> 
        <DiffHeaderMessage compareChecked={compareChecked} />
        <Button className="btn btn-md bg-light text-dark" onClick={handleViewDiff}>
          View Diff
        </Button>
      </Stack>
    </Card>
  }

  return <div/>
  
}


const ErrorMessage = () => {
  return `Something went wrong ... no history is available to display.`
}


const DisplayHistory = ({ history, setDiffCommitObject, diffObject, frames, type, changeHistoryPage, startHistory, documentID }) => {

  if(!Array.isArray(history)) return <ErrorMessage/>
  if(!history.length) return <ErrorMessage/>

  const [showDiff, setShowDiff] = useState(false)
  // first checked radio button is always the most recent commit
  const [compareChecked, setCompareChecked] = useState({ curr: false, prev: false })
  const [prevChecked, setPrevChecked] = useState(false)
  const [refresh, setRefresh] = useState(Date.now())
  const [historyBuffer, setHistoryBuffer] = useState(history)

  useEffect(() => {
    if(Array.isArray(history) && history.length) {
      setHistoryBuffer(history)
    }
  }, [history])

  let elements = [], maxHistoryPerCall = 5, curr ="curr", prev ="prev"

  // function which handle's changes on click of radiobuttons
  function handleChange(historyItem) {
    let checked = compareChecked  
    if(!prevChecked) {
      //checked.curr = historyItem.identifier
      checked.curr = historyItem
      setPrevChecked(curr)
    }
    else if (prevChecked === curr) {
      //checked.prev = historyItem.identifier
      checked.prev = historyItem
      setPrevChecked(prev)
    }
    else if (prevChecked === prev) {
      //checked.curr = historyItem.identifier
      checked.curr = historyItem
      setPrevChecked(curr)
    }
    setCompareChecked(checked)
    setRefresh(Date.now())
  }

  const changePageCallNext = () => {
    setHistoryBuffer([]) // reset this so as to disable nextActive button on every click to help pagination
    changeHistoryPage(startHistory+5)
  }

  const changePageCallPrevious = () => {
    changeHistoryPage(startHistory-5)
  }

  //console.log("startHistory", startHistory)
  //console.log("history length", history.length)

  const prevActive = startHistory > 1 ? { onClick: changePageCallPrevious } : { active: false }
  //const nextActive = history.length > maxHistoryPerCall-1  ? { onClick: changePageCallNext } : { active: false }
  const nextActive = historyBuffer.length > 5 ? { onClick: changePageCallNext } : { onClick: () => {} }
  const lastHistory = startHistory + Math.min(historyBuffer.length, maxHistoryPerCall)
  let page = Math.ceil(startHistory/maxHistoryPerCall)
  

  historyBuffer.map((historyItem, index) => {
    let commitID = historyItem.identifier
    elements.push(<Card key={commitID} className="mb-4">
      <Card.Body>
        {refresh && <RadioButtonControllers commitID={commitID} 
          displayText={getFormattedTime(historyItem.timestamp)}
          compareChecked={compareChecked} 
          startHistory={startHistory}
          recentCommit={ startHistory === index ? true : false }
          handleChange={(e) => handleChange(historyItem)}
          setCompareChecked={setCompareChecked}/>}
        <Stack gap={1} className="text-light">
          <Stack direction="horizontal" gap={3}> <BiGitCommit/>{commitID}</Stack>
          <Stack direction="horizontal" gap={3}> <BiUser/>{historyItem.author}</Stack>
          <OverlayTrigger
            key={"left"}
            placement={"left"}
            overlay={
              <Tooltip id={`tooltip-${"left"}`}>
                {historyItem.message}
              </Tooltip>
            }
          >
            <Button variant="secondary" className="btn btn-sm fst-italic text-light">Hover to view commit message</Button>
          </OverlayTrigger>
        </Stack>
      </Card.Body>
    </Card>)
  })

  return <Stack gap={2}>
    <DiffInformation compareChecked={compareChecked} 
      setShowDiff={setShowDiff} 
      setDiffCommitObject={setDiffCommitObject}/>
    <Pagination size={"ls"} className="justify-content-center">
        <Pagination.Prev {...prevActive} />
        <Pagination.Item className="history__page__item">{`Page ${page+1} -- History from ${startHistory + 1} to ${lastHistory}`}</Pagination.Item>
        <Pagination.Next {...nextActive} />
      </Pagination>
    <DiffViewModal showDiff={showDiff} 
      setShowDiff={setShowDiff}
      frames={frames} 
      documentID={documentID}
      type={type}
      diffObject={diffObject}
      compareChecked={compareChecked} />
    {elements}
  </Stack> 
}

export const ViewDocumentHistory = ({ setShowInfo, showInfo, documentID, history, diffObject, setDiffCommitObject, frames, type, changeHistoryPage, startHistory }) => {
  if(!showInfo.history) return <React.Fragment/>

  //console.log("got history", history)
 
  return <Card className="tdb__frame__display ml-3" style={{width: "50%"}}>
    <Card.Header>
      <Stack direction="horizontal">
        <DisplayHistoryDocumentID title={"History"}/>
        <CloseInfoButton setShowInfo={setShowInfo}/>
      </Stack>
    </Card.Header>
    <Card.Body>
      <Card.Text className="text-light text-center">{`Click on dates to compare between different versions ...`}</Card.Text>
      <DisplayHistory history={history} 
        changeHistoryPage={changeHistoryPage}
        startHistory={startHistory}
        frames={frames}
        type={type}
        documentID={documentID}
        setDiffCommitObject={setDiffCommitObject} 
        diffObject={diffObject}/>
    </Card.Body>
  </Card>

}