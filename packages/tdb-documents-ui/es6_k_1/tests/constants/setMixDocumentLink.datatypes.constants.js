"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.SET_UNFOLDED_DATA_TYPE_FRAME = exports.SET_UNFOLDED_DATA_TYPE_EDIT_DATA = exports.SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL = exports.SET_UNFOLDED_DATA_TYPE_CREATE_DATA = exports.EDIT_CONFIG = exports.CREATE_CONFIG = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// simple frame with Person Document and Name field
var SET_UNFOLDED_DATA_TYPE_FRAME = {
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "Animal": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "@documentation": {
      "@comment": "an Animal",
      "@properties": {
        "owned_by": "owned by owner",
        "nickName": "pet's nick names",
        "category": "blah"
      }
    },
    "@unfoldable": [],
    "owned_by": {
      "@class": "Person",
      "@type": "Optional"
    },
    "category": "xsd:string",
    "nickName": "xsd:string"
  },
  "Person": {
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "likes": {
      "@class": "Animal",
      "@type": "Set"
    }
  }
};

// expected data on Create 
exports.SET_UNFOLDED_DATA_TYPE_FRAME = SET_UNFOLDED_DATA_TYPE_FRAME;
var SET_UNFOLDED_DATA_TYPE_CREATE_DATA = {
  "@type": "Person",
  "likes": ["ID 2", {
    "@type": "Animal",
    "category": "dogs",
    "nickName": "jimmy"
  }]
};

// expected data on Create 
exports.SET_UNFOLDED_DATA_TYPE_CREATE_DATA = SET_UNFOLDED_DATA_TYPE_CREATE_DATA;
var SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL = _defineProperty({
  "@id": "Person/232108",
  "@type": "Person",
  "likes": [{
    "@type": "Animal",
    "category": "dogs",
    "nickName": "jimmy"
  }, {
    "@type": "Animal",
    "category": "cats",
    "nickName": "furry"
  }]
}, "@type", "Person");

// expected data on Edit 
exports.SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL = SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL;
var SET_UNFOLDED_DATA_TYPE_EDIT_DATA = {
  "@id": "Person/232108",
  "@type": "Person",
  "likes": [{
    "@type": "Animal",
    "category": "fish",
    "nickName": "goldie"
  }, {
    "@type": "Animal",
    "category": "cats",
    "nickName": "furry"
  }, "ID 3"]
};

// create config 
exports.SET_UNFOLDED_DATA_TYPE_EDIT_DATA = SET_UNFOLDED_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: SET_UNFOLDED_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: SET_UNFOLDED_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: SET_UNFOLDED_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SET_UNFOLDED_DATA_TYPE_CREATE_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: SET_UNFOLDED_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: SET_UNFOLDED_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: SET_UNFOLDED_DATA_TYPE_EDIT_DATA,
  mode: "View"
};
exports.VIEW_CONFIG = VIEW_CONFIG;