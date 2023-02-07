import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Modal,Button,Stack, Card} from "react-bootstrap"
import {MdEuroSymbol} from "react-icons/md"
import {StripeManager} from "./StripeManager"

export const CancelSubscription = ({showModal, setShowModal}) => {
    const {woqlClient, } = WOQLClientObj()
    if(!woqlClient) return ""

    const closeModal = () =>{
        setShowModal(false)
    }

    const { succeeded, 
        error, 
        processing, deleteSubscrition} = StripeManager()

    

    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Stack direction="horizontal" gap={10} className="justify-content-center"> 	
                    <Modal.Title className="h4 fw-bold">Downgrade to Community</Modal.Title>	
				</Stack>
                <Button variant="close" aria-label="Close" onClick={closeModal} />
            </Modal.Header>
            <Modal.Body className="p-3">                      
                <Card>
                     <Card.Text className="justify-content-right">Subscription Details</Card.Text>
                      <Stack direction="horizontal" gap={10} className="justify-content-end">
                            <Card.Text><MdEuroSymbol />0</Card.Text>
                      </Stack>                
                      <div className="d-flex justify-content-end mt-2"> 
                        <Button onClick={closeModal} disabled={processing} variant="light" >Cancel</Button>
                        <Button type={"submit"} disabled={processing} className="ml-3" onClick={deleteSubscrition}>
                            {processing ? "Processing…" : "Downgrade"}
                        </Button>
                      </div>
                      <div className="d-flex justify-content-end mt-2"> 
                        <span style={{fontSize: "15px", color: "#888" }}>
                          </span>
                      </div>   
                </Card>			
            </Modal.Body>
        </Modal>
}