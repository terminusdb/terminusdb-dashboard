"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SYS_UNIT_DATA_TYPE_FRAME = exports.SYS_UNIT_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.SYS_UNIT_DATA_TYPE_EDIT_DATA = exports.SYS_UNIT_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with Person Document and PermanentAddress linked to Address
var SYS_UNIT_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Link": {
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
    "@type": "Class",
    "LinkInfo": "xsd:string",
    "sysProperty": "sys:Unit"
  },
  "Document": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "@metadata": {
      "render_as": {
        "Links_to": {
          "expand": true
        }
      }
    },
    "sys": "sys:Unit",
    "Links_to": {
      "@class": "Link",
      "@subdocument": []
    }
  }
};

// expected data on Create 
exports.SYS_UNIT_DATA_TYPE_FRAME = SYS_UNIT_DATA_TYPE_FRAME;
var SYS_UNIT_DATA_TYPE_CREATE_DATA = {
  "sys": [],
  "Links_to": {
    "@type": "Link",
    "LinkInfo": "LinkInfo",
    "subProps": []
  },
  "@type": "Document"
};

// expected data on Create 
exports.SYS_UNIT_DATA_TYPE_CREATE_DATA = SYS_UNIT_DATA_TYPE_CREATE_DATA;
var SYS_UNIT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "sys": [],
  "Links_to": {
    "@id": "Links_to/123123adasd",
    "@type": "Link",
    "LinkInfo": "LinkInfo",
    "subProps": []
  },
  "@id": "Document/wdad923894",
  "@type": "Document"
};

// expected data on Edit 
exports.SYS_UNIT_DATA_TYPE_EDIT_DATA_ORIGINAL = SYS_UNIT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var SYS_UNIT_DATA_TYPE_EDIT_DATA = {
  "sys": [],
  "Links_to": {
    "@id": "Links_to/123123adasd",
    "@type": "Link",
    "LinkInfo": "New LinkInfo",
    "subProps": []
  },
  "@id": "Document/wdad923894",
  "@type": "Document"
};

// create config 
exports.SYS_UNIT_DATA_TYPE_EDIT_DATA = SYS_UNIT_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SYS_UNIT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Document",
  formData: {},
  input: SYS_UNIT_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SYS_UNIT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Document",
  formData: SYS_UNIT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SYS_UNIT_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SYS_UNIT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Document",
  formData: SYS_UNIT_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;