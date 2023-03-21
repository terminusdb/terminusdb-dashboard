import React from "react"
import { Layout } from "./Layout"
import { Outlet } from 'react-router-dom'
import {ViewDocumentFrames} from "../components/ViewDocumentFrames"

export const DocumentTemplate = (props) => {
    return <Layout >
            <main role="main" className="content ml-5 mr-5 mb-5 d-flex">
                <Outlet/> 
            </main>
        </Layout>
}