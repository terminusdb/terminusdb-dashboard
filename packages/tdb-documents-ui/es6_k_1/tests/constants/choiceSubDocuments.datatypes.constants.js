"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.EDIT_CONFIG = exports.CREATE_CONFIG = exports.CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME = exports.CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = exports.CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = void 0;
// simple frame with a Student document with favorite_subject property which points to 
// an array of choices of subdocuments
var CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME = {
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
    "@subdocument": [],
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
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
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
    "@subdocument": [],
    "@type": "Class",
    "subject_name": {
      "@class": "xsd:string",
      "@type": "Optional"
    }
  },
  "Student": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "favorite_subject": [{
      "@class": "Zoology",
      "@subdocument": []
    }, {
      "@class": "Botony",
      "@subdocument": []
    }]
  }
};

// expected data on Create 
exports.CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME = CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME;
var CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
  "@type": "Student",
  "favorite_subject": {
    "@type": "Botony",
    "Botony_notes": "Botony_notes notes",
    "Botony_grade": "A",
    "subject_name": "Botony"
  }
};

// expected data on Create 
exports.CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA = CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA;
var CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "@id": "Student/12312213",
  "@type": "Student",
  "favorite_subject": {
    "@type": "Botony",
    "Botony_notes": "Botony notes",
    "Botony_grade": "A",
    "subject_name": "Botony"
  }
};

// expected data on Edit 
exports.CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
  "@id": "Student/12312213",
  "@type": "Student",
  "favorite_subject": {
    "@type": "Zoology",
    "Zoology_notes": "Zoology notes",
    "subject_name": "Zoology"
  }
};

// create config 
exports.CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA = CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: {},
  input: CHOICE_SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: CHOICE_SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: CHOICE_SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;