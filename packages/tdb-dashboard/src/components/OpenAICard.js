import React, {useEffect, useRef} from "react";
import { Button, Card, Row,Col,Stack} from "react-bootstrap"
import {useOpenAI} from "../hooks/useOpenAI"
import {Alerts} from "./Alerts"
import {SwitchOpenAi} from "./SwitchOpenAi"

export const OpenAICard=({organization})=>{
	
	const {loading,changeOpenAIStatus,
		 error,saveOpenAIKey,hasOpenAIKEY,hasKey,deleteOpenAIKEY} = useOpenAI()

	const openAIKEY = useRef(null);

	useEffect(()=>{

		hasOpenAIKEY(organization)

	},[organization])

	const saveOpenAIKeyHandler = async()=>{
		const key =openAIKEY.current.value
		const done = await saveOpenAIKey(organization,key)
		if(done){
			openAIKEY.current.value = ""
		}
	}

	function deleteKey () { 
		deleteOpenAIKEY(organization)
    }

	function changeStatus (isActive){
		changeOpenAIStatus(organization,isActive)
	}


	const title = hasKey === false ? "Add your secret OpenAI API key" : "Your OpenAI API key has been set"
    const subTitle= getLabel()
	
		function getLabel(){
			if(hasKey === false){
				return <label className="description text-muted fw-bold">
							Generate a token in your OpenAI account and copy this here
							</label>
			}
			const label = hasKey === "active" ? "After every change request merge we'll index your documents" : "You have set an OpenAI API key. Please activate this option inorder to index your data"
			return label
			return <Stack direction="horizontal" gap={4}>
					<label className="description text-muted fw-bold mr-auto ">
						{label}
							</label>
					</Stack>

		}

		return( <React.Fragment>
				<Card className="p-5 mb-5">
				<h4 className="mt-4 text-success"><strong>{title}</strong></h4>
						<Stack direction="horizontal" gap={2}>
							
							<div>
								{hasKey !== false && <SwitchOpenAi status={hasKey} 
									changeOpenAIStatus={changeStatus}
									title={subTitle}/>}
							</div>
						</Stack>
					<Row>
					<Col>
					{hasKey  && 
						<div className="form-group">
						<div className="input-group mt-2 mb-2">
							<input className="form-control"
								value= {"xxxxxxxx"}
								type="password"
							/>
							<div className="input-group-append">
								{!loading &&  <Button variant="danger" id="delete_openai_key" onClick={deleteKey}>Delete OpenAIKey</Button>}
								{loading && <button className="btn-lg disabled"><i className="fas fa-spinner fa-spin"></i> 
								<span style={{marginLeft:"10px"}}>Loading</span></button>}
							</div>
						</div>
						</div>	
					}
					{hasKey === false &&
					<div className="form-group">
						<div className="input-group mt-2 mb-2">
							<input className="form-control"
									id="openAIKEY"
								ref={openAIKEY}
								type="password"
								placeholder="Add your openAI key"
							/>
							<div className="input-group-append">
								{!loading &&  <Button variant="info" id="generate_new_token" onClick={saveOpenAIKeyHandler}> Save OpenAIKey</Button>}
								{loading && <button className="btn-lg disabled"><i className="fas fa-spinner fa-spin"></i> 
								<span style={{marginLeft:"10px"}}>Loading</span></button>}
							</div>

						</div>
					</div>}
					</Col>
					</Row>
			</Card>
			</React.Fragment>
	)
}