import React,{useState} from "react"
import {Container, Button,Row,Col,Card} from "react-bootstrap"
import { useParams } from "react-router-dom"
import {AcceptInvitationHook } from "../hooks/AcceptInvitationHook"
import {invitationText} from "./constants"

export const InvitePage = (props) => { 
    const {acceptInvitation,loading,errorMessage} = AcceptInvitationHook()
    //<Route path='/path/:title'> 
    const {refid,teamid} = useParams()
    localStorage.setItem("Org",teamid)
    const accept = ()=>{
        acceptInvitation(teamid,refid,true)
    }
    const reject = ()=>{
        acceptInvitation(teamid,refid,false)
    }
    
    const homePage = () =>{     
        window.location.replace(`/`)
    }

    const text = invitationText(teamid)
    
    return <Container className="h-100 d-flex flex-column">   
                <div className="ml-auto mr-auto mt-5" style={{maxWidth:"150px"}}>
                <a href="https://terminusdb.com" data-rb-event-key="https://terminusdb.com">
                    <img src="https://assets.terminusdb.com/images/terminusx-color.png" className="logo-img"/>
                </a>
                </div>
                <Card className="invitation--card mt-5">
                    {!errorMessage && <Card.Body className="m-4 text-center">
                        <img className="benefit--icon" src="https://terminusdb.com/login/teams.svg" alt="Empower Domain Teams icon" style={{alignSelf: "center"}}/>       
                        <h5 className="mt-4">{text.line1}</h5>
                        <h5 >{text.line2}</h5>
                        <h5 className="mb-5">{text.line3}</h5>
                    {loading && <div>loading</div>}
                    {!loading && <React.Fragment><Button variant="secondary" className ="pl-5 pr-5 mr-5" onClick={reject}>REJECT</Button>
                    <Button variant="success" className = "pl-5 pr-5" onClick={accept}>ACCEPT</Button> </React.Fragment>}
                </Card.Body>}
                 {errorMessage && <Card.Body className="m-4 text-center">
                        <img className="benefit--icon" src="https://terminusdb.com/login/teams.svg" alt="Empower Domain Teams icon" style={{alignSelf: "center"}}/>       
                        <h5 className="mt-4">{errorMessage}</h5>
                       <Button variant="success" className = "pl-5 pr-5" onClick={homePage}>Go To TerminusX</Button>
                 </Card.Body>}
                </Card>                           
            </Container>

}

