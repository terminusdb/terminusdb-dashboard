// DATA PROPERTY TYPE
export const STRING_TYPE="string"
export const JSON_TYPE="object"
export const NUMBER_TYPE="number"
export const BOOLEAN_TYPE="boolean"
export const DATE_TYPE="string"
export const RDF_LANG_STRING="rdf:langString"
export const RDF_DATA_TYPE_PREFIX = "rdf:"
export const XSD_DATA_TYPE_PREFIX = "xsd:"
export const XDD_DATA_TYPE_PREFIX = "xdd:"
export const SYS_UNIT_TYPE_PREFIX = "sys:"
export const XSD_STRING="xsd:string"
export const XSD_ANY_URI="xsd:anyURI"
export const XSD_NMTOKEN="xsd:NMTOKEN" // XML NMTOKENs
export const XSD_NAME="xsd:Name" // XML Names
export const XSD_NCNAME="xsd:NCName" // XML NCNames
//Encoded binary data
export const XSD_HEXBINARY="xsd:hexBinary" //Hex-encoded binary data
export const XSD_BASE64BINARY="xsd:base64Binary" //Base64-encoded binary data

// Limited-range integer numbers
export const XSD_BYTE =  "xsd:byte" //  -128…+127 (8 bit) 
export const XSD_SHORT = "xsd:short" //    -32768…+32767 (16 bit) 
export const XSD_INT =  "xsd:int" //   -2147483648…+2147483647 (32 bit) |
export const XSD_LONG = "xsd:long" //    -9223372036854775808…+9223372036854775807 (64 bit) |
export const XSD_UNSINGNEDBYTE =  "xsd:unsignedByte"//    0…255 (8 bit) |
export const XSD_UNSIGNEDSHORT = "xsd:unsignedShort" //|    0…65535 (16 bit) |
export const XSD_UNSIGNEDINT = "xsd:unsignedInt" //|    0…4294967295 (32 bit) |
export const XSD_UNSIGNEDLONG = "xsd:unsignedLong"// |    0…18446744073709551615 (64 bit) |
export const XSD_POSITIVE_INTEGER="xsd:positiveInteger" // |    Integer numbers >0 |
export const XSD_NONNEGATIVEINTEGER = "xsd:nonNegativeInteger" // |    Integer numbers ≥0 |
export const XSD_NEGATIVEINTEGER = "xsd:negativeInteger" // |    Integer numbers <0 |
export const XSD_NONPOSITIVEINTEGER = "xsd:nonPositiveInteger" //Integer numbers ≤0

export const XDD_URL="xdd:url"
export const XSD_NORMALIZED_STRING="xsd:normalizedString"
export const XSD_TOKEN="xsd:NMTOKEN"
export const XSD_DECIMAL="xsd:decimal"
export const XSD_DOUBLE = "xsd:double"
export const XSD_FLOAT= "xsd:float "

export const XSD_INTEGER="xsd:integer"
export const XSD_DATE_TIME="xsd:dateTime"
export const XSD_DATE_TIMESTAMP="xsd:dateTimeStamp"
export const XSD_G_YEAR= "xsd:gYear"
export const XSD_TIME= "xsd:time"
export const XSD_G_YEAR_MONTH= "xsd:gYearMonth"
export const XSD_G_YEAR_MONTH_DURACTION= "xsd:yearMonthDuration"
export const XSD_G_DAY_TIME_DURACTION= "xsd:dayTimeDuration"

export const XSD_G_MONTH= "xsd:gMonth"
export const XSD_G_MONTH_DAY= "xsd:gMonthDay"
export const XSD_G_DAY= "xsd:gDay"
export const XSD_TIME_DURATION= "xsd:duration"
export const XSD_DATE= "xsd:date"
export const XSD_BOOLEAN="xsd:boolean"
export const XSD_LANGUAGE="xsd:language"
export const RDF_LANGSTRING ="rdf:langString"


//rdf:langString

export const SYS_JSON_TYPE="sys:JSON"

export const SUBDOCUMENT="@subdocument"
export const DOCUMENTATION="@documentation"
export const ONEOFSUBDOCUMENTS="OneOfSubDocuments"
export const SELECTED_LANGUAGE="@selectedLanguge"
export const OPTIONAL="Optional"
export const SET="Set"
export const LIST="List"
export const DOCUMENT="Class"
export const ENUM="Enum"
export const DATA="DATA"
export const DATA_TYPE="DATA_TYPE"
export const SUBDOCUMENT_TYPE="SUBDOCUMENT_TYPE"
export const SUBDOCUMENT_CONSTRUCTED_FRAME="CONSTRUCTED_SUBDOCUMENT"
export const LATITUDE="Latitude"
export const LONGITUDE="Longitude"
export const GEO_CORDINATES="GeoCoordinates"
export const ONEOFCLASSES="OneOfClasses"
export const CHOICESUBCLASSES="ChoiceSubClasses"
export const CHOICECLASSES="ChoiceClasses"
export const ONEOFVALUES="@oneOf"
export const COORDINATES="coordinates"
export const INFO="info"

// Meta data constants
export const METADATA="@metadata"
export const RENDER_AS="render_as"
export const WIDGET="widget"
export const CODE_MIRROR_MIN_HEIGHT="minHeight"
export const CODE_MIRROR_LINE_NUMBERS="displayLines"
export const CODE_MIRROR_THEME="theme"

export const BASIC_CODE_MIRROR_CONFIG =  {
  [CODE_MIRROR_MIN_HEIGHT]:"100px", 
  [CODE_MIRROR_LINE_NUMBERS]:true, 
  [CODE_MIRROR_THEME]:"dark"
}

// Meta data types
export const MARKDOWN="markdown"
export const HTML="HTML"


// geo frame constants
export const ARRAY="Array"
export const DIMENSION= "@dimensions"
export const POINT_TYPE="Point"

export const POINT_TYPE_DIMENSION=1
export const LINE_STRING_TYPE_DIMENSION=2
export const POLYGON_STRING_TYPE_DIMENSION=3

// react leaflet constants
export const LNG="lng"
export const LAT="lat"
export const REFRESH="refresh"

// geo JSON constants 
export const POINTS="Points"
export const LINE_STRING_TYPE="LineString"
export const POLYGON="Polygon"
export const MULTIPOLYGON="MultiPolygon"
export const POLYLINE="Polyline"
export const GEOMETRY_COLLECTION="GeometryCollection"
export const FEATURE_COLLECTION="FeatureCollection"
export const GEOMETRIES="geometries"
export const FEATURE="feature"
export const B_BOX="bbox"
// geometry arrays
export const GEOMETRY_ARRAY=[
    "GeometryCollection",
    "LineString",
   	"MultiPolygon",
  	"Point",
  	"Polygon"
]

export const SYS_UNIT_DATA_TYPE="sys:Unit"


export const CREATE="Create"
export const EDIT="Edit"
export const VIEW="View"

export const VALUE_HASH_KEY="ValueHash"

export const TDB_SCHEMA= "terminusdb:///schema#"




// default select styles
export const SELECT_STYLES = {
  control: (styles) => ({ ...styles, backgroundColor: 'dark', borderColor: "rgb(102, 102, 102) !important", width: "100%" }),
  menu: (styles) => ({ ...styles, backgroundColor: '#444', width: "100%" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "black"
        : isFocused
        ? "black"
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? "black"
            : "black"
          : undefined,
      },
    }
  },
  input: (styles) => {
    return {
        ...styles,
        color: '#fff'
    }
},
singleValue:(styles) => {
    return {
        ...styles,
        color: '#fff'
    }
}
}

export const SELECT_STYLE_KEY="select_styles"

//default subdocument background
export const SUBDOCUMENT_BACKGROUND="bg-secondary"
export const SUBDOCUMENT_STYLE_KEY= "subDocument_styles"

export const UI_FRAME_SELECT_STYLE="select_styles"
export const UI_FRAME_SUBDOCUMENT_STYLE="subDocument_styles"
export const SUBMIT_BUTTON_STYLE_KEY= "submitButton_styles"


// map icon component
import L from "leaflet";

export default L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
})

export const JSON_EDITOR_HEIGHT="200px"
export const JSON_EDITOR_WIDTH="100%"

export const DEFAULT_LANGUAGE="en"

// diff titles
export const ORIGINAL_VALUE="Original UI"
export const CHANGED_VALUE="Changed UI"
export const ORIGINAL_UI_FRAME="originalUIFrame"
export const CHANGED_UI_FRAME="changedUIFrame"

