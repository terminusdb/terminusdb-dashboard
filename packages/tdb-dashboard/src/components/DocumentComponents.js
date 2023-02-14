import React, {useState, useEffect, useRef} from "react"
import * as CONST from "./constants"
import Stack from 'react-bootstrap/Stack'
import {FaTimes, FaCheck} from "react-icons/fa"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import Button from "react-bootstrap/Button"
import {useNavigate, useParams} from "react-router-dom";
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {RiDeleteBin7Line} from "react-icons/ri"
import * as PATH from "../routing/constants"
import {FiCopy} from "react-icons/fi" 
import {CopyButton} from "./utils"
import {HiMagnifyingGlass} from "react-icons/hi2"
import Card from 'react-bootstrap/Card';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
//import Popover from 'react-bootstrap/Popover';
//import Popover from 'react-bootstrap/Popover';
import { v4 as uuidv4 } from 'uuid';
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Row from "react-bootstrap/Row"
import {DocumentsGraphqlTable} from "./DocumentsGraphqlTable"
import {WOQLClientObj} from '../init-woql-client'

// button to view frames
const ViewFramesButton = () => {

    const {
        setShowFrames
    } = DocumentControlObj()

    function handleViewFrames () {
        setShowFrames(Date.now())
    }

    return <Button variant="light" 
        className="text-dark ms-auto btn btn-sm" 
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
    const {dataProduct, organization}=useParams()
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
const CreateHeader = ({type, setView}) => {
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
 * @param {*} setView useState constant to set view in Form or JSON View
 * @returns Edit Header 
 */
const EditHeader = ({type, id, setView}) => {
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

/**
 * function for displaying Popover when user click to delete a document
 */
const UpdatingPopover = React.forwardRef(
    ({ popper, children, show: _, ...props }, ref) => {
    useEffect(() => {
        //console.log('updating!');
        popper.scheduleUpdate();
    }, [children, popper]);

    return (
        <Popover ref={ref} body {...props} id={`popover-positioned-bottom`}>
         {children}
        </Popover>
    );
    },
);

/**
 * 
 * @param {*} type document Type 
 * @param {*} id document ID 
 * @param {*} startCRMode CR Mode
 * @param {*} setView useState constant to set view in Form or JSON View
 * @returns View Header 
 */
const ViewHeader = ({type, id, setView, setShowCRModal, setClickedDelete}) => {
    const { 
        branch
    } = WOQLClientObj()

    const navigate=useNavigate()
    const [show, setShow] = React.useState(false);
    

    const handleToggle = () => {
        setShow((prev) => !prev);
      };

    function handleEdit(e) {
        navigate(`${PATH.EDIT_DOC}`)
    }
 
    function handleDelete(e) {
        // show Change Request component if branch is main 
        if(branch === "main"){
            setShowCRModal(Date.now())
        }
        else setClickedDelete(Date.now())
    }



    return <Stack direction="horizontal" gap={3} className="w-100">
        <div className="col-md-6"> 
            <strong className="text-success">
                <span className="mr-1 h6 fst-italic">{CONST.VIEW_DOCUMENT}:</span> 
                <span className="fw-bolder h6"> {type}/{id} </span>
            </strong>
            <CopyButton text={`${type}/${id}`} title={`Copy Document ID`}/>
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

            {/** commenting overlay trigger for delete */}
            {/*<OverlayTrigger trigger="click" 
                placement="bottom" 
                rootClose={true}
                show={show}
                onToggle={handleToggle}
                overlay={ 
                    <UpdatingPopover id="popover-contained">
                        {<DeleteMessage handleToggle={handleToggle} handleDelete={handleDelete}/>}
                    </UpdatingPopover>
                }>
                <Button variant="danger" 
                    type="button" 
                    title="Delete Document" 
                    className="btn-sm btn text-gray">
                        <RiDeleteBin7Line className=" mb-1"/>
                </Button>
            </OverlayTrigger>*/}
        </div>
        <CloseButton type={type}/>
    </Stack>
}

/**
 * 
 * @param {*} mode the mode in which FrameViewer will be displayed - CREATE, EDIT or VIEW
 * @param {*} type document type 
 * @param {*} id document ID 
 * @param {*} startCRMode CR Mode
 * @param {*} setView useState constant to set view in Form or JSON View
 * @returns 
 */ 
export const Header = ({mode, type, id, setShowCRModal, setClickedDelete}) => {
    const {
        setView
    } = DocumentControlObj()

    let matchHeader ={
        [CONST.CREATE_DOCUMENT] : <CreateHeader type={type} setView={setView}/>,
        [CONST.EDIT_DOCUMENT]   : <EditHeader type={type} id={id} setView={setView}/>,
        [CONST.VIEW_DOCUMENT]   : <ViewHeader type={type} id={id} setView={setView} setShowCRModal={setShowCRModal} setClickedDelete={setClickedDelete}/>
    }
    return matchHeader[mode]
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

    return <>
        Search this dummy result ....
        {displayBasedOnType(doctype)}
    </>
}


