import React from "react"
import { Outlet } from 'react-router-dom'

export const DocumentTemplate = (props) => {
    return <main role="main" className="content my-5 mx-5 md-flex flex-column">
                <Outlet/> 
           </main>
}