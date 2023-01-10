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
import {copyToClipboard} from "./utils"
import {HiMagnifyingGlass} from "react-icons/hi2"
import Card from 'react-bootstrap/Card';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
//import Popover from 'react-bootstrap/Popover';
//import Popover from 'react-bootstrap/Popover';
import { v4 as uuidv4 } from 'uuid';
import Popover from "react-bootstrap/Popover"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import {AiFillDelete} from "react-icons/ai"

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
 * @param {*} id document ID 
 * @returns copy document ID to clipboard
 */
export const CopyButton = ({text, title, label, css}) => {
    return <Button variant="transparent" 
        className={`text-light ${css}`}
        title={title}
        onClick={(e) => copyToClipboard(text)}>
            <FiCopy/> {label && <span>{label}</span>}
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
        <strong className="text-success ml-1 h6 fw-bold">{CONST.CREATE_DOCUMENT}: {type}</strong>
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
            <strong className="text-success ml-1 h6 fw-bold">{CONST.EDIT_DOCUMENT}: {id}</strong>
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
const DeleteMessage = ({handleDelete, handleToggle}) => {
    return <Card>
        <Card.Header>
            <span>{"Are you sure u want to delete ?"}</span>
        </Card.Header>
        <Card.Body>
            <span className="text-gray">
                {`If you delete this document, there is no going back. Please be certain.`}
            </span>
            <div className="d-flex mt-3">
                <Button className="btn-sm bg-danger text-gray mr-2"
                    onClick={handleDelete}> 
                    <RiDeleteBin7Line className="mb-1" /> Delete
                </Button>
                <Button className="btn-sm bg-light text-dark"
                    onClick={handleToggle}> 
                    <FaTimes className="mr-1" /> Cancel
                </Button>
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
const ViewHeader = ({type, id, startCRMode, setView, setClickedDelete}) => {

    const navigate=useNavigate()
    const [show, setShow] = React.useState(false);

    const handleToggle = () => {
        setShow((prev) => !prev);
      };

    function handleEdit(e) {
        startCRMode(CONST.EDIT_DOCUMENT)
        navigate(`${PATH.EDIT_DOC}`)
    }

    function handleDelete(e) {
        startCRMode(CONST.DELETE_DOCUMENT)
        setClickedDelete(Date.now())
    }



    return <Stack direction="horizontal" gap={3} className="w-100">
        <div className="col-md-7"> 
            <strong className="text-success ml-1 h6 fw-bold">{CONST.VIEW_DOCUMENT}: {type}/{id}</strong>
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

            <OverlayTrigger trigger="click" 
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
            </OverlayTrigger>
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
export const Header = ({mode, type, id, startCRMode, setClickedDelete}) => {
    const {
        setView
    } = DocumentControlObj()

    let matchHeader ={
        [CONST.CREATE_DOCUMENT] : <CreateHeader type={type} setView={setView}/>,
        [CONST.EDIT_DOCUMENT]   : <EditHeader type={type} id={id} setView={setView}/>,
        [CONST.VIEW_DOCUMENT]   : <ViewHeader type={type} id={id} startCRMode={startCRMode} setView={setView} setClickedDelete={setClickedDelete}/>
    }
    return matchHeader[mode]
}



