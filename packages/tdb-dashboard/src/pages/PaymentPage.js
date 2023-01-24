import React from "react"
import MyStoreCheckout from "../payment/MyStoreCheckout"
import { Layout } from "./Layout"
import {WOQLClientObj} from '../init-woql-client'

export const PaymentPage = (props) => {
    const {woqlClient} = WOQLClientObj()
    if(!woqlClient) return ""

    return <Layout>
                <main role="main" className="content mr-3 ml-5">              
                    <MyStoreCheckout defaultEmail= {woqlClient.user()} accessToken={woqlClient.localAuth().jwt}/>           
                </main>
            </Layout>}
