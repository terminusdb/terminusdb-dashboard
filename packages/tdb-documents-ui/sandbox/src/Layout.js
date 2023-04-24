import React from 'react'
import { NavBar } from './Nav';
import { Container, Row, Stack } from 'react-bootstrap';
import { View } from "./View"
import { ModeBar } from "./ModeBar"
import { DocumentTypes } from "./DocumentTypes"

 
const App= (props) =>{ 

	return <Container>
		<NavBar/>
		<ModeBar/>
		<Stack direction='horizontal' gap={3}>
			<DocumentTypes/>
			<View/>
		</Stack>
	</Container>
	
}

export default App