import React, {useState,useEffect} from 'react'
import {Container,Alert, Button} from "react-bootstrap"
import Badge from "react-bootstrap/Badge"
import {MainNavBar} from '../components/MainNavBar'
import SplitPane from 'react-split-pane'
import {IconBar} from "../components/IconBar"
import {TimeTravelContainer} from "../components/TimeTravelContainer"
import {Feedback} from "./Feedback"
import {DATA_PRODUCTS} from "../routing/constants"
import { Outlet,useParams, useNavigate } from 'react-router-dom'
import {LeftSideBar} from '../components/LeftSideBar'
import {WOQLClientObj} from '../init-woql-client'
import {SubmitChangeRequestModal} from '../components/SubmitChangeRequestModal'
import {BiGitBranch} from 'react-icons/bi'
import {ChangeRequestComponent} from "../components/ChangeRequestComponent"
import * as path from "../routing/constants"
import {ConnectedDataProduct} from "../components/CurrentDataProductState"

 
// returns a help text depending on which page you are while in a Change Request Mode
function GetHelpText () {
    let { getLocation } = WOQLClientObj()
    let location = getLocation()

    if(location.page === path.PRODUCT_MODELS) {
        return <div className="ml-5 small text-warning fst-italic">
            If you wish to alter the schema, click on Exit from Change Request mode button.
            Modifying schema is only allowed in main.
        </div>
    }

    return <div/>
}
  
export const Layout = (props) => { 
    const {branch,exitChangeRequestBranch,currentChangeRequest,currentCRName,currentCRStartBranch, collapseSideBar, 
        setCollapseSideBar} = WOQLClientObj()
    const { organization, dataProduct } = useParams();

    const noChange = window.location.pathname.indexOf("change_requests")=== -1 ? true : false

    const [showTimeTravel, setShowTimeTravel] = useState(false)
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
    const [showModal,setShowModal] = useState(false)
    

    // const [defaultSize, setDefaultSize]=useState(false)

    const navigate = useNavigate()
    const mainClassName = props.mainClassName || "mt-4 container-fluid"
    
    const updateParent = () =>{
        exitChangeRequestBranch(currentCRStartBranch)
        navigate(`/${organization}/${dataProduct}/change_requests?status=Submitted`)
    }

    const closeChangeRequest = () =>{
        exitChangeRequestBranch(currentCRStartBranch)
        navigate(`/${organization}/${dataProduct}`)
    }

    const showLeftSideBar = props.showLeftSideBar === false ? false : true
    const defaultSize = showLeftSideBar ? 340 : 70

    const changeRequestHolder = () =>{
        if(dataProduct && currentChangeRequest){
            return <ChangeRequestComponent currentCRStartBranch={currentCRStartBranch} currentChangeRequest={currentChangeRequest} closeChangeRequest={closeChangeRequest} currentCRIdentifier={currentCRName || branch} setShowModal={setShowModal}/>
         
        }
        return <ConnectedDataProduct/>
    }   
    
    const headerElement = dataProduct ? changeRequestHolder() : ""

   
    function getMainNavClassName(collapseSideBar) {
        if(collapseSideBar) return `expanded__main__content`
        return ``
    }

    return <Container fluid className="p-0 flex-row">
        {showModal && <SubmitChangeRequestModal updateChangeRequestID={currentChangeRequest} showModal={showModal} setShowModal={setShowModal} updateParent={updateParent}/>}            

        <SplitPane split="vertical" 
            minSize={70} 
            defaultSize={defaultSize} primary="first" allowResize={false}>
            <div className="side-black h-100 d-flex" >
                <IconBar setShowFeedbackForm={setShowFeedbackForm} />
                {organization && showLeftSideBar && <LeftSideBar/>}
                <div style={{position: "relative"}}>
                    {showFeedbackForm && <Feedback setShowFeedbackForm={setShowFeedbackForm}/>}
                </div>
            </div>              
            <div className={` main-content h-100 ${getMainNavClassName(collapseSideBar)}`}>                      
                <MainNavBar setShowTimeTravel={setShowTimeTravel} 
                    changeRequestHolder={headerElement}
                    collapseSideBar={collapseSideBar} 
                    showLeftSideBar={showLeftSideBar}
                    setCollapseSideBar={setCollapseSideBar}/>
                <div className={`${mainClassName} `} >
                    {currentChangeRequest && <GetHelpText/>}
                    {/*dataProduct && noChange && <ChangeRequestComponent currentChangeRequest={currentChangeRequest} closeChangeRequest={closeChangeRequest} branch={branch} setShowModal={setShowModal}/>*/}
                    { dataProduct  && <TimeTravelContainer show={showTimeTravel} setShowTimeTravel={setShowTimeTravel}/>}                          
                    {props.children}
                </div>
            </div> 
        </SplitPane>
    </Container>
}

/*
 {list.length>0 && !dataProduct && currentPage!== TEAM_MEMBERS && <NoDataProductSelected/>}
                                {showNoDataProduct && <NoDataProductsCreated organization={organization}/>}

                                {(dataProduct || currentPage === PROFILE ||  currentPage === TEAM_MEMBERS || currentPage === '/document') && props.children}
                                { dataProduct  && <TimeTravelContainer show={showTimeTravel} setShowTimeTravel={setShowTimeTravel}/>}
                               */
