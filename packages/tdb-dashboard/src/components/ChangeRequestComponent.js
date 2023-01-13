import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import {BiGitBranch} from "react-icons/bi"

export const ChangeRequestComponent = ({branch, setShowModal}) => {

    if(branch && branch === "main") return <div/> 

    return <React.Fragment>
        <Card className="mt-5 ml-5 mr-5 d-flex bg-transparent"> 
            <Card.Body>
                <span>
                    <small className="fw-bold mr-2">You are in change request mode</small>
                    <Badge className="fw-bold mr-2 bg-primary text-dark">
                        <BiGitBranch className="mr-1"/>
                        {branch}
                    </Badge> 
                </span>
                <Button className="ml-auto bg-light text-dark btn-sm" onClick={()=>{setShowModal(true)}}>
                    <small className="fw-bold">Submit your change request for revision</small>
                </Button>  
            </Card.Body> 
        </Card>
    </React.Fragment>
}