import React, {useEffect, useState} from "react"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {Button, Form, Card, Row, Col, Tab, Nav, Tabs} from "react-bootstrap"
import {TokenCard} from "./TokenCard"
import { BsClipboard } from "react-icons/bs"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { OpenAICard } from "../components/OpenAICard"

import {BsFillPeopleFill} from "react-icons/bs"
import {EDITOR_READ_OPTIONS,EDITOR_READ} from "../components/constants"
import {NewTeamModal} from "../components/NewTeamModal"
import {BiUser} from "react-icons/bi"
import {HiOutlineMail} from "react-icons/hi"
import {AiOutlineTeam} from "react-icons/ai"
import {PYTHON_TAB, JS_TAB, CURL_TAB, js_code,py_code} from "./constants"
import {FaPython} from "react-icons/fa"
import {SiJavascript} from "react-icons/si"
import {AiOutlineVerticalLeft} from "react-icons/ai"
import {WOQLClientObj} from "../init-woql-client"
import {useNavigate} from "react-router-dom"
import { PLANS } from "../routing/constants"

export const Profile = () => {
    const {woqlClient,clientUser:user,accessControlDashboard} = WOQLClientObj()
    if(!woqlClient) return
    const organization = woqlClient.organization()
    //const team = user ? user['http://terminusdb.com/schema/system#team'] : ''
    const email = user ? user['email'] : ''
    const tier = user && user.userInfo ? user.userInfo.tier : "Community"
    const [showNewMemberModal, setShowNewMemberModal] = useState(false)
    const navigate = useNavigate()
    // set key for tabs

    const [key, setKey] = useState(PYTHON_TAB)

    let remote_url = ''
    if(process.env.FEEDBACK_URL){
        remote_url = process.env.FEEDBACK_URL.endsWith('/') ? process.env.FEEDBACK_URL : process.env.FEEDBACK_URL+'/'
    }
    const cloud_url= `${remote_url}${organization}/`
    const pyCode = py_code(cloud_url,organization)
    const jsCode = js_code(cloud_url,organization,email)
    const curlCode = `export TOKEN='YOUR_API_TOKEN_HERE'\ncurl "${cloud_url}api/" -H "API_TOKEN: $TOKEN"`

    function gotoSubscription (){
        navigate(`/${PLANS}`)
    }

    /* adding a comment for text */
    return <Layout sideBarContent={<LeftSideBar/>} showLeftSideBar={true}>
        <NewTeamModal show={showNewMemberModal} setShow={setShowNewMemberModal} />
        <div style={{marginTop: "20px"}}>
            {user &&
            <Row className="mr-2">
            <Col className="ml-3 mt-5">
                <OpenAICard organization={organization} isAdmin={accessControlDashboard && accessControlDashboard.isAdmin()}/>
                <TokenCard organization={organization}/>
                {cloud_url && <React.Fragment>
                    <Card className="p-5 mb-4">
                        <span className="d-block mb-4">
                            <h4 className="mt-4 text-light fw-bold"><strong>Client Libraries</strong></h4>
                            <h6 className="description text-muted fw-bold">
                                Copy the below code snippet to connect to TerminusX cloud via our Python/Javascript Client or curl command.
                            </h6>
                        </span>

                        {/* I am adding the value to code mirror really fast so there is no time, have to review the code soon enough */}
                        <Tabs
                            id="profile_tabs"
                            activeKey={key}
                            onSelect={(k) => {setKey(k)}}
                            className="mb-3"
                        >
                            <Tab eventKey={PYTHON_TAB} title={<span><FaPython className="mr-1"/>{PYTHON_TAB}</span>}>
                                <span className="d-flex">
                                    <h6 className="description fw-bold text-muted w-100 float-left">Python client example code to connect to the cloud</h6>
                                </span>
                                <CodeMirror
                                    value={pyCode}
                                    theme={vscodeDark}
                                    
                                    readOnly={true}
                                    extensions={[python()]} 

                                />

                            </Tab>
                            <Tab eventKey={JS_TAB} title={<span><SiJavascript className="mr-1"/>{JS_TAB}</span>}>
                                <span className="d-flex">
                                    <h6 className="description fw-bold text-muted w-100 float-left">Javascript client example code to connect to the cloud</h6>
                                </span>
                                {key === JS_TAB && <CodeMirror
                                    value={jsCode}
                                    theme={vscodeDark}
                                    readOnly={true}
                                    extensions={[javascript()]} 

                                />}
                            </Tab>
                            <Tab eventKey={CURL_TAB} title={<span><AiOutlineVerticalLeft  className="mr-1"/>{CURL_TAB}</span>} >
                                <span className="d-flex">
                                    <h6 className="description fw-bold text-muted w-100 float-left">curl example to connect to the cloud</h6>
                                </span>
                                {key === CURL_TAB && <CodeMirror
                                    height="200px"
                                    value={curlCode}
                                    theme={vscodeDark}
                                    readOnly={true}
                                    extensions={[javascript()]} 
                                />}
                            </Tab>
                        </Tabs>

                        <span className="mb-4"/>
                </Card>
                </React.Fragment>}

            </Col>
            <Col sm="4" className="mt-5">
                <Card className="shadow-sm border-0 px-3 rounded-2 mb-5 py-3 mx-auto mr-4">
                    <img className="card-img profile-avatar large-avatar rounded-circle mx-auto" src={user.picture}/>
                    <span className="mx-auto w-100 mt-2 text-center">
                        <div className="fw-bold mb-2" title="Your name">
                            <BiUser className="mr-2 fw-bold text-muted"/>
                            {`${user.given_name} ${user.family_name}`}
                        </div>
                        <div className="fw-bold mb-2" title="Your email">
                            <HiOutlineMail className="mr-2 fw-bold text-muted"/>
                            {user.email}
                        </div>
                        <div className="fw-bold mb-2" title="Your team">
                            <AiOutlineTeam className="mr-2 fw-bold text-muted"/>
                            {organization}
                        </div>

                        <Button id="profile_open_create_new_team_modal" className="btn-info mt-2 mb-3" onClick={()=>{setShowNewMemberModal(true)}}>
                            <BsFillPeopleFill className="mr-2"/>Create a new Team
                        </Button>
                    </span>
                </Card> 
                <Card className="shadow-sm border-0 rounded-2 mb-3 mx-auto mr-4">
                   { /*<Card.Header >
                        <label className="text-light">CurrentSubscription : <label className="text-yellow fw-bold">{tier}</label></label>
                    </Card.Header>*/}
                    <Card.Body className="m-4">
                        <label className="mt-4 text-light fw-bold">CurrentSubscription : <label className="text-yellow fw-bold">{tier}</label></label>
                        <Button onClick={gotoSubscription} 
                            className="mt-4 mb-4 w-100 btn-md btn-light">Update Your Subscription
                        </Button>
                    </Card.Body>
                </Card>                    

            </Col>
            </Row>}
        </div>
    </Layout>
}
