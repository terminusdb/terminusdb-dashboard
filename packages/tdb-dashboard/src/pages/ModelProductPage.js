import React from "react"
import {ModelBuilder} from "./ModelBuilder"
import { Layout } from "./Layout"
export const ModelProductPage = () => {
    return <Layout>
                <main role="main" className="content w-100">
                    <ModelBuilder/>
                </main>
            </Layout>
     
}