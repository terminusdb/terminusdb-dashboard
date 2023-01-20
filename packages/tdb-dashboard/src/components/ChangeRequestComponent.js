import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import {BiGitBranch, BiGitPullRequest} from "react-icons/bi"
import {GrFormClose} from "react-icons/gr"
import {AiOutlineCheck} from "react-icons/ai"


export const ChangeRequestComponent = ({branch, setShowModal,closeChangeRequest,currentChangeRequest}) => {

    if(!currentChangeRequest) return <div/> 

    return <React.Fragment>
        <Card className="d-flex bg-transparent ml-5 mt-2"> 
            <Card.Body>
                <BiGitPullRequest  className="mr-1"/>
                <span>
                    <small className="fw-bold mr-2">You are in Change Request mode</small>
                    <Badge className="fw-bold mr-2 bg-primary text-dark">
                        <BiGitBranch className="mr-1"/>
                        {branch}
                    </Badge> 
                </span>
                <Button className="ml-auto btn btn-warning mr-2 btn-sm text-dark" onClick={()=>{setShowModal(true)}}>
                    <AiOutlineCheck className="mr-1"/><small className="fw-bold">Submit Change Request for revision</small>
                </Button> 
               
                <Button className=" btn btn-light btn-sm" onClick={()=>{closeChangeRequest()}}>
                   <GrFormClose/> <small className="fw-bold">Exit Change Request mode</small>
                </Button>  
            </Card.Body> 
        </Card>
    </React.Fragment>
}