"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayInternalProperties = displayInternalProperties;
exports.documentInternalProperties = documentInternalProperties;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _fieldDisplay = require("../helpers/fieldDisplay");
var _documentFieldArrayHelpers = require("./documentFieldArrayHelpers");
var _reactBootstrap = require("react-bootstrap");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function addUiFrameForEachField(docConfig, property) {
  // This is mostly used to set the ui frame per fields in diff view
  if (docConfig.hasOwnProperty("fieldUIFrame") && docConfig["fieldUIFrame"].hasOwnProperty(property)) {
    return _defineProperty({}, property, docConfig["fieldUIFrame"][property]);
  }
  // it can be some assosciated properties of @oneOfs at this point
  return docConfig["fieldUIFrame"];
}

// keeps tab of internal properties and store their types - if array/ mandatory/ optional
function extractDocumentFrame(currentDocumentClass, fullFrame, property) {
  var documentFrame = fullFrame[currentDocumentClass];
  if (util.isArrayTypeFromFrames(documentFrame, property)) {
    var _ref2;
    // ARRAY TYPE
    return _ref2 = {}, _defineProperty(_ref2, CONST.TYPE, documentFrame[property][CONST.TYPE]), _defineProperty(_ref2, "propertyFrame", documentFrame[property][CONST.CLASS]), _ref2;
  } else if (util.isOptional(documentFrame, property)) {
    var _ref3;
    // OPTIONAL
    return _ref3 = {}, _defineProperty(_ref3, CONST.TYPE, CONST.OPTIONAL), _defineProperty(_ref3, "propertyFrame", documentFrame[property][CONST.CLASS]), _ref3;
  } else {
    // MANDATORY
    return {
      propertyFrame: documentFrame ? documentFrame.hasOwnProperty(property) ? documentFrame[property] : documentFrame : currentDocumentClass
    };
  }
}

/** get data of property which have been selected for one ofs */
function getPropertyName(docConfig) {
  // only @type wil be defined if length 1
  if (Object.keys(docConfig.formData).length === 1) return _defineProperty({
    data: undefined
  }, CONST.ONEOF_SELECTED, false);
  /*if(Object.keys(docConfig.formData).length > 2) {
    let newFormData = {}
    newFormData[CONST.TYPE] = docConfig.formData[CONST.TYPE]
  }*/
  for (var items in docConfig.formData) {
    if (items === CONST.TYPE) continue;
    if (items === "@id") continue;else return _defineProperty({
      data: docConfig.formData[items]
    }, CONST.ONEOF_SELECTED, items); // some choice in one of will be populated => return its data 
  }

  return _defineProperty({
    data: undefined
  }, CONST.ONEOF_SELECTED, false);
}

// construct props for optional/ mandatory types
function constructProps(fieldID, field, expanded, docConfig) {
  // props to control documents props

  var data = null,
    selectedForOneOf = null;
  if (field === CONST.ONEOFVALUES) {
    var extractedData = getPropertyName(docConfig);
    data = extractedData.data;
    selectedForOneOf = extractedData[CONST.ONEOF_SELECTED];
  } else data = docConfig.formData[field];
  var props = {
    id: fieldID,
    name: field,
    expand: expanded,
    required: docConfig.required,
    //formData: docConfig.formData[field],
    //onChange: (data) => docConfig.onChange(data, field), 
    formData: data,
    //onChange: (data, name) => docConfig.onChange(data, field, name), 
    onChange: function onChange(data, name, selectedOneOf) {
      return docConfig.onChange(data, field, selectedOneOf);
    },
    hideFieldLabel: false,
    mode: docConfig.mode
  };
  if (field === CONST.ONEOFVALUES) {
    props[CONST.ONEOF_SELECTED] = selectedForOneOf;
  }
  return props;
}
function documentInternalProperties(docConfig, field) {
  var fields = [];

  // gather field info 
  var fieldName = docConfig.properties[field].title;
  var fieldID = docConfig.id; //: `root_${docConfig.propertyName}_${fieldName}`
  /*if(docConfig.id) {
    // id will be filled if Sets/List
    fieldID=`${docConfig.id}_${fieldName}`
  }*/

  // subdocument formdata will have type assosciated with it other wise its some other data types
  //let currentDocumentClass= docConfig.formData && docConfig.formData[CONST.TYPE] ? 
  //docConfig.formData[CONST.TYPE] : docConfig.properties[field][CONST.PLACEHOLDER]

  //currentDocumentClass = "Person"
  var currentDocumentClass = docConfig.currentDocumentClass;

  /**
   * let currentDocumentClass= docConfig.formData && docConfig.formData[CONST.TYPE] ? 
    docConfig.formData[CONST.TYPE] : 
    docConfig.properties[field][CONST.PLACEHOLDER].hasOwnProperty(CONST.CLASS) ?
    docConfig.properties[field][CONST.PLACEHOLDER][CONST.CLASS] : 
    docConfig.properties[field][CONST.PLACEHOLDER]
   */

  // construct document frame to get UI 
  var documentFrame = extractDocumentFrame(currentDocumentClass, docConfig.args.fullFrame, field);
  if (documentFrame.propertyFrame.hasOwnProperty(CONST.TYPE) && documentFrame.propertyFrame[CONST.TYPE] === CONST.ENUM) {
    if (!documentFrame.propertyFrame.hasOwnProperty("@id")) {
      // enum definition
      documentFrame.propertyFrame["@id"] = currentDocumentClass;
    }
  }

  // pass on newly formed document frame
  var args = docConfig.args;
  var argsHolder = _objectSpread({}, args);
  //argsHolder.documentFrame = documentFrame
  argsHolder.documentFrame = _defineProperty({}, field, documentFrame.propertyFrame);
  argsHolder.extractedType = documentFrame[CONST.TYPE];
  if (util.isArrayType(argsHolder.extractedType)) {
    // if array, we expect formData to be an object type
    fields.push((0, _documentFieldArrayHelpers.displayDocumentFieldArrayHelpers)(fieldID, field, null, argsHolder, docConfig));
  } else {
    //normal data types we expect formData to be an string/ number type
    var props = constructProps(fieldID, field, null, docConfig);
    argsHolder.uiFrame = addUiFrameForEachField(docConfig, field);
    var propertyUIDisplay = (0, _fieldDisplay.getDisplay)(props, argsHolder, field);
    fields.push(propertyUIDisplay);
  }
  return fields;
}

/**
 * 
 * @param {*} docConfig 
 * @returns display internal properties of subdocuments/ document links - any documents which has nested
 * properties inside it
 */
function displayInternalProperties(docConfig) {
  var subDocumentFields = [];

  // loop through subdocument properties
  for (var field in docConfig.properties) {
    // gather field info 
    var fieldName = docConfig.properties[field].title;
    var fieldID = "root_".concat(docConfig.propertyName, "_").concat(fieldName);
    if (docConfig.id) {
      // id will be filled if Sets/List
      fieldID = "".concat(docConfig.id, "_").concat(fieldName);
    }

    // subdocument formdata will have type assosciated with it other wise its some other data types
    var currentDocumentClass = docConfig.formData && docConfig.formData[CONST.TYPE] ? docConfig.formData[CONST.TYPE] : docConfig.properties[field][CONST.PLACEHOLDER];
    // get original args.documentFrame to get @metadata info
    var expanded = util.checkIfSubDocumentShouldBeExpanded(docConfig.args.documentFrame, field);

    // construct document frame to get UI 
    var documentFrame = extractDocumentFrame(currentDocumentClass, docConfig.args.fullFrame, field);

    // pass on newly formed document frame
    var args = docConfig.args;
    var argsHolder = _objectSpread({}, args);
    //argsHolder.documentFrame = documentFrame
    argsHolder.documentFrame = _defineProperty({}, field, documentFrame.propertyFrame);
    argsHolder.extractedType = documentFrame[CONST.TYPE];
    if (util.isArrayType(argsHolder.extractedType)) {
      // if array, we expect formData to be an object type
      subDocumentFields.push((0, _documentFieldArrayHelpers.displayDocumentFieldArrayHelpers)(fieldID, field, expanded, argsHolder, docConfig));
    } else {
      //normal data types we expect formData to be an string/ number type
      var props = constructProps(fieldID, field, expanded, docConfig);
      argsHolder.uiFrame = addUiFrameForEachField(docConfig, field);
      var propertyUIDisplay = (0, _fieldDisplay.getDisplay)(props, argsHolder, field);
      subDocumentFields.push(propertyUIDisplay);
    }
  }
  return subDocumentFields;
}