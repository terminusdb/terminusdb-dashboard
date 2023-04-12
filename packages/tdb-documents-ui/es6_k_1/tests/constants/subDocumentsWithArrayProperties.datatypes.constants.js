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
    "@type": "Context"
  },
  "Info": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "@subdocument": [],
    "level": "xsd:string",
    "minimumScore": "xsd:decimal"
  },
  "Student": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "@metadata": {
      "render_as": {
        "studies": {
          "expand": true
        }
      }
    },
    "studies": {
      "@class": {
        "@class": "Subject",
        "@subdocument": []
      },
      "@type": "Optional"
    }
  },
  "Subject": {
    "@key": {
      "@type": "Random"
    },
    "@subdocument": [],
    "@type": "Class",
    "name": {
      "@class": "xsd:string",
      "@type": "Set"
    },
    "information": {
      "@class": {
        "@class": "Info",
        "@subdocument": []
      },
      "@type": "Set"
    }
  }
};

// expected data on Create 
exports.SUBDOCUMENT_DATA_TYPE_FRAME = SUBDOCUMENT_DATA_TYPE_FRAME;
var SUBDOCUMENT_DATA_TYPE_CREATE_DATA = {
  "studies": {
    "@type": "Subject",
    "name": ["Ronald", "Tina"],
    "information": [{
      "@type": "Info",
      "level": "hard",
      "minimumScore": "35"
    }, {
      "@type": "Info",
      "level": "easy",
      "minimumScore": "15"
    }]
  },
  "@type": "Student"
};

// expected data on Create 
exports.SUBDOCUMENT_DATA_TYPE_CREATE_DATA = SUBDOCUMENT_DATA_TYPE_CREATE_DATA;
var SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = {
  "studies": {
    "@type": "Subject",
    "name": ["Ronald", "Tina"],
    "information": [{
      "@type": "Info",
      "level": "hard",
      "minimumScore": "35"
    }, {
      "@type": "Info",
      "level": "easy",
      "minimumScore": "15"
    }]
  },
  "@type": "Student"
};

// expected data on Edit 
exports.SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL = SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL;
var SUBDOCUMENT_DATA_TYPE_EDIT_DATA = {
  "studies": {
    "@type": "Subject",
    "name": ["Ronald", "Tina", "Cathy"],
    "information": [{
      "@type": "Info",
      "level": "hard",
      "minimumScore": "35"
    }, {
      "@type": "Info",
      "level": "easy",
      "minimumScore": "15"
    }, {
      "@type": "Info",
      "level": "medium",
      "minimumScore": "25"
    }]
  },
  "@type": "Student"
};

// create config 
exports.SUBDOCUMENT_DATA_TYPE_EDIT_DATA = SUBDOCUMENT_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: {},
  input: SUBDOCUMENT_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SUBDOCUMENT_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Student",
  formData: SUBDOCUMENT_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;