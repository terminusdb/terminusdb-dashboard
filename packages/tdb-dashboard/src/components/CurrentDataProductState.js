import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import {BsFillExclamationTriangleFill, BsBriefcase} from "react-icons/bs"
import {printts} from "./utils"

/* returns current data product to which your connected and status */
export const ConnectedDataProduct = (props) => {

    const {
        woqlClient,
        saveSidebarState,
        sidebarStateObj,
        branch, chosenCommit
    } = WOQLClientObj()
    
    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()
    const [status, setStatus] = useState("text-success")
    const [currentCommit, setCurrentCommit] = useState("latest")

    useEffect(() => {
            if (chosenCommit && chosenCommit.time) {
                if(setCurrentCommit) setCurrentCommit(printts(chosenCommit.time))
                //if(setIconColor) setIconColor("#f39c12")
                if(setStatus) setStatus("text-warning")
            }
            else {
                if(setCurrentCommit) setCurrentCommit("latest")
                if(setStatus)setStatus("tdb__status_latest__version") 
            }
       
    }, [chosenCommit])

    function title (dataProduct) {
        return <span className="pro-item-content">Connected to <strong className="text-success">{dataProduct}</strong></span>
    }

    return <SubMenu title={title(dataProduct)}
        className="menu-title"
        defaultOpen={sidebarStateObj.sidebarDataProductConnectedState}
        onOpenChange={(e) => saveSidebarState("sidebarDataProductConnectedState",e)}
        >
        {(status == "text-warning") && <MenuItem >
            <span className="pro-item-content font-italic text-warning ml-3" > 
                <BsFillExclamationTriangleFill className="me-2 mr-3"/>
                This is not latest version   
            </span>
            </MenuItem>
        }
        <MenuItem className="sub-menu-title">
            <span className="pro-item-content"> 
                <strong className={`mr-1 ${status}`}> ● </strong>  {`on ${currentCommit} version`} 
            </span>
        </MenuItem>
        <MenuItem className="sub-menu-title">
            <span className="pro-item-content"> 
                <span className="badge bg-primary">
                    <h6 className="ml-1 mr-1 mt-1">
                        <BsBriefcase className="mr-1"/> {branch} 
                    </h6>
                </span>
            </span>
        </MenuItem>
    </SubMenu>
}