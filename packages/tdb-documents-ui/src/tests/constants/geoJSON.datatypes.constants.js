

// GeoJSON frames
export const GEO_JSON_FRAME = {
	"@context": {
		"@base": "terminusdb:///data/",
		"@schema": "terminusdb:///schema#",
		"@type": "Context"
	},
	"Feature": {
		"@inherits": [
			"GeoJSON"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"centerline": {
			"@class": [
				"GeometryCollection",
				"LineString",
				"MultiPolygon",
				"Point",
				"Polygon"
			],
			"@type": "Optional"
		},
		"geometry": [
			"GeometryCollection",
			"LineString",
			"MultiPolygon",
			"Point",
			"Polygon"
		],
		"id": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"properties": {
			"@class": "sys:JSON",
			"@type": "Optional"
		},
		"title": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"type": {
			"@id": "Feature_Type",
			"@type": "Enum",
			"@values": [
				"Feature"
			]
		}
	},
	"FeatureCollection": {
		"@inherits": [
			"GeoJSON"
		],
		"@key": {
			"@type": "Random"
		},
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"crs": {
			"@class": "sys:JSON",
			"@type": "Optional"
		},
		"features": {
			"@class": "Feature",
			"@type": "Set"
		},
		"name": {
			"@class": "xsd:string",
			"@type": "Optional"
		},
		"properties": {
			"@class": "sys:JSON",
			"@type": "Optional"
		},
		"type": {
			"@id": "FeatureCollection_Type",
			"@type": "Enum",
			"@values": [
				"FeatureCollection"
			]
		}
	},
	"FeatureCollection_Type": {
		"@type": "Enum",
		"@values": [
			"FeatureCollection"
		]
	},
	"Feature_Type": {
		"@type": "Enum",
		"@values": [
			"Feature"
		]
	},
	"GeoJSON": {
		"@abstract": [],
		"@type": "Class",
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		}
	},
	"Geometry": {
		"@abstract": [],
		"@inherits": [
			"GeoJSON"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		}
	},
	"GeometryCollection": {
		"@inherits": [
			"GeoJSON",
			"Geometry"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"geometries": {
			"@class": [
				"GeometryCollection",
				"LineString",
				"MultiPolygon",
				"Point",
				"Polygon"
			],
			"@type": "Set"
		},
		"type": {
			"@id": "GeometryCollection_Type",
			"@type": "Enum",
			"@values": [
				"GeometryCollection"
			]
		}
	},
	"GeometryCollection_Type": {
		"@type": "Enum",
		"@values": [
			"GeometryCollection"
		]
	},
	"LineString": {
		"@inherits": [
			"GeoJSON",
			"Geometry"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"coordinates": {
			"@class": "xsd:decimal",
			"@dimensions": 2,
			"@type": "Array"
		},
		"type": {
			"@id": "LineString_Type",
			"@type": "Enum",
			"@values": [
				"LineString"
			]
		}
	},
	"LineString_Type": {
		"@type": "Enum",
		"@values": [
			"LineString"
		]
	},
	"MultiPolygon": {
		"@inherits": [
			"GeoJSON",
			"Geometry"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"coordinates": {
			"@class": "xsd:decimal",
			"@dimensions": 3,
			"@type": "Array"
		},
		"type": {
			"@id": "MultiPolygon_Type",
			"@type": "Enum",
			"@values": [
				"MultiPolygon"
			]
		}
	},
	"MultiPolygon_Type": {
		"@type": "Enum",
		"@values": [
			"MultiPolygon"
		]
	},
	"Name_Type": {
		"@type": "Enum",
		"@values": [
			"name"
		]
	},
	"Point": {
		"@inherits": [
			"GeoJSON",
			"Geometry"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"coordinates": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},
		"type": {
			"@id": "Point_Type",
			"@type": "Enum",
			"@values": [
				"Point"
			]
		}
	},
	"Point_Type": {
		"@type": "Enum",
		"@values": [
			"Point"
		]
	},
	"Polygon": {
		"@inherits": [
			"GeoJSON",
			"Geometry"
		],
		"@type": "Class",
		"@unfoldable": [],
		"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		}, 
		"coordinates": {
			"@class": "xsd:decimal",
			"@dimensions": 3,
			"@type": "Array"
		},
		"type": {
			"@id": "Polygon_Type",
			"@type": "Enum",
			"@values": [
				"Polygon"
			]
		}
	},
	"Polygon_Type": {
		"@type": "Enum",
		"@values": [
			"Polygon"
		]
	}
}

/** ----- POINT TYPE ------------- */
// expected data on Create 
// database stores decimals in the form strings under the hood
// so we make string comparisons

/** ----- POINT TYPE ------------- */
export const POINT_DATA_TYPE_CREATE_DATA = {
	"@type": "Point",
	"bbox": ["49.505", "-2.09", "53.505", "2.09"],
	"coordinates": [
		"51.4974896136178", 
		"-0.13607115537826134"
	],
	"type": "Point"
}

export const POINT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
	"@type": "Point",
	"bbox": ["49.505", "-2.09", "53.505", "2.09"],
	"coordinates": [
		"51.4974896136178", 
		"-0.13607115537826134"
	],
	"type": "Point"
}

export const POINT_DATA_TYPE_EDIT_DATA = {
	"@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
	"@type": "Point",
	"bbox": ["50.505", "-29.09", "52.505", "29.09"],
	"coordinates": [
		"51.4974896136178", 
		"-0.13607115537826134"
	],
	"type": "Point"
}

// create config 
export const POINT_CREATE_CONFIG = {
	frame: GEO_JSON_FRAME, 
	uiFrame: {},
	type: "Point",
	formData: {},
	input: POINT_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}

// create config 
export const POINT_EDIT_CONFIG = {
	frame: GEO_JSON_FRAME, 
	uiFrame: {},
	type: "Point",
	formData: POINT_DATA_TYPE_EDIT_DATA_ORIGINAL,
	input: POINT_DATA_TYPE_EDIT_DATA,
	mode: "Create"
}

/** ----- LINE STRING TYPE ------------- */

let LINE_STRING_DATA_TYPE_CREATE_DATA = {
	"@type": "LineString",
	"bbox": ["49.505", "-2.09", "53.505", "2.09"],
	"coordinates": [
		["51.505", "-0.09"],
		["51.51", "-0.1"],
		["51.51", "-0.12"],
	],
	"type": "LineString"
}

// create config 
export const LINE_STRING_CREATE_CONFIG = {
	frame: GEO_JSON_FRAME, 
	uiFrame: {},
	type: "LineString",
	formData: {},
	input: LINE_STRING_DATA_TYPE_CREATE_DATA,
	mode: "Create"
}
