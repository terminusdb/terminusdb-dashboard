
import React, {useState} from "react"
import {Card, Button, Form} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {SEND_FEEDBACK_CONFIG} from "./constants"
import {SendEmailHook} from "../hooks/SendEmailHook"
import {Alerts} from "../components/Alerts"
import {TERMINUS_SUCCESS, TERMINUS_DANGER} from "../components/constants"
import {FaTimes} from "react-icons/fa"
import CowDuckHead from '../assets/CowDuckHead.png';
import { ENTERPRISE_PLAN } from "../payment/labels"
const FEEDBACK = 'feedback'

export const Feedback = ({setShowFeedbackForm, boxType=FEEDBACK}) => {
    const {clientUser} = WOQLClientObj()
    const {emailResult, sendEmailResult, setEmailError, emailError, sendEmailData}=SendEmailHook()

    const [message, setMessage]=useState(false)
    const [subject, setSubject]=useState(false)
    const userName = clientUser.given_name || clientUser.nickname

    function sendFeedback (e) {
        if(!clientUser || !clientUser.agentName) return
        let data = {}       
        data['username']=clientUser.given_name || clientUser.nickname
        data['email']=clientUser.email
        data['message']=message
        data['subject']=subject
        sendEmailData(data)
    }

    function handleMessage (e) {
        setMessage(e.target.value) 
    }

    function handleSubject (e) {
        setSubject(e.target.value) 
    }

    const labels = {
        [FEEDBACK]: {
            title: "Send us your Feedback",
            preSubject : "",
            subject: "Subject",
            message:"If you notice any bugs or have any suggestions about how we can improve TerminusX, please let us know !",
            className:"shadow-sm px-3 rounded-2 py-4 mx-auto mt-5 ff-align-left feedback-form"
        },
        [ENTERPRISE_PLAN]: {
            title: "Contact us",
            subject: "Enterprice Subscription",
            preSubject : "Enterprice Subscription --- ",
            message:"please let us know you project!",
            className:"shadow-sm px-3 rounded-2 py-4 mx-auto mt-5 ff-align-left feedback-form"
        }
    }

    return <Card className={labels[boxType].className} style={{width: "500px"}}>
        <div className="cowduck-top-sec bg-transparent border-0 text-center d-flex"> 
            <img className="card-img cowduck-feedback-avatar large-avatar rounded-circle mx-auto" src={CowDuckHead}/>
            <Button onClick={(e) => setShowFeedbackForm(false)} className="feedback-cancel btn btn-sm cancel-button" variant="outline-info">
                <FaTimes />
            </Button>
        </div>
        <div>
            <h5 className="text-center mt-2">{labels[boxType].title}</h5>
            <h1 className="text-center mt-3">Hi {userName} !</h1>
            <Form> 
                {emailResult && <Alerts message={emailResult} type={TERMINUS_SUCCESS} onCancel={sendEmailResult}/>}
                {emailError && <Alerts message={emailError} type={TERMINUS_DANGER} onCancel={setEmailError}/>}
                <Form.Group>
                    <Form.Label className="text-muted">Subject</Form.Label>
                    <Form.Control as="input" 
                        rows={1} 
                        placeholder={labels[boxType].subject}
                        onBlur={handleSubject}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-muted">Message</Form.Label>
                    <Form.Control as="textarea" 
                        rows={10} 
                        placeholder={labels[boxType].message}
                        onBlur={handleMessage}/>
                </Form.Group>
            </Form>
            <div className="float-right">
                <Button onClick={sendFeedback} {...SEND_FEEDBACK_CONFIG}>
                    <i className={SEND_FEEDBACK_CONFIG.icon}/> 
                    {SEND_FEEDBACK_CONFIG.label} 
                </Button>
            </div>
        </div>
    </Card>
    
}