"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.XSD_DATA_TYPE_PREFIX = exports.XDD_DATA_TYPE_PREFIX = exports.VIEW = exports.VALUE_HASH_KEY = exports.VALUES = exports.UNFOLDABLE = exports.UI_HIDDEN_ARRAY_OPTIONS = exports.TYPE = exports.SYS_UNIT_TYPE_PREFIX = exports.SUBDOCUMENT = exports.STRING_TYPE = exports.SET_UI_ARRAY_OPTIONS = exports.SET = exports.SELECTED_LANGUAGE = exports.RENDER_AS = exports.REFRESH = exports.RDF_VALUE_LABEL = exports.RDF_VALUE = exports.RDF_LANG_STRING = exports.RDF_LANGUAGE_LABEL = exports.RDF_LANGUAGE = exports.RDF_DATA_TYPE_PREFIX = exports.PROPERTY = exports.PRIMITIVE_DATA_TYPES = exports.POLYLINE = exports.POLYGON_TYPE_DIMENSIONS = exports.POLYGON = exports.POINT_TYPE_DIMENSIONS = exports.POINT_MIN_ITEMS = exports.POINT = exports.PLACEHOLDER = exports.ORDER_BY = exports.OPTIONAL = exports.ONEOF_SELECTED = exports.ONEOFVALUES = exports.OBJECT_TYPE = exports.NUMBER_TYPE = exports.MULTIPOLYGON = exports.METADATA = exports.LONGITUDE = exports.LNG = exports.LIST_UI_ARRAY_OPTIONS = exports.LIST = exports.LINK_NEW_DOCUMENT = exports.LINK_EXISTING_DOCUMENT = exports.LINE_STRING_TYPE_DIMENSIONS = exports.LINE_STRING_TYPE = exports.LATITUDE = exports.LAT = exports.LANGUAGE = exports.LABEL = exports.JSON_TYPE = exports.JSON_EDITOR_WIDTH = exports.JSON_EDITOR_HEIGHT = exports.INHERITS = exports.HIDE_FIELD_LABEL = exports.GEO_FRAMES_ARRAY_OPTIONS = exports.GEOMETRY_COLLECTION = exports.GEOMETRY_ARRAY = exports.GEOMETRY = exports.GEOMETRIES = exports.GEOJSON_ARRAY_TYPES = exports.GEOJSON = exports.FEATURE_COLLECTION = exports.FEATURE = exports.ENUM = exports.EDIT = exports.DOCUMENTS = exports.DOCUMENTATION = exports.DOCUMENT = exports.DIMENSIONS = exports.DEFAULT_LANGUAGE = exports.DATE_TYPE = exports.CREATE = exports.COORDINATES = exports.CONFIG = exports.COMMENT = exports.CLASSNAME = exports.CLASS = exports.CHOICE_SUBDOCUMENT = exports.B_BOX = exports.BORDER = exports.BOOLEAN_TYPE = exports.BBOX_MIN_ITEMS = exports.ARRAY_TYPE = exports.ARRAY = void 0;
var _leaflet = _interopRequireDefault(require("leaflet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// constants 
var TYPE = "@type";
exports.TYPE = TYPE;
var CLASS = "@class";
exports.CLASS = CLASS;
var INHERITS = "@inherits";

// info constanst to help with rjsf forms
exports.INHERITS = INHERITS;
var PLACEHOLDER = "@placeholder";
exports.PLACEHOLDER = PLACEHOLDER;
var CONFIG = "@config";

// layout types
exports.CONFIG = CONFIG;
var OPTIONAL = "Optional";
exports.OPTIONAL = OPTIONAL;
var SET = "Set";
exports.SET = SET;
var LIST = "List";
exports.LIST = LIST;
var ARRAY = "Array";
exports.ARRAY = ARRAY;
var PRIMITIVE_DATA_TYPES = "DataTypes";
exports.PRIMITIVE_DATA_TYPES = PRIMITIVE_DATA_TYPES;
var ENUM = "Enum";
exports.ENUM = ENUM;
var DOCUMENTS = "DocumentLink";
exports.DOCUMENTS = DOCUMENTS;
var SUBDOCUMENT = "@subdocument";
exports.SUBDOCUMENT = SUBDOCUMENT;
var CHOICE_SUBDOCUMENT = "ChoiceSubDocument";
exports.CHOICE_SUBDOCUMENT = CHOICE_SUBDOCUMENT;
var ONEOFVALUES = "@oneOf";

// Value Hash
exports.ONEOFVALUES = ONEOFVALUES;
var VALUE_HASH_KEY = "ValueHash";

// mode
exports.VALUE_HASH_KEY = VALUE_HASH_KEY;
var CREATE = "Create";
exports.CREATE = CREATE;
var EDIT = "Edit";
exports.EDIT = EDIT;
var VIEW = "View";

// constants
exports.VIEW = VIEW;
var DEFAULT_LANGUAGE = "en";
exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
var SELECTED_LANGUAGE = "@selectedLanguge";
exports.SELECTED_LANGUAGE = SELECTED_LANGUAGE;
var ONEOF_SELECTED = "@selected";

// DATA PROPERTY TYPE
exports.ONEOF_SELECTED = ONEOF_SELECTED;
var STRING_TYPE = "string";
exports.STRING_TYPE = STRING_TYPE;
var OBJECT_TYPE = "object";
exports.OBJECT_TYPE = OBJECT_TYPE;
var JSON_TYPE = "object";
exports.JSON_TYPE = JSON_TYPE;
var ARRAY_TYPE = "array";
exports.ARRAY_TYPE = ARRAY_TYPE;
var NUMBER_TYPE = "number";
exports.NUMBER_TYPE = NUMBER_TYPE;
var BOOLEAN_TYPE = "boolean";
exports.BOOLEAN_TYPE = BOOLEAN_TYPE;
var DATE_TYPE = "string";
exports.DATE_TYPE = DATE_TYPE;
var DOCUMENT = "Class";
exports.DOCUMENT = DOCUMENT;
var RDF_LANG_STRING = "rdf:langString";
exports.RDF_LANG_STRING = RDF_LANG_STRING;
var RDF_DATA_TYPE_PREFIX = "rdf:";
exports.RDF_DATA_TYPE_PREFIX = RDF_DATA_TYPE_PREFIX;
var XSD_DATA_TYPE_PREFIX = "xsd:";
exports.XSD_DATA_TYPE_PREFIX = XSD_DATA_TYPE_PREFIX;
var XDD_DATA_TYPE_PREFIX = "xdd:";
exports.XDD_DATA_TYPE_PREFIX = XDD_DATA_TYPE_PREFIX;
var SYS_UNIT_TYPE_PREFIX = "sys:";

// rdf:language constants
exports.SYS_UNIT_TYPE_PREFIX = SYS_UNIT_TYPE_PREFIX;
var RDF_LANGUAGE_LABEL = "language";
exports.RDF_LANGUAGE_LABEL = RDF_LANGUAGE_LABEL;
var RDF_VALUE_LABEL = "value";
exports.RDF_VALUE_LABEL = RDF_VALUE_LABEL;
var RDF_LANGUAGE = "@lang";
exports.RDF_LANGUAGE = RDF_LANGUAGE;
var RDF_VALUE = "@value";

// DOCUMENTATION constants
exports.RDF_VALUE = RDF_VALUE;
var DOCUMENTATION = "@documentation";
exports.DOCUMENTATION = DOCUMENTATION;
var LANGUAGE = "@language";
exports.LANGUAGE = LANGUAGE;
var PROPERTY = "@properties";
exports.PROPERTY = PROPERTY;
var COMMENT = "@comment";
exports.COMMENT = COMMENT;
var LABEL = "@label";
exports.LABEL = LABEL;
var VALUES = "@values";

// META DATA constants
exports.VALUES = VALUES;
var METADATA = "@metadata";
exports.METADATA = METADATA;
var RENDER_AS = "render_as";
exports.RENDER_AS = RENDER_AS;
var ORDER_BY = "order_by";
exports.ORDER_BY = ORDER_BY;
var HIDE_FIELD_LABEL = "hideFieldLabel";

// DOCUMENT LINK CONSTANTS 
exports.HIDE_FIELD_LABEL = HIDE_FIELD_LABEL;
var LINK_NEW_DOCUMENT = "Create New Document";
exports.LINK_NEW_DOCUMENT = LINK_NEW_DOCUMENT;
var LINK_EXISTING_DOCUMENT = "Link an existing Document";
exports.LINK_EXISTING_DOCUMENT = LINK_EXISTING_DOCUMENT;
var UNFOLDABLE = "@unfoldable";

// SYS JSON UI 
exports.UNFOLDABLE = UNFOLDABLE;
var JSON_EDITOR_HEIGHT = "200px";
exports.JSON_EDITOR_HEIGHT = JSON_EDITOR_HEIGHT;
var JSON_EDITOR_WIDTH = "100%";

// set ui Array options 
exports.JSON_EDITOR_WIDTH = JSON_EDITOR_WIDTH;
var SET_UI_ARRAY_OPTIONS = {
  addable: true,
  orderable: false,
  removable: true
};

// set ui Array options 
exports.SET_UI_ARRAY_OPTIONS = SET_UI_ARRAY_OPTIONS;
var LIST_UI_ARRAY_OPTIONS = {
  addable: true,
  orderable: true,
  removable: true
};

// hide all controls for array types
exports.LIST_UI_ARRAY_OPTIONS = LIST_UI_ARRAY_OPTIONS;
var UI_HIDDEN_ARRAY_OPTIONS = {
  addable: false,
  orderable: false,
  removable: false
};

// geo JSON array types
exports.UI_HIDDEN_ARRAY_OPTIONS = UI_HIDDEN_ARRAY_OPTIONS;
var GEO_FRAMES_ARRAY_OPTIONS = {
  addable: true,
  orderable: false,
  removable: false
};

// GEO JSON constants
exports.GEO_FRAMES_ARRAY_OPTIONS = GEO_FRAMES_ARRAY_OPTIONS;
var DIMENSIONS = "@dimensions";
exports.DIMENSIONS = DIMENSIONS;
var GEOJSON = "GeoJSON";
exports.GEOJSON = GEOJSON;
var GEOMETRY = "Geometry";
exports.GEOMETRY = GEOMETRY;
var GEOJSON_ARRAY_TYPES = [GEOJSON, GEOMETRY];

// react leaflet constants
exports.GEOJSON_ARRAY_TYPES = GEOJSON_ARRAY_TYPES;
var LNG = "lng";
exports.LNG = LNG;
var LAT = "lat";
exports.LAT = LAT;
var LONGITUDE = "longitude";
exports.LONGITUDE = LONGITUDE;
var LATITUDE = "latitude";
exports.LATITUDE = LATITUDE;
var REFRESH = "refresh";

// geo JSON constants 
exports.REFRESH = REFRESH;
var POINT = "Point";
exports.POINT = POINT;
var LINE_STRING_TYPE = "LineString";
exports.LINE_STRING_TYPE = LINE_STRING_TYPE;
var POLYGON = "Polygon";
exports.POLYGON = POLYGON;
var MULTIPOLYGON = "MultiPolygon";
exports.MULTIPOLYGON = MULTIPOLYGON;
var POLYLINE = "Polyline";
exports.POLYLINE = POLYLINE;
var GEOMETRY_COLLECTION = "GeometryCollection";
exports.GEOMETRY_COLLECTION = GEOMETRY_COLLECTION;
var FEATURE_COLLECTION = "FeatureCollection";
exports.FEATURE_COLLECTION = FEATURE_COLLECTION;
var GEOMETRIES = "geometries";
exports.GEOMETRIES = GEOMETRIES;
var FEATURE = "feature";
exports.FEATURE = FEATURE;
var B_BOX = "bbox";
exports.B_BOX = B_BOX;
var COORDINATES = "Coordinates";
exports.COORDINATES = COORDINATES;
var GEOMETRY_ARRAY = ["GeometryCollection", "LineString", "MultiPolygon", "Point", "Polygon"];

// map icon component
exports.GEOMETRY_ARRAY = GEOMETRY_ARRAY;
var _default = _leaflet["default"].icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
}); // MIN ITEMS PER DIMENSIONS
exports["default"] = _default;
var BBOX_MIN_ITEMS = 4;
exports.BBOX_MIN_ITEMS = BBOX_MIN_ITEMS;
var POINT_MIN_ITEMS = 2;

// DIMENSION DEFINITIONS
exports.POINT_MIN_ITEMS = POINT_MIN_ITEMS;
var POINT_TYPE_DIMENSIONS = 1;
exports.POINT_TYPE_DIMENSIONS = POINT_TYPE_DIMENSIONS;
var LINE_STRING_TYPE_DIMENSIONS = 2;
exports.LINE_STRING_TYPE_DIMENSIONS = LINE_STRING_TYPE_DIMENSIONS;
var POLYGON_TYPE_DIMENSIONS = 3;

// ui frame 
exports.POLYGON_TYPE_DIMENSIONS = POLYGON_TYPE_DIMENSIONS;
var CLASSNAME = "className";
exports.CLASSNAME = CLASSNAME;
var BORDER = "@border";
exports.BORDER = BORDER;