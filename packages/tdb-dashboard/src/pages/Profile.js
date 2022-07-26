import React, {useEffect, useState} from "react"
import {Layout} from "./Layout"
import {LeftSideBar} from "../components/LeftSideBar"
import {Button, Form, Card, Row, Col, Tab, Nav, Tabs} from "react-bootstrap"
import {TokenCard} from "./TokenCard"
import { BsClipboard } from "react-icons/bs"
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
require('codemirror/mode/css/css')
require('codemirror/mode/javascript/javascript')
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

export const Profile = () => {
    const {woqlClient,clientUser:user} = WOQLClientObj()
    if(!woqlClient) return
    const organization = woqlClient.organization()
    //const team = user ? user['http://terminusdb.com/schema/system#team'] : ''
    const email = user ? user['email'] : ''
    const [showNewMemberModal, setShowNewMemberModal] = useState(false)

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


    /* adding a comment for text */
    return <Layout sideBarContent={<LeftSideBar/>}>
        <NewTeamModal show={showNewMemberModal} setShow={setShowNewMemberModal} />
        <div style={{marginTop: "20px"}}>
            {user &&
            <Row>
            <Col className="ml-3 mt-5">
                <TokenCard organization={organization}/>
                {cloud_url && <React.Fragment>
                    <Card className="p-5 mb-4">
                        <span className="d-block mb-4">
                            <h4 className="mt-4 text-success"><strong>Client Libraries</strong></h4>
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
                                    options={EDITOR_READ}

                                />

                            </Tab>
                            <Tab eventKey={JS_TAB} title={<span><SiJavascript className="mr-1"/>{JS_TAB}</span>}>
                                <span className="d-flex">
                                    <h6 className="description fw-bold text-muted w-100 float-left">Javascript client example code to connect to the cloud</h6>
                                </span>
                                {key === JS_TAB && <CodeMirror
                                    value={jsCode}
                                    options={EDITOR_READ}

                                />}
                            </Tab>
                            <Tab eventKey={CURL_TAB} title={<span><AiOutlineVerticalLeft  className="mr-1"/>{CURL_TAB}</span>} >
                                <span className="d-flex">
                                    <h6 className="description fw-bold text-muted w-100 float-left">curl example to connect to the cloud</h6>
                                </span>
                                {key === CURL_TAB && <CodeMirror
                                    value={curlCode}
                                    options={EDITOR_READ_OPTIONS}
                                />}
                            </Tab>
                        </Tabs>

                        <span className="mb-4"/>
                </Card>
                </React.Fragment>}

            </Col>
            <Col sm="4" className="mt-5">
                <Card className="shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mr-4">
                    <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src={user.picture}/>
                    <span className="mx-auto w-100 mt-5 text-center">
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

                        <Button id="profile_open_create_new_team_modal" className="btn-info mt-4 mb-4" onClick={()=>{setShowNewMemberModal(true)}}>
                            <BsFillPeopleFill className="mr-2"/>Create a new Team
                        </Button>
                    </span>
                </Card>

            </Col>
            </Row>}
        </div>
    </Layout>
}
