import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { LEGO, STARWARS } from "./constants"

export const NavBar = ({}) => {
  return  <Nav
		activeKey={LEGO}
    className="mt-5 mb-3"
		onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
	>
		<Nav.Item>
			<Nav.Link eventKey={LEGO}>{LEGO}</Nav.Link>
		</Nav.Item>
		<Nav.Item>
			<Nav.Link eventKey={STARWARS}>{STARWARS}</Nav.Link>
		</Nav.Item>
	</Nav>
}