
import React from "react";
import {Card,Button,Modal} from "react-bootstrap"
import {RiDeleteBin7Line} from "react-icons/ri"

export const DeleteDocumentModal =({loading,deleteDocument,documentID,showDeleteModal,handleClose})=>{
    return <Modal show={showDeleteModal} onHide={handleClose}>
         <Modal.Header closeButton>
            <h5 className="text-success mt-3 mb-3 text-break">{`Are you sure you want to delete ${documentID} ?`}</h5>
        </Modal.Header>

    {loading && <span className="text-warning text-break p-3">{`Deleting document ${documentID} ...`}</span>}
    {!loading && <Card className="border-0 w-100">
        <Card.Body>
            <span className="text-gray">
                {`If you delete this document, there is no going back. Please be certain.`}
            </span>
            <div className="d-flex mt-3 justify-content-center">
                <Button className="btn-sm bg-danger text-gray mr-2"
                    data-cy={"Delete"}
                    onClick={deleteDocument}> 
                    <RiDeleteBin7Line className="mb-1" /> Delete
                </Button>
            </div>
        </Card.Body>
    </Card>}
    </Modal>
}