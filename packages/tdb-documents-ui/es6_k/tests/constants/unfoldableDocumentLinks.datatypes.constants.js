"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_CONFIG = exports.Search = exports.EDIT_CONFIG = exports.DOCUMENT_LINK_DATA_TYPE_FRAME = exports.DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL = exports.DOCUMENT_LINK_DATA_TYPE_EDIT_DATA = exports.DOCUMENT_LINK_DATA_TYPE_CREATE_DATA = exports.CREATE_CONFIG = void 0;
exports.handleTraverse = handleTraverse;
var _react = _interopRequireDefault(require("react"));
var _Row = _interopRequireDefault(require("react-bootstrap/Row"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// simple frame with Person who likes Animal
var DOCUMENT_LINK_DATA_TYPE_FRAME = {
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
      "@type": "Optional"
    },
    "name": "xsd:string"
  }
};

// expected data on Create 
exports.DOCUMENT_LINK_DATA_TYPE_FRAME = DOCUMENT_LINK_DATA_TYPE_FRAME;
var DOCUMENT_LINK_DATA_TYPE_CREATE_DATA = _defineProperty({
  "@type": "Person",
  "likes": {
    "@type": "Animal",
    "owned_by": {
      "name": "Mike",
      "likes": {
        "@type": "Animal",
        "owned_by": "ID 3",
        "category": "Cats"
      },
      "@type": "Person"
    },
    "category": "Dogs"
  },
  "name": "John Doe"
}, "@type", "Person");

// expected data on Create 
exports.DOCUMENT_LINK_DATA_TYPE_CREATE_DATA = DOCUMENT_LINK_DATA_TYPE_CREATE_DATA;
var DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL = _defineProperty({
  "@id": "Person/13123123",
  "@type": "Person",
  "likes": {
    "@type": "Animal",
    "owned_by": {
      "name": "Mike",
      "likes": {
        "@type": "Animal",
        "owned_by": "ID 3",
        "category": "Cats"
      },
      "@type": "Person"
    },
    "category": "Dogs"
  },
  "name": "John Doe"
}, "@type", "Person");

// expected data on Edit 
exports.DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL = DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL;
var DOCUMENT_LINK_DATA_TYPE_EDIT_DATA = _defineProperty({
  "@type": "Person",
  "@id": "Person/13123123",
  "likes": {
    "@type": "Animal",
    "owned_by": {
      "name": "Mike",
      "likes": "ID 1",
      "@type": "Person"
    },
    "category": "Dogs"
  },
  "name": "John Doe"
}, "@type", "Person");

// create config 
exports.DOCUMENT_LINK_DATA_TYPE_EDIT_DATA = DOCUMENT_LINK_DATA_TYPE_EDIT_DATA;
var CREATE_CONFIG = {
  frame: DOCUMENT_LINK_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: {},
  input: DOCUMENT_LINK_DATA_TYPE_CREATE_DATA,
  mode: "Create"
};

// edit config 
exports.CREATE_CONFIG = CREATE_CONFIG;
var EDIT_CONFIG = {
  frame: DOCUMENT_LINK_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: DOCUMENT_LINK_DATA_TYPE_EDIT_DATA_ORIGINAL,
  // pass created data here & we will modify with Edit data
  input: DOCUMENT_LINK_DATA_TYPE_EDIT_DATA,
  mode: "Edit"
};

// view config 
exports.EDIT_CONFIG = EDIT_CONFIG;
var VIEW_CONFIG = {
  frame: DOCUMENT_LINK_DATA_TYPE_FRAME,
  uiFrame: {},
  type: "Person",
  formData: DOCUMENT_LINK_DATA_TYPE_EDIT_DATA,
  mode: "View"
};

/** component to display  */
exports.VIEW_CONFIG = VIEW_CONFIG;
var Search = function Search(_ref) {
  var setSelected = _ref.setSelected;
  function handleClick(e) {
    if (setSelected) setSelected({
      id: e.target.id,
      label: e.target.name
    });
  }
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Search this dummy result ....", /*#__PURE__*/_react["default"].createElement(_Row["default"], {
    className: "w-100 border",
    id: "ID 1",
    name: "first id",
    onClick: handleClick
  }, "ID 1"), /*#__PURE__*/_react["default"].createElement(_Row["default"], {
    className: "w-100 border",
    id: "ID 2",
    name: "second id",
    onClick: handleClick
  }, "ID 2"), /*#__PURE__*/_react["default"].createElement(_Row["default"], {
    className: "w-100 border",
    id: "ID 3",
    name: "third id",
    onClick: handleClick
  }, "ID 3"));
};

/** handle traverse on click  */
exports.Search = Search;
function handleTraverse(clicked) {
  alert("You have clicked on ".concat(clicked, " ..."));
}