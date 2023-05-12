import React, { useState } from 'react'
import Stack from 'react-bootstrap/Stack'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { DisplayCode } from "./DisplayCode"
import { Button } from "react-bootstrap"
import { FrameObj } from "./frameInit"

/**
 * 
 * @param {*} code - function is called to copy example code to clipboard 
 */
function copyToClipboard (code) {
	navigator.clipboard.writeText(code).then(() => {
			console.log("copied code", code)
	},(err) => {
	/* Rejected - clipboard failed */
			console.log("err", err)
	})
}

export const MoreInfo = () => {
	const {
		code,
		setShowCode,
		showCode
	} = FrameObj()

	//if(!showCode) return <div/>

	const handleClose = () => setShowCode(false)

	return <Offcanvas show={showCode} onHide={handleClose} key={"more-info"} placement={"end"} name={"more-info"} style={{width: "900px"}}>
		<Offcanvas.Header closeButton className="bg-light text-dark">
			<Offcanvas.Title>Code</Offcanvas.Title>
		</Offcanvas.Header>
		<Offcanvas.Body className='bg-secondary'>
			<Stack direction="horizontal" gap={3} className="mt-4 mb-4">
				{/*<h6>Click <a href={link}> here </a> to check out documentation</h6>*/}
				<Button variant="primary" 
					title="Copy to clipboard" 
					className="btn btn-sm ms-auto"
					style={{float: "right"}} 
					onClick={(e) => copyToClipboard(code)}>
						<label>Copy Code</label>
				</Button>
			</Stack>
			<DisplayCode codeString={code}/>
		</Offcanvas.Body>
	</Offcanvas>
}


