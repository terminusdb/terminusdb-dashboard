

// simple frame with Person Document and PermanentAddress linked to Address
export const SET_SUBDOCUMENT_DATA_TYPE_FRAME = {
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
	"Student": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "previous_addresses": {
			"@class": {
				"@class": "Address",
				"@subdocument": []
			},
			"@type": "Set"
		}
  }
}

// expected data on Create 
export const SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
	"@type": "Student",
	"previous_addresses": [
		{
			"@type": "Address", 
			"AddressLine1": "Love Lane East",
			"City": "Nice",
			"Country": "France",
			"postalCode": "FR293"
		},
		{
			"@type": "Address", 
			"AddressLine1": "St William's road",
			"City": "Dublin",
			"Country": "Ireland",
			"postalCode": "D16"
		}
	]
}

// expected data on Create 
export const SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@type": "Student",
	"@id": "Student/12312213",
	"previous_addresses": [
		{
			"@type": "Address", 
			"@id": "Student/12312213/previous_addresses/21312",
			"AddressLine1": "Love Lane East",
			"City": "Nice",
			"Country": "France",
			"postalCode": "FR293"
		},
		{
			"@type": "Address", 
			"@id": "Student/12312213/previous_addresses/123",
			"AddressLine1": "St William's road",
			"City": "Dublin",
			"Country": "Ireland",
			"postalCode": "D16"
		}
	]
}

// expected data on Edit 
export const SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
	"@id": "Student/12312213",
	"@type": "Student",
	"previous_addresses": [
		{
			"@type": "Address", 
			"@id": "Student/12312213/previous_addresses/21312",
			"AddressLine1": "Love Lane East",
			"City": "Nice",
			"Country": "France",
			"postalCode": "FR293"
		},
		{
			"@type": "Address", 
			"AddressLine1": "Pembroke Road",
			"City": "Dublin",
			"Country": "Ireland",
			"postalCode": "D04"
		}
	]
}

// create config 
export const CREATE_CONFIG = {
	frame: SET_SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Student",
	formData: {},
	input: SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SET_SUBDOCUMENT_DATA_TYPE_FRAME,  
	uiFrame: {},
	type: "Student",
	formData: SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SET_SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Student",
	formData: SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

