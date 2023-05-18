import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { View } from "./View"
import { ModeBar } from "./ModeBar"
import { MenuList, MENU_LIST } from "./MenuList"
import { Editor } from './Editors';
import { MANDATORY } from "./menu.constants"
import { MoreInfo } from "./MoreInfoCanvas"
import { Routes, Route } from "react-router-dom"

const Layout = () => {
	return <div fluid="xxl" className='mt-5'>
		<MoreInfo/>
		<Row>
			<Col md={4}>
				<ModeBar/>
				<Editor/>
			</Col>
			<Col md={8}><View/></Col>
		</Row>
	</div>
}


function getRoutes() { 
	let routeOptions = []
	routeOptions.push(<Route key={`home`} path={`/`} element={<Layout/>}/>)
	MENU_LIST.map(menu => {
		routeOptions.push(<Route key={menu} path={`/${menu}`} element={<Layout/>}/>)
	})
	return <>{routeOptions}</> 
}
 
const App= (props) =>{ 

	return <div className='ml-5 mr-5'>
		<MenuList/>
		<Routes>
			{getRoutes()}
		</Routes>
	</div>
	
}

export default App