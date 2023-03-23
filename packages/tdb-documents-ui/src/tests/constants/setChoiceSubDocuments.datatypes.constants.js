

// simple frame with a Student document with favorite_subject property which points to 
// an array of choices of subdocuments
export const SET_CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#", 
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Zoology": {
		"@inherits": [
			"Subject"
		],
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"Zoology_notes": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"subject_name": {
			"@class": "xsd:string",
			"@type": "Optional"
		}
	},
	"Botony": {
		"@inherits": [
			"Subject"
		],
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"Botony_notes": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"Botony_grade": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"subject_name": {
			"@class": "xsd:string",
			"@type": "Optional"
		}
	},
	"Subject": {
		"@abstract": [],
		"@subdocument": [],
		"@type": "Class",
		"subject_name": {
			"@class": "xsd:string",
			"@type": "Optional"
		}
	},
	"Student": {
		"@key": {
			"@type": "Random"
		},
		"@type": "Class",
		"favorite_subject": {
			"@class" : [
				{
					"@class": "Zoology",
					"@subdocument": []
				},
				{
					"@class": "Botony",
					"@subdocument": []
				}
			],
			"@type": "Set"
		}
	}
}

// expected data on Create 
export const SET_CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
	"@type": "Student",
	"favorite_subject": [
		{
			"@type": "Botony",
			"Botony_notes": "Botony_notes notes",
			"Botony_grade": "A",
			"subject_name": "Botony"
		}
	]
}

// expected data on Create 
export const SET_CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Student/12312213",
	"@type": "Student",
	"favorite_subject": [
		{
			"@type": "Botony",
			"Botony_notes": "Botony notes",
			"Botony_grade": "A",
			"subject_name": "Botony"
		}
	]
}

// expected data on Edit 
export const SET_CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
	"@id": "Student/12312213",
	"@type": "Student",
	"favorite_subject": [
		{
			"@type": "Zoology",
			"Zoology_notes": "Zoology notes",
			"subject_name": "Zoology" 
		}
	]
}

// create config 
export const CREATE_CONFIG = {
	frame: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Student",
	formData: {},
	input: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME,  
	uiFrame: {},
	type: "Student",
	formData: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Student",
	formData: SET_CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
	mode: "View"
}

