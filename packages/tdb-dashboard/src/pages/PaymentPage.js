import React from "react"
import MyStoreCheckout from "../payment/MyStoreCheckout"
import { Layout } from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {Container,Modal,Button,Stack} from "react-bootstrap"
import {MdEuroSymbol} from "react-icons/md"

export const PaymentPage = ({showModal, setShowModal, subscriptionObj}) => {
    const {woqlClient} = WOQLClientObj()
    if(!woqlClient) return ""

    const closeModal = () =>{
        setShowModal(false)
    }

    return <Modal size="lg" className="modal-dialog-right" show={showModal} onHide={closeModal}>
            <Modal.Header style={{background:subscriptionObj.color}}>
                <Stack direction="horizontal" gap={10} className="justify-content-center"> 	
                    <Modal.Title className="h4 fw-bold"  >Update to {subscriptionObj.title}</Modal.Title>	
                    <MdEuroSymbol size="35" className="ml-2"/>
                    <h1>{subscriptionObj.price} <span className="h6" style={{marginLeft:"-10px;"}}>{subscriptionObj.subprice}</span>
                    </h1>
				</Stack>
                <Button variant="close" aria-label="Close" onClick={closeModal} />
            </Modal.Header>
            <Modal.Body className="p-3">                      
                <MyStoreCheckout closeModal={closeModal} subscriptionObj={subscriptionObj} defaultEmail= {woqlClient.user()} accessToken={woqlClient.localAuth().key}/>           
            </Modal.Body>
        </Modal>
}
