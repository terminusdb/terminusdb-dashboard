import React from "react"
import {DocumentView} from "../components/DocumentView"
import {DocumentControlProvider} from "../hooks/DocumentControlContext"
import { Layout } from "./Layout"
import { Outlet } from 'react-router-dom'

export const DocumentTemplate = (props) => {
    return <DocumentControlProvider>
            <Layout >
                <main role="main" className="content mr-3 ml-5">
                    <Outlet/>
                </main>
            </Layout>
        </DocumentControlProvider>
}