import React from "react"
import {Col} from "react-bootstrap"
import {NoDataProductSelectedStyle, NO_DATA_PRODUCT_SELECTED_MESSAGE} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import { NoDataProductsCreated } from "./NoDataProductsCreated"
// tean home page
export const NoDataProductSelected = (props) => { 
    const {woqlClient,accessControlDashboard} = WOQLClientObj()

    let list = woqlClient ? woqlClient.databases() : []

    const createdb = accessControlDashboard ? accessControlDashboard.createDB() : false
    const showNoDataProduct = createdb && list.length===0 ? true : false

    return <React.Fragment>
        {! showNoDataProduct && <div style={NoDataProductSelectedStyle}>
            {props.children}
            <Col xs={12} className="text-center d-block align-items-center justify-content-center">
                <img src="../assets/favicon-dark.png" style={{width: "10%"}}/>
                <h1 className="text-dark mt-5">
                    {NO_DATA_PRODUCT_SELECTED_MESSAGE}
                </h1>
            </Col>
            </div>}
        {showNoDataProduct && <NoDataProductsCreated/>}
    </React.Fragment> 
}