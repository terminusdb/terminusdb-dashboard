import React from "react"
import {Button, Dropdown} from 'react-bootstrap';
import {Nav,Navbar} from "react-bootstrap"
import {NewDataProduct} from "./NewDataProduct"
import {TimeTravelWidget} from "./TimeTravelWidget"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"
import history from "../routing/history"
import { UserMenu } from "./UserMenu";
import {useNavigate,useParams} from "react-router-dom"
import {ChangeUser} from "./ChangeUser"

export const MainNavBar = ({setShowTimeTravel}) => {
    const {woqlClient,changeOrganization,accessControlDashboard,clientUser} = WOQLClientObj()
    if(!clientUser || !woqlClient) return ""
    //we don't need setRoute
    const { organization, dataProduct } = useParams();
    const currentPage = history.location.pathname

    let navigate = useNavigate();
    function changeOrganizationHandler(orgName) {
        navigate(`/${orgName}`)
        changeOrganization(orgName)         
    }

    return <Navbar className="navbar-dark bg-dark p-0 sticky-top main-navbar-shadow">           
        <div className="d-flex flex-grow-1 justify-content-end align-items-center">                    
            {dataProduct && currentPage!==DATA_PRODUCTS &&
            <React.Fragment>  
                <h4 className="text-success ml-4 flex-grow-1 fw-bold mt-1" >
                    {dataProduct}
                </h4>
                <TimeTravelWidget setShowTimeTravel={setShowTimeTravel}/>
            </React.Fragment> 
            }
            {accessControlDashboard && accessControlDashboard.createDB() &&
                <NewDataProduct css={"btn-sm"}/>
            }
            {clientUser.connection_type === "LOCAL" && <ChangeUser />}
            <Dropdown className="pl-3 pr-3 ml-3 mr-3 border-right border-left" id="team_list_menu">
                <Button size="sm" className="bg-transparent border-0" id="team_list_nenu_button">
                   {organization}
                </Button>
                <Dropdown.Toggle split className="bg-transparent border-0" vairant="info">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {woqlClient && woqlClient.userOrganizations().map(element=>{
                    return  <Dropdown.Item id={`menu_${element['name']}`}  key={`menu_${element['name']}`} onClick={(e) => changeOrganizationHandler(element['name'])}>
                           
                           {element['name']}
                        
                        </Dropdown.Item>
                })}
                </Dropdown.Menu>
            </Dropdown>           
           <UserMenu organization={organization}/>
        </div>   
    </Navbar>
}

