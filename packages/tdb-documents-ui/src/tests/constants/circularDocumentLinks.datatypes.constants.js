

// simple frame with Person who is friend_with Person
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
		"nickName": "Chooo",
		"category": "Cats",
		"owned_by": {
			"@type": "Person", 
			"name": "Ron Terol",
			"likes": {
				"@type": "Animal", 
				"nickName": "Jimmy",
				"category": "Dogs",
				"owned_by": {
					"@type": "Person", 
					"name": "Marry Ann"
				}
			}
		}
	},
	"name": "John Doe"
}

// expected data on Create 
export const DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Person/13123123",
	"@type": "Person",
	"likes": {
		"@id": "Person/13123123/likes/Cats", 
		"@type": "Animal", 
		"nickName": "Chooo",
		"category": "Cats",
		"owned_by": {
			"@id": "Person/13123123/owned_by/Ron",
			"@type": "Person", 
			"name": "Ron Terol",
			"likes": {
				"@id": "Person/13123123/owned_by/Ron/likes/Dogs",
				"@type": "Animal", 
				"nickName": "Jimmy",
				"category": "Dogs",
				"owned_by": {
					"@id": "Person/13123123/owned_by/Ron/likes/Dogs/owned_by/Mary",
					"@type": "Person", 
					"name": "Marry Ann"
				}
			}
		}
	},
	"name": "John Doe",
	"@type": "Person"
}

// expected data on Edit 
export const DOCUMENT_LINK_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/13123123",
	"@type": "Person", 
	"likes": {
		"@id": "Person/13123123/likes/Cats",
		"@type": "Animal", 
		"nickName": "Chooo",
		"category": "Cats",
		"owned_by": {
			"@id": "Person/13123123/owned_by/Ron",
			"@type": "Person", 
			"name": "Ron Terol",
			"likes": {
				"@id": "Person/13123123/owned_by/Ron/likes/Dogs",
				"@type": "Animal", 
				"nickName": "Goldie",
				"category": "Fish",
				"owned_by": {
					"@id": "Person/13123123/owned_by/Ron/likes/Dogs/owned_by/Mary",
					"@type": "Person", 
					"name": "Jerome Kal"
				}
			}
		}
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

