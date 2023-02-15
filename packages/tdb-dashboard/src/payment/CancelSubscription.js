import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Modal,Button,Stack, Card} from "react-bootstrap"
import {MdEuroSymbol} from "react-icons/md"
import {StripeManager} from "./StripeManager"
import {FormPaymentLabels} from "./labels"

export const CancelSubscription = ({showModal, setShowModal}) => {
    const {woqlClient, } = WOQLClientObj()
    if(!woqlClient) return ""

    const closeModal = () =>{
        setShowModal(false)
    }

    const { succeeded, 
        error, 
        processing, deleteSubscrition} = StripeManager()

    const renderSuccess = () => {
            function goToHome (){
                navigate("/")
            }
      
            return (
              <Card className="h-100">
                <Card.Body>
                  <img width="300" src="https://assets.terminusdb.com/terminusdb-console/images/cowduck-space.png" />
                  <Card.Text className="h1">{FormPaymentLabels.successTitle}</Card.Text>
                  <Card.Text className="h4 mt-2">{`${FormPaymentLabels.successSubtitle} Community`} </Card.Text>
                  <Button onClick={goToHome}>Go to Home</Button>
                </Card.Body>
              </Card>
            );
    };

    const renderCard =()=>{
        return <Card>
                    <Card.Text className="justify-content-right">Subscription Details</Card.Text>
                    {error && <div className="mt-4 alert alert-danger">{error}</div>}
                    <Stack direction="horizontal" gap={10} className="justify-content-end">
                        <Card.Text>Community <MdEuroSymbol />0</Card.Text>
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
    }

    return <Modal centered size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal} backdrop="static"
    keyboard={false}>
            <Modal.Header>
                <Stack direction="horizontal" gap={10} className="justify-content-center"> 	
                    <Modal.Title className="h4 fw-bold">Downgrade to Community</Modal.Title>	
				</Stack>
                <Button variant="close" aria-label="Close" onClick={closeModal} />
            </Modal.Header>
            <Modal.Body className="p-3">                      
                {succeeded ? renderSuccess() : renderCard()}
            </Modal.Body>
        </Modal>
}