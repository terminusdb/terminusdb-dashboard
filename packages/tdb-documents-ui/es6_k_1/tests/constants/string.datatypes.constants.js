"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.STRING_DATA_TYPE_FRAME = exports.STRING_DATA_TYPE_EDIT_DATA = exports.STRING_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and Name field
var STRING_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "name": "xsd:string"
  }
};

// expected data on Create 
exports.STRING_DATA_TYPE_FRAME = STRING_DATA_TYPE_FRAME;
var STRING_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "name": "John Doe"
};

// expected data on Edit 
exports.STRING_DATA_TYPE_CREATE_DATA = STRING_DATA_TYPE_CREATE_DATA;
var STRING_DATA_TYPE_EDIT_DATA = {
  "@type": "Person",
  "name": "Mary Jane"
};

// create config 
exports.STRING_DATA_TYPE_EDIT_DATA = STRING_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: STRING_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: STRING_DATA_TYPE_CREATE_DATA.name,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: STRING_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: STRING_DATA_TYPE_CREATE_DATA,
  // pass created data here & we will modify with Edit data
  input: STRING_DATA_TYPE_EDIT_DATA.name,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: STRING_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: STRING_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;