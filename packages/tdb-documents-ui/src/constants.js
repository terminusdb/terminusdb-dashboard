//FEATURE
// map icon component
import L from "leaflet";



export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

// constants 
export const TYPE="@type"
export const CLASS="@class"
export const INHERITS="@inherits" 

// info constanst to help with rjsf forms
export const PLACEHOLDER="@placeholder"
export const CONFIG="@config"

// layout types
export const OPTIONAL="Optional"
export const SET="Set"
export const LIST="List"
export const ARRAY="Array"
export const PRIMITIVE_DATA_TYPES="DataTypes"
export const ENUM="Enum"
export const DOCUMENTS="DocumentLink"
export const SUBDOCUMENT="@subdocument"
export const CHOICE_SUBDOCUMENT="ChoiceSubDocument"
export const ONEOFVALUES="@oneOf"

// Value Hash
export const VALUE_HASH_KEY="ValueHash"

// mode
export const CREATE="Create"
export const EDIT="Edit"
export const VIEW="View"
 
// constants
export const DEFAULT_LANGUAGE="en"
export const SELECTED_LANGUAGE="@selectedLanguge"
export const ONEOF_SELECTED="@selected"

// DATA PROPERTY TYPE
export const STRING_TYPE="string"
export const OBJECT_TYPE="object"
export const JSON_TYPE="object"
export const ARRAY_TYPE="array"
export const NUMBER_TYPE="number"
export const BOOLEAN_TYPE="boolean"
export const DATE_TYPE="string"
export const DOCUMENT="Class"
export const RDF_LANG_STRING="rdf:langString"
export const RDF_DATA_TYPE_PREFIX = "rdf:"
export const XSD_DATA_TYPE_PREFIX = "xsd:"
export const XDD_DATA_TYPE_PREFIX = "xdd:"
export const SYS_UNIT_TYPE_PREFIX = "sys:"

// rdf:language constants
export const RDF_LANGUAGE_LABEL="language"
export const RDF_VALUE_LABEL="value"
export const RDF_LANGUAGE="@lang"
export const RDF_VALUE="@value"

// DOCUMENTATION constants
export const DOCUMENTATION="@documentation"
export const LANGUAGE="@language"
export const PROPERTY="@properties"
export const COMMENT="@comment"
export const LABEL="@label"
export const VALUES="@values"

// META DATA constants
export const METADATA="@metadata"
export const RENDER_AS="render_as"
export const ORDER_BY="order_by"
export const HIDE_FIELD_LABEL="hideFieldLabel"

// DOCUMENT LINK CONSTANTS 
export const LINK_NEW_DOCUMENT="Create New Document"
export const LINK_EXISTING_DOCUMENT="Link an existing Document"
export const UNFOLDABLE="@unfoldable"

// SYS JSON UI 
export const JSON_EDITOR_HEIGHT="200px"
export const JSON_EDITOR_WIDTH="100%"

// set ui Array options 
export const SET_UI_ARRAY_OPTIONS= {
  addable: true,
  orderable: false,
  removable: true
}

// set ui Array options 
export const LIST_UI_ARRAY_OPTIONS = {
  addable: true,
  orderable: true,
  removable: true
}

// hide all controls for array types
export const UI_HIDDEN_ARRAY_OPTIONS= {
  addable: false,
  orderable: false,
  removable: false
}

// geo JSON array types
export const GEO_FRAMES_ARRAY_OPTIONS= {
  addable: true,
  orderable: false,
  removable: false
}

// GEO JSON constants
export const DIMENSIONS="@dimensions"
export const GEOJSON="GeoJSON"
export const GEOMETRY="Geometry"
export const GEOJSON_ARRAY_TYPES=[ GEOJSON, GEOMETRY ]

// react leaflet constants
export const LNG="lng"
export const LAT="lat"
export const LONGITUDE="longitude"
export const LATITUDE="latitude"
export const REFRESH="refresh"

// geo JSON constants 
export const POINT="Point"
export const LINE_STRING_TYPE="LineString"
export const POLYGON="Polygon"
export const MULTIPOLYGON="MultiPolygon"
export const POLYLINE="Polyline"
export const GEOMETRY_COLLECTION="GeometryCollection"
export const FEATURE_COLLECTION="FeatureCollection"
export const GEOMETRIES="geometries"
export const FEATURE="Feature"
export const B_BOX="bbox"
export const COORDINATES="Coordinates"
export const COORDINATES_FIELD="coordinates"
export const GEOMETRY_FIELD="geometry"

export const GEOMETRY_ARRAY=[
  GEOMETRY_COLLECTION, 
  LINE_STRING_TYPE,
  MULTIPOLYGON,
  POINT,
  POLYGON
]


// MIN ITEMS PER DIMENSIONS
export const BBOX_MIN_ITEMS=4
export const POINT_MIN_ITEMS=2

// DIMENSION DEFINITIONS
export const POINT_TYPE_DIMENSIONS=1
export const LINE_STRING_TYPE_DIMENSIONS=2 
export const POLYGON_TYPE_DIMENSIONS=3
export const MULTI_POLYGON_TYPE_DIMENSIONS=4

// ui frame 
export const CLASSNAME="className"
export const BORDER="@border"