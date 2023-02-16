import {DocumentControlProvider} from "../hooks/DocumentControlContext"
import { Outlet } from 'react-router-dom'
import React from 'react'

export const DocumentControlMain = (props) => {
    return <DocumentControlProvider >
            <Outlet/>   
        </DocumentControlProvider>
}