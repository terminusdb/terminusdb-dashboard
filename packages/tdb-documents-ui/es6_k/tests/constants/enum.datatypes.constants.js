"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.ENUM_DATA_TYPE_FRAME = exports.ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.ENUM_DATA_TYPE_EDIT_DATA = exports.ENUM_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and likes_color field
var ENUM_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Colors": {
    "@type": "Enum",
    "@values": ["red", "blue", "green"]
  },
  "Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "likes_color": {
      "@class": {
        "@id": "Colors",
        "@type": "Enum",
        "@values": ["red", "blue", "green"]
      },
      "@type": "Optional"
    }
  }
};

// expected data on Create 
exports.ENUM_DATA_TYPE_FRAME = ENUM_DATA_TYPE_FRAME;
var ENUM_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "likes_color": "blue"
};

// expected data on Edit 
exports.ENUM_DATA_TYPE_CREATE_DATA = ENUM_DATA_TYPE_CREATE_DATA;
var ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@type": "Person",
  "@id": "Person/234234",
  "likes_color": "blue"
};
exports.ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL;
var ENUM_DATA_TYPE_EDIT_DATA = {
  "@type": "Person",
  "@id": "Person/234234",
  "likes_color": "green"
};

// create config 
exports.ENUM_DATA_TYPE_EDIT_DATA = ENUM_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: ENUM_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: ENUM_DATA_TYPE_CREATE_DATA["likes_color"],
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: ENUM_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: ENUM_DATA_TYPE_EDIT_DATA["likes_color"],
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: ENUM_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: ENUM_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;