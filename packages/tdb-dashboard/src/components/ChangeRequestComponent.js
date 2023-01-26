import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Badge from 'react-bootstrap/Badge';
import {BiGitBranch, BiGitPullRequest} from "react-icons/bi"
import {GrFormClose} from "react-icons/gr"
import {AiOutlineCheck} from "react-icons/ai"
import {WOQLClientObj} from '../init-woql-client'
import * as path from "../routing/constants"
import Stack from 'react-bootstrap/Stack';
import {FaInfo} from "react-icons/fa"

// returns a help text depending on which page you are while in a Change Request Mode
function GetHelpText () {
    let { getLocation } = WOQLClientObj()
    let location = getLocation()

    if(location.page === path.PRODUCT_MODELS) {
        return <div className="mt-2 small text-gray">
            If you wish to alter the schema, click on Exit from Change Request mode button.
            Modifying schema is only allowed in main.
        </div>
    }

    return <div/>
}

export const ChangeRequestComponent = ({branch, setShowModal,closeChangeRequest,currentChangeRequest}) => {

    if(!currentChangeRequest) return <div/> 

    return <React.Fragment>
        <Card className="d-flex tdb__change__request__card ml-5 mt-2 mb-1  col-md-8"> 
            <Card.Body>
                <Badge className="bg-primary note__badge mr-2"> <FaInfo/> </Badge>
                <BiGitPullRequest  className="mr-1"/>
                <span>
                    <small className="fw-bold mr-2">You are in Change Request mode</small>
                    <Badge className="fw-bold mr-2 bg-primary text-dark">
                        <BiGitBranch className="mr-1"/>
                        {branch}
                    </Badge> 
                </span>
                <Button className="ml-auto btn btn-warning mr-2 btn-sm text-dark" onClick={()=>{setShowModal(true)}}>
                    <AiOutlineCheck className="mr-1"/><small className="fw-bold">Submit Change Request for review</small>
                </Button> 
               
                <Button className=" btn btn-light btn-sm" onClick={()=>{closeChangeRequest()}}>
                   <GrFormClose/> <small className="fw-bold">Exit Change Request mode</small>
                </Button>  
                <GetHelpText/>
            </Card.Body> 
        </Card>
    </React.Fragment>
}