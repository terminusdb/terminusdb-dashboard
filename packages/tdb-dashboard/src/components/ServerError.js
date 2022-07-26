import React from "react"
import {Col} from "react-bootstrap"
import {NoDataProductSelectedStyle} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import { ChangeUser } from "./ChangeUser"

export const ServerError = (props) => {
    const {clientUser } = WOQLClientObj()
    const serverType = clientUser ? clientUser.serverType : "TerminusX"

    return <div style={NoDataProductSelectedStyle}>
        <Col xs={12} className="text-center d-block align-items-center justify-content-center">        
         <div className="card card-fil m-5 p-5">
            <h4 className="text-muted mt-5 mb-3">
                <p>Connection Server Error</p>
                <p>{props.children}</p>
                <a href="https://discuss.terminusdb.com/" targert="_blank">
                    {`Please contact the ${serverType} Team`}
                </a>
            </h4>
            {clientUser && clientUser.logout &&
                <button title="Create New Data Product" type="button"  onClick={()=>{ clientUser.logout()}}
                    className="mr-auto ml-auto pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info">Logout</button>
            }
            {clientUser && clientUser.connection_type ==="LOCAL" &&
                <div>
                    <ChangeUser/>
                </div>
            }
        </div>
    </Col>
    </div>
}