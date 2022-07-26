import React  from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {IconBar} from './IconBar'
import SplitPane from 'react-split-pane'
import {MainNavBar} from './MainNavBar'
//import {DatabaseCard}  from './DatabaseCard'

export function MainLayout(props){
    return <Container fluid className="p-0 flex-row">                              
                <SplitPane split="vertical" minSize={70} defaultSize={350} primary="first">                                                    
                    <div className="side-black h-100 d-flex">
                      <IconBar />
                      {props.sideBarContent}
                    </div>
                    <div className="h-100">
                      <MainNavBar/>
                      {props.children}                                       
                    </div>
                </SplitPane>
            </Container>




}
