import React, {useEffect, useState} from "react"
import {Button, Dropdown} from 'react-bootstrap';
import {Nav,Navbar} from "react-bootstrap"
import {NewDataProduct} from "./NewDataProduct"
import {TimeTravelWidget} from "./TimeTravelWidget"
import {WOQLClientObj} from '../init-woql-client'
import {DATA_PRODUCTS} from "../routing/constants"
import { UserMenu } from "./UserMenu";
import { sortAlphabetically } from "./utils";
import {useNavigate,useParams,useLocation} from "react-router-dom"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
import { BlockPicker } from "react-color";

export const CollpaseButton = ({ setCollapseSideBar, collapseSideBar }) => {

    const style = {
        userSelect: "none",
        zIndex: 99999,
        boxSizing: "border-box",
        appearance: "none",
        position: "absolute",
        display: "inline-flex",
        webkitBoxAlign: "center",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "middle",
        alignSelf: "center",
        textDecoration: "none",
        fontWeight: 500,
        /* margin: 0px; */
        top: "50%",
        borderRadius: "9999px",
        webkitBoxPack: "center",
        justifyContent: "center",
        boxShadow:"rgba(0, 0, 0, 0.05) 0px 2px 4px",
        /* top: 80px; */
        left: "19.5rem",
        fontSize: "12px",
        lineHeight: "16px",
        height: "24px",
        minWidth: "24px",
        color: "rgb(77, 86, 121)",
        backgroundColor: "#f1d7f0",
        border: "1px solid rgb(208, 213, 231) !important",
        padding: "0px !important"
    }

    const hiddenStyle = {
        display: "block",
        zIndex: 99999,
    }
    return <Button //className="btn-btn-lg bg-transparent border border-0 ml-3"
        variant="dark"
        style={collapseSideBar ? hiddenStyle : style}
        title={collapseSideBar ? "Show Sidebar" : "Hide Sidebar" }
        onClick={(e) => setCollapseSideBar(!collapseSideBar)}>
        {collapseSideBar && <HiChevronDoubleRight size={20}/>}
        {!collapseSideBar && <HiChevronDoubleLeft size={20}/>}
    </Button> 
} 

export const MainNavBar = ({setShowTimeTravel, changeRequestHolder, showLeftSideBar}) => {

    const {woqlClient,changeOrganization,accessControlDashboard,clientUser, collapseSideBar, 
        setCollapseSideBar} = WOQLClientObj()
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
        {/*showLeftSideBar && <CollpaseButton setCollapseSideBar={setCollapseSideBar} collapseSideBar={collapseSideBar}/>*/}
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

