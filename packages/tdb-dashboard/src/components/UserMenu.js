import React from "react"
import {Button, Dropdown,Nav} from 'react-bootstrap';
import {PROFILE,TEAM_MEMBERS} from "../routing/constants"
import {NavLink as RouterNavLink} from "react-router-dom"
import {AiOutlineUser, AiOutlinePoweroff,AiOutlineUsergroupAdd} from "react-icons/ai"
import {WOQLClientObj} from '../init-woql-client'

export const UserMenu = ({organization}) => {
    const { clientUser } = WOQLClientObj()
    const redirect_uri=`${window.location.origin}/`
    const logoutWithRedirect = () =>
        clientUser.logout({
            returnTo:redirect_uri
        })

    if(!clientUser) return ""

    if(clientUser.connection_type==="LOCAL"){
        return <Dropdown className="mr-4" id="profile_menu">
        <Button size="sm" className="bg-transparent border-0">
          User: {clientUser.user}
        </Button>
        <Dropdown.Toggle split className="bg-transparent border-0" vairant="info" id="profile_menu_arrow">
        </Dropdown.Toggle>
        <Dropdown.Menu >
            <Dropdown.Item>
                <Nav.Link  as={RouterNavLink}
                    title={"View Team Members"}  
                    to={`/${organization}/administrator`} 
                    exact
                    id={"team_members"}>
                        <AiOutlineUsergroupAdd className="mr-3 mb-1" />User Managment 
                </Nav.Link>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    }



    return <Dropdown className="mr-4" id="profile_menu">
            <Button size="sm" className="bg-transparent border-0">
              <img src={clientUser.picture}
                    alt={"Profile"}
                    className="nav__main__profile__img"
                    width="50"/>
            </Button>
            <Dropdown.Toggle split className="bg-transparent border-0" vairant="info" id="profile_menu_arrow">
            </Dropdown.Toggle>
            <Dropdown.Menu >
            <Dropdown.Item>
                <Nav.Link  as={RouterNavLink}
                    title={"View Profile Page"}  
                    to={PROFILE} 
                    exact
                    id={"profile"}>
                        <AiOutlineUser className="mr-3 mb-1" />Profile
                </Nav.Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Nav.Link  as={RouterNavLink}
                    title={"View Team Members"}  
                    to={TEAM_MEMBERS} 
                    exact
                    id={"team_members"}>
                        <AiOutlineUsergroupAdd className="mr-3 mb-1" />Team Members
                </Nav.Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
                <Nav.Link  
                    title={"Logout"}  
                    exact
                    onClick={(e) => logoutWithRedirect()}
                    id={"logout"}>
                        <AiOutlinePoweroff className="mr-3 mb-1" />Logout
                </Nav.Link>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
}