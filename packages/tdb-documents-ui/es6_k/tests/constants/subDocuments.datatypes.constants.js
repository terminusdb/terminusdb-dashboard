"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SUBDOCUMENT_DATA_TYPE_FRAME = exports.SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.SUBDOCUMENT_DATA_TYPE_EDIT_DATA = exports.SUBDOCUMENT_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and PermanentAddress linked to Address
var SUBDOCUMENT_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Address": {
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
    "@type": "Class",
    "AddressLine1": "xsd:string",
    "City": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "Country": "xsd:string",
    "postalCode": "xsd:string"
  },
  "Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "PermanentAddress": {
      "@class": "Address",
      "@subdocument": []
    }
  }
};

// expected data on Create 
exports.SUBDOCUMENT_DATA_TYPE_FRAME = SUBDOCUMENT_DATA_TYPE_FRAME;
var SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "PermanentAddress": {
    "@type": "Address",
    "AddressLine1": "Love Lane East",
    "City": "Nice",
    "Country": "France",
    "postalCode": "FR293"
  }
};

// expected data on Create 
exports.SUBDOCUMENT_DATA_TYPE_CREATE_DATA = SUBDOCUMENT_DATA_TYPE_CREATE_DATA;
var SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@type": "Person",
  "@id": "Person/12312213",
  "PermanentAddress": {
    "@type": "Address",
    "@id": "Person/12312213/PermanentAddress/21312",
    "AddressLine1": "Love Lane East",
    "City": "Nice",
    "Country": "France",
    "postalCode": "FR293"
  }
};

// expected data on Edit 
exports.SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
  "@id": "Person/12312213",
  "@type": "Person",
  "PermanentAddress": {
    "@id": "Person/12312213/PermanentAddress/21312",
    "@type": "Address",
    "AddressLine1": "Westside Newlands",
    "City": "Nice",
    "Country": "France",
    "postalCode": "FR45"
  }
};

// create config 
exports.SUBDOCUMENT_DATA_TYPE_EDIT_DATA = SUBDOCUMENT_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: SUBDOCUMENT_DATA_TYPE_CREATE_DATA.PermanentAddress,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SUBDOCUMENT_DATA_TYPE_EDIT_DATA.PermanentAddress,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;