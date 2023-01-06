import React from "react"
import * as CONST from "./constants"
import Stack from 'react-bootstrap/Stack'
import {FaTimes} from "react-icons/fa"
import Button from "react-bootstrap/Button"
import {useNavigate, useParams} from "react-router-dom";
import {ToggleJsonAndFormControl} from "./ToggleJsonAndFormControl"
import {RiDeleteBin7Line} from "react-icons/ri"
import * as PATH from "../routing/constants"
import {FiCopy} from "react-icons/fi"
import {copyToClipboard} from "./utils"

/**
 * 
 * @param {*} id document ID 
 * @returns copy document ID to clipboard
 */
const CopyButton = ({id}) => {
    return <Button variant="transparent" 
        className="text-light" 
        title={`Copy Document ID`}
        onClick={(e) => copyToClipboard(id)}>
            <FiCopy/>
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
        <div> 
            <strong className="text-success ml-1 h6 fw-bold">{CONST.EDIT_DOCUMENT}: {id}</strong>
            <CopyButton id={id}/>
        </div> 
        <ToggleJsonAndFormControl onClick={setView}/>
        <CloseButton type={type}/>
    </Stack>
}

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

    function handleEdit(e) {
        startCRMode(CONST.EDIT_DOCUMENT)
        navigate(`${PATH.EDIT_DOC}`)
    }

    function handleDelete(e) {
        startCRMode(CONST.DELETE_DOCUMENT)
        setClickedDelete(Date.now())
    }

    return <Stack direction="horizontal" gap={3} className="w-100">
        <div> 
            <strong className="text-success ml-1 h6 fw-bold">{CONST.VIEW_DOCUMENT}: {type}/{id}</strong>
            <CopyButton id={`${type}/${id}`}/>
        </div>
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
                <RiDeleteBin7Line/>
            </Button>
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
export const Header = ({mode, type, id, startCRMode, setView, setClickedDelete}) => {
    let matchHeader ={
        [CONST.CREATE_DOCUMENT] : <CreateHeader type={type} setView={setView}/>,
        [CONST.EDIT_DOCUMENT]   : <EditHeader type={type} id={id} setView={setView}/>,
        [CONST.VIEW_DOCUMENT]   : <ViewHeader type={type} id={id} startCRMode={startCRMode} setView={setView} setClickedDelete={setClickedDelete}/>
    }
    return matchHeader[mode]
}