import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import {BiGitBranch} from "react-icons/bi"
import {GrFormClose} from "react-icons/gr"
export const ChangeRequestComponent = ({branch, setShowModal,closeChangeRequest}) => {

    if(branch && branch === "main") return <div/> 

    return <React.Fragment>
        <Card className="d-flex bg-transparent"> 
            <Card.Body>
                <span>
                    <small className="fw-bold mr-2">You are in change request mode</small>
                    <Badge className="fw-bold mr-2 bg-primary text-dark">
                        <BiGitBranch className="mr-1"/>
                        {branch}
                    </Badge> 
                </span>
                <Button className="ml-auto btn btn-info" onClick={()=>{setShowModal(true)}}>
                    <small className="fw-bold">Submit your change request for revision</small>
                </Button> 
               
                <Button className=" btn btn-info" onClick={()=>{closeChangeRequest()}}>
                   <GrFormClose/> <small className="fw-bold">Close Change Request Mode</small>
                </Button>  
            </Card.Body> 
        </Card>
    </React.Fragment>
}