import React,{useState} from "react"
import { Layout } from "./Layout"
import {NoDataProductSelectedStyle} from "../components/constants"
import {WOQLClientObj} from '../init-woql-client'
import {Card, Row, Col, Button,Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {RiTeamLine} from "react-icons/ri"
import {NewTeamModal} from "../components/NewTeamModal"
import {BsFillPeopleFill} from "react-icons/bs"

export const Home = () => {
    const {woqlClient,changeOrganization,clientUser} = WOQLClientObj()
    if(!woqlClient) return ""
    const [showNewMemberModal, setShowNewMemberModal] = useState(false)

    const teamList = woqlClient.userOrganizations()
    let navigate = useNavigate()
 
    function changeOrganizationHandler(orgName) {
        navigate(`/${orgName}`)
        changeOrganization(orgName)         
    }

    return <Layout>
                <main className="content w-100">
                <Container>
                    <Col xs={12} className="text-center d-block align-items-center justify-content-center">
                        <h3 className="text-success mt-5 mb-4">
                            <RiTeamLine className="mr-2"/> Select a Team
                            { clientUser && clientUser.connection_type !== "LOCAL" &&
                            <React.Fragment>
                                <Button id="team_page_open_create_new_team_modal" className="ml-4 btn-info mt-4 mb-4" onClick={()=>{setShowNewMemberModal(true)}}>
                                    <BsFillPeopleFill className="mr-2"/>Create a new Team
                                </Button>
                                <NewTeamModal show={showNewMemberModal} setShow={setShowNewMemberModal} />
                            </React.Fragment>
                            }
                        </h3>                      
                        <Row>
                        {teamList.map((item,index) =>{
                            return <Col md={4} className="py-2 doc-summary-card" key={`key___${index}`}>
                            <Button id={item.name} className="bg-transparent border-0 p-0 w-100" onClick={(e) => changeOrganizationHandler(item.name)}>
                                <Card bg="dark" style={{maxHeight: "220px", cursor: "pointer"}} >
                                    <Card.Header className="bg-transparent border-0 d-flex text-wrap">
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className="ml-3">
                                            <h4>{item.name}</h4>
                                        </Row>
                                    </Card.Body>
                                    
                                </Card>
                            </Button>
                                </Col>
                             })}
                            </Row>
                    </Col>
                </Container>
            </main>
        </Layout>
     
}

