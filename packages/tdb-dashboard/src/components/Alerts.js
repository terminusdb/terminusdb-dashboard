
import React from "react"
import { Alert, Button } from 'react-bootstrap';
import {TERMINUS_WARNING, TERMINUS_SUCCESS, TERMINUS_DANGER, TERMINUS_MESSAGE} from "./constants"
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai"
import {BsInfoCircle} from "react-icons/bs"
import {queryTimeDisplay} from "./utils"
import { FaTimes, FaExclamationTriangle } from "react-icons/fa"


/**
* 
* @param {*} type document Type
* @returns a close button icon
*/
const AlertCloseButton = ({ className,  onClick }) => { 
    // on close button display document list table
    return <Button variant="light" 
        className={`${className} d-contents`}
        style={{display: "contents"}}
        tilte={`Close`}
        onClick={onClick}>
        <FaTimes/>
    </Button>
 }

export const Alerts = ({message, type, onCancel, time}) => {
    const [hiddenAlerts, setHiddenAlerts] = React.useState([])
    let updateTime = Date.now() - time
    const onClose = (alertId) => {
        const hiddenAlertsUpdated = [...hiddenAlerts, alertId]
        setHiddenAlerts(hiddenAlertsUpdated)
        if(onCancel) onCancel(false)
    }

    const shouldShowAlert = (alertId) => (
        hiddenAlerts.indexOf(alertId) === -1
    )

    if(type == TERMINUS_WARNING)
        return <Alert
            className="text-break"
            variant="warning"
            show={shouldShowAlert("warning")}
            onClose={() => onClose("warning")}>

            <div className="d-flex justify-content-between">
            <div>
                <AiOutlineWarning className="me-1" />
                <strong>Warning: </strong>
                <div className="text-wrap">{message}</div>
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("warning")} />
            </div>
        </Alert>

    if(type == TERMINUS_DANGER)
        return  <Alert
            //className="text-break"
            //variant="danger"
            className="alert_danger alert_danger_text"
            show={shouldShowAlert("danger")}
            onClose={() => onClose("danger")}>

            <div className="d-flex justify-content-between">
                <div className="w-100">
                    <FaExclamationTriangle className="me-1 mb-1" />
                    <strong>Oops! Something went wrong.</strong> 
                    <div className="text-wrap">{message}</div>
                </div> 
                <AlertCloseButton className={"alert_btn_close alert_danger_text"} onClick={() => onClose("danger")}/>
            </div>
        </Alert>

    if(type == TERMINUS_SUCCESS)
        return  <Alert
            variant="success"
            className="text-break"
            show={shouldShowAlert("success")}
            onClose={() => onClose("success")}>

            <div className="d-flex justify-content-between">
            <div>
                <AiOutlineCheckCircle className="me-1" />
                <strong>Success: </strong> 
                <div className="text-wrap">{message}</div>
                {time && ` ${queryTimeDisplay(updateTime)}`}
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("success")} />
            </div>
        </Alert>

    if(type == TERMINUS_MESSAGE)
        return  <Alert
            variant="light"
            className="text-break"
            show={shouldShowAlert("light")}
            onClose={() => onClose("light")}>

        <div className="d-flex justify-content-between">
        <div>
            <BsInfoCircle className="me-1" />
            <strong>Info: </strong> 
            <div className="text-wrap">{message}</div>
        </div>
        <Button variant="close" size="xs" onClick={() => onClose("light")} />
        </div>
    </Alert>
}