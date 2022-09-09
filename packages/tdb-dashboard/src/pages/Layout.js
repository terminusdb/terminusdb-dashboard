import React, {useState} from 'react'
import {Container} from "react-bootstrap"
import {MainNavBar} from '../components/MainNavBar'
import SplitPane from 'react-split-pane'
import {IconBar} from "../components/IconBar"
import {TimeTravelContainer} from "../components/TimeTravelContainer"
import {Feedback} from "./Feedback"
import history from "../routing/history"
import {DATA_PRODUCTS} from "../routing/constants"
import { Outlet,useParams } from 'react-router-dom'
import {LeftSideBar} from '../components/LeftSideBar'

export const Layout = (props) => {
    const { organization, dataProduct } = useParams();

    const [showTimeTravel, setShowTimeTravel] = useState(false)
    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
    
    return <Container fluid className="p-0 flex-row">
            <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first" allowResize={false}>
                <div className="side-black h-100 d-flex">
                    <IconBar setShowFeedbackForm={setShowFeedbackForm} />
                    {organization && <LeftSideBar/>}
                    <div style={{position: "relative"}}>
                        {showFeedbackForm && <Feedback setShowFeedbackForm={setShowFeedbackForm}/>}
                    </div>
                </div>
                
                <div className="main-content h-100">                      
                    <MainNavBar setShowTimeTravel={setShowTimeTravel}/>
                    <div className="container-fluid " >
                        { dataProduct  && <TimeTravelContainer dataProduct={dataProduct} show={showTimeTravel} setShowTimeTravel={setShowTimeTravel}/>}                          
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
