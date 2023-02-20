import React, {useState}  from "react";
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import {useParams } from "react-router-dom";
import {ViewHeader, onTraverse} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import Alert from 'react-bootstrap/Alert'
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {TarverseDocumentLinks} from "../components/TarverseDocumentLinks"
import {decodeUrl} from "../components/utils"

const DisplayDocumentBody = ({setClicked, setModalShow}) => {
    const {type, docid:id} = useParams()
    const {
        view,
        frames,
        selectedDocument
    } = DocumentControlObj()

    let documentID=decodeUrl(id)
    
    function handleTraverse (documentID) {
        if(setModalShow) setModalShow(Date.now())
        onTraverse(documentID, setClicked)
    }

    if(!selectedDocument || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) {
        return <JsonFrameViewer jsonData={selectedDocument} mode={CONST.VIEW_DOCUMENT}/>
    }

    // Form View
    return<FrameViewer frame={frames}
        type={type}
        mode={CONST.VIEW_DOCUMENT}
        formData={selectedDocument}
        hideSubmit={true}
        onTraverse={handleTraverse}
    />
}

export const DocumentView = () => {   
    const {type, docid:id} = useParams()
    const {
        error
    } = DocumentControlObj()
    
     //__KITTY WHAT IS THE TRAVERSALDOCUMENT LINK
    const [clicked, setClicked]=useState(false)
    const [modalShow, setModalShow] = React.useState(false);

    let documentID=decodeUrl(id)
    
    return <main className="content w-100 document__interface__main">
        {error && <Alert variant={"danger"} className="mr-3">{error}</Alert>} 
        <TarverseDocumentLinks
            setClicked={setClicked}
            clicked={clicked}
            show={modalShow}
            onHide={() => setModalShow(false)}/>
        <Card className="mr-3 bg-dark">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
                <ViewHeader type={type} documentID={documentID} />
            </Card.Header>
            <Card.Body className="text-break">
                <DisplayDocumentBody setModalShow={setModalShow} setClicked={setClicked}/>
            </Card.Body>
        </Card>
    </main>
}
