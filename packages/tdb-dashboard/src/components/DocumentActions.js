import React from "react"
import {ButtonToolbar, ButtonGroup, Button} from "react-bootstrap"
import {BsClipboard} from "react-icons/bs"
import {AiOutlineImport, AiOutlineExport, AiFillDelete} from "react-icons/ai"
import {BsUpload, BsDownload} from "react-icons/bs"


export const getDocumentTools = () => {
    return <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
        <ButtonGroup className="mr-2" aria-label="First group">
        <Button variant="secondary" title={"Copy Document ID"}><BsClipboard/></Button>{' '}
        <Button variant="secondary" title={"Update Document from a local json file"}><BsUpload/></Button>{' '}
        <Button variant="secondary" title={"Download Document"}><BsDownload/></Button>{' '}
        <Button variant="secondary" className="text-danger" title={"Delete Document"}><AiFillDelete/></Button>
        </ButtonGroup>
    </ButtonToolbar>
}

export const getDeleteTool = () => {

    
    //onClick={(e) => setDeleteDocument()}

    return <Button variant="secondary" className="text-danger" title={"Delete Document"} >
        <AiFillDelete/>
    </Button>
}

export const getCopyIDTool = () => {
    return <Button variant="secondary" title={"Copy Document ID"}>
        <BsClipboard/>
    </Button>
}
