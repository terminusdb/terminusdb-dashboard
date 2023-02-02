import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Modal,Button,Stack, Card} from "react-bootstrap"
import {MdEuroSymbol} from "react-icons/md"

export const PaymentPage = ({showModal, setShowModal, tier}) => {
    const {woqlClient, } = WOQLClientObj()
    if(!woqlClient) return ""

    const closeModal = () =>{
        setShowModal(false)
    }

    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal}>
            <Modal.Header style={{background:subscriptionObj.color}}>
                <Stack direction="horizontal" gap={10} className="justify-content-center"> 	
                    <Modal.Title className="h4 fw-bold">Remove the {tier} Subscription</Modal.Title>	
				</Stack>
                <Button variant="close" aria-label="Close" onClick={closeModal} />
            </Modal.Header>
            <Modal.Body className="p-3">                      
                <Card>
                     <Card.Text className="justify-content-right">Subscription Details</Card.Text>
                      <Stack direction="horizontal" gap={10} className="justify-content-end">
                      <Card.Text>
                      {props.subscriptionObj.title} <MdEuroSymbol /> {props.subscriptionObj.price} (Billed monthly)</Card.Text>
                      </Stack>
                    
                      <div className="d-flex justify-content-end mt-2"> 
                        <Button onClick={props.closeModal} disabled={processing} variant="light" >Cancel</Button>
                        <Button type={"submit"} disabled={processing  || !enableSubmit || !stripe} className="ml-3">
                            {processing ? "Processing…" : "Subscribe"}
                        </Button>
                      </div>
                      <div className="d-flex justify-content-end mt-2"> 
                        <span style={{fontSize: "15px", color: "#888" }}>* your account will be billed monthly until cancelled.
                          </span>
                      </div>   
                </Card>			
            </Modal.Body>
        </Modal>
}