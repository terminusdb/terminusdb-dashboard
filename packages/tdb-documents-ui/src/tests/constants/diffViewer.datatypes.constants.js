
export const FRAMES = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context"
	},
	"Address": {
		"@documentation": [
			{
				"@comment": "An Address",
				"@label": "Address",
				"@language": "en",
				"@properties": {
					"AddressLine1": {
						"@comment": "Address Line one",
						"@label": "Address Line 1"
					},
					"Country": {
						"@comment": "A Country ",
						"@label": "Country"
					},
					"postalCode": {
						"@comment": "A valid Postal Code",
						"@label": "Zip Code"
					}
				}
			},
			{
				"@comment": "მისამართი",
				"@label": "მისამართი",
				"@language": "ka",
				"@properties": {
					"AddressLine1": {
						"@comment": "მისამართის ხაზი პირველი",
						"@label": "მისამართის ხაზი 1"
					},
					"Country": {
						"@comment": "\\x1CA5\\ვეყანა",
						"@label": "ქვეყანა"
					},
					"postalCode": {
						"@comment": "მოქმედი საფოსტო კოდი",
						"@label": "\\x1C96\\იპ კოდი"
					}
				}
			}
		],
		"@key": {
			"@type": "Random"
		},
		"@subdocument": [],
		"@type": "Class",
		"AddressLine1": "xsd:string",
		"City": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"Country": "xsd:string",
		"postalCode": "xsd:string"
	},
	"Person": {
		"@key": {
			"@type": "Random"
		},
		"@type": "Class",
		/*"nickNames": {
			"@class": "xsd:string",
			"@type": "Set"
		},
		"name": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"age": {
			"@class": "xsd:decimal",
			"@type": "Optional"
		},
		"permanentAddress":  {
			"@class": "Address",
			"@subdocument": []
		},*/
		"multipleAddresses":  {
			"@class": {
				"@class": "Address",
				"@subdocument": []
			},
			"@type": "Set"
		}
	}
}

export const ORIGINAL_DATA = {
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		"multipleAddresses": [
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			}
		]
		/*"nickNames": [
			"Nano N", "Parka N", "Li N"
		],*/
		//"name": "Nina",
		//"age": 23,
		/*"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1",
			"City": "City",
			"Country": "Country",
			"postalCode": "postalCode"
		}*/
	}
} 

// this is a sample diff
export const DIFF = {
  "@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
  "multipleAddresses": [
    {},
    {
      "AddressLine1": {
        "@after": "AddressLine1 new",
        "@before": "AddressLine1 ",
        "@op": "SwapValue"
      },
      "Country": {
        "@after": "Country new",
        "@before": "Country ",
        "@op": "SwapValue"
      },
      "postalCode": {
        "@after": "postalCode new",
        "@before": "postalCode ",
        "@op": "SwapValue"
      }
    },
    {
      "AddressLine1": {
        "@after": "ADDR ",
        "@before": "AddressLine1 ",
        "@op": "SwapValue"
      },
      "City": {
        "@after": "LATER",
        "@before": "City",
        "@op": "SwapValue"
      },
      "Country": {
        "@after": "LATER ",
        "@before": "Country ",
        "@op": "SwapValue"
      },
      "postalCode": {
        "@after": "LATER ",
        "@before": "postalCode ",
        "@op": "SwapValue"
      }
    }
  ]
}

export const CHANGED_DATA = {
	"Person": {
		"@id": "Person/6230f55d381076aa7f94b6b01a7a7ae1692ef40c44e233a52c1c280b5d339839",
		"@type": "Person",
		"multipleAddresses": [
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 ",
				"City": "City",
				"Country": "Country ",
				"postalCode": "postalCode "
			},
			{
				"@type": "Address",
				"AddressLine1": "AddressLine1 new",
				"City": "City",
				"Country": "Country new",
				"postalCode": "postalCode new"
			},
			{
				"@type": "Address",
				"AddressLine1": "ADDR ",
				"City": "LATER",
				"Country": "LATER ",
				"postalCode": "LATER "
			},
		]
		/*"nickNames": [
			"Nano", "Parka N", "Li N"
		],*/
		//"name": "Jose",
		//"age": 13,
		/*"permanentAddress": {
			"@type": "Address",
			"AddressLine1": "AddressLine1 new",
			"City": "City new",
			"Country": "Country new",
			"postalCode": "postalCode new"
		}*/
	}
} 


// view config 
export const VIEW_CONFIG = {
	frame: FRAMES, 
	uiFrame: {},
	type: "Person",
	mode: "View"
}
