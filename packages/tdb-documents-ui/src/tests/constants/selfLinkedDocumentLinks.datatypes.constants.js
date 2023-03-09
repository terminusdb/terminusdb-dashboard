

// simple frame with Person who is friend_with Person
export const DOCUMENT_LINK_DATA_TYPE_FRAME = {
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
    "friends_with": {
			"@class": "Person",
			"@type": "Optional"
		},
		"name": "xsd:string",
		"age": "xsd:integer"
  }
}

// expected data on Create 
export const DOCUMENT_LINK_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"friends_with": {
		"@type": "Person", 
		"name": "Hermione Granger",
		"age": "15",
		"friends_with": {
			"@type": "Person", 
			"name": "Ronald Weasely",
			"age": "13"
		}
	},
	"name": "Harry Potter",
	"age": "18",
	"@type": "Person"
}

// expected data on Create 
export const DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Person/13123123",
	"@type": "Person",
	"friends_with": {
		"@id": "Person/13123123/friends_with/HermioneGranger",
		"@type": "Person", 
		"name": "Hermione Granger",
		"age": "15",
		"friends_with": {
			"@id": "Person/13123123/friends_with/HermioneGranger/friends_with/RonaldWeasely",
			"@type": "Person", 
			"name": "Ronald Weasely",
			"age": "13"
		}
	},
	"name": "Harry Potter",
	"age": "18",
	"@type": "Person"
}

// expected data on Edit 
export const DOCUMENT_LINK_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/13123123",
	"@type": "Person",
	"friends_with": {
		"@id": "Person/13123123/friends_with/HermioneGranger",
		"@type": "Person", 
		"name": "Hermione Granger",
		"age": "19",
		"friends_with": {
			"@id": "Person/13123123/friends_with/HermioneGranger/friends_with/RonaldWeasely",
			"@type": "Person", 
			"name": "Ronald Bilius Weasely",
			"age": "16"
		}
	},
	"name": "Harry Potter",
	"age": "18",
	"@type": "Person"
}

export const DOCUMENT_UNLINKED_DATA ={
	"@id": "Person/13123123",
	"@type": "Person",
	"friends_with": {
		"@id": "Person/13123123/friends_with/HermioneGranger",
		"@type": "Person", 
		"name": "Hermione Granger",
		"age": "15",
		"friends_with": { // this will be new data to be created
			"@type": "Person", 
			"name": "Luna Lovegood",
			"age": "11"
		}
	},
	"name": "Harry Potter",
	"age": "18",
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
	unLinkedInput: DOCUMENT_UNLINKED_DATA,
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

