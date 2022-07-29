import React from "react"
import {QueryView} from "../components/QueryView"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import { Layout } from "./Layout"
import {WOQLClientObj} from '../init-woql-client'

export const ProductsExplorer = (props) => {
    const {woqlClient,newQueryPanelQuery} = WOQLClientObj()

    return <QueryPaneProvider woqlClient={woqlClient} newQueryPanelQuery={newQueryPanelQuery}>
                <Layout>
                    <main role="main" className="content mr-3 ml-5">              
                        <QueryView/>           
                    </main>
                </Layout>
            </QueryPaneProvider>
}


