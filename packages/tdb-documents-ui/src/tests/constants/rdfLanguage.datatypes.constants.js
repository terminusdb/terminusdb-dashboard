

// simple frame with Person Document with an rdf:language Property
export const RDF_LANG_DATA_TYPE_FRAME = {
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
    "records": "rdf:langString"
  }
}

// expected data on Create 
export const RDF_LANG_DATA_TYPE_CREATE_DATA = {
	"@type": "Person",
	"records": {
		"@lang":"ka",
		"@value":"ინახავს ჩანაწერს"
	}
}

// expected data on Edit 
export const RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Person/234234",
	"@type": "Person",
	"records": {
		"@lang":"ka",
		"@value":"ინახავს ჩანაწერს"
	}
}

export const RDF_LANG_DATA_TYPE_EDIT_DATA = {
	"@id": "Person/234234",
	"@type": "Person",
	"records": {
		"@lang":"en",
		"@value":"Keeps Records"
	}
}

// create config 
export const CREATE_CONFIG = {
	frame: RDF_LANG_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: {},
	input: RDF_LANG_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: RDF_LANG_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL, // pass created data here & we will modify with Edit data
	input: RDF_LANG_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: RDF_LANG_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Person",
	formData: RDF_LANG_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

