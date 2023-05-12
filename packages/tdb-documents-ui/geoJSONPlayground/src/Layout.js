import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { View } from "./View"
import { ModeBar } from "./ModeBar"
import { MenuList } from "./MenuList"
import { Editor } from './Editors';
import { MoreInfo } from "./MoreInfoCanvas"
 
const App= (props) =>{ 


	return <Container fluid="xxl" className='mt-5'>
		<MenuList/>
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