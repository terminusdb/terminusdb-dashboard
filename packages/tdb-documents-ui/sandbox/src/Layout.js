import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { View } from "./View"
import { ModeBar } from "./ModeBar"
import { DocumentTypes } from "./DocumentTypes"
import { Editor } from './Editors';
import { MoreInfo } from "./MoreInfoCanvas"
 
const App= (props) =>{ 


	return <Container fluid="xxl" className='mt-5'>
		<h3 className='text-success'>{`Parts & Components Inventory`}</h3>
		<h5 className='mb-4 text-muted'>{`This data product features Lego sets and their individual components and the relationships between them. 
			It is an excellent example of organizations that have interconnected components and parts within their product offerings.`}
		</h5>
		<DocumentTypes/>
		<MoreInfo/>
		<Row>
			<Col md={4}>
				<ModeBar/>
				<Editor/>
			</Col>
			<Col md={8}><View/></Col>
		</Row>
	</Container>
	
}

export default App