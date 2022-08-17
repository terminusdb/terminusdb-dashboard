
import React,{useState} from "react"
import { Alert, Button } from 'react-bootstrap';
import {TERMINUS_WARNING, TERMINUS_SUCCESS, TERMINUS_DANGER, TERMINUS_MESSAGE} from "./constants"
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai"
import {BiErrorCircle} from "react-icons/bi"
import {BsInfoCircle} from "react-icons/bs"

export const Alerts = ({message, type, onCancel, time}) => {
    const [show, setShow] = useState(true);

    const onClose = (alertId) => {
        setShow(false)
        if(onCancel) onCancel(false)
    }

    return <Alert
            className="text-break"
            variant={type}
            dismissible
            onClose={() => onClose()}>

            <div className="d-flex justify-content-between">
            <div>
               
                <strong>{type}: </strong> {message}
            </div>
          </div>
        </Alert>

}// <AiOutlineWarning className="me-1" />