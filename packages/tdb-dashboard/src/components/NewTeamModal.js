import React, {useState} from "react"
import {Modal, Button, Form} from "react-bootstrap"
import {BsFillPeopleFill} from "react-icons/bs"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT, TERMINUS_DANGER,TERMINUS_SUCCESS} from "./constants"
import {Alerts} from "./Alerts"
import { UTILS } from "@terminusdb/terminusdb-client"
import {AccessControlHook} from "@terminusdb/terminusdb-access-control-component"
import {WOQLClientObj} from '../init-woql-client'

export const NewTeamModal = ({show, setShow}) => {
    const {clientUser, accessControlDashboard} = WOQLClientObj()
    const {createOrganizationAndCapability, createOrganizationRemote,setError,errorMessage,loading} = AccessControlHook(accessControlDashboard)
    const [teamName, setTeamName]=useState(false)
    const [teamCreated, setTeamCreated] = useState(false)

    function runCreateTeam (e){       
        if(!UTILS.checkValidName(teamName)) {
            setError("Team name is mandatory and can only contain underscores and alphanumeric characters.")
            return
        }       
        createNewTeam().then(done=>{
            if(done === true){
                setTeamCreated(true)
                const basename = process.env.BASE_URL  
                window.location.replace(`${window.location.origin}/${basename}/${teamName}`)
            }
        })
    }

    function createNewTeam (){
        if(clientUser.connection_type === "LOCAL" ){       
            if(clientUser.user==="admin"){
                return createOrganizationAndCapability(teamName,"User/admin",["Role/admin"]) 
            }
            setError("You can not create a new Team")        
        }else{
            // this is for the remote connection
            return createOrganizationRemote(teamName)
        }
    }

    function handleBlur (e) {
        setError(false)
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
        {!loading && <Button className="btn-info" onClick={runCreateTeam} id="create_new_team_button">
                    <BsFillPeopleFill className="mr-2"/>Create Team
                </Button>}
        {loading && <Loading message={`Creating a new team ...`} type={PROGRESS_BAR_COMPONENT}/>}
        </Modal.Footer>
    </Modal>
}