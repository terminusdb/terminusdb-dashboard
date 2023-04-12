"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractPropertyDocumentation = extractPropertyDocumentation;
exports.getBBoxUIDisplay = getBBoxUIDisplay;
exports.getChoiceDocumentUIDisplay = getChoiceDocumentUIDisplay;
exports.getChoiceSubDocumentUIDisplay = getChoiceSubDocumentUIDisplay;
exports.getDocumentUIDisplay = getDocumentUIDisplay;
exports.getEnumUIDisplay = getEnumUIDisplay;
exports.getJSONUIDisplay = getJSONUIDisplay;
exports.getMultiPolygonUIDisplay = getMultiPolygonUIDisplay;
exports.getOneOfUIDisplay = getOneOfUIDisplay;
exports.getPointUIDisplay = getPointUIDisplay;
exports.getPolygonUIDisplay = getPolygonUIDisplay;
exports.getRDFLangUIDisplay = getRDFLangUIDisplay;
exports.getSubDocumentUIDisplay = getSubDocumentUIDisplay;
exports.getSysUnitUIDisplay = getSysUnitUIDisplay;
exports.getUIDisplay = getUIDisplay;
exports.getlineStringUIDisplay = getlineStringUIDisplay;
var _react = _interopRequireDefault(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var display = _interopRequireWildcard(require("./displayHelper"));
var geoTemplate = _interopRequireWildcard(require("../arrayHelpers/geoJSONTemplates"));
var _uuid = require("uuid");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// NORMAL DATA TYPES
function getUIDisplay(args, property, dataType) {
  var key = (0, _uuid.v4)();
  function displayWidget(props) {
    // console.log("key", key)
    // we pass ID at this point since we have sepratae IDs for normal dataTypes & for Sets/ List
    var id = props.idSchema["$id"];

    // normal data type input are being called here 
    // function expects input data and id of field into which user event occurs
    function handleChange(data) {
      if (props.onChange) props.onChange(data);
    }
    return display.displayDataTypesWidget(props, args, property, dataType, id, handleChange);
  }
  return {
    "ui:field": displayWidget
  };
}

// retrieves declaration for selected language
function extractPropertyDocumentation(extractedDocumentation, selectedLanguage) {
  if (Array.isArray(extractedDocumentation)) {
    // includes multi lang support
    var filtered = extractedDocumentation.filter(function (arr) {
      return arr[CONST.SELECTED_LANGUAGE] === selectedLanguage;
    });
    return filtered[0]; //throw new Error(`Expected extracted documentation to be an array, but instead got ${extractedDocumentation}`)
  } else {
    // @documentation is also defined as object sometimes
    return extractedDocumentation;
  }
}

// SUBDOCUMENT UI
function getSubDocumentUIDisplay(args, extracted, property, expanded, linked_to) {
  var type = args.type;

  // at this point extracted will have all of the extracted documents from linked_to
  function displaySubDocumentWidget(props) {
    var id = props.idSchema["$id"];
    return display.displaySubDocument(props, args, extracted, property, expanded, id, null, linked_to);
  }
  return {
    "ui:field": displaySubDocumentWidget
  };
}

// DOCUMENT LINKS UI  
function getDocumentUIDisplay(args, extracted, property, linked_to) {
  function displayDocumentLinkWidget(props) {
    return display.displayDocumentLink(props, args, extracted, property, linked_to);
  }
  return {
    "ui:field": displayDocumentLinkWidget
  };
}

// ENUM UI 
function getEnumUIDisplay(args, property) {
  function displayEnumWidget(props) {
    var id = props.idSchema["$id"],
      hideFieldLabel = false;
    return display.displayEnum(args, props, property, id, hideFieldLabel);
  }
  return {
    "ui:field": displayEnumWidget
  };
}

// rdf:Lang
function getRDFLangUIDisplay(args, property) {
  function rdfLanguageWidget(props) {
    var id = props.idSchema["$id"];
    return display.displayRDFLanguageWidget(args, props, property, id);
  }
  return {
    "ui:field": rdfLanguageWidget
  };
}

// sys:Unit
function getSysUnitUIDisplay(args, property) {
  function sysUnitWidget(props) {
    var id = props.idSchema["$id"];
    return display.displaySysUnitWidget(args, props, property, id);
  }
  return {
    "ui:field": sysUnitWidget
  };
}

// SYS:JSON 
function getJSONUIDisplay(args, property) {
  function displayJSONWidget(props) {
    var id = props.idSchema["$id"];
    return display.displayJSON(props, args, property, id);
  }
  return {
    "ui:field": displayJSONWidget
  };
}

// ONE OF PROPERTY
function getOneOfUIDisplay(args, property) {
  // at this point extracted will have all of the extracted documents from linked_to
  function displayOneOfWidget(props) {
    var id = props.idSchema["$id"];
    return display.displayOneOfProperty(props, args, property, id);
  }
  return {
    "ui:field": displayOneOfWidget
  };
}

// Choice Sub documents
function getChoiceSubDocumentUIDisplay(args, property) {
  function displayChoiceSubDocumentWidget(props) {
    var id = props.idSchema["$id"];
    return display.displayChoiceSubDocument(props, args, property, id);
  }
  return {
    "ui:field": displayChoiceSubDocumentWidget
  };
}

// CHOICE DOCUMENTS 
function getChoiceDocumentUIDisplay(args, property) {
  function displayChoiceDocumentWidget(props) {
    var id = props.idSchema["$id"];
    return display.displayChoiceDocument(props, args, property, id);
  }
  return {
    "ui:field": displayChoiceDocumentWidget
  };
}

// POINT GEO JSONs
function getPointUIDisplay(args, property) {
  var mode = args.mode;
  if (mode === CONST.VIEW) {
    var displayPointUI = function displayPointUI(props) {
      var id = props.idSchema["$id"];
      if (props.formData && props.formData.includes(undefined)) return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tdb__".concat(props.name, "__hidden")
      });else return display.displayPointDocument(props, args, property, id);
    };
    return {
      "ui:field": displayPointUI
    };
  }
  function showPointUI(props) {
    return display.displayPointEditDocument(props, args, property);
  }
  return {
    "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate": showPointUI
  };
}

// LINE STRING GEO JSONs
function getlineStringUIDisplay(args, property) {
  var mode = args.mode;
  if (mode === CONST.VIEW) {
    var displayLineStringUI = function displayLineStringUI(props) {
      var id = props.idSchema["$id"];
      if (props.formData && props.formData.includes(undefined)) return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tdb__".concat(props.name, "__hidden")
      });else return display.displayLineStringDocument(props, args, property, id);
    };
    return {
      "ui:field": displayLineStringUI
    };
  }
  function showLineStringUI(props) {
    return display.displayLineStringEditDocument(props, args, property);
  }
  return {
    "ui:options": CONST.GEO_FRAMES_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate": showLineStringUI
  };
}

// POLYGON 
function getPolygonUIDisplay(args, property) {
  var mode = args.mode;
  if (mode === CONST.VIEW) {
    var displayPolygonUI = function displayPolygonUI(props) {
      var id = props.idSchema["$id"];
      if (props.formData && props.formData.includes(undefined)) return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tdb__".concat(props.name, "__hidden")
      });else return display.displayPolygonDocument(props, args, property, id);
    };
    return {
      "ui:field": displayPolygonUI
    };
  }
  function coordinatesArrayTemplate(props) {
    return display.displayPolygonEditDocument(props, args, property);
  }
  return {
    "ui:ArrayFieldTemplate": geoTemplate.PolygonArrayFieldTemplate,
    "items": {
      "ui:ArrayFieldTemplate": coordinatesArrayTemplate,
      "items": {
        "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS
      }
    }
  };
}

// MULTIPOLYGON 
function getMultiPolygonUIDisplay(args, property) {
  var mode = args.mode;
  if (mode === CONST.VIEW) {
    var displayMultiPolygonUI = function displayMultiPolygonUI(props) {
      var id = props.idSchema["$id"];
      if (props.formData && props.formData.includes(undefined)) return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tdb__".concat(props.name, "__hidden")
      });else return display.displayPolygonDocument(props, args, property, id); // pass to polygon map viewer
    };

    return {
      "ui:field": displayMultiPolygonUI
    };
  }
  function coordinatesArrayTemplate(props) {
    return display.displayMultiPolygonEditDocument(args, props, property);
  }
  return {
    "ui:ArrayFieldTemplate": geoTemplate.MultiPolygonArrayFieldTemplate,
    "items": {
      "ui:ArrayFieldTemplate": coordinatesArrayTemplate,
      "items": {
        "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS
      }
    }
  };
}

// BINDING BOX 
function getBBoxUIDisplay(args, property) {
  var mode = args.mode;
  if (mode === CONST.VIEW) {
    var displayBBoxUI = function displayBBoxUI(props) {
      var id = props.idSchema["$id"];
      if (props.formData && props.formData.includes(undefined)) return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tdb__".concat(props.name, "__hidden")
      });else return display.displayBBoxDocument(props, args, property, id);
    };
    return {
      "ui:field": displayBBoxUI
    };
  }
  function showBBoxUI(props) {
    var argsHolder = _objectSpread({}, args);
    argsHolder.documentFrame = _defineProperty({}, property, args.documentFrame[property][CONST.CLASS]);
    return geoTemplate.BBoxFieldTemplate(argsHolder, props, property);
  }
  return {
    "ui:options": CONST.UI_HIDDEN_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate": showBBoxUI
  };
}