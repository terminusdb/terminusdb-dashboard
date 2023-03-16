

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
		/*"bbox": {
			"@class": "xsd:decimal",
			"@dimensions": 1,
			"@type": "Array"
		},*/
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

// expected data on Create 
// database stores decimals in the form strings under the hood
// so we make string comparisons
export const POINT_DATA_TYPE_CREATE_DATA = {
	"@type": "Point",
	"coordinates": [
		"53.34393439514184",
		"-6.254528686083641"
	],
	"type": "Point"
} 

export const POINT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
	"@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
	"@type": "Point",
	"coordinates": [
		"53.34393439514184",
		"-6.254528686083641"
	],
	"type": "Point"
} 

export const POINT_DATA_TYPE_EDIT_DATA = {
	"@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
	"@type": "Point",
	"coordinates": [ 
		"27.103096853590444",
		"17.376148189841988"
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

// edit config 
export const POINT_EDIT_CONFIG = {
	frame: GEO_JSON_FRAME, 
	uiFrame: {},
	type: "Point",
	formData: POINT_DATA_TYPE_EDIT_DATA_ORIGINAL,
	input: POINT_DATA_TYPE_EDIT_DATA,
	mode: "Edit"
}

// view config 
export const POINT_VIEW_CONFIG = {
	frame: GEO_JSON_FRAME, 
	uiFrame: {},
	type: "Point",
	formData: POINT_DATA_TYPE_EDIT_DATA,
	mode: "View"
}
