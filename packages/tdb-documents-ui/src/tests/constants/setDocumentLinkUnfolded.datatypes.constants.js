

// simple frame with Person Document and Name field
export const SET_UNFOLDED_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},

	"Animal": {
		"@key": {"@type": "Random"},
		"@type": "Class",
		"@documentation": {
			"@comment": "an Animal",
			"@properties": {
					"owned_by": "owned by owner",
					"nickName": "pet's nick names",
					"category": "blah"
			}
		},
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
			"@type": "Set"
		}
  }
}

// expected data on Create 
export const SET_UNFOLDED_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"likes": [
    {
      "@type": "Animal",
      "category": "dogs",
      "nickName": "jimmy"
    },
    {
      "@type": "Animal",
      "category": "cats",
      "nickName": "furry"
    }
  ],
  "@type": "Person"
}

// expected data on Create 
export const SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL = {
	"@id": "Person/232108",
	"@type": "Person",
	"likes": [
    {
      "@type": "Animal",
      "category": "dogs",
      "nickName": "jimmy"
    },
    {
      "@type": "Animal",
      "category": "cats",
      "nickName": "furry"
    }
  ],
  "@type": "Person"
}

// expected data on Edit 
export const SET_UNFOLDED_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/232108",
	"@type": "Person",
	"likes": [
    {
      "@type": "Animal",
      "category": "fish",
      "nickName": "goldie"
    },
    {
      "@type": "Animal",
      "category": "cats",
      "nickName": "furry"
    }
  ],
  "@type": "Person"
}

// create config 
export const CREATE_CONFIG = {
	frame: SET_UNFOLDED_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: SET_UNFOLDED_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SET_UNFOLDED_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SET_UNFOLDED_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SET_UNFOLDED_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: SET_UNFOLDED_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

