import React, {useState} from "react"
import {Button, Dropdown,Nav} from 'react-bootstrap';
import {PROFILE,PLANS} from "../routing/constants"
import {NavLink as RouterNavLink} from "react-router-dom"
import {AiOutlineUser, AiOutlinePoweroff,AiOutlineUsergroupAdd} from "react-icons/ai"
import {FaExchangeAlt} from "react-icons/fa"
import {WOQLClientObj} from '../init-woql-client'

export const UserMenu = ({organization}) => {
    const { clientUser,accessControlDashboard} = WOQLClientObj()
    const redirect_uri=`${window.location.origin}/`
    
    function logoutLocalUser (evt) {
        localStorage.removeItem("Terminusdb-USER") 
        localStorage.removeItem("Terminusdb-KEY")
        const base = process.env.BASE_URL ? `/${process.env.BASE_URL}` : "/"
        window.location.replace(`${base}`) 
    }

    const logoutWithRedirect = () =>
        clientUser.logout({
            returnTo:redirect_uri
        })

    if(!clientUser || !accessControlDashboard) return ""
    const isAdmin = accessControlDashboard.isAdmin()

    const TEAM_USER_ROLES = "getTeamUserRoles"
    const DB_USER_ROLES = "getDatabaseUserRoles"

    function displayUserRoles (methodName){      
        const rolesArr = accessControlDashboard[methodName]()
        if(!rolesArr)return ""
        const roles = rolesArr.map((item, index)=> {
            return <span className ="text-dark ml-1 badge badge-info" key={`{key__${index}}`}>{item.name}</span>
        })
        return  <React.Fragment>
                    <div className="mr-3 dropdown text-success pr-3">{roles} </div>
                </React.Fragment>
    }


    if(clientUser.connection_type==="LOCAL"){
            return <React.Fragment>
                    <Dropdown className="mr-4" id="profile_menu">
                    <Button size="sm" className="bg-transparent border-0">
                    {clientUser.email}
                    </Button>
                    <Dropdown.Toggle split className="bg-transparent border-0" id="profile_menu_arrow">
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                       {clientUser.user === "admin" && <Dropdown.Item>
                            <Nav.Link  as={RouterNavLink}
                                title={"View Team Members"}  
                                to={`/administrator`}                    
                                id={"team_members"}>
                                    <AiOutlineUsergroupAdd className="mr-3 mb-1" />User Managment 
                            </Nav.Link>
                        </Dropdown.Item>}
                        <Dropdown.Item onClick={logoutLocalUser} >
                            <AiOutlinePoweroff className="mr-3 mb-1" />
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              {displayUserRoles(TEAM_USER_ROLES)}
              {displayUserRoles(DB_USER_ROLES)}
            </React.Fragment>
    }

    return <React.Fragment>
            <Dropdown className="mr-4" id="profile_menu">
                <Button size="sm" className="bg-transparent border-0">
                <img src={clientUser.picture}
                        alt={"Profile"}
                        className="nav__main__profile__img"
                        width="50"/>
                </Button>
                <Dropdown.Toggle split className="bg-transparent border-0"  id="profile_menu_arrow">
                </Dropdown.Toggle>
                <Dropdown.Menu >
               <Dropdown.Item>
                    <Nav.Link  as={RouterNavLink}
                        title={"View Profile Page"}  
                        to={`/${PLANS}`} 
                        
                        id={"plans"}>
                            <AiOutlineUser className="mr-3 mb-1" />Subscription
                    </Nav.Link>
                </Dropdown.Item>
                {organization && <Dropdown.Item>
                    <Nav.Link  as={RouterNavLink}
                        title={"View Profile Page"}  
                        to={`/${organization}/${PROFILE}`} 
                        
                        id={"profile"}>
                            <AiOutlineUser className="mr-3 mb-1" />Profile
                    </Nav.Link>
                </Dropdown.Item>}
                {organization && isAdmin && <Dropdown.Item>
                    <Nav.Link  as={RouterNavLink}
                        title={"View Team Members"}  
                        to={`/${organization}/administrator`} 
                        
                        id={"team_members"}>
                            <AiOutlineUsergroupAdd className="mr-3 mb-1" />Team Members
                    </Nav.Link>
                </Dropdown.Item> }
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Nav.Link  
                        title={"Logout"}  
                        
                        onClick={(e) => logoutWithRedirect()}
                        id={"logout"}>
                            <AiOutlinePoweroff className="mr-3 mb-1" />Logout
                    </Nav.Link>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        {displayUserRoles(TEAM_USER_ROLES)}
        {displayUserRoles(DB_USER_ROLES)}
    </React.Fragment>
}


