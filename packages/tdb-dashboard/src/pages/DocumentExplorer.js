
import React from "react"
import {DocumentView} from "../components/DocumentView"
import {DocumentControlProvider} from "../hooks/DocumentControlContext"
import { Layout } from "./Layout"
export const DocumentExplorer = (props) => {

    return <DocumentControlProvider>
            <Layout >
                <main role="main" className="content mr-3 ml-5">
                    <DocumentView/>
                </main>
            </Layout>
        </DocumentControlProvider>
}