

// simple frame with Person Document and PermanentAddress linked to Address
export const SUBDOCUMENT_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context"
	},
	"Info": {
		"@key": {
			"@type": "Random"
		}, 
		"@type": "Class",
		"@subdocument": [],
		"level": "xsd:string",
		"minimumScore": "xsd:decimal"
	},
	"Student": {
		"@key": {
			"@type": "Random"
		},
		"@type": "Class",
		"@metadata": {
			"render_as": {
				"studies": {
					"expand": true
				}
			}
		},
		"studies": {
			"@class": {
				"@class": "Subject",
				"@subdocument": []
			},
			"@type": "Optional"
		}
	},
	"Subject": {
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"name": {
			"@class": "xsd:string",
			"@type": "Set"
		},
		"information": {
			"@class": {
				"@class": "Info",
				"@subdocument": []
			},
			"@type": "Set"
		}
	}
}

// expected data on Create 
export const SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
	"studies": {
		"@type": "Subject",
		"name": [
			"Ronald",
			"Tina"
		],
		"information": [
			{
				"@type": "Info",
				"level": "hard",
				"minimumScore": "35"
			},
			{
				"@type": "Info",
				"level": "easy",
				"minimumScore": "15"
			}
		]
	},
	"@type": "Student"
}

// expected data on Create 
export const SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"studies": {
		"@type": "Subject",
		"name": [
			"Ronald",
			"Tina"
		],
		"information": [
			{
				"@type": "Info",
				"level": "hard",
				"minimumScore": "35"
			},
			{
				"@type": "Info",
				"level": "easy",
				"minimumScore": "15"
			}
		]
	},
	"@type": "Student"
}


// expected data on Edit 
export const SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
	"studies": {
		"@type": "Subject",
		"name": [
			"Ronald",
			"Tina",
			"Cathy"
		],
		"information": [
			{
				"@type": "Info",
				"level": "hard",
				"minimumScore": "35"
			},
			{
				"@type": "Info",
				"level": "easy",
				"minimumScore": "15"
			},
			{
				"@type": "Info",
				"level": "medium",
				"minimumScore": "25"
			}
		]
	},
	"@type": "Student"
}


// create config 
export const CREATE_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Student",
	formData: {},
	input: SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME,  
	uiFrame: {},
	type: "Student",
	formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Student",
	formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

