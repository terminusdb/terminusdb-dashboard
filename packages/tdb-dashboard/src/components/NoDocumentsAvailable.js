import React from "react"
import {Button, Col} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {handleCreate} from "./documents.utils"

export const NoDocumentsAvailable = ({type, documentObject, setDocumentObject}) => {
    return <Col xs={11} className="d-block ml-5 mr-3">
         <div className="card card-fil m-3"> 
            <div className="card-body w-100 text-center">
                <h4 className="text-muted mt-3 mb-3">{`No documents available for type  ${type}`}</h4>
                <Button className="btn btn-lg m-5" 
                    title={`Create new ${type}`} 
                    variant="info" 
                    onClick={(e) => handleCreate(type, documentObject, setDocumentObject)}>
                    <BiPlus className="mr-1"/>{`New ${type}`}
                </Button>
            </div>
        </div>
    </Col>
}
