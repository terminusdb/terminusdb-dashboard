import React from "react"
import {NoDataProductSelectedStyle, NO_DATA_PRODUCT_SELECTED_MESSAGE} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import { NoDataProductsCreated } from "./NoDataProductsCreated"
import {ListGroup, Container, Card, Row, Col, Button, Stack} from "react-bootstrap"
import CardGroup from 'react-bootstrap/CardGroup';
import {FaRegClone} from "react-icons/fa"
import {NewDataProduct} from "./NewDataProduct"

// tean home page
export const NoDataProductSelected = (props) => { 
    const {woqlClient,accessControlDashboard} = WOQLClientObj()

    let list = woqlClient ? woqlClient.databases() : []

    const createdb = accessControlDashboard ? accessControlDashboard.createDB() : false
    const showNoDataProduct = createdb && list.length===0 ? true : false

	let cloneDataProduct = [
		{
			name: "Lego", 
			img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/4F49/production/_125879202_legorussia.png",
			description: "Shop awesome LEGO® building toys and brick sets and find the perfect gift for your kid. "
		},
		{
			name: "StarWars", 
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkosbW26brusDap1E3y2GV6pnIRsjg-9Rc1CdJRuMJjrJ1O6fJs_x2bjcGjBUCB_wkTE&usqp=CAU",
			description: "Star Wars is an American epic space opera multimedia franchise created by George Lucas, and became a worldwide pop-culture phenomenon."
		},
		{
			name: "Nuclear", 
			img:"https://static.dw.com/image/59710463_605.jpg", 
			description: "Nuclear power plants are a type of power plant that use the process of nuclear fission in order to generate electricity. "
		},
		{
			name: "CAMS", 
			img:"https://github.com/CriticalAssetManagement/CAMS-web-assets/raw/main/Images/CAMS-GitHub-Header-v5.jpg", 
			description: "Building climate resilience for those who need it. An open-source project for good. Helping to use local knowledge to become climate resilient."
		},
	]


	function handleClone() {
		alert("clone dp ...")
	}

    return <main className="content w-100">
		
        <Container className="center-align col-md-10">
			{/*<h3 className="mb-3 text-success">{"Clone Sample Data Product to your Team"}</h3>*/}
			<Row xs={1} md={4} className="g-4 py-2 w-100">
				{cloneDataProduct.map((arr) => (
					<Col className="py-2 col-md-4">
						<Card className="h-100">
							<Card.Img variant="top" src={arr.img}/>
							<Card.Body>
								<Card.Title className="h5 fw-bold text-success">{arr.name}</Card.Title>
								<Card.Text className="text-light text-left h6">
									{arr.description}
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<Stack direction="horizontal" gap={3}>
									<small className="text-light">
										Clone this DataProduct
									</small>
									<div className="ms-auto">
										<Button className="btn-info btn-sm text-white fw-bold" 
											onClick={handleClone}>
											Clone
										</Button>
									</div>
								</Stack>
							</Card.Footer>
						</Card>
					</Col>
				))}
				<Col className="py-2 col-md-4">
					<Card className="h-100 tdb__create__new__dp bg-info" style={{opacity: "0.8"}}>
						<Card.Body>
							<NewDataProduct css={"mt-5 p-5 opacity-1"}/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
    </main> 

    /*return <React.Fragment>
        {! showNoDataProduct && <div style={NoDataProductSelectedStyle}>
            {props.children}
            <Col xs={12} className="text-center d-block align-items-center justify-content-center">
                <img src="../assets/favicon-dark.png" style={{width: "10%"}}/>
                <h1 className="text-dark mt-5">
                    {NO_DATA_PRODUCT_SELECTED_MESSAGE} 
                </h1>
            </Col>
            </div>}
        {showNoDataProduct && <NoDataProductsCreated/>}
    </React.Fragment> */
}