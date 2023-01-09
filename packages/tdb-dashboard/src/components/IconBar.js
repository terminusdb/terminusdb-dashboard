import React  from "react"
import {Nav,Navbar} from "react-bootstrap"
import { NavLink as RouterNavLink, useResolvedPath , useMatch} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"

import {IconBarConfig} from  "./constants" 
import {useParams} from 'react-router-dom'

export const IconBar =  ({setShowFeedbackForm}) => {
    const { organization, dataProduct } = useParams();

    let disabled =  {disabled:true} 
    let  basecss = "disabled"
    if(dataProduct && dataProduct!=='_system'){
        disabled={}
        basecss = ""
    }

    const getUrl = (pageName)=> {
        return  `/${organization}/${dataProduct}/${pageName}`
    }

    const toHomeTeam = `/${organization}/${dataProduct}`
    //fix navigation path 
    let resolved = useResolvedPath(toHomeTeam);
    let match = useMatch({ path: resolved.pathname, end: true });

    function getActive (){
        return match ? `nav-icon nav-product-model nav-link active` : `nav-icon nav-product-model nav-link ${basecss}`
    }

 
    return <Navbar fixed expand={false} className="pt-2 navbar navbar-dark bg-dark h-100 nav-icon-bar">
        <Nav defaultActiveKey={IconBarConfig.dataProductView.key} className="flex-column">
            <Nav.Item >
                <Nav.Link 
                    as={RouterNavLink}
                    to={`/`}
                    className="nav-icon bg-transparent"                  
                    >
                    {IconBarConfig.logo.img}                
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3" role="separator"></hr>       
            <Nav.Item>
            <RouterNavLink
                to={toHomeTeam} 
                className={getActive}
                {...disabled}
                id={"HOME"}>
                     {IconBarConfig.dataProductView.icon}    
            </RouterNavLink> 
            </Nav.Item>      
            <Nav.Item>
                <Nav.Link  
                    as={RouterNavLink}
                    title={IconBarConfig.dataProductModal.title}  
                    className="nav-icon nav-product-model" 
                    {...disabled}
                    to={getUrl(IconBarConfig.dataProductModal.path)} 
                    
                    id={IconBarConfig.dataProductModal.key}>
                    {IconBarConfig.dataProductModal.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  
                    as={RouterNavLink}
                    title={IconBarConfig.documentExplorer.title} 
                    className="nav-icon nav-document-expolorer" 
                    {...disabled}
                    to={getUrl(IconBarConfig.documentExplorer.path)} 
                    
                    id={IconBarConfig.documentExplorer.key}>
                    {IconBarConfig.documentExplorer.icon}
                </Nav.Link>
            </Nav.Item>
          <Nav.Item>
                <Nav.Link  as={RouterNavLink}
                    title={IconBarConfig.dataProductExplorer.title} 
                    className="nav-icon nav-product-expolorer" 
                    {...disabled}
                    to={getUrl(IconBarConfig.dataProductExplorer.path)} 
                    
                    id={IconBarConfig.dataProductExplorer.key}>
                    {IconBarConfig.dataProductExplorer.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={RouterNavLink}
                    title={IconBarConfig.graphiql.title} 
                    className="nav-icon nav-product-expolorer" 
                    {...disabled}
                    to={getUrl(IconBarConfig.graphiql.path)} 
                    
                    id={IconBarConfig.graphiql.key}>
                    {IconBarConfig.graphiql.icon}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  as={RouterNavLink}
                    title={IconBarConfig.changes.title} 
                    className="nav-icon nav-product-expolorer" 
                    {...disabled}
                    to={getUrl(IconBarConfig.changes.path)} 
                    
                    id={IconBarConfig.changes.key}>
                    {IconBarConfig.changes.icon}
                </Nav.Link>
            </Nav.Item>
            <hr className="my-3" role="separator"></hr>
            <div className="nav-icons-bottom">
                <hr className="my-3" role="separator"></hr>
                <div onClick={(e) => setShowFeedbackForm(true)}
                    className="nav-item"
                    style={{cursor: "pointer"}}>
                    <span className="nav-icon nav-link">
                        <AiOutlineMail size={24}/>
                    </span>
                </div>
                {/*<Nav.Item className="mb-4"> 
                    <Nav.Link as={RouterNavLink} 
                        title={IconBarConfig.feedback.title} 
                        className="nav-icon"
                        onClick={(e) => setShowFeedbackForm(true)}
                        id={IconBarConfig.feedback.key}
                        >
                        {IconBarConfig.feedback.icon}
                    </Nav.Link>
                </Nav.Item>*/}
                {/*<Nav.Item> // commenting this for now
                    <Nav.Link as={RouterNavLink} 
                        title={IconBarConfig.tutorials.title} 
                        className="nav-icon"
                        to={IconBarConfig.tutorials.path} 
                        
                        onClick={(e) => setRoute(IconBarConfig.tutorials.path)}
                        id={IconBarConfig.tutorials.key}
                        >
                        {IconBarConfig.tutorials.icon}
                    </Nav.Link>
                </Nav.Item>*/}
            </div>
        </Nav>            
   </Navbar>
}



