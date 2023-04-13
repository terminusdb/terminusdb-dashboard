

// simple frame with Person Document and PermanentAddress linked to Address
export const SUBDOCUMENT_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Address": {
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"AddressLine1": "xsd:string",
		"City": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"Country": "xsd:string",
		"postalCode": "xsd:string"
	},
	"Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "PermanentAddress": {
			"@class": "Address",
			"@subdocument": []
		}
  }
}

// expected data on Create 
export const SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"PermanentAddress": {
		"@type": "Address", 
		"AddressLine1": "Love Lane East",
		"City": "Nice",
		"Country": "France",
		"postalCode": "FR293"
	}
}

// expected data on Create 
export const SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@type": "Person",
	"@id": "Person/12312213",
	"PermanentAddress": {
		"@type": "Address", 
		"@id": "Person/12312213/PermanentAddress/21312",
		"AddressLine1": "Love Lane East",
		"City": "Nice",
		"Country": "France",
		"postalCode": "FR293"
	}
}

// expected data on Edit 
export const SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/12312213",
	"@type": "Person",
	"PermanentAddress": {
		"@id": "Person/12312213/PermanentAddress/21312",
		"@type": "Address", 
		"AddressLine1": "Westside Newlands",
		"City": "Nice",
		"Country": "France",
		"postalCode": "FR45"
	}
}

// create config 
export const CREATE_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: SUBDOCUMENT_DATA_TYPE_CREATE_DATA.PermanentAddress,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME,  
	uiFrame: {},
	type: "Person",
	formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SUBDOCUMENT_DATA_TYPE_EDIT_DATA.PermanentAddress,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

