"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUBDOCUMENT_LINE_STRING_EDIT_DATA = exports.SUBDOCUMENT_LINE_STRING_CREATE_DATA = exports.POINT_EDIT_CONFIG = exports.POINT_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.POINT_DATA_TYPE_EDIT_DATA = exports.POINT_DATA_TYPE_CREATE_DATA = exports.POINT_CREATE_CONFIG = exports.MULTI_POLYGON_EDIT_CONFIG = exports.MULTI_POLYGON_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.MULTI_POLYGON_DATA_TYPE_EDIT_DATA = exports.MULTI_POLYGON_DATA_TYPE_CREATE_DATA = exports.MULTI_POLYGON_CREATE_CONFIG = exports.LINE_STRING_EDIT_CONFIG = exports.LINE_STRING_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.LINE_STRING_DATA_TYPE_CREATE_DATA = exports.LINE_STRING_CREATE_CONFIG = exports.GEO_JSON_FRAME = exports.EDIT_SUBDOCUMENT_LINE_STRING_CONFIG = exports.CREATE_SUBDOCUMENT_LINE_STRING_CONFIG = void 0;
var _GEO_JSON_FRAME;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// GeoJSON frames
var GEO_JSON_FRAME = (_GEO_JSON_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context"
  },
  "Asset": {
    "@key": {
      "@fields": ["asset_identifier"],
      "@type": "Lexical"
    },
    "@type": "Class",
    "@metadata": {
      "render_as": {
        "location": {
          "expand": true
        }
      }
    },
    "location": {
      "@class": "LineStringLocation",
      "@subdocument": []
    }
  },
  "LineStringLocation": {
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
    "@type": "Class",
    "geometry_location": {
      "@class": [{
        "@class": "LineString_NOBBBOX",
        "@subdocument": []
      }],
      "@type": "Optional"
    }
  },
  "LineString_NOBBBOX": {
    "@inherits": ["GeoJSON", "Geometry"],
    "@type": "Class",
    "@unfoldable": [],
    "coordinates": {
      "@class": "xsd:decimal",
      "@dimensions": 2,
      "@type": "Array"
    },
    "type": {
      "@id": "LineString_Type",
      "@type": "Enum",
      "@values": ["LineString"]
    }
  },
  "MultiPolygon_Type": {
    "@type": "Enum",
    "@values": ["MultiPolygon"]
  },
  "Feature": {
    "@inherits": ["GeoJSON"],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "centerline": {
      "@class": ["GeometryCollection", "LineString", "MultiPolygon", "Point", "Polygon"],
      "@type": "Optional"
    },
    "geometry": ["GeometryCollection", "LineString", "MultiPolygon", "Point", "Polygon"],
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
      "@values": ["Feature"]
    }
  },
  "FeatureCollection": {
    "@inherits": ["GeoJSON"],
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
      "@values": ["FeatureCollection"]
    }
  },
  "FeatureCollection_Type": {
    "@type": "Enum",
    "@values": ["FeatureCollection"]
  },
  "Feature_Type": {
    "@type": "Enum",
    "@values": ["Feature"]
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
    "@inherits": ["GeoJSON"],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    }
  },
  "GeometryCollection": {
    "@inherits": ["GeoJSON", "Geometry"],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "geometries": {
      "@class": ["GeometryCollection", "LineString", "MultiPolygon", "Point", "Polygon"],
      "@type": "Set"
    },
    "type": {
      "@id": "GeometryCollection_Type",
      "@type": "Enum",
      "@values": ["GeometryCollection"]
    }
  },
  "GeometryCollection_Type": {
    "@type": "Enum",
    "@values": ["GeometryCollection"]
  },
  "LineString": {
    "@inherits": ["GeoJSON", "Geometry"],
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
      "@values": ["LineString"]
    }
  },
  "LineString_Type": {
    "@type": "Enum",
    "@values": ["LineString"]
  },
  "MultiPolygon": {
    "@inherits": ["GeoJSON", "Geometry"],
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
      "@values": ["MultiPolygon"]
    }
  }
}, _defineProperty(_GEO_JSON_FRAME, "MultiPolygon_Type", {
  "@type": "Enum",
  "@values": ["MultiPolygon"]
}), _defineProperty(_GEO_JSON_FRAME, "Name_Type", {
  "@type": "Enum",
  "@values": ["name"]
}), _defineProperty(_GEO_JSON_FRAME, "Point", {
  "@inherits": ["GeoJSON", "Geometry"],
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
    "@values": ["Point"]
  }
}), _defineProperty(_GEO_JSON_FRAME, "Point_Type", {
  "@type": "Enum",
  "@values": ["Point"]
}), _defineProperty(_GEO_JSON_FRAME, "Polygon", {
  "@inherits": ["GeoJSON", "Geometry"],
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
    "@values": ["Polygon"]
  }
}), _defineProperty(_GEO_JSON_FRAME, "Polygon_Type", {
  "@type": "Enum",
  "@values": ["Polygon"]
}), _GEO_JSON_FRAME);

/** ----- POINT TYPE ------------- */
// expected data on Create 
// database stores decimals in the form strings under the hood
// so we make string comparisons

/** ----- POINT TYPE ------------- */
exports.GEO_JSON_FRAME = GEO_JSON_FRAME;
var POINT_DATA_TYPE_CREATE_DATA = {
  "@type": "Point",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": ["51.4974896136178", "-0.13607115537826134"],
  "type": "Point"
};
exports.POINT_DATA_TYPE_CREATE_DATA = POINT_DATA_TYPE_CREATE_DATA;
var POINT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
  "@type": "Point",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": ["51.4974896136178", "-0.13607115537826134"],
  "type": "Point"
};
exports.POINT_DATA_TYPE_EDIT_DATA_ORIGINAL = POINT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var POINT_DATA_TYPE_EDIT_DATA = {
  "@id": "Point/f5d210ec6071a06b312dd1f7c6173eee1099ce52046755ca8153aa0c37d98948",
  "@type": "Point",
  "bbox": ["50.505", "-29.09", "52.505", "29.09"],
  "coordinates": ["51.4974896136178", "-0.13607115537826134"],
  "type": "Point"
};

// create config 
exports.POINT_DATA_TYPE_EDIT_DATA = POINT_DATA_TYPE_EDIT_DATA;
var POINT_CREATE_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "Point",
  formData: {},
  input: POINT_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// create config 
exports.POINT_CREATE_CONFIG = POINT_CREATE_CONFIG;
var POINT_EDIT_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "Point",
  formData: POINT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  input: POINT_DATA_TYPE_EDIT_DATA,
  mode: "Create"
};

/** ----- LINE STRING TYPE ------------- */
exports.POINT_EDIT_CONFIG = POINT_EDIT_CONFIG;
var LINE_STRING_DATA_TYPE_CREATE_DATA = {
  "@type": "LineString",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": [["51.505", "-0.09"], ["51.51", "-0.1"], ["51.51", "-0.12"]],
  "type": "LineString"
};
exports.LINE_STRING_DATA_TYPE_CREATE_DATA = LINE_STRING_DATA_TYPE_CREATE_DATA;
var LINE_STRING_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@id": "LineString/234324",
  "@type": "LineString",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": [["51.505", "-0.09"], ["51.51", "-0.1"], ["51.51", "-0.12"]],
  "type": "LineString"
};

// create config 
exports.LINE_STRING_DATA_TYPE_EDIT_DATA_ORIGINAL = LINE_STRING_DATA_TYPE_EDIT_DATA_ORIGINAL;
var LINE_STRING_CREATE_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "LineString",
  formData: {},
  input: LINE_STRING_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.LINE_STRING_CREATE_CONFIG = LINE_STRING_CREATE_CONFIG;
var LINE_STRING_EDIT_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "LineString",
  formData: LINE_STRING_DATA_TYPE_EDIT_DATA_ORIGINAL,
  mode: "Create"
};

/** ----- MULTI POLYGON STRING TYPE ------------- */
exports.LINE_STRING_EDIT_CONFIG = LINE_STRING_EDIT_CONFIG;
var MULTI_POLYGON_DATA_TYPE_CREATE_DATA = {
  "@type": "MultiPolygon",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": [[["51.515", "-0.09"], ["51.52", "-0.1"], ["51.52", "-0.12"]]],
  "type": "MultiPolygon"
};
exports.MULTI_POLYGON_DATA_TYPE_CREATE_DATA = MULTI_POLYGON_DATA_TYPE_CREATE_DATA;
var MULTI_POLYGON_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@type": "MultiPolygon",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": [[["51.515", "-0.09"], ["51.52", "-0.1"], ["51.52", "-0.12"]]],
  "type": "MultiPolygon"
};
exports.MULTI_POLYGON_DATA_TYPE_EDIT_DATA_ORIGINAL = MULTI_POLYGON_DATA_TYPE_EDIT_DATA_ORIGINAL;
var MULTI_POLYGON_DATA_TYPE_EDIT_DATA = {
  "@type": "MultiPolygon",
  "bbox": ["49.505", "-2.09", "53.505", "2.09"],
  "coordinates": [[["51.515", "-0.09"], ["51.52", "-0.1"], ["51.52", "-0.12"]]],
  "type": "MultiPolygon"
};
exports.MULTI_POLYGON_DATA_TYPE_EDIT_DATA = MULTI_POLYGON_DATA_TYPE_EDIT_DATA;
var SUBDOCUMENT_LINE_STRING_CREATE_DATA = {
  "location": {
    "@type": "LineStringLocation",
    "geometry_location": {
      "@type": "LineString_NOBBBOX",
      "coordinates": [["11", "11"], ["22", "22"]],
      "type": "LineString"
    }
  },
  "@type": "Asset"
};
exports.SUBDOCUMENT_LINE_STRING_CREATE_DATA = SUBDOCUMENT_LINE_STRING_CREATE_DATA;
var SUBDOCUMENT_LINE_STRING_EDIT_DATA = {
  "location": {
    "@type": "LineStringLocation",
    "geometry_location": {
      "@type": "LineString_NOBBBOX",
      "coordinates": [["1111", "1111"], ["22", "22"], ["33", "33"]],
      "type": "LineString"
    }
  },
  "@type": "Asset"
};

// create config 
exports.SUBDOCUMENT_LINE_STRING_EDIT_DATA = SUBDOCUMENT_LINE_STRING_EDIT_DATA;
var MULTI_POLYGON_CREATE_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "MultiPolygon",
  formData: {},
  input: MULTI_POLYGON_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.MULTI_POLYGON_CREATE_CONFIG = MULTI_POLYGON_CREATE_CONFIG;
var MULTI_POLYGON_EDIT_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "MultiPolygon",
  formData: MULTI_POLYGON_DATA_TYPE_EDIT_DATA_ORIGINAL,
  input: MULTI_POLYGON_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// NESTED 
exports.MULTI_POLYGON_EDIT_CONFIG = MULTI_POLYGON_EDIT_CONFIG;
var CREATE_SUBDOCUMENT_LINE_STRING_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "Asset",
  formData: {},
  input: SUBDOCUMENT_LINE_STRING_CREATE_DATA,
  mode: "Create"
};
exports.CREATE_SUBDOCUMENT_LINE_STRING_CONFIG = CREATE_SUBDOCUMENT_LINE_STRING_CONFIG;
var EDIT_SUBDOCUMENT_LINE_STRING_CONFIG = {
  frame: GEO_JSON_FRAME,
  uiFrame: {},
  type: "Asset",
  formData: SUBDOCUMENT_LINE_STRING_CREATE_DATA,
  input: SUBDOCUMENT_LINE_STRING_EDIT_DATA,
  mode: "Edit"
};
exports.EDIT_SUBDOCUMENT_LINE_STRING_CONFIG = EDIT_SUBDOCUMENT_LINE_STRING_CONFIG;