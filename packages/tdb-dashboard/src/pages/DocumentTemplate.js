import React, { useState } from "react"
import { Layout } from "./Layout"
import { Outlet } from 'react-router-dom'
export const DocumentTemplate = (props) => {
   
    return <Layout >
            <main role="main" className="content ml-5 mr-5 mb-5 d-flex flex-column">
                <Outlet/> 
            </main>
        </Layout>
}