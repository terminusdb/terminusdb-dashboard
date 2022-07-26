import React, {useState, useEffect} from "react"
import {Modal, Button, Form, Col} from "react-bootstrap"
import {BsFillPeopleFill} from "react-icons/bs"
import {BiError} from "react-icons/bi"
import {CreateNewOrg} from "../hooks/CreateNewOrg"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, TERMINUS_DANGER,TERMINUS_SUCCESS} from "./constants"
import {Alerts} from "./Alerts"

export const NewTeamModal = ({show, setShow}) => {
    const {createNewOrg,teamCreated,loading,errorMessage} =  CreateNewOrg()
    const [teamName, setTeamName]=useState(false)
    const [error, setError]=useState(false)

    function handleInvite (e){
        if(!teamName || teamName === "") {
            setError(true)
            return
        }
        else{
            createNewOrg(teamName)
            setError(false)
        }
    }

    function handleBlur (e) {
        setTeamName(e.target.value)
    }

    return <Modal 
            show={show} 
            size="lg"
            onHide={(e) => setShow(false)}>
        <Modal.Header closeButton>
            <h5 className="text-success mt-3 mb-3">{`Create a new Team`}</h5>
        </Modal.Header>
        <Modal.Body>
            {teamCreated && 
            <Alerts id="alert_team_created" message={"the team has been created"} type={TERMINUS_SUCCESS}/>}
            {errorMessage &&  <Alerts id="alert_team_created_error" message={errorMessage} type={TERMINUS_DANGER}/>}
      
            {error && <span className="d-flex">
                <BiError className="text-danger mt-1 mr-1"/><p className="text-danger">Team name is mandatory</p>
            </span>}
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        id="team_id"
                        placeholder="Team Name"
                        aria-describedby="inputGroupPrepend"
                        required
                        onBlur={handleBlur}
                    />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
        {!loading && <Button className="btn-info" onClick={handleInvite} id="create_new_team_button">
                    <BsFillPeopleFill className="mr-2"/>Create a new Team
                </Button>}
        {loading && <Loading message={`Creating a new team ...`} type={PROGRESS_BAR_COMPONENT}/>}
        </Modal.Footer>
    </Modal>
}