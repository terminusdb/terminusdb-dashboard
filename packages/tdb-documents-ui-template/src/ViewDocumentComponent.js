import React, {useState, useEffect}  from "react";
import {Stack,Card,Button} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
//import "terminusdb__darkly.css"
import * as CONST from "./components/constants"
import {ViewFramesButton} from "./components/ViewFramesButton"
import {CloseButton} from "./components/CloseButton"
import {JsonFrameViewer} from "./components/JsonFrameViewer"
import {ToggleJsonAndFormControl} from "./components/ToggleJsonAndFormControl"
import {ViewDocumentFrames} from "./components/ViewDocumentFrames"
import {CopyButton} from "./components/CopyButton"
import {RiDeleteBin7Line} from "react-icons/ri"
import {TraverseDocumentLinks, onTraverse} from "./components/TraverseDocumentLinks"
import { LanguageSelectComponent } from "./components/SelectLanguageComponent"
import { trimID } from "./utils"
import { ViewDocumentHistoryButton } from "./components/ViewDocumentHistoryButton"
import { ViewDocumentHistory } from "./components/ViewDocumentHistory";
import { AiOutlineMenu } from "react-icons/ai"
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { ifInfoOpen, getCardWidth } from "./utils"


const DisplayDocumentID = ({ documentID, size }) => {
	return <div className={`col-md-${size}`}> 
		<strong className="text-success">
			<span className="mr-1 h6 fst-italic">{CONST.VIEW_DOCUMENT}:</span> 
			<span className="fw-bolder h6"> {trimID(documentID)} </span>
		</strong>
		<CopyButton text={`${documentID}`} title={`Copy Document ID`}/> 
	</div> 
}

// we have to fix traversedocklinek
export const ViewDocumentComponent = ({type,getDocumentById,
										documentJson,frames,closeButtonClick,documentID,deleteDocument,editDocument, 
										history, diffObject, setDiffCommitObject, changeHistoryPage, startHistory}) => {

	const [view, setView] = useState(CONST.FORM_VIEW)
	const [clicked, setClicked]=useState(false)
	const [selectedLanguage, setSelectedLanguage] = useState(false) 
	const [showInfo, setShowInfo]=useState( { frames: false, history: false } )

	function handleTraverse (documentID) {
		onTraverse(documentID, setClicked)
	}

	return  <div className="w-100 d-flex">     
		{clicked && <TraverseDocumentLinks 
			getDocumentById={getDocumentById} 
			clicked={clicked} 
			frames={frames}
			show={clicked!==false} 
			onHide={() => setClicked(false)}/>} 
		<Card className={`bg-dark flex-grow-1 ${getCardWidth(showInfo)}`} >
			<Card.Header className="justify-content-between d-flex w-100 text-break">
				{!ifInfoOpen(showInfo) && <Stack direction="horizontal" gap={2} className="w-100">
						<DisplayDocumentID documentID={documentID} size={6}/>
						<ViewFramesButton setShowInfo={setShowInfo}/>
						<ViewDocumentHistoryButton setShowInfo={setShowInfo}/>
						<LanguageSelectComponent frame={frames} setSelectedLanguage={setSelectedLanguage}/>
						<ToggleJsonAndFormControl onClick={setView}/>
						<div className="d-flex">
							<Button variant="light" type="button" data-cy="edit__document" title="Edit Document"  onClick={editDocument} className="btn-sm btn d-flex text-dark mr-2">
								{/*<AiFillEdit/>*/}{"Edit"}
							</Button>
							<Button variant="danger" data-cy={"Delete Document"} style={CONST.TOOLBAR_BUTTON_STYLES} type="button" title="Delete Document" onClick={deleteDocument}className="btn-sm btn text-gray">
								<RiDeleteBin7Line className=" mb-1"/>
							</Button>
						</div>
						<CloseButton type={type} onClick={closeButtonClick}/>
					</Stack>
				}
				{ifInfoOpen(showInfo) && <>
					<DisplayDocumentID documentID={documentID} size={10}/>
					<Dropdown>
						<Dropdown.Toggle variant="transparent" id="dropdown-basic" className="border border-dark">
							<AiOutlineMenu/>
						</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={editDocument} title="Edit Document">
							Edit
						</Dropdown.Item>
						<Dropdown.Item onClick={(e) => setShowInfo({ frames: Date.now(), history:false })} title="View Frames">
							View Frames
						</Dropdown.Item>
						<Dropdown.Item onClick={(e) => setShowInfo({ frames: false, history: Date.now() })} title="View History">
							View History
						</Dropdown.Item>
						<Dropdown.Item>
							<LanguageSelectComponent frame={frames} setSelectedLanguage={setSelectedLanguage}/>
						</Dropdown.Item>
						<Dropdown.Item  className="d-table-cell">
							<ToggleJsonAndFormControl onClick={setView}/>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item title="Delete Document" onClick={deleteDocument}>Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown> 
			</>}
			</Card.Header>
			<Card.Body className="text-break">
				{view === CONST.JSON_VIEW && 
					<JsonFrameViewer jsonData={documentJson} mode={CONST.VIEW_DOCUMENT}/>
				}
				{view === CONST.FORM_VIEW &&  <FrameViewer frame={frames}
					type={type}
					mode={CONST.VIEW_DOCUMENT}
					formData={documentJson}
					language={selectedLanguage}
					hideSubmit={true}
					onTraverse={handleTraverse}
				/>
				}
			</Card.Body>
		</Card>
		<ViewDocumentFrames
			type={type}
			documentFrame={frames[type] || {}}
			showInfo={showInfo} 
			setShowInfo={setShowInfo}/>
		{showInfo.history && <ViewDocumentHistory setShowInfo={setShowInfo} 
			showInfo={showInfo} 
			frames={frames}
			diffObject={diffObject}
			setDiffCommitObject={setDiffCommitObject}
			history={history}
			startHistory={startHistory}
			changeHistoryPage={changeHistoryPage}
			type={type}
			documentID={documentID}/>}
	</div>
      
}