"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToReference = addToReference;
exports.getProperties = getProperties;
var _mandatoryFrames = require("./mandatoryFrames");
var _optionalFrames = require("./optionalFrames");
var _setFrames = require("./setFrames");
var _listFrames = require("./listFrames");
var util = _interopRequireWildcard(require("./utils"));
var CONST = _interopRequireWildcard(require("./constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// add layout to references
function addLayout(args, layout, linked_to) {
  var reference = args.reference,
    setReference = args.setReference;
  var tempReference = reference;
  tempReference[linked_to] = layout;
  setReference(tempReference);
}

// function to store reference of document type definition 
// to be used later on ...
function addToReference(args, layout, linked_to) {
  var reference = args.reference,
    type = args.type;
  // add reference only if not available 
  if (!util.availableInReference(reference, linked_to)) {
    addLayout(args, layout, linked_to);
  }
  // this is in case of circular document links 
  // if document link points to its own document class in this case reference[type]={}
  // we add extracted frames to reference[type] when available
  if (util.availableInReference(reference, linked_to) && !Object.keys(reference[linked_to]).length) {
    addLayout(args, layout, linked_to);
  }
}
function getProperties(args) {
  var properties = {},
    propertiesUI = {},
    required = [];
  var documentFrame = args.documentFrame,
    type = args.type;
  for (var property in documentFrame) {
    if (property === "@id") continue;else if (property === "@key") continue;else if (property === "@type") continue;else if (property === "@id") continue;else if (property === "@inherits") continue;else if (property === CONST.DOCUMENTATION) continue;else if (property === CONST.SUBDOCUMENT) continue;else if (property === CONST.UNFOLDABLE) continue;else if (property === CONST.METADATA) continue;else if (util.isMandatory(documentFrame, property)) {
      var mandatoryFrames = (0, _mandatoryFrames.makeMandatoryFrames)(args, property);
      //set property layout & uiLayout
      properties[property] = mandatoryFrames.layout;
      propertiesUI[property] = mandatoryFrames.uiLayout;
      //set property as required since Mandatory
      required.push(property);
    } else if (util.isOptional(documentFrame, property)) {
      var extractedFrames = util.extractFrames(documentFrame, property);
      // make a copy
      var argsHolder = _objectSpread({}, args);
      var documentFrameHolder = argsHolder.documentFrame;
      argsHolder.documentFrame = extractedFrames;
      var optional = getProperties(argsHolder);
      // place back original document frames
      argsHolder.documentFrame = documentFrameHolder;
      var optionalFrames = (0, _optionalFrames.makeOptionalFrames)(optional, property);

      //set property layout & uiLayout
      properties[property] = optionalFrames.layout;
      propertiesUI[property] = optionalFrames.uiLayout;
    } else if (util.isSet(documentFrame, property)) {
      var _extractedFrames = util.extractFrames(documentFrame, property);
      // make a copy
      var _argsHolder = _objectSpread({}, args);
      var _documentFrameHolder = _argsHolder.documentFrame;
      _argsHolder.documentFrame = _extractedFrames;
      var dataFrames = getProperties(_argsHolder);
      // place back original document frames
      _argsHolder.documentFrame = _documentFrameHolder;
      var setFrames = (0, _setFrames.makeSetFrames)(_argsHolder, dataFrames, property);

      //set property layout & uiLayout
      properties[property] = setFrames.layout;
      propertiesUI[property] = setFrames.uiLayout;
    } else if (util.isList(documentFrame, property)) {
      var _extractedFrames2 = util.extractFrames(documentFrame, property);
      // make a copy
      var _argsHolder2 = _objectSpread({}, args);
      var _documentFrameHolder2 = _argsHolder2.documentFrame;
      _argsHolder2.documentFrame = _extractedFrames2;
      var _dataFrames = getProperties(_argsHolder2);
      // place back original document frames
      _argsHolder2.documentFrame = _documentFrameHolder2;
      var listFrames = (0, _listFrames.makeListFrames)(_argsHolder2, _dataFrames, property);

      //set property layout & uiLayout
      properties[property] = listFrames.layout;
      propertiesUI[property] = listFrames.uiLayout;
    }
  }
  var layout = {
    properties: properties,
    required: required,
    uiSchema: propertiesUI
  };
  return layout;
}