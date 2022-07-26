
import React from "react"
import { Alert, Button } from 'react-bootstrap';
import {TERMINUS_WARNING, TERMINUS_SUCCESS, TERMINUS_DANGER, TERMINUS_MESSAGE} from "./constants"
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai"
import {BiErrorCircle} from "react-icons/bi"
import {BsInfoCircle} from "react-icons/bs"
import {queryTimeDisplay} from "./utils"

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
                <strong>Warning: </strong> {message}
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("warning")} />
            </div>
        </Alert>

    if(type == TERMINUS_DANGER)
        return  <Alert
            className="text-break"
            variant="danger"
            show={shouldShowAlert("danger")}
            onClose={() => onClose("danger")}>

            <div className="d-flex justify-content-between">
            <div>
                <BiErrorCircle className="me-1" />
                <strong>Error: </strong> {message}
            </div>
            <Button variant="close" size="xs" onClick={() => onClose("danger")} />
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
                <strong>Success: </strong> {message}
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
            <strong>Info: </strong> {message}
        </div>
        <Button variant="close" size="xs" onClick={() => onClose("light")} />
        </div>
    </Alert>
}