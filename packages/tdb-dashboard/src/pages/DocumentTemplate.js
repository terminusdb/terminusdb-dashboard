import React from "react"
import {DocumentControlProvider} from "../hooks/DocumentControlContext"
import { Layout } from "./Layout"
import { Outlet } from 'react-router-dom'
import {ViewDocumentFrames} from "../components/ViewDocumentFrames"

export const DocumentTemplate = (props) => {
    return <DocumentControlProvider>
        <Layout >
            <main role="main" className="content ml-5 mr-5 mb-5 d-flex">
                <Outlet/> 
                {<ViewDocumentFrames/>}
            </main>
        </Layout>
    </DocumentControlProvider>
}