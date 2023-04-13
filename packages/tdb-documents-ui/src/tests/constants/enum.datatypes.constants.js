

// simple frame with Person Document and likes_color field
export const ENUM_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Colors": {
		"@type": "Enum",
		"@values": [
			"red",
			"blue",
			"green"
		]
	},
	"Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "likes_color": {
			"@class": {
				"@id": "Colors",
				"@type": "Enum",
				"@values": [
					"red",
					"blue",
					"green"
				]
			},
			"@type": "Optional"
		}
  }
}

// expected data on Create 
export const ENUM_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"likes_color": "blue"
}

// expected data on Edit 
export const ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@type": "Person",
	"@id": "Person/234234",
	"likes_color": "blue"
}

export const ENUM_DATA_TYPE_EDIT_DATA = {
	"@type": "Person",
	"@id": "Person/234234",
	"likes_color": "green"
}

// create config 
export const CREATE_CONFIG = {
	frame: ENUM_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: ENUM_DATA_TYPE_CREATE_DATA["likes_color"],
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: ENUM_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: ENUM_DATA_TYPE_EDIT_DATA["likes_color"],
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: ENUM_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: ENUM_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

