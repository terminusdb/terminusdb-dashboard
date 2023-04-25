import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { View } from "./View"
import { ModeBar } from "./ModeBar"
import { DocumentTypes } from "./DocumentTypes"
import { Editor } from './Editors';

 
const App= (props) =>{ 

	return <Container>
		<DocumentTypes/>
		<ModeBar/>
		<Row>
			<Col md={5}><Editor/></Col>
			<Col md={7}><View/></Col>
		</Row>
	</Container>
	
}

export default App