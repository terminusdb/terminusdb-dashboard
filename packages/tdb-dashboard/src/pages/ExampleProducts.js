import React from "react"
import {Container, Card, CardGroup, Badge, Button} from "react-bootstrap"
import {LeftSideBar} from "../components/LeftSideBar"
import {Layout} from "./Layout"
import {WOQLClientObj} from '../init-woql-client'
import {FaClone} from "react-icons/fa"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CLONE_DATA_PRODUCT_CONFIG} from "../components/constants"
import {EXAMPLES_PRODUCTS} from "../routing/constants"

export const ExampleProducts = (props) => {
    const {setSelectedDataProduct} = WOQLClientObj()

    return <Layout sideBarContent={<LeftSideBar route={EXAMPLES_PRODUCTS}></LeftSideBar>}>
        <Container style={{marginTop: "125px"}}>
            <CardGroup>
                <Card className="mr-3">
                    <Card.Header as="h6" className="text-right bg-transparent border-0">
                        <Badge variant="secondary" title="For Beginners">Beginner</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img className="mb-4 example-data-product-card-img" variant="top" src="https://f.hubspotusercontent00.net/hub/8481758/hubfs/Terminous%20Email%20Image/cycle-image.png?width=549&quality=low" />
                        <Card.Title>Bikes</Card.Title>
                        <Card.Text className="text-muted">
                            A simple data product about bike journeys between stations in Washington D.C., USA, with a built in knowledge where you can analyze and visualize data. The data is taken from Capital Bike Share.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-right bg-transparent w-100 border-0">
                        <TDBReactButton config={CLONE_DATA_PRODUCT_CONFIG}/>
                    </Card.Footer>
                </Card>
                <Card className="mr-3">
                    <Card.Header as="h6" className="text-right bg-transparent border-0">
                        <Badge variant="secondary" title="For Intermediate Users">Intermediate</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img className="mb-4 example-data-product-card-img" variant="top" src="https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/imdb_fb_logo._CB1542065250_.png" />
                        <Card.Title>Graph of IMDB Movies Data</Card.Title>
                        <Card.Text className="text-muted">
                            A data product with IMDB movies data. The data is taken from https://www.kaggle.com/PromptCloudHQ/imdb-data
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-right bg-transparent w-100 border-0">
                        <TDBReactButton config={CLONE_DATA_PRODUCT_CONFIG}/>
                    </Card.Footer>
                </Card>
                <Card className="mr-3">
                    <Card.Header as="h6" className="text-right bg-transparent border-0">
                        <Badge variant="secondary" title="For Advanced Users">Advanced</Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img className="mb-4 example-data-product-card-img" variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Seshat_Logo.png/1024px-Seshat_Logo.png" />
                        <Card.Title>Seshat</Card.Title>
                        <Card.Text className="text-muted">
                            A data product with global history data to bring together high quality datasets describing every human society that has existing since 10,000 BCE, covering all aspects of social evolution. The founders of TerminusDB are supporters and contributors to this project. 
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-right bg-transparent w-100 border-0">
                        <TDBReactButton config={CLONE_DATA_PRODUCT_CONFIG}/>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </Container>
    </Layout>
}