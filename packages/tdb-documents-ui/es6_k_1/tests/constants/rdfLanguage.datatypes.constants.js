"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.RDF_LANG_DATA_TYPE_FRAME = exports.RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.RDF_LANG_DATA_TYPE_EDIT_DATA = exports.RDF_LANG_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document with an rdf:language Property
var RDF_LANG_DATA_TYPE_FRAME = {
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
    "records": "rdf:langString"
  }
};

// expected data on Create 
exports.RDF_LANG_DATA_TYPE_FRAME = RDF_LANG_DATA_TYPE_FRAME;
var RDF_LANG_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "records": {
    "@lang": "ka",
    "@value": "ინახავს ჩანაწერს"
  }
};

// expected data on Edit 
exports.RDF_LANG_DATA_TYPE_CREATE_DATA = RDF_LANG_DATA_TYPE_CREATE_DATA;
var RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@id": "Person/234234",
  "@type": "Person",
  "records": {
    "@lang": "ka",
    "@value": "ინახავს ჩანაწერს"
  }
};
exports.RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL = RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL;
var RDF_LANG_DATA_TYPE_EDIT_DATA = {
  "@id": "Person/234234",
  "@type": "Person",
  "records": {
    "@lang": "en",
    "@value": "Keeps Records"
  }
};

// create config 
exports.RDF_LANG_DATA_TYPE_EDIT_DATA = RDF_LANG_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: RDF_LANG_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: RDF_LANG_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: RDF_LANG_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: RDF_LANG_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: RDF_LANG_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: RDF_LANG_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: RDF_LANG_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;