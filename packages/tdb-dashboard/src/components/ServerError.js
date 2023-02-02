import React from "react"
import {Col,Button} from "react-bootstrap"
import {NoDataProductSelectedStyle} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import { ChangeUser } from "./ChangeUser"

export const ServerError = (props) => {
    const {clientUser } = WOQLClientObj()
    const serverType = clientUser ? clientUser.serverType : "TerminusCMS"

    const gotoMainPage= ()=>{
        const base = process.env.BASE_URL ? `/${process.env.BASE_URL}` : "/"
        window.location.replace(`${base}`)
    }

    let returnToMainPage = false 
    if(props.message.startsWith("There is no organization with the name")){
        returnToMainPage=true
    }

    return <div style={NoDataProductSelectedStyle}>
        <Col xs={12} className="text-center d-block align-items-center justify-content-center">        
         <div className="card card-fil m-5 p-5">
            <h4 className="text-white mt-5 mb-3">
                <p>{props.message}</p>
                {<Button id="go_to_team_list" variant="info" className={`mr-1 ml-1 pt-2 pb-2 pr-4 pl-4 btn `}   title="Go to the team list" onClick={gotoMainPage}>
                    Go to Teams
                </Button>}
                {clientUser.connection_type !=="LOCAL" &&
                    <a href="https://www.reddit.com/r/TerminusDB/" targert="_blank">
                        {`Please contact the ${serverType} Team`}
                    </a>
                }      
            </h4>
            {clientUser && clientUser.logout &&
                <button title="Create New Data Product" type="button"  onClick={()=>{ clientUser.logout()}}
                    className="mr-auto ml-auto pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info">Logout</button>
            }
        </div>
    </Col>
    </div>
}