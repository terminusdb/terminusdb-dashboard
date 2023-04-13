

// simple frame with Person Document and PermanentAddress linked to Address
export const SUBDOCUMENT_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Shared": {
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"name": "xsd:string"
	},
	"Postal": {
		"@key": {
			"@type": "Random"
		},
		"render_as": {
			"shared_by": {
				"expand": true
			}
		},
		"@subdocument": [],
		"zip": "xsd:string",
		"eir": "xsd:string",
		"shared_by": {
			"@class": "Shared",
			"@subdocument": []
		}
	},
	"Address": {
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"@metadata": {
			"render_as": {
				"postalCode": {
					"expand": true
				}
			}
		},
		"postalCode": {
			"@class": "Postal",
			"@subdocument": []
		}
	},
	"Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "lives": {
			"@class": "Address",
			"@subdocument": []
		}
  }
}

// expected data on Create 
export const SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"lives": {
    "@type": "Address",
    "postalCode": {
      "@type": "Postal",
      "zip": "234234",
      "eir": "EIR28",
      "shared_by": {
        "@type": "Shared",
        "name": "Henry"
      }
    }
  }
}

// expected data on Create 
export const SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@type": "Person",
	"@id": "Person/12312213",
	"lives": {
    "@type": "Address",
    "postalCode": {
      "@type": "Postal",
      "zip": "234234",
      "eir": "EIR28",
      "shared_by": {
        "@type": "Shared",
        "name": "Henry"
      }
    }
  }
}

// expected data on Edit 
export const SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/12312213",
	"@type": "Person",
	"lives": {
    "@type": "Address",
    "postalCode": {
      "@type": "Postal",
      "zip": "119",
      "eir": "EIR119",
      "shared_by": {
        "@type": "Shared",
        "name": "Mathew"
      }
    }
  }
}

// create config 
export const CREATE_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: SUBDOCUMENT_DATA_TYPE_FRAME,  
	uiFrame: {},
	type: "Person",
	formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
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

