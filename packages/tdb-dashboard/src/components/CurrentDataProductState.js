import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import { Badge } from "react-bootstrap"
import 'react-pro-sidebar/dist/css/styles.css'
import {BsFillExclamationTriangleFill, BsBriefcase} from "react-icons/bs"
import {BiGitBranch} from "react-icons/bi"
import {printts} from "./utils"
import { CURRENT_BRANCH_BADGE } from "../cypress.constants"
import { BranchBadge } from "./BranchBadge"

/* returns current data product to which your connected and status */
export const ConnectedDataProduct = (props) => {

    const {
        woqlClient,
        saveSidebarState,
        sidebarStateObj,
        branch, 
        getLocation,
        chosenCommit
    } = WOQLClientObj()
    
    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()
    const [status, setStatus] = useState("text-success")
    const [currentCommit, setCurrentCommit] = useState("on latest version")

    useEffect(() => {
            if (chosenCommit && chosenCommit.time) {
                if(setCurrentCommit) setCurrentCommit("")//printts(chosenCommit.time))
                //if(setIconColor) setIconColor("#f39c12")
                if(setStatus) setStatus("text-warning")
            }
            else {
                if(setCurrentCommit) setCurrentCommit("on latest version")
                if(setStatus)setStatus("tdb__status_latest__version") 
            }
       
    }, [chosenCommit])
 
    function title (dataProduct) {
        return <span className="pro-item-content">Connected to <strong className="text-success">{dataProduct}</strong></span>
    }

    return <React.Fragment>{(status == "text-warning") &&
            <span className="pro-item-content font-italic text-warning mr-3" > 
                <BsFillExclamationTriangleFill className="me-2 mr-3"/>
                This is not the latest version   
            </span>
            
        }
        
            <span className="pro-item-content"> 
                {/*<strong className={`mr-1 ${status}`}> ● </strong>  {currentCommit} */}
                {currentCommit}
               
            </span>
            <BranchBadge branchName={branch} 
                variant={"success"} 
                className={"ml-2 mt-2"} 
                dataCy={CURRENT_BRANCH_BADGE}/>
           {/* <Badge bg="success" className="ml-2 fw-bold mr-2 text-dark" data-cy={CURRENT_BRANCH_BADGE}>
                <BiGitBranch className="mr-1"/>
                {branch} 
            </Badge> */ }
                   
             
    </React.Fragment>
}

