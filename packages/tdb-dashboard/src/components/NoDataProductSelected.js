import React from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Container, Card, Row, Col, Button, Stack,Alert} from "react-bootstrap"
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

    let list = woqlClient ? woqlClient.databases() : []

    const createdb = accessControlDashboard ? accessControlDashboard.createDB() : false
    const showNoDataProduct = createdb && list.length===0 ? true : false

	let cloneDataProduct = [
		{	
			name: "lego", 
			label: "Parts & Components Inventory", 
			img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/4F49/production/_125879202_legorussia.png",
			description: "This data product features Lego sets and their individual components and the relationships between them. It is an excellent example of organizations that have interconnected components and parts within their product offerings."
		},
		/*{
			name: "Star_Wars", 
			label: "Relationships Between People, Real Estate, & Equipment", 
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkosbW26brusDap1E3y2GV6pnIRsjg-9Rc1CdJRuMJjrJ1O6fJs_x2bjcGjBUCB_wkTE&usqp=CAU",
			description: "This data product features a Star Wars dataset and their individual components and how they are all connected and is a good example of the relationships between people and things."
		},*/
		{
			name: "nuclear", 
			label: "The Complex Energy Sector", 
			img:"https://static.dw.com/image/59710463_605.jpg", 
			description: "Featuring nuclear power stations, this data product demonstrates the interconnected nature of extremely complex environments."
		},
		{	
			name: "CAMS", 
			label: "Plot Data & Its Relationships on a Map", 
			img:"https://github.com/CriticalAssetManagement/CAMS-web-assets/raw/main/Images/CAMS-GitHub-Header-v5.jpg", 
			description: "CAMS is a critical asset management system that maps the dependency relationships between critical assets and displays them on a map to help first responders plan for emergencies."
		}
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
								<Card.Title className="h5 fw-bold text-success">{arr.label}</Card.Title>
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
}