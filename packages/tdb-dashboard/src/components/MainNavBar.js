import React, {useEffect} from "react"
import {Button, Dropdown} from 'react-bootstrap';
import {Nav,Navbar} from "react-bootstrap"
import {NewDataProduct} from "./NewDataProduct"
import {TimeTravelWidget} from "./TimeTravelWidget"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"
import { UserMenu } from "./UserMenu";
import { sortAlphabetically } from "./utils";
import {useNavigate,useParams,useLocation} from "react-router-dom"

export const MainNavBar = ({setShowTimeTravel, changeRequestHolder}) => {
    const {woqlClient,changeOrganization,accessControlDashboard,clientUser} = WOQLClientObj()
    if(!clientUser || !woqlClient) return ""
    //we don't need setRoute
    const { organization, dataProduct } = useParams();
    const currentPage = useLocation().pathname

    let navigate = useNavigate();
    function changeOrganizationHandler(orgName) {
        navigate(`/${orgName}`)
        changeOrganization(orgName)         
    }

    // sort list in alphabetical order
    const teamList = sortAlphabetically (woqlClient ? woqlClient.userOrganizations() : []) 

    return <Navbar className="navbar-dark bg-dark p-0 sticky-top main-navbar-shadow">           
        <div className="d-flex flex-grow-1 ">                    
            {dataProduct && currentPage!==`/${organization}/${dataProduct}` &&
            <React.Fragment>  
                <h4 className="text-success ml-5 pl-3 flex-grow-1 fw-bold mt-2" >
                    {dataProduct}
                </h4>
            </React.Fragment>   
           }
            
            <div className="justify-content-end w-100 d-flex align-items-center">
                {changeRequestHolder && changeRequestHolder}
                {dataProduct && currentPage!==`/${organization}/${dataProduct}` &&
                    <TimeTravelWidget setShowTimeTravel={setShowTimeTravel}/>}
                {/*accessControlDashboard && accessControlDashboard.createDB() && 
                    <NewDataProduct css={"btn-sm mr-1 pt-2 pr-4 pl-4 "}/>
                */}
                <Dropdown className="pl-3 pr-3 ml-3 mr-3 border-right border-left" id="team_list_menu">
                    <Button size="sm" className="bg-transparent border-0" id="team_list_menu_button">
                    {organization}
                    </Button>
                    <Dropdown.Toggle split className="bg-transparent border-0" vairant="info">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {teamList.map(element=>{
                        return  <Dropdown.Item id={`menu_${element['name']}`}  key={`menu_${element['name']}`} onClick={(e) => changeOrganizationHandler(element['name'])}>
                            
                            {element['name']}
                            
                            </Dropdown.Item>
                    })}
                    </Dropdown.Menu>
                </Dropdown>           
            <UserMenu organization={organization}/>
           </div>
        </div>   
    </Navbar>
}

