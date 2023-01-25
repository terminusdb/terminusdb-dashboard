import React from "react"
import {ProgressBar} from "react-bootstrap"
import {Container, Row} from "react-bootstrap"
import {PROGRESS_BAR_COMPONENT} from "./constants"

const LoadingBar = ({message, type}) => {
    var textCss="text-muted" 
    if(type ==PROGRESS_BAR_COMPONENT) {
        var textCss="text-black" 
    }
    return <React.Fragment>
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
        <Row className={`justify-content-xl-center ${textCss} font-italic fw-bold`}>
            {message}
        </Row>
    </React.Fragment>
}



export const Loading = (props) => {
    let percentage=100

    if(props.type == PROGRESS_BAR_COMPONENT) {
        return <Row className="text-center w-100 justify-content-center progress-bar-container">
            <ProgressBar now={percentage} label={props.message} striped variant="success" animated className="progress-bar-position" />
        </Row>
    }

    return <div className="w-100 loading-parent ">
        <Container className="loading-bar-align justify-content-center">
            <LoadingBar message={props.message} type={props.type}/>
        </Container>
    </div>

}
