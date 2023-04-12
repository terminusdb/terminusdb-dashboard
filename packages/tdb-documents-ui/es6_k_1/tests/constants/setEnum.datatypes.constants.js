"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SET_ENUM_DATA_TYPE_FRAME = exports.SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.SET_ENUM_DATA_TYPE_EDIT_DATA = exports.SET_ENUM_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and likes_color field
var SET_ENUM_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Colors": {
    "@type": "Enum",
    "@values": ["red", "blue", "green", "yellow"]
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
        "@values": ["red", "blue", "green", "yellow"]
      },
      "@type": "Set"
    }
  }
};

// expected data on Create 
exports.SET_ENUM_DATA_TYPE_FRAME = SET_ENUM_DATA_TYPE_FRAME;
var SET_ENUM_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "likes_color": ["red"]
};

// expected data on Edit 
exports.SET_ENUM_DATA_TYPE_CREATE_DATA = SET_ENUM_DATA_TYPE_CREATE_DATA;
var SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@type": "Person",
  "@id": "Person/234234",
  "likes_color": ["red"]
};
exports.SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL = SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL;
var SET_ENUM_DATA_TYPE_EDIT_DATA = {
  "@type": "Person",
  "@id": "Person/234234",
  "likes_color": ["yellow"]
};

// create config 
exports.SET_ENUM_DATA_TYPE_EDIT_DATA = SET_ENUM_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SET_ENUM_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: SET_ENUM_DATA_TYPE_CREATE_DATA["likes_color"],
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SET_ENUM_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SET_ENUM_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SET_ENUM_DATA_TYPE_EDIT_DATA["likes_color"],
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SET_ENUM_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SET_ENUM_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;