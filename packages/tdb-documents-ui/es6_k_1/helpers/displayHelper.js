"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayBBoxDocument = displayBBoxDocument;
exports.displayChoiceDocument = displayChoiceDocument;
exports.displayChoiceSubDocument = displayChoiceSubDocument;
exports.displayDataTypesWidget = displayDataTypesWidget;
exports.displayDocumentLink = displayDocumentLink;
exports.displayEnum = displayEnum;
exports.displayJSON = displayJSON;
exports.displayLineStringDocument = displayLineStringDocument;
exports.displayLineStringEditDocument = displayLineStringEditDocument;
exports.displayMultiPolygonEditDocument = displayMultiPolygonEditDocument;
exports.displayOneOfProperty = displayOneOfProperty;
exports.displayPointDocument = displayPointDocument;
exports.displayPointEditDocument = displayPointEditDocument;
exports.displayPolygonDocument = displayPolygonDocument;
exports.displayPolygonEditDocument = displayPolygonEditDocument;
exports.displayRDFLanguageWidget = displayRDFLanguageWidget;
exports.displaySubDocument = displaySubDocument;
exports.displaySysUnitWidget = displaySysUnitWidget;
var _react = _interopRequireWildcard(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var geoTemplate = _interopRequireWildcard(require("../arrayHelpers/geoJSONTemplates"));
var _enumWidget = require("../widgets/enumWidget");
var _choiceSubDocumentsWidget = require("../widgets/choiceSubDocumentsWidget");
var _oneOfDocumentsWidget = require("../widgets/oneOfDocumentsWidget");
var _placeholderHelper = require("../helpers/placeholderHelper");
var _subDocumentWidget = require("../widgets/subDocumentWidget");
var _documentWidget = require("../widgets/documentWidget");
var _JSONWidget = require("../widgets/JSONWidget");
var CONST = _interopRequireWildcard(require("../constants"));
var _pointGeoJSONWidget = require("../widgets/pointGeoJSONWidget");
var _lineStringGeoJSONWidget = require("../widgets/lineStringGeoJSONWidget");
var _polygonGeoJSONWidget = require("../widgets/polygonGeoJSONWidget");
var _bboxGeoJSONWidget = require("../widgets/bboxGeoJSONWidget");
var _widgetHelper = require("./widgetHelper");
var _rdfLanguageWidget = require("../widgets/rdfLanguageWidget");
var _sysUnitWidget = require("../widgets/sysUnitWidget");
var _choiceDocumentsWidget = require("../widgets/choiceDocumentsWidget");
var _display = require("./display");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/** display widget is called for normal dattypes like xsd:string/ xsd:float etc */
function displayDataTypesWidget(props, args, property, dataType, id, onChange) {
  var documentFrame = args.documentFrame,
    extractedDocumentation = args.extractedDocumentation,
    mode = args.mode,
    uiFrame = args.uiFrame;
  var field = documentFrame[property];
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var config = {},
    defaultClassName = "tdb__doc__input";
  // checks for metaData => render_as markdown
  var metaDataType = util.fetchMetaData(documentFrame, property);
  if (metaDataType) {
    // expecting a string metadata type
    dataType = metaDataType;
  }

  // condtruct a config object 
  config = {
    dataType: dataType,
    name: props.name,
    formData: props.formData,
    required: props.required,
    mode: mode,
    isKey: util.checkIfKey(property, documentFrame["@key"]),
    id: id,
    //key: key,
    placeholder: (0, _placeholderHelper.getPlaceholder)(field),
    className: util.getUIClassNames(uiFrame, property, defaultClassName, props.index),
    onChange: onChange,
    documentation: documentation,
    hideFieldLabel: props.hideFieldLabel
  };
  return (0, _display.display)(config);
}

// SUBDOCUMENTs 
function displaySubDocument(props, args, extracted, property, expanded, id, hideFieldLabel, linked_to) {
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    subDocumentData = _useState2[0],
    setSubDocumentData = _useState2[1];
  var fullFrame = args.fullFrame,
    extractedDocumentation = args.extractedDocumentation,
    mode = args.mode,
    uiFrame = args.uiFrame,
    reference = args.reference;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];
  // constants to control sub document data 
  util.checkForSysUnit(args, props, linked_to);
  //let populated = populateSubDocumentData(mode, linked_to, props.formData)
  //const [subDocumentData, setSubDocumentData] = useState(populated)

  // linked_to changes 
  (0, _react.useEffect)(function () {
    // pass linked_to in use Effect since the same widget is used for choice subdocuemnts & one ofs
    if (linked_to) {
      var populated = (0, _subDocumentWidget.populateSubDocumentData)(mode, linked_to, props.formData, args.documentFrame);
      setSubDocumentData(populated);
    }
  }, [linked_to]);

  // get order_by
  // at this point linked_to in fullframe
  var order_by = false;
  if (fullFrame.hasOwnProperty(linked_to)) {
    order_by = util.getOrderBy(fullFrame, linked_to);
  }

  // add logic for required properties  
  return /*#__PURE__*/_react["default"].createElement(_subDocumentWidget.TDBSubDocument, {
    extracted: extracted,
    id: id
    //uiFrame={uiFrame}
    ,
    args: args,
    hideFieldLabel: hideFieldLabel,
    order_by: order_by,
    expanded: expanded,
    subDocumentData: subDocumentData,
    setSubDocumentData: setSubDocumentData,
    comment: documentation.comment ? documentation.comment : null
    //mode={mode}
    ,
    index: props.index,
    propertyDocumentation: (0, _widgetHelper.extractPropertyDocumentation)(extracted.extractedDocumentation, selectedLanguage),
    linked_to: linked_to,
    props: props
  });
}

// DOCUMENT LINKS 
function displayDocumentLink(props, args, extracted, property, linked_to, hideFieldLabel) {
  var fullFrame = args.fullFrame,
    onTraverse = args.onTraverse,
    mode = args.mode,
    onSelect = args.onSelect,
    uiFrame = args.uiFrame,
    reference = args.reference;
  var documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property);
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];

  // at this point linked_to in fullframe
  var order_by = false;
  if (fullFrame.hasOwnProperty(linked_to)) {
    order_by = util.getOrderBy(fullFrame, linked_to);
  }

  // add logic for required properties 
  return /*#__PURE__*/_react["default"].createElement(_documentWidget.TDBDocument, {
    extracted: extracted,
    linkId: props.hasOwnProperty("id") ? props["id"] : null
    //comment={documentation.comment ? documentation.comment : null} 
    ,
    mode: mode,
    args: args,
    uiFrame: uiFrame,
    order_by: order_by,
    hideFieldLabel: hideFieldLabel,
    onSelect: onSelect,
    reference: reference,
    onTraverse: onTraverse,
    propertyDocumentation: (0, _widgetHelper.extractPropertyDocumentation)(extracted.extractedDocumentation, selectedLanguage),
    linked_to: linked_to,
    unfoldable: util.isUnfoldable(fullFrame[linked_to]),
    props: props
  });
}

// ENUMs
function displayEnum(args, props, property, id, hideFieldLabel) {
  var documentFrame = args.documentFrame,
    mode = args.mode,
    fullFrame = args.fullFrame;
  var enumDocumentClass = documentFrame[props.name]["@id"];
  var options = documentFrame[property]["@values"];
  var documentation = util.extractEnumComment(fullFrame, enumDocumentClass, options, props.name);
  var label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name;
  if (documentation && documentation.hasOwnProperty(CONST.VALUES)) {
    options = documentation[CONST.VALUES];
  }
  // add logic for required properties 
  return /*#__PURE__*/_react["default"].createElement(_enumWidget.TDBEnum, {
    name: props.name,
    options: options,
    hideFieldLabel: hideFieldLabel,
    enumDocumentClass: enumDocumentClass,
    value: props.formData,
    mode: mode,
    label: label,
    id: id,
    onChange: props.onChange,
    required: props.required
  });
}

// rdf:language
function displayRDFLanguageWidget(args, props, property, id, hideFieldLabel) {
  var documentFrame = args.documentFrame,
    mode = args.mode,
    extractedDocumentation = args.extractedDocumentation;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name;

  // add logic for required properties 
  return /*#__PURE__*/_react["default"].createElement(_rdfLanguageWidget.TDBRDFLanguage, {
    name: label,
    formData: props.formData,
    hideFieldLabel: hideFieldLabel,
    mode: mode,
    className: "tdb__doc__input",
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    onChange: props.onChange,
    required: props.required
  });
}

// SYS:Unit
function displaySysUnitWidget(args, props, property, id, hideFieldLabel) {
  var uiFrame = args.uiFrame,
    mode = args.mode,
    extractedDocumentation = args.extractedDocumentation;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name;
  var defaultClassName = "tdb__doc__input";

  // add logic for required properties 
  return /*#__PURE__*/_react["default"].createElement(_sysUnitWidget.TDBSysUnit, {
    name: label,
    value: props.formData,
    hideFieldLabel: hideFieldLabel,
    mode: mode,
    className: util.getUIClassNames(uiFrame, property, defaultClassName, props.index),
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    required: props.required
  });
}

// SYS:JSON
function displayJSON(props, args, property, id, hideFieldLabel) {
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation;

  //let field = documentFrame[property]
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement(_JSONWidget.TDBJSON, {
    name: props.name,
    value: props.formData,
    mode: mode,
    hideFieldLabel: hideFieldLabel,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    onChange: props.onChange,
    required: props.required
  });
}

// CHOICE SUB DOCUMENTS 
function displayChoiceSubDocument(props, args, property, id) {
  //let { fullFrame, mode, documentFrame, reference } = args
  //let documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property)
  //let selectedLanguage=fullFrame[CONST.SELECTED_LANGUAGE]

  //const [extractedData, setExtractedData] = useState(props.formData ? props.formData : {})
  var _useState3 = (0, _react.useState)(props.formData ? props.formData : {}),
    _useState4 = _slicedToArray(_useState3, 2),
    choiceSubDocumentData = _useState4[0],
    setChoiceSubDocumentData = _useState4[1];

  // add logic for required properties  
  return /*#__PURE__*/_react["default"].createElement(_choiceSubDocumentsWidget.TDBChoiceSubDocuments, {
    args: args,
    property: property,
    choiceSubDocumentData: choiceSubDocumentData,
    setChoiceSubDocumentData: setChoiceSubDocumentData,
    id: id,
    props: props
  });
}

// ONE OF 
function displayOneOfProperty(props, args, property, id) {
  var _useState5 = (0, _react.useState)(props.formData ? props.formData : {}),
    _useState6 = _slicedToArray(_useState5, 2),
    oneOfDocumentData = _useState6[0],
    setOneOfDocumentData = _useState6[1];
  (0, _react.useEffect)(function () {
    // formdata on change
    if (props.formData) setOneOfDocumentData(props.formData);
  }, [props.formData]);
  return /*#__PURE__*/_react["default"].createElement(_oneOfDocumentsWidget.TDBOneOfDocuments, {
    args: args,
    property: property,
    oneOfDocumentData: oneOfDocumentData,
    setOneOfDocumentData: setOneOfDocumentData,
    id: id,
    props: props
  });
}

// CHOICE DOCUMENTS 
function displayChoiceDocument(props, args, property, id) {
  var _useState7 = (0, _react.useState)(props.formData ? props.formData : {}),
    _useState8 = _slicedToArray(_useState7, 2),
    choiceDocumentData = _useState8[0],
    setChoiceDocumentData = _useState8[1];

  // add logic for required properties  
  return /*#__PURE__*/_react["default"].createElement(_choiceDocumentsWidget.TDBChoiceDocuments, {
    args: args,
    property: property,
    choiceDocumentData: choiceDocumentData,
    setChoiceDocumentData: setChoiceDocumentData,
    id: id,
    props: props
  });
}

// POINT DOCUMENTS 
function displayPointEditDocument(props, args, property) {
  var argsHolder = _objectSpread({}, args);
  argsHolder.documentFrame = _defineProperty({}, property, args.documentFrame[property][CONST.CLASS]);
  return geoTemplate.PointFieldTemplate(argsHolder, props, property);
}
function displayPointDocument(props, args, property, id) {
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation,
    documentFrame = args.documentFrame,
    formData = args.formData;
  var bounds = util.checkIfBoundsAvailable(documentFrame, formData);

  //let field = documentFrame[property]
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required,
    bounds: bounds
  };
  return /*#__PURE__*/_react["default"].createElement(_pointGeoJSONWidget.TDBPointDocuments, {
    config: config
  });
}

// LINE STRING 
function displayLineStringEditDocument(props, args, property) {
  var argsHolder = _objectSpread({}, args);
  argsHolder.documentFrame = _defineProperty({}, property, args.documentFrame[property][CONST.CLASS]);
  return geoTemplate.LineStringFieldTemplate(argsHolder, props, property);
}
function displayLineStringDocument(props, args, property, id) {
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation,
    documentFrame = args.documentFrame,
    formData = args.formData;
  var bounds = util.checkIfBoundsAvailable(documentFrame, formData);

  //let field = documentFrame[property]
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required,
    bounds: bounds
  };
  return /*#__PURE__*/_react["default"].createElement(_lineStringGeoJSONWidget.TDBLineStringDocuments, {
    config: config
  });
}

// POLYGON
function displayPolygonEditDocument(props, args, property) {
  return geoTemplate.CoordinatesArrayFieldTemplate(args, props, property);
}

// MULTIPOLYGON
function displayMultiPolygonEditDocument(props, args, property) {
  return geoTemplate.CoordinatesArrayFieldTemplate(args, props, property);
}
function displayPolygonDocument(props, args, property, id) {
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation,
    documentFrame = args.documentFrame,
    formData = args.formData;
  var bounds = util.checkIfBoundsAvailable(documentFrame, formData);

  //let field = documentFrame[property]
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required,
    bounds: bounds
  };
  return /*#__PURE__*/_react["default"].createElement(_polygonGeoJSONWidget.TDBPolygonDocuments, {
    config: config
  });
}

// B_BOX 
function displayBBoxDocument(props, args, property, id) {
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation,
    documentFrame = args.documentFrame,
    formData = args.formData;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var config = {
    name: props.name,
    formData: props.formData,
    mode: mode,
    label: documentation.label,
    comment: documentation.comment ? documentation.comment : null,
    id: id,
    className: "tdb__doc__input",
    required: props.required
  };
  return /*#__PURE__*/_react["default"].createElement(_bboxGeoJSONWidget.TDBBBoxDocuments, {
    config: config
  });
}