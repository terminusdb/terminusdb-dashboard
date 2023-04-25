import React, { useEffect, useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import { SubmittedData } from "./SubmittedData"
import { FrameEditor } from "./FrameEditor"


export const Editor = () => {
	const [activeKey, setActiveKey]=useState("Frames")

	function handleSelect(key) {
		setActiveKey(key)   
	}

	return <Accordion  onSelect={handleSelect}>
		<Accordion.Item eventKey={"Frames"}>
			<Accordion.Header>{"Frames"}</Accordion.Header>
			<Accordion.Body>
				<FrameEditor/>
			</Accordion.Body>
		</Accordion.Item>
		<Accordion.Item eventKey={"Submitted Data"}>
			<Accordion.Header>{"Submitted Data"}</Accordion.Header>
			<Accordion.Body>
				<SubmittedData/>
			</Accordion.Body>
		</Accordion.Item>
	</Accordion>
    
}