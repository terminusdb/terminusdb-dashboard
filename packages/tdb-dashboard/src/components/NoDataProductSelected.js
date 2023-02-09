import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {ListGroup, Container, Card, Row, Col, Button, Stack,Alert} from "react-bootstrap"
import {NewDataProduct} from "./NewDataProduct"
import { ManageDatabase } from "../hooks/ManageDatabase"
import { WOQLClient } from "@terminusdb/terminusdb-client"
import {localSettings} from "../../localSettings"
import { useNavigate } from "react-router-dom"
import { Loading } from "./Loading"
// tean home page
export const NoDataProductSelected = (props) => { 
    const {woqlClient,accessControlDashboard} = WOQLClientObj()
	const {cloneDatabase,loading:cloneLoading, error:cloneError , setError:setCloneError} = ManageDatabase()
	const navigate = useNavigate()

    let list = woqlClient ? woqlClient.databases() : []

    const createdb = accessControlDashboard ? accessControlDashboard.createDB() : false
    const showNoDataProduct = createdb && list.length===0 ? true : false

	let cloneDataProduct = [
		{
			name: "lego", 
			img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/4F49/production/_125879202_legorussia.png",
			description: "Shop awesome LEGO® building toys and brick sets and find the perfect gift for your kid. "
		},
		{
			name: "Star_Wars", 
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkosbW26brusDap1E3y2GV6pnIRsjg-9Rc1CdJRuMJjrJ1O6fJs_x2bjcGjBUCB_wkTE&usqp=CAU",
			description: "Star Wars is an American epic space opera multimedia franchise created by George Lucas, and became a worldwide pop-culture phenomenon."
		},
		{
			name: "nuclear", 
			img:"https://static.dw.com/image/59710463_605.jpg", 
			description: "Nuclear power plants are a type of power plant that use the process of nuclear fission in order to generate electricity. "
		},
		{
			name: "CAMS", 
			img:"https://github.com/CriticalAssetManagement/CAMS-web-assets/raw/main/Images/CAMS-GitHub-Header-v5.jpg", 
			description: "Building climate resilience for those who need it. An open-source project for good. Helping to use local knowledge to become climate resilient."
		},
	]

	const getCloneUrl = () =>{
       // return `${localSettings.server}${organization}/${organization}/${dataProduct}`
    }
	
	async function handleClone(dbName) {
		const orgName = "Terminusdb_demo" //"TerminusX"
		const tmpClient = new WOQLClient(localSettings.server, {organization:orgName,db:dbName})
		const connection = tmpClient.connectionConfig
		connection.api_extension = `${orgName}/`
		
		const cloneSource= {
			label:dbName,
			comment:"please clone the db",
			remote_url: `${connection.dbURLFragment()}`
		}
		const success = await cloneDatabase(cloneSource,woqlClient.organization(),dbName,true)
		if(success){
			window.location.replace(`/${woqlClient.organization()}/${dbName}`)
		}
		
	}

	/*return <main className="content w-100">
		<Container className="center-align col-md-10">
			<Card className="h-100">
				<Card.Body>
					<img src="https://assets.terminusdb.com/images/terminusx-color.png" 
						className="logo-img mb-3" 
						style={{height:"150px"}}/>
					<h5 className="text-light fw-bold"> No Data Product chosen yet</h5>
					<h6 className="text-light fw-bold">Please use the side bar to select a Data Product</h6>
				</Card.Body>
			</Card>
		</Container>
	</main>*/

	/** COMMENT THE BELOW code FOR NOW, will put back once clone is fixed */
    return <main className="content w-100">
		
        <Container className="center-align col-md-10">
			{/*<h3 className="mb-3 text-success">{"Clone Sample Data Product to your Team"}</h3>*/}
			{cloneError && <Alert variant="danger"  onClose={() => setCloneError(false)} dismissible>{cloneError}</Alert>} 
			{cloneLoading && 
                <Loading message={`Cloning ....................`} type={'PROGRESS_BAR_COMPONENT'}/>}      
			<Row xs={1} md={4} className="g-4 py-2 w-100">
				<Col className="py-2 col-md-4">
					<Card className="h-100 tdb__create__new__dp bg-info" style={{opacity: "0.8"}}>
						<Card.Body>
							<NewDataProduct css={"mt-5 p-5 opacity-1"}/>
						</Card.Body>
					</Card>
				</Col>
				{cloneDataProduct.map((arr) => (
					<Col className="py-2 col-md-4" key={arr.name}>
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
											onClick={()=>handleClone(arr.name)}>
											Clone
										</Button>
									</div>
								</Stack>
							</Card.Footer>
						</Card>
					</Col>
				))}
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