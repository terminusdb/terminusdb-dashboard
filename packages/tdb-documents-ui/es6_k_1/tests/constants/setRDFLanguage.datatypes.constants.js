"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SET_RDF_LANG_DATA_TYPE_FRAME = exports.SET_RDF_LANG_DATA_TYPE_EDIT_DATA = exports.SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL = exports.SET_RDF_LANG_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and Name field
var SET_RDF_LANG_DATA_TYPE_FRAME = {
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
    "lang": {
      "@class": "rdf:langString",
      "@type": "Set"
    }
  }
};

// expected data on Create 
exports.SET_RDF_LANG_DATA_TYPE_FRAME = SET_RDF_LANG_DATA_TYPE_FRAME;
var SET_RDF_LANG_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "lang": [{
    "@lang": "ka",
    "@value": "ქართველს"
  }, {
    "@lang": "en",
    "@value": "to english"
  }]
};

// expected data on Create 
exports.SET_RDF_LANG_DATA_TYPE_CREATE_DATA = SET_RDF_LANG_DATA_TYPE_CREATE_DATA;
var SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL = {
  "@id": "Person/232108",
  "@type": "Person",
  "lang": [{
    "@lang": "ka",
    "@value": "ქართველს"
  }, {
    "@lang": "en",
    "@value": "to english"
  }]
};

// expected data on Edit 
exports.SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL = SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL;
var SET_RDF_LANG_DATA_TYPE_EDIT_DATA = {
  "@id": "Person/232108",
  "@type": "Person",
  "lang": [{
    "@lang": "ka",
    "@value": "ქართველი"
  }, {
    "@lang": "en",
    "@value": "to english"
  }, {
    "@lang": "fr",
    "@value": "français"
  }]
};

// create config 
exports.SET_RDF_LANG_DATA_TYPE_EDIT_DATA = SET_RDF_LANG_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SET_RDF_LANG_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: SET_RDF_LANG_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SET_RDF_LANG_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SET_RDF_LANG_DATA_TYPE_CREATE_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SET_RDF_LANG_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SET_RDF_LANG_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SET_RDF_LANG_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;