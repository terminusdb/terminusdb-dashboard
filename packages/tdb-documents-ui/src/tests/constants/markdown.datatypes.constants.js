

// simple frame with Page Document and body field
export const MARKDOWN_DATA_TYPE_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context",
		"xsd": "http://www.w3.org/2001/XMLSchema#"
	},
	"Page": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "body": "xsd:string"
  }
}

// expected data on Create 
export const MARKDOWN_DATA_TYPE_CREATE_DATA = {
	"@type": "Page",
	"body": `---
	__Advertisement :)__
	
	- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
		resize in browser.
	- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
		i18n with plurals support and easy syntax.
	
	You will like those projects!
	
	---
	
	# h1 Heading 8-)
	## h2 Heading
	### h3 Heading
	#### h4 Heading
	##### h5 Heading
	###### h6 Heading`
}

// expected data on Edit 
export const MARKDOWN_DATA_TYPE_EDIT_DATA = {
	"@type": "Page",
	"body": `---
	__Changed Advertisement :)__
	
	- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
		resize in browser.
	- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer/ QA friendly
		i18n with plurals support and easy syntax.
	
	You will like those projects coz they can be easily edited !
	
	---`
}

// create config 
export const CREATE_CONFIG = {
	frame: MARKDOWN_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Page",
	formData: {},
	input: MARKDOWN_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// edit config 
export const EDIT_CONFIG = {
	frame: MARKDOWN_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Page",
	formData: MARKDOWN_DATA_TYPE_CREATE_DATA, // pass created data here & we will modify with Edit data
	input: MARKDOWN_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const VIEW_CONFIG = {
	frame: MARKDOWN_DATA_TYPE_FRAME, 
	uiFrame: {},
	type: "Page",
	formData: MARKDOWN_DATA_TYPE_EDIT_DATA,
	mode: "View"
}

