

// simple frame with Person Document and Name field
export const STRING_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "name": "xsd:string"
  }
}

// expected data on Create 
export const STRING_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"name": "John Doe"
}

// expected data on Edit 
export const STRING_DATA_TYPE_EDIT_DATA = {
	"@type": "Person",
	"name": "Mary Jane"
}

// create config 
export const CREATE_CONFIG = {
	frame: STRING_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: STRING_DATA_TYPE_CREATE_DATA.name,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: STRING_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: STRING_DATA_TYPE_CREATE_DATA, // pass created data here & we will modify with Edit data
	input: STRING_DATA_TYPE_EDIT_DATA.name,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: STRING_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: STRING_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

