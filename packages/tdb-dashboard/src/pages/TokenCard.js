import React, {useRef} from "react";
import { Button, Card, Row,Col, Form} from "react-bootstrap"
import {AccessTokenHook} from "../hooks/AccessTokenHook"
import {BsClipboard} from "react-icons/bs"
import {Alerts} from "../components/Alerts"
import {TERMINUS_SUCCESS} from "../components/constants"
import {WOQLTable} from '@terminusdb-live/tdb-react-components'
import TerminusClient from "@terminusdb/terminusdb-client"
import {RiDeleteBin7Line} from "react-icons/ri"
import {getTokenListConfig} from "../components/ViewConfig"

export const TokenCard=({organization})=>{

	const {getToken,
			token,
			loading,
			newTokenLoading,
			tokenList,
			tokenLabel,
			setTokenLabel,
			tokenLabelError,
			setTokenLabelError,
			deleteToken} = AccessTokenHook(organization);


	//let from_console = window.location.search.includes("console=")

	const api_token = useRef(null);

	const onChange=(evt)=>{
		setTokenLabelError(null)
		setTokenLabel(evt.target.value)
	}

	const callGetToken=()=>{
		if(tokenLabel.trim()===''){
			setTokenLabelError('Please add a token message')
		}else{

			getToken(tokenLabel,organization)
		}
	}

	const copyFunction=()=> {
  		/* Get the text field */
  		if(api_token){
	 		 /* Select the text field */
	  		api_token.current.select();
	  		api_token.current.setSelectionRange(0, 99999); /* For mobile devices */

	  		/* Copy the text inside the text field */
	  		document.execCommand("copy");
	  	}
	}

	function getDeleteButton (cell) { 
		let token_id      
        if(typeof cell.row.original["@id"] === "string"){
			const str = cell.row.original["@id"]
			token_id = str.substr(str.lastIndexOf("/")+1)
		}
        return <span className="d-flex">                    
            <Button variant="danger" size="sm" className="ml-5" title={`delete ${cell.row.original['description']}`} onClick={() => deleteToken(token_id)}>              
                <RiDeleteBin7Line/> 
            </Button>
        </span>
    }
	const tableConfig = getTokenListConfig(10, getDeleteButton)
    
	return( <React.Fragment>
		 	<Card className="p-5 mb-5">
			 	<h4 className="mt-4 text-success"><strong>Generate Personal Access Token</strong></h4>
		  		<label className="description text-muted fw-bold">
					  Copy the below token generated into an env file or over HTTPS to connect to TerminusX.
				</label>
				<Row>
				<Col>
				<div className="form-group">
					<div className="input-group mt-2 mb-2">
						<input className="form-control"
						    id="generate_token_description"
							type="text"
							placeholder="Add a Token Description"
							value={tokenLabel} onChange={onChange}
						/>
						<div className="input-group-append">
							{!newTokenLoading &&  <Button variant="info" id="generate_new_token" onClick={callGetToken}> Generate New Token</Button>}
							{newTokenLoading && <button className="btn-lg disabled"><i className="fas fa-spinner fa-spin"></i> <span style={{marginLeft:"10px"}}>Loading</span></button>}
						</div>

					</div>
					{tokenLabelError && <Form.Text className="text-warning">
							Please add a Token description.</Form.Text>}
				</div>
				</Col>
				</Row>
				{token &&
				<Row>
					<Col>
					{/*<div className="alert alert-success" role="alert">
					<p className="mt-2 mb-2"></p>
					</div>*/}
					<Alerts message={"Please, copy your new personal access token now. You won’t be able to see it again!"} type={TERMINUS_SUCCESS}/>
					<span className="mt-2 d-flex align-items-baseline">
						<input className="tdb__token mr-2" ref={api_token} value={token} />
						<button id="generate_token_copy"  onClick={copyFunction} title="Copy to Clipboard" variant="light" className="btn tdb__copy"><BsClipboard/></button>
					</span>
					</Col>
				</Row>
			}
			{Array.isArray(tokenList) && <WOQLTable
                        result={tokenList}
                        freewidth={true}
                        view={(tableConfig ? tableConfig.json() : {})}
                        limit={10}
                        start={0}
                        orderBy={""} 
                        totalRows={tokenList.length}
                    />}
		</Card>
		</React.Fragment>
	)
}