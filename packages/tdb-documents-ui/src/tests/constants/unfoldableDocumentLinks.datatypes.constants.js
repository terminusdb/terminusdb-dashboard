import React from "react"
import Row from "react-bootstrap/Row"

// simple frame with Person who likes Animal
export const DOCUMENT_LINK_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Animal": {
		"@key": {"@type": "Random"},
		"@type": "Class",
		"@unfoldable": [],
		"owned_by":{
			"@class": "Person",
			"@type": "Optional"
		},
		"category": "xsd:string",
		"nickName": "xsd:string"
	},
	"Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "likes": {
			"@class": "Animal",
			"@type": "Optional"
		},
		"name": "xsd:string"
  }
}

// expected data on Create 
export const DOCUMENT_LINK_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"likes": {
		"@type": "Animal",
		"owned_by": {
			"name": "Mike",
			"likes": {
				"@type": "Animal",
				"owned_by": "ID 3",
				"category": "Cats"
			},
			"@type": "Person"
		},
		"category": "Dogs"
	},
	"name": "John Doe",
	"@type": "Person"
}

// expected data on Create 
export const DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Person/13123123",
	"@type": "Person",
	"likes": {
		"@type": "Animal",
		"owned_by": {
			"name": "Mike",
			"likes": {
				"@type": "Animal",
				"owned_by": "ID 3",
				"category": "Cats"
			},
			"@type": "Person"
		},
		"category": "Dogs"
	},
	"name": "John Doe",
	"@type": "Person"
}

// expected data on Edit 
export const DOCUMENT_LINK_DATA_TYPE_EDIT_DATA = {
	"@type": "Person",
	"@id": "Person/13123123",
	"likes": {
		"@type": "Animal",
		"owned_by": {
			"name": "Mike",
			"likes": "ID 1",
			"@type": "Person"
		},
		"category": "Dogs"
	},
	"name": "John Doe",
	"@type": "Person"
}

// create config 
export const CREATE_CONFIG = {
	frame: DOCUMENT_LINK_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: DOCUMENT_LINK_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: DOCUMENT_LINK_DATA_TYPE_FRAME,  
	uiFrame: {},
	type: "Person",
	formData: DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: DOCUMENT_LINK_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: DOCUMENT_LINK_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: DOCUMENT_LINK_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

/** component to display  */
export const Search = ({ setSelected }) => {

	function handleClick(e){
			if(setSelected) setSelected({ id: e.target.id, label: e.target.name })
	}
 
	return <>
		Search this dummy result ....
		<Row className="w-100 border" id={"ID 1"} name="first id" onClick={handleClick}>{"ID 1"}</Row>
		<Row className="w-100 border" id={"ID 2"} name="second id" onClick={handleClick}>{"ID 2"}</Row>
		<Row className="w-100 border" id={"ID 3"} name="third id" onClick={handleClick}>{"ID 3"}</Row>
	</>
}

/** handle traverse on click  */
export function handleTraverse (clicked) {
	alert(`You have clicked on ${clicked} ...`)
}

