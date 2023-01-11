import React, {useState,useEffect} from 'react'
import {Container,Alert,Badge,Button} from "react-bootstrap"
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
  
export const Layout = (props) => {
    const {branch,setChangeRequestBranch} = WOQLClientObj()
    const { organization, dataProduct } = useParams();
    const [showTimeTravel, setShowTimeTravel] = useState(false)
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
    const [showModal,setShowModal] = useState(false)

    const [defaultSize, setDefaultSize]=useState(false)

    const navigate = useNavigate()
    const mainClassName = props.mainClassName || "container-fluid"
    
    const updateParent = () =>{
        setChangeRequestBranch("main" , null)
        navigate(`/${organization}/${dataProduct}/change_requests`)
    }

    useEffect(() => {
        if(organization) setDefaultSize(340)
    }, [organization])
    
    //defaultSize={340}
    return <Container fluid className="p-0 flex-row">
        {showModal && <SubmitChangeRequestModal showModal={showModal} setShowModal={setShowModal} updateParent={updateParent}/>}            
        <SplitPane split="vertical" minSize={70}  defaultSize={defaultSize} primary="first" allowResize={false}>
            <div className="side-black h-100 d-flex">
                <IconBar setShowFeedbackForm={setShowFeedbackForm} />
                {organization && <LeftSideBar/>}
                <div style={{position: "relative"}}>
                    {showFeedbackForm && <Feedback setShowFeedbackForm={setShowFeedbackForm}/>}
                </div>
            </div>              
            <div className="ml-1 main-content h-100">                      
                <MainNavBar setShowTimeTravel={setShowTimeTravel}/>
                <div className={mainClassName} >
                    {branch && branch !== "main" &&
                        <Alert variant="secondary" className="m-5 d-flex"> 
                            <span>
                                    <small className="fw-bold mr-2">You are in change request mode</small>
                                    <BiGitBranch className="text-muted mr-2"/>
                                    <Badge bg="success" className="fw-bold mr-2">{branch}</Badge>
                                </span>
                                <Button className="ml-auto bg-light text-dark btn-sm" onClick={()=>{setShowModal(true)}}>
                                    <small className="fw-bold">Submit your change request for revision</small>
                                </Button>   
                        </Alert>
                        }  
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
