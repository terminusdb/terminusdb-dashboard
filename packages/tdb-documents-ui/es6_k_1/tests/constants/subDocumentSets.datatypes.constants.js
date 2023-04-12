"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SET_SUBDOCUMENT_DATA_TYPE_FRAME = exports.SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = exports.SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and PermanentAddress linked to Address
var SET_SUBDOCUMENT_DATA_TYPE_FRAME = {
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
  "Student": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "previous_addresses": {
      "@class": {
        "@class": "Address",
        "@subdocument": []
      },
      "@type": "Set"
    }
  }
};

// expected data on Create 
exports.SET_SUBDOCUMENT_DATA_TYPE_FRAME = SET_SUBDOCUMENT_DATA_TYPE_FRAME;
var SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
  "@type": "Student",
  "previous_addresses": [{
    "@type": "Address",
    "AddressLine1": "Love Lane East",
    "City": "Nice",
    "Country": "France",
    "postalCode": "FR293"
  }, {
    "@type": "Address",
    "AddressLine1": "St William's road",
    "City": "Dublin",
    "Country": "Ireland",
    "postalCode": "D16"
  }]
};

// expected data on Create 
exports.SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA;
var SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@type": "Student",
  "@id": "Student/12312213",
  "previous_addresses": [{
    "@type": "Address",
    "@id": "Student/12312213/previous_addresses/21312",
    "AddressLine1": "Love Lane East",
    "City": "Nice",
    "Country": "France",
    "postalCode": "FR293"
  }, {
    "@type": "Address",
    "@id": "Student/12312213/previous_addresses/123",
    "AddressLine1": "St William's road",
    "City": "Dublin",
    "Country": "Ireland",
    "postalCode": "D16"
  }]
};

// expected data on Edit 
exports.SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
  "@id": "Student/12312213",
  "@type": "Student",
  "previous_addresses": [{
    "@type": "Address",
    "@id": "Student/12312213/previous_addresses/21312",
    "AddressLine1": "Love Lane East",
    "City": "Nice",
    "Country": "France",
    "postalCode": "FR293"
  }, {
    "@type": "Address",
    "AddressLine1": "Pembroke Road",
    "City": "Dublin",
    "Country": "Ireland",
    "postalCode": "D04"
  }]
};

// create config 
exports.SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SET_SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: {},
  input: SET_SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SET_SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SET_SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: SET_SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;