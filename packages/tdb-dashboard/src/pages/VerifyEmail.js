import React  from "react"
import {Container,Row} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'

export const VerifyEmail = (props) => { 
    const {clientUser } = WOQLClientObj()
    const { logout }  = clientUser 
    
    const redirect_uri=`${window.location.origin}/`

    const logoutWithRedirect = () =>
        logout({
            returnTo:redirect_uri
    })

    return <Container className="text-warning h-100 d-flex flex-column align-items-center justify-content-center">
        <img src="../assets/laptop_5.png" style={{width:"30%"}}/>
        <h1>Please verify your email before going on!</h1>
        <Row>
        <a id = "qsLoginBtn"
            className = "btn-margin m-4 p-4 btn btn-primary"
            href = "https://terminusdb.com">
            HOME PAGE
        </a>
        <button id = "qsLoginBtn"
            className = "btn-margin m-4 p-4 btn btn-primary"
            onClick={logoutWithRedirect}
           >
            LOGOUT
        </button>
        </Row>
    </Container>

}