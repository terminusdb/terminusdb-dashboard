"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XSD_UNSINGNEDBYTE = exports.XSD_UNSIGNEDSHORT = exports.XSD_UNSIGNEDLONG = exports.XSD_UNSIGNEDINT = exports.XSD_TOKEN = exports.XSD_TIME_DURATION = exports.XSD_TIME = exports.XSD_STRING = exports.XSD_SHORT = exports.XSD_POSITIVE_INTEGER = exports.XSD_NORMALIZED_STRING = exports.XSD_NONPOSITIVEINTEGER = exports.XSD_NONNEGATIVEINTEGER = exports.XSD_NMTOKEN = exports.XSD_NEGATIVEINTEGER = exports.XSD_NCNAME = exports.XSD_NAME = exports.XSD_LONG = exports.XSD_LANGUAGE = exports.XSD_INTEGER = exports.XSD_INT = exports.XSD_HEXBINARY = exports.XSD_G_YEAR_MONTH_DURACTION = exports.XSD_G_YEAR_MONTH = exports.XSD_G_YEAR = exports.XSD_G_MONTH_DAY = exports.XSD_G_MONTH = exports.XSD_G_DAY_TIME_DURACTION = exports.XSD_G_DAY = exports.XSD_FLOAT = exports.XSD_DOUBLE = exports.XSD_DECIMAL = exports.XSD_DATE_TIMESTAMP = exports.XSD_DATE_TIME = exports.XSD_DATE = exports.XSD_BYTE = exports.XSD_BOOLEAN = exports.XSD_BASE64BINARY = exports.XSD_ANY_URI = exports.XDD_URL = exports.XDD_HTML = exports.SYS_JSON_TYPE = exports.RDF_LANGSTRING = exports.MARKDOWN = void 0;
var XSD_STRING = "xsd:string";
exports.XSD_STRING = XSD_STRING;
var XSD_ANY_URI = "xsd:anyURI";
exports.XSD_ANY_URI = XSD_ANY_URI;
var XSD_NMTOKEN = "xsd:NMTOKEN"; // XML NMTOKENs
exports.XSD_NMTOKEN = XSD_NMTOKEN;
var XSD_NAME = "xsd:Name"; // XML Names
exports.XSD_NAME = XSD_NAME;
var XSD_NCNAME = "xsd:NCName"; // XML NCNames
//Encoded binary data
exports.XSD_NCNAME = XSD_NCNAME;
var XSD_HEXBINARY = "xsd:hexBinary"; //Hex-encoded binary data
exports.XSD_HEXBINARY = XSD_HEXBINARY;
var XSD_BASE64BINARY = "xsd:base64Binary"; //Base64-encoded binary data

// Limited-range integer numbers
exports.XSD_BASE64BINARY = XSD_BASE64BINARY;
var XDD_HTML = "xdd:html";
exports.XDD_HTML = XDD_HTML;
var XSD_BYTE = "xsd:byte"; //  -128…+127 (8 bit) 
exports.XSD_BYTE = XSD_BYTE;
var XSD_SHORT = "xsd:short"; //    -32768…+32767 (16 bit) 
exports.XSD_SHORT = XSD_SHORT;
var XSD_INT = "xsd:int"; //   -2147483648…+2147483647 (32 bit) |
exports.XSD_INT = XSD_INT;
var XSD_LONG = "xsd:long"; //    -9223372036854775808…+9223372036854775807 (64 bit) |
exports.XSD_LONG = XSD_LONG;
var XSD_UNSINGNEDBYTE = "xsd:unsignedByte"; //    0…255 (8 bit) |
exports.XSD_UNSINGNEDBYTE = XSD_UNSINGNEDBYTE;
var XSD_UNSIGNEDSHORT = "xsd:unsignedShort"; //|    0…65535 (16 bit) |
exports.XSD_UNSIGNEDSHORT = XSD_UNSIGNEDSHORT;
var XSD_UNSIGNEDINT = "xsd:unsignedInt"; //|    0…4294967295 (32 bit) |
exports.XSD_UNSIGNEDINT = XSD_UNSIGNEDINT;
var XSD_UNSIGNEDLONG = "xsd:unsignedLong"; // |    0…18446744073709551615 (64 bit) |
exports.XSD_UNSIGNEDLONG = XSD_UNSIGNEDLONG;
var XSD_POSITIVE_INTEGER = "xsd:positiveInteger"; // |    Integer numbers >0 |
exports.XSD_POSITIVE_INTEGER = XSD_POSITIVE_INTEGER;
var XSD_NONNEGATIVEINTEGER = "xsd:nonNegativeInteger"; // |    Integer numbers ≥0 |
exports.XSD_NONNEGATIVEINTEGER = XSD_NONNEGATIVEINTEGER;
var XSD_NEGATIVEINTEGER = "xsd:negativeInteger"; // |    Integer numbers <0 |
exports.XSD_NEGATIVEINTEGER = XSD_NEGATIVEINTEGER;
var XSD_NONPOSITIVEINTEGER = "xsd:nonPositiveInteger"; //Integer numbers ≤0
exports.XSD_NONPOSITIVEINTEGER = XSD_NONPOSITIVEINTEGER;
var XDD_URL = "xdd:url";
exports.XDD_URL = XDD_URL;
var XSD_NORMALIZED_STRING = "xsd:normalizedString";
exports.XSD_NORMALIZED_STRING = XSD_NORMALIZED_STRING;
var XSD_TOKEN = "xsd:NMTOKEN";
exports.XSD_TOKEN = XSD_TOKEN;
var XSD_DECIMAL = "xsd:decimal";
exports.XSD_DECIMAL = XSD_DECIMAL;
var XSD_DOUBLE = "xsd:double";
exports.XSD_DOUBLE = XSD_DOUBLE;
var XSD_FLOAT = "xsd:float ";
exports.XSD_FLOAT = XSD_FLOAT;
var XSD_INTEGER = "xsd:integer";
exports.XSD_INTEGER = XSD_INTEGER;
var XSD_DATE_TIME = "xsd:dateTime";
exports.XSD_DATE_TIME = XSD_DATE_TIME;
var XSD_DATE_TIMESTAMP = "xsd:dateTimeStamp";
exports.XSD_DATE_TIMESTAMP = XSD_DATE_TIMESTAMP;
var XSD_G_YEAR = "xsd:gYear";
exports.XSD_G_YEAR = XSD_G_YEAR;
var XSD_TIME = "xsd:time";
exports.XSD_TIME = XSD_TIME;
var XSD_G_YEAR_MONTH = "xsd:gYearMonth";
exports.XSD_G_YEAR_MONTH = XSD_G_YEAR_MONTH;
var XSD_G_YEAR_MONTH_DURACTION = "xsd:yearMonthDuration";
exports.XSD_G_YEAR_MONTH_DURACTION = XSD_G_YEAR_MONTH_DURACTION;
var XSD_G_DAY_TIME_DURACTION = "xsd:dayTimeDuration";
exports.XSD_G_DAY_TIME_DURACTION = XSD_G_DAY_TIME_DURACTION;
var XSD_G_MONTH = "xsd:gMonth";
exports.XSD_G_MONTH = XSD_G_MONTH;
var XSD_G_MONTH_DAY = "xsd:gMonthDay";
exports.XSD_G_MONTH_DAY = XSD_G_MONTH_DAY;
var XSD_G_DAY = "xsd:gDay";
exports.XSD_G_DAY = XSD_G_DAY;
var XSD_TIME_DURATION = "xsd:duration";
exports.XSD_TIME_DURATION = XSD_TIME_DURATION;
var XSD_DATE = "xsd:date";
exports.XSD_DATE = XSD_DATE;
var XSD_BOOLEAN = "xsd:boolean";
exports.XSD_BOOLEAN = XSD_BOOLEAN;
var XSD_LANGUAGE = "xsd:language";
exports.XSD_LANGUAGE = XSD_LANGUAGE;
var RDF_LANGSTRING = "rdf:langString";
exports.RDF_LANGSTRING = RDF_LANGSTRING;
var SYS_JSON_TYPE = "sys:JSON";
exports.SYS_JSON_TYPE = SYS_JSON_TYPE;
var MARKDOWN = "markdown";
exports.MARKDOWN = MARKDOWN;