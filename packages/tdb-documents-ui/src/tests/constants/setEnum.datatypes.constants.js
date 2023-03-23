

// simple frame with Person Document and likes_color field
export const SET_ENUM_DATA_TYPE_FRAME = {
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
			"green",
			"yellow"
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
					"green",
					"yellow"
				]
			},
			"@type": "Set"
		}
  }
}

// expected data on Create 
export const SET_ENUM_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"likes_color": [
		"red"
	]
}

// expected data on Edit 
export const SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@type": "Person",
	"@id": "Person/234234",
	"likes_color": [
		"red"
	]
}

export const SET_ENUM_DATA_TYPE_EDIT_DATA = {
	"@type": "Person",
	"@id": "Person/234234",
	"likes_color": [
		"yellow"
	]
}

// create config 
export const CREATE_CONFIG = {
	frame: SET_ENUM_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: SET_ENUM_DATA_TYPE_CREATE_DATA["likes_color"],
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SET_ENUM_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SET_ENUM_DATA_TYPE_EDIT_DATA["likes_color"],
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SET_ENUM_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SET_ENUM_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

