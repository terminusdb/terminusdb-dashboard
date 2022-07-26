import React from "react"
import {Modal, Button, Card} from "react-bootstrap"
import {BsBarChart} from "react-icons/bs"
import {FaRegHandPointDown} from "react-icons/fa"

export const HealthModal = ({showHealth, setShowHealth, dataProduct}) => {
    let css = {
        backgroundColor: "#222 !important",
        margin: "40px",
        height: "100px",
        width: "100px"
    }

    let fontCss = {fontSize: "40px"}

    return  <Modal size="lg" className="modal-dialog-right" show={showHealth} onHide={(e) => setShowHealth(false)}>
        <Modal.Header>
            <Modal.Title>
                <h6>Set the Health of Data Product<strong className="text-success ml-1"> {dataProduct} </strong></h6></Modal.Title>
            <Button variant="close" aria-label="Close" onClick={(e) => setShowHealth(false)} />
        </Modal.Header>
        <Modal.Body className="p-5">
            
            <Card>
                <Card.Body>
                    <p className="text-muted">You can set the health for your data product.</p>
                    <h6 className="text-muted"><strong className="text-success mr-1">Green</strong> indicate's a healthy and active Data Product</h6>
                    <h6 className="text-muted"><strong className="text-warning mr-1">Amber</strong> indicate's an inactive Data Product</h6>
                    <h6 className="text-muted"><strong className="text-danger mr-1">Red</strong>  indicate's a corrupt Data Product</h6>
                </Card.Body>
            </Card>
            
            <div className="align-items-center h-100 justify-content-center mt-5">
                <h6 className="text-center text-muted">Click on a state below <FaRegHandPointDown className="ml-1"/></h6>
                <span className="d-flex justify-content-center">
                    <Button className="btn btn-lg mr-3 bg-secondary border-secondary col-md-2" style={css}>
                        <BsBarChart className="text-success" style={fontCss}/>
                    </Button>
                    <Button className="btn btn-lg mr-3 bg-secondary border-secondary col-md-2" style={css}>
                        <BsBarChart className="text-warning" style={fontCss}/>
                    </Button>
                    <Button className="btn btn-lg mr-3 bg-secondary border-secondary col-md-2" style={css}>
                        <BsBarChart className="text-danger" style={fontCss}/>
                    </Button>
                </span>
            </div>
        </Modal.Body>
    </Modal>
}