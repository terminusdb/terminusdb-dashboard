import React from "react"
import * as menu from "./menu.constants"
import {InitObj} from "./init"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {NAVBAR_TITLE} from "./constants"
import {setDocumentType} from "./actions"

export const MenuList = () => {

	const {
		setMenuItem,
		setType
	} = InitObj() 

	function handleClick(clicked) {
		//if(setType) setDocumentType(clicked, setType) 
		if(setMenuItem) setMenuItem(clicked) 
	}

	return <Navbar bg="light" expand="lg" fixed="top">
		<Container>
			<Navbar.Brand href="https://terminusdb.com/docs/index/terminusx-db/how-to-guides/generate-document-user-interfaces/get-started-with-the-documents-user-interface">{NAVBAR_TITLE}</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link data-cy={menu.MANDATORY} onClick={(e) => handleClick(menu.MANDATORY)}>{menu.MANDATORY}</Nav.Link>
					<Nav.Link data-cy={menu.OPTIONAL} onClick={(e) => handleClick(menu.OPTIONAL)}>{menu.OPTIONAL}</Nav.Link>
					<Nav.Link data-cy={menu.SET} onClick={(e) => handleClick(menu.SET)}>{menu.SET}</Nav.Link>
					<Nav.Link data-cy={menu.LIST} onClick={(e) => handleClick(menu.LIST)}>{menu.LIST}</Nav.Link> 

					{/* CHOCIE OPTION */}
					<NavDropdown data-cy={menu.ADVANCED_CHOICES} title={menu.ADVANCED_CHOICES} id="basic-nav-dropdown">
						<NavDropdown.Item data-cy={menu.DATA_CY_CHOICE_SUB_DOCUMENTS} 
							onClick={(e) => handleClick(menu.CHOICE_SUBDOCUMENTS)}>
							{menu.CHOICE_SUBDOCUMENTS} 
						</NavDropdown.Item>
						<NavDropdown.Item data-cy={menu.DATA_CY_CHOICE_DOCUMENTS} 
							onClick={(e) => handleClick(menu.CHOICE_CLASSES)}>
							{menu.CHOICE_CLASSES} 
						</NavDropdown.Item> 
						<NavDropdown.Item onClick={(e) => handleClick(menu.ONE_OF)}>
							{menu.ONE_OF} 
						</NavDropdown.Item>
					</NavDropdown>

					{/* Sys */}
					<NavDropdown title={menu.SYS} id="basic-nav-dropdown">
						<NavDropdown.Item onClick={(e) => handleClick(menu.SYS_JSON)}>
							{menu.SYS_JSON}
						</NavDropdown.Item>
					</NavDropdown>
				
					{/* UI FRAMES OPTION */}
					<NavDropdown title={menu.UI_FRAMES} id="basic-nav-dropdown">
						<NavDropdown.Item onClick={(e) => handleClick(menu.BOOTSTRAP_CLASSES)}>
							{menu.BOOTSTRAP_CLASSES}
						</NavDropdown.Item>
						<NavDropdown.Item onClick={(e) => handleClick(menu.HIDE_UI)}>
							{menu.HIDE_UI}
						</NavDropdown.Item>
						<NavDropdown.Item onClick={(e) => handleClick(menu.WIDGETS_UI)}>
							{menu.WIDGETS_UI}
						</NavDropdown.Item>
					</NavDropdown>

					{/* GEO JSON OPTION */}
					<NavDropdown title={menu.GEO_JSON_DOCUMENT} id="basic-nav-dropdown">
						<NavDropdown.Item onClick={(e) => handleClick(menu.GEO_POINT)}>
							{menu.GEO_POINT}
						</NavDropdown.Item>
						<NavDropdown.Item onClick={(e) => handleClick(menu.GEO_LINE_STRING)}>
							{menu.GEO_LINE_STRING}
						</NavDropdown.Item>
						<NavDropdown.Item onClick={(e) => handleClick(menu.GEO_POLYGON)}>
							{menu.GEO_POLYGON}
						</NavDropdown.Item>
						<NavDropdown.Item onClick={(e) => handleClick(menu.GEO_MULTI_POLYGON)}>
							{menu.GEO_MULTI_POLYGON}
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">
							Geo Collection
						</NavDropdown.Item>
					</NavDropdown>

					{/** Diff Viewer */}
					<Nav.Link onClick={(e) => handleClick(menu.DIFF_VIEWER)}>{menu.DIFF_VIEWER}</Nav.Link> 

					{/** Multi Language */}
					<Nav.Link onClick={(e) => handleClick(menu.MULTI_LANGUAGE)}>{menu.MULTI_LANGUAGE}</Nav.Link>

				</Nav>
			</Navbar.Collapse>
		</Container>
  	</Navbar>
}
