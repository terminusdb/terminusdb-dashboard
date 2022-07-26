import React from "react"
import {NoDataProductSelected} from "../components/NoDataProductSelected"
import { Layout } from "./Layout"

export const OrganizationHome = () => {
    return <Layout>
                <main role="main" className="content w-100">
                    <NoDataProductSelected/>
                </main>
            </Layout>
     
}