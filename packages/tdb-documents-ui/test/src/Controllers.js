import React, {useEffect, useState} from "react"
import Accordion from 'react-bootstrap/Accordion'
import {SubmittedData} from "./SubmittedData"
import {FrameEditor} from "./FrameEditor"
import {UIFrameEditor} from "./UIFrameEditor"
import {ACCORDIAN_FRAME_TITLE, ACCORDIAN_FRAME_UI_TITLE, ACCORDIAN_SUBMITTED_TITLE} from "./constants"
import {Input} from "./Input" 

export const Controllers = () => {

    const [activeKey, setActiveKey]=useState(ACCORDIAN_FRAME_TITLE)

    function handleSelect(key) {
        setActiveKey(key)   
    }

    return <React.Fragment>
        <Input/>
        <Accordion  onSelect={handleSelect}>
            <Accordion.Item eventKey={ACCORDIAN_FRAME_TITLE}>
                <Accordion.Header>{ACCORDIAN_FRAME_TITLE}</Accordion.Header>
                <Accordion.Body>
                    <FrameEditor/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={ACCORDIAN_FRAME_UI_TITLE}>
                <Accordion.Header>{ACCORDIAN_FRAME_UI_TITLE}</Accordion.Header>
                <Accordion.Body>
                    <UIFrameEditor/>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={ACCORDIAN_SUBMITTED_TITLE}>
                <Accordion.Header>{ACCORDIAN_SUBMITTED_TITLE}</Accordion.Header>
                <Accordion.Body>
                    <SubmittedData/>
                    
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </React.Fragment>
}