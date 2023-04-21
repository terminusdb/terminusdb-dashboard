import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import {BiGitBranch, BiGitPullRequest} from "react-icons/bi"
import {GrFormClose} from "react-icons/gr"
import {AiOutlineCheck} from "react-icons/ai"
import {WOQLClientObj} from '../init-woql-client'
import Stack from 'react-bootstrap/Stack';
import {FaInfo} from "react-icons/fa"
import Dropdown from 'react-bootstrap/Dropdown';


export const ChangeRequestComponent = ({currentCRIdentifier, setShowModal,closeChangeRequest,currentChangeRequest, currentCRStartBranch})  => {
    if(!currentChangeRequest) return <div/> 
    
    return <Dropdown>
        <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="tdb__change__request__card">
            <Badge className="bg-primary note__badge mr-2"> <FaInfo className=" mt-1"/> </Badge>
            <small className="fw-bold mr-2">Change Request</small>
            <Badge className="fw-bold mr-2 bg-primary text-dark">
                <BiGitBranch className="mr-1"/>
                {currentCRIdentifier} 
            </Badge> 
            from 
            <Badge bg="success" className="ml-2 fw-bold mr-2 text-dark">
                <BiGitBranch className="mr-1"/>
                {currentCRStartBranch} 
            </Badge>  
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.ItemText className="d-flex w-100">
                <label className="small pr-2">Review</label>
                <Button className="btn btn-warning btn-sm text-dark float-right ms-auto" 
                    title="Submit Change Request for Review"
                    onClick={()=>{setShowModal(true)}}>
                    <AiOutlineCheck className="mr-1"/>
                    <small className="fw-bold">Ready for Review</small>
                </Button> 
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.ItemText className="d-flex w-100">
                <label className="small pr-2">Exit Change Request</label>
                <Button className=" btn btn-light btn-sm ms-auto" 
                    title="Exit Change Request"
                    onClick={()=>{closeChangeRequest()}}>
                    <GrFormClose/> <small className="fw-bold">Exit</small>
                </Button>  
            </Dropdown.ItemText>
        </Dropdown.Menu>
    </Dropdown>
}

/*export const ChangeRequestComponent_OLD = ({branch, setShowModal,closeChangeRequest,currentChangeRequest}) => {

    if(!currentChangeRequest) return <div/> 

    return <React.Fragment>
        <div className="d-flex ml-5 p-2 col-md-6 rounded  border border-0"> 
            <Badge className="bg-primary note__badge mr-2"> <FaInfo className=" mt-1"/> </Badge>
            {/*<BiGitPullRequest  className="mr-1"/>*//*}
            <span>
                <small className="fw-bold mr-2">Change Request</small>
                <Badge className="fw-bold mr-2 bg-primary text-dark">
                    <BiGitBranch className="mr-1"/>
                    {branch}
                </Badge> 
            </span>
            <Button className="btn btn-warning mr-2 btn-sm text-dark" 
                title="Submit Change Request for review"
                onClick={()=>{setShowModal(true)}}>
                <AiOutlineCheck className="mr-1"/>
                <small className="fw-bold">Submit CR</small>
            </Button> 
            
            <Button className=" btn btn-light btn-sm" 
                title="Exit Change Request mode"
                onClick={()=>{closeChangeRequest()}}>
                <GrFormClose/> <small className="fw-bold">Exit CR</small>
            </Button>  
            <GetHelpText/>
        </div>
    </React.Fragment>
}*/