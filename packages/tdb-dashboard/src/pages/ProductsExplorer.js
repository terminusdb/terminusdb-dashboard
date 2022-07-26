import React from "react"
import {QueryView} from "../components/QueryView"
import {QueryPaneProvider} from "../hooks/queryPaneContext"
import { Layout } from "./Layout"
export const ProductsExplorer = () => {
    return <QueryPaneProvider>
                <Layout>
                    <main role="main" className="content mr-3 ml-5">              
                        <QueryView/>              
                    </main>
                </Layout>
            </QueryPaneProvider>
}


