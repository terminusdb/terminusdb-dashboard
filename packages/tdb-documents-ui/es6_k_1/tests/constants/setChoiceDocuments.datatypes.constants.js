"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME = exports.SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA = exports.SET_CHOICE_DOCUMENT_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
// simple frame with a Student document with favorite_subject property which points to 
// an array of choices of subdocuments
var SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Zoology": {
    "@inherits": ["Subject"],
    "@key": {
      "@type": "Random"
    },
    "@unfoldable": [],
    "@type": "Class",
    "Zoology_notes": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "subject_name": {
      "@class": "xsd:string",
      "@type": "Optional"
    }
  },
  "Botony": {
    "@inherits": ["Subject"],
    "@unfoldable": [],
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "Botony_notes": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "Botony_grade": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "subject_name": {
      "@class": "xsd:string",
      "@type": "Optional"
    }
  },
  "Subject": {
    "@abstract": [],
    "@type": "Class",
    "subject_name": {
      "@class": "xsd:string",
      "@type": "Optional"
    }
  },
  "Teacher": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "name": "xsd:string",
    "teach": ["Botony", "Zoology"]
  }
};

// expected data on Create 
exports.SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME = SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME;
var SET_CHOICE_DOCUMENT_DATA_TYPE_CREATE_DATA = {
  "@type": "Teacher",
  "name": "Tea Nancy",
  "teach": {
    "@type": "Botony",
    "Botony_notes": "Botony_notes notes",
    "Botony_grade": "A",
    "subject_name": "Botony"
  }
};

// expected data on Create 
exports.SET_CHOICE_DOCUMENT_DATA_TYPE_CREATE_DATA = SET_CHOICE_DOCUMENT_DATA_TYPE_CREATE_DATA;
var SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@id": "Teacher/12312213",
  "@type": "Teacher",
  "name": "Tea Nancy",
  "teach": {
    "@type": "Botony",
    "Botony_notes": "Botony notes",
    "Botony_grade": "A",
    "subject_name": "Botony"
  }
};

// expected data on Edit 
exports.SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA = {
  "@id": "Teacher/12312213",
  "@type": "Teacher",
  "name": "Tea Nancy",
  "teach": {
    "@type": "Zoology",
    "Zoology_notes": "Zoology notes",
    "subject_name": "Zoology"
  }
};

// create config 
exports.SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA = SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Teacher",
  formData: {},
  input: SET_CHOICE_DOCUMENT_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Teacher",
  formData: SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SET_CHOICE_DOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Teacher",
  formData: SET_CHOICE_DOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;