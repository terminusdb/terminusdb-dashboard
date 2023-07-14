import React, {useEffect, useState} from "react"
import {Row, Col, Card, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {Layout} from "./Layout"
//import {NewDatabaseModal} from "../components/NewDatabaseModal"
import {AiFillHdd} from "react-icons/ai"
//MAYBE WE CAN CREATE A VIEM MODE PAGE
export const DataProductsHomeSystem = (props) => {  
    const {woqlClient} = WOQLClientObj()
    if(!woqlClient) return  ''

    return <Layout showLeftSideBar={true}>
             <main className="content mr-3 ml-5">
                <Card className="h-100">
							<Card.Body>
								<Card.Title className="h5 fw-bold text-success">
                                <AiFillHdd size="2em"/> The System Database</Card.Title>
                                <Card.Text>
                                 This is the System Database in which resides all information regarding capabilities,
                                 users, organizations, databases and available actions.
                                </Card.Text>
							</Card.Body>
							<Card.Footer>
							</Card.Footer>
						</Card>
              </main>
            </Layout>
}
