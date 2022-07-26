import React, {useState} from "react"
import {Link} from "react-router-dom"
import {Button, Col} from "react-bootstrap"
import {BsFillPeopleFill} from "react-icons/bs"
import {NoDataProductSelectedStyle} from "./constants"
import {NewDataProduct} from "../components/NewDataProduct"
import {NewTeamModal} from "../components/NewTeamModal"
import {WOQLClientObj} from '../init-woql-client'

export const NoDataProductsCreated = ({organization}) => {
    const [showNewMemberModal, setShowNewMemberModal] = useState(false)
    const { clientUser} = WOQLClientObj()
    const firstLogin = clientUser && clientUser.firstLogin ? true : false
    return <div style={NoDataProductSelectedStyle}>
        <Col xs={12} className="text-center d-block align-items-center justify-content-center ml-5">
        <Col xs={9} className="d-block">
         <div className="card card-fil m-3">
            {!firstLogin && 
                <div className="card-body w-100 text-center">
                    <h4 className="text-muted mt-5 mb-3">{`No Data Product is created`}</h4>
                    <NewDataProduct css={"btn mb-5"}/>
                </div>}
            {firstLogin &&  <div className="card-body w-100 text-center">
                <h4 className="text-muted mt-5 mb-3"><p className="text-white">{`You are the owner of the team `}<strong className="text-dark ml-3 badge badge-info">{organization}</strong>
                </p></h4>
                <p>Team are shared accounts where multiple users can collaborate on shared data products.</p>
                <p>Owners and administrators can manage member access to the team’s resources, 
                using the <Link to="/members">access control interface.</Link></p>
                <p>A group of users can collaborate on TerminusX by joining the same team.</p>
                <Button id="home_open_create_new_team_modal" className="btn-info mt-4 mb-4" onClick={()=>{setShowNewMemberModal(true)}}>
                    <BsFillPeopleFill className="mr-2"/>Create a new Team
                </Button>
                <NewTeamModal show={showNewMemberModal} setShow={setShowNewMemberModal} />
            </div>}
        </div>
    </Col>
    </Col>
    </div>
}

//{user && user['http://terminusdb.com/schema/system#afterSignUp'] && 