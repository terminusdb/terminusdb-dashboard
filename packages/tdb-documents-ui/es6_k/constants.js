"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XSD_DATA_TYPE_PREFIX = exports.XDD_DATA_TYPE_PREFIX = exports.VIEW = exports.VALUES = exports.UNFOLDABLE = exports.TYPE = exports.SYS_UNIT_TYPE_PREFIX = exports.SUBDOCUMENT = exports.STRING_TYPE = exports.SET_UI_HIDDEN_ARRAY_OPTIONS = exports.SET_UI_ARRAY_OPTIONS = exports.SET = exports.SELECTED_LANGUAGE = exports.RENDER_AS = exports.RDF_LANG_STRING = exports.RDF_DATA_TYPE_PREFIX = exports.PROPERTY = exports.PLACEHOLDER = exports.ORDER_BY = exports.OPTIONAL = exports.OBJECT_TYPE = exports.NUMBER_TYPE = exports.METADATA = exports.LIST_UI_ARRAY_OPTIONS = exports.LIST = exports.LINK_NEW_DOCUMENT = exports.LINK_EXISTING_DOCUMENT = exports.LANGUAGE = exports.LABEL = exports.JSON_TYPE = exports.JSON_EDITOR_WIDTH = exports.JSON_EDITOR_HEIGHT = exports.ENUM = exports.EDIT = exports.DOCUMENTATION = exports.DOCUMENT = exports.DEFAULT_LANGUAGE = exports.DATE_TYPE = exports.CREATE = exports.CONFIG = exports.COMMENT = exports.CLASS = exports.BOOLEAN_TYPE = exports.ARRAY_TYPE = void 0;
// constants 
var TYPE = "@type";
exports.TYPE = TYPE;
var CLASS = "@class";

// info constanst to help with rjsf forms
exports.CLASS = CLASS;
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
var ENUM = "Enum";
exports.ENUM = ENUM;
var SUBDOCUMENT = "@subdocument";

// mode
exports.SUBDOCUMENT = SUBDOCUMENT;
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

// DATA PROPERTY TYPE
exports.SELECTED_LANGUAGE = SELECTED_LANGUAGE;
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

// DOCUMENTATION constants
exports.SYS_UNIT_TYPE_PREFIX = SYS_UNIT_TYPE_PREFIX;
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

// DOCUMENT LINK CONSTANTS 
exports.ORDER_BY = ORDER_BY;
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
var SET_UI_HIDDEN_ARRAY_OPTIONS = {
  addable: false,
  orderable: false,
  removable: false
};
exports.SET_UI_HIDDEN_ARRAY_OPTIONS = SET_UI_HIDDEN_ARRAY_OPTIONS;