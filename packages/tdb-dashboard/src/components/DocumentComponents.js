import React, {useState} from "react"
import * as CONST from "./constants"
import Stack from 'react-bootstrap/Stack'
import {FaTimes, FaCheck} from "react-icons/fa"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom";
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {RiDeleteBin7Line} from "react-icons/ri"
import * as PATH from "../routing/constants"
import {CopyButton} from "./utils"
import {HiMagnifyingGlass} from "react-icons/hi2"
import {Card,Alert,Row,Modal} from 'react-bootstrap';
import {DocumentsGraphqlTable} from "./DocumentsGraphqlTable"
import {WOQLClientObj} from '../init-woql-client'
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import { ErrorDisplay } from "./ErrorDisplay"
import { DisplayErrorPerProperty } from "./ErrorDisplay"
import {Alerts} from "./Alerts"

// button to view frames
const ViewFramesButton = () => {
    const {
        setShowFrames
    } = DocumentControlObj()

    function handleViewFrames () {
        setShowFrames(Date.now())
    }

    return <Button variant="light"  className="text-dark ms-auto btn btn-sm" 
        title={`View Document Frames`}
        onClick={handleViewFrames}>
            <HiMagnifyingGlass/> {"Frames"} 
    </Button>
}


/**
 * 
 * @param {*} type document Type
 * @returns a close button icon
 */
const CloseButton = ({type}) => { 
    const navigate=useNavigate()
    // on close button display document list table
    return <Button variant="light" 
        className="btn-sm text-dark" 
        tilte={`Cancel and view list of ${type}`}
        onClick={(e) => navigate(-1)}>
        <FaTimes/>
    </Button>
}

/**
 * 
 * @param {*} type document Type 
 * @param {*} setView useState constant to set view in Form or JSON View
 * @returns Create Header 
 */
export const CreateHeader = ({type}) => {
    const {
        setView
    } = DocumentControlObj()

    return <Stack direction="horizontal" gap={3} className="w-100">
        <strong className="text-success">
            <span className="mr-1 h6 fst-italic">{CONST.CREATE_DOCUMENT}: </span>
            <span className="fw-bolder h6">{type}</span>
        </strong>
        <ViewFramesButton/>
        <ToggleJsonAndFormControl onClick={setView}/>
        <CloseButton type={type}/>
    </Stack>
}

/**
 * 
 * @param {*} type document Type 
 * @param {*} id document ID 
 * @returns Edit Header 
 */
export const EditHeader = ({type, id}) => {
    const {
        setView
    } = DocumentControlObj()

    return <Stack direction="horizontal" gap={3} className="w-100">
        <div className="col-md-7"> 
            <strong className="text-success">
                <span className="mr-1 h6 fst-italic">{CONST.EDIT_DOCUMENT}: </span> 
                <span className="fw-bolder h6">{id}</span>
            </strong>
            <CopyButton text={id} title={`Copy Document ID`}/>
        </div> 
        <ViewFramesButton/>
        <ToggleJsonAndFormControl onClick={setView}/>
        <CloseButton type={type}/>
    </Stack>
}

/**
 * function to display are you sure to delete a document message
 */
export const DeleteMessage = ({handleDelete}) => {
    return <Card className="border-0 w-100">
        <Card.Header className="bg-transparent w-100 fw-bold">
            <span>{"Are you sure you want to delete ?"}</span>
        </Card.Header>
        <Card.Body>
            <span className="text-gray">
                {`If you delete this document, there is no going back. Please be certain.`}
            </span>
            <div className="d-flex mt-3 justify-content-center">
                <Button className="btn-sm bg-danger text-gray mr-2"
                    onClick={handleDelete}> 
                    <RiDeleteBin7Line className="mb-1" /> Delete
                </Button>
                {/*<Button className="btn-sm bg-light text-dark"
                    onClick={onCancel}> 
                    <FaTimes className="mr-1" /> Cancel
                </Button>*/}
            </div>
            
        </Card.Body>
    </Card>
}

//moved the change request modal in the header
export const ViewHeader = ({type, documentID}) => {
    const { 
        branch,
        setChangeRequestBranch
    } = WOQLClientObj()

    const {
        deleteDocument,
        loading,
        setView
    } = DocumentControlObj()

    const navigate=useNavigate()
    const [show, setShow] = React.useState(false);
    const [showCRModal, setShowCRModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal]=useState(false)

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
    }

    const handleClose=() =>{
        showDeleteModal(false)
    }

    //__KITTY___
    const handleToggle = () => {
        setShow((prev) => !prev);
      };

    function handleEdit(e) {
        navigate(`${PATH.EDIT_DOC}`)
    }
 
    function handleDelete(e) {
        // I can not change main directly
        // I can change other branches creates with create branch interface
        if(branch === "main"){
            setShowCRModal(true)
        }else setShowDeleteModal(true)
    }

    async function callDeleteDocument(){
        const delCall = await deleteDocument(documentID)
        if(delCall){
            navigate(-1)
        }else{
            setShowDeleteModal(false)
        }
    }

    return <Stack direction="horizontal" gap={3} className="w-100">
            {showCRModal && <CreateChangeRequestModal showModal={showCRModal} type={type}  setShowModal={setShowCRModal} updateViewMode={updateViewMode}/>}
            {showDeleteModal && <Modal show={showDeleteModal} onHide={handleClose}>
            {loading && <span className="text-warning text-break p-3">{`Deleting document ${documentID} ...`}</span>}
            {!loading && <DeleteMessage handleDelete={callDeleteDocument}/>}
            </Modal>}

        <div className="col-md-6"> 
            <strong className="text-success">
                <span className="mr-1 h6 fst-italic">{CONST.VIEW_DOCUMENT}:</span> 
                <span className="fw-bolder h6"> {documentID} </span>
            </strong>
            <CopyButton text={`${documentID}`} title={`Copy Document ID`}/>
        </div>
        <ViewFramesButton/>
        <ToggleJsonAndFormControl onClick={setView}/>
        
        <div className="d-flex">
            <Button variant="light" 
                type="button" 
                title="Edit Document" 
                onClick={handleEdit} 
                className="btn-sm btn d-flex text-dark mr-2">
                Edit
            </Button>

            <Button variant="danger" 
                    type="button" 
                    title="Delete Document" 
                    onClick={handleDelete}
                    className="btn-sm btn text-gray">
                    <RiDeleteBin7Line className=" mb-1"/>
            </Button>
        </div>
        <CloseButton type={type}/>
    </Stack>
}

/**
 * 
 * @param {*} clicked document clicked by user to traverse
 * @param {*} setClicked function to store which document has been clicked by user
 * this function is only used in DocumentView & for Traversing via documents
 */
export function onTraverse(documentID, setClicked) { 
    //console.log("clicked on on traverse ftn", documentID)
    if(setClicked) setClicked(documentID)
}

/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const SearchComponent = ({setSelected, doctype}) => {
    //type,onRowClick,showGraphqlTab=true,tableConfig
    return <DocumentsGraphqlTable showGraphqlTab={false} type={doctype} onRowClick={setSelected}/>
    
    // dummy search component  
    function handleClick(e){
        if(setSelected) setSelected({id: e.target.id, label: e.target.name})
    }
    
    function displayBasedOnType(doctype) {
        if(doctype === "job") {
            return <>
                <Row className="w-100 border" id={"job/45ba2f0192b45d2a84c77b732ad8904d9d2bd7e44129445b67dad151f1ff5ade"} name="first id" onClick={handleClick}>{"ID 1"}</Row>
                <Row className="w-100 border" id={"job/d9902def6ed9354bc69a6aa7eac9f0e4ecd2b58bae164bb114bbe17b90928f03"} name="second id" onClick={handleClick}>{"ID 2"}</Row>
                <Row className="w-100 border" id={"job/1da6a6a6a4e9e5512804e3f841968b04af07d99edac21548c5023957040140fb"} name="third id" onClick={handleClick}>{"ID 3"}</Row>
            </>
        }
        else if(doctype === "stuff") {
            return <>
                <Row className="w-100 border" id={"stuff/37c60f7cd49e59ee09318157d178937d62bdefd22b8ddf4807f888d0264970ad"} name="first id" onClick={handleClick}>{"ID 1"}</Row>
            </>
        }

        return <>
                <Row className="w-100 border" id={"partimejobs/89fdf73342279b58aa046377839f85413963d85067828e5ac8c97e73fad441b1"} name="p first id" onClick={handleClick}>{"P ID 1"}</Row>
                <Row className="w-100 border" id={"partimejobs/fe26a37425aaaa92fd0fb14cdc5575ee5ef24d4097e68b166f5374dcd55ed338"} name="p second id" onClick={handleClick}>{"P ID 2"}</Row>
                <Row className="w-100 border" id={"partimejobs/a26e38875639fb04cdf246e30ee09933c86fdc06a09542e4ef61496b044668e6"} name="p third id" onClick={handleClick}>{"P ID 3"}</Row>
            </>

    }
    //__KITTY
    return <>
        Search this dummy result ....
        {displayBasedOnType(doctype)}
    </>
}

// I put the listener for error in another component so we not lost the data inside the 
// form
// we review this better 
export const ErrorMessageReport = ()=>{
    //<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>
    const {error,setError} = DocumentControlObj()
     if(error)return <FormatErrorMessages error={error} setError={setError}/>
     return ""
}

function FormatErrorMessages ({error, setError}) {
    if(!error.hasOwnProperty("api:message")) return <Alerts message={error} type={CONST.TERMINUS_DANGER} onCancel={setError}/>
    let message = error["api:message"]
    let errorElements = []
    if(error["api:error"]) {
        if(Array.isArray(error["api:error"]["api:witnesses"])) {
            error["api:error"]["api:witnesses"].map(err => {

                if(err.hasOwnProperty("constraint_name")) {
                    // CONSTRAINT ERRORS
                    let propertyName = err["constraint_name"]
                    let errorType = `${err["@type"]} on `
                    let message = err.message

                    errorElements.push(
                        <DisplayErrorPerProperty propertyName={propertyName} message={message} errorType={errorType}/>
                    )
                }
                else {
                    if(err.hasOwnProperty("@type")) {
                        errorElements.push(
                            <pre>{JSON.stringify(err, null, 2)}</pre>
                        )
                    }
                    else {
                        // OTHER TYPE ERRORS
                        for(let items in err) {
                            let propertyName = items
                            let errorType = err[propertyName].hasOwnProperty("@type") ? `${err[propertyName]["@type"]} on ` : `Error occured on`
                            let message = JSON.stringify(err[propertyName], null, 2)
                            errorElements.push(
                                <DisplayErrorPerProperty propertyName={propertyName} message={message} errorType={errorType}/>
                            )
                        }
                    }
                }
            })   
        }
    }
    const errorComp = <ErrorDisplay errorData={errorElements} message={message} css={CONST.ERROR_MORE_INFO_CLASSNAME}/>
    return <Alerts message={errorComp} type={CONST.TERMINUS_DANGER} onCancel={setError}/>
    
   
}


