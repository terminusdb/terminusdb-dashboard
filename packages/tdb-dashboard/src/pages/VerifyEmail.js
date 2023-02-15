import React  from "react"
import {Container,Row, Card} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import { AiOutlineLogout } from "react-icons/ai"
import { MdOutlineMarkEmailRead } from "react-icons/md"
import CowDuckHead from '../assets/CowDuckHead.png';

export const VerifyEmail = (props) => { 
     const {clientUser } = WOQLClientObj()
     const { logout }  = clientUser 
    
    const redirect_uri=`${window.location.origin}/`

    const logoutWithRedirect = () =>{
         logout({returnTo:redirect_uri})
    }
 
    return <Container className="text-light h-100 d-flex flex-column align-items-center justify-content-center">
        <Card className="verify__email">
            <div className="cowduck-top-sec bg-transparent border-0 text-center d-flex"> 
                <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src={CowDuckHead}/>
            </div>
            <Card.Body style={{ marginTop: "-70px" }} className="text-center text-dark">
                <h1>Verify your Email</h1>
                <h4>Check your email to verify your account</h4>
                <a id = "qsLoginBtn"
                        className = "text-dark"
                        href = "https://terminusdb.com">
                            Click here to Visit website
                    </a>
                <div className="d-block">
                    <button id = "qsLoginBtn"
                        className = "btn-margin mt-4 mb-4 btn-sm btn btn-dark col-md-6"
                        onClick={logoutWithRedirect}
                    >
                        <AiOutlineLogout className="h4 mt-1 mr-2 text-muted"/>
                        <span className="h6">LOGOUT</span>
                    </button>
                </div>
            </Card.Body>
        </Card>
    </Container>

}