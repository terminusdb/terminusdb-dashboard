"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiHelper = void 0;
var _react = _interopRequireDefault(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var widget = _interopRequireWildcard(require("./widgetHelper"));
var _FrameHelpers = require("../FrameHelpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function constructDocumentConfig(args, property, linked_to) {
  var fullFrame = args.fullFrame,
    documentFrame = args.documentFrame;
  var linked_frames = fullFrame[linked_to];

  // change frames & type 
  var config = args;
  config.type = linked_to;
  config.extractedDocumentation = util.extractDocumentation(fullFrame, linked_to, fullFrame[CONST.SELECTED_LANGUAGE]);
  config.documentFrame = linked_frames;
  return config;
}
function constructSubDocumentConfig(args, property) {
  var fullFrame = args.fullFrame,
    documentFrame = args.documentFrame;
  var field = documentFrame[property];
  var linked_to = field[CONST.CLASS];
  var linked_frames = fullFrame[linked_to];

  // change frames & type 
  var config = args;
  config.type = linked_to;
  config.extractedDocumentation = util.extractDocumentation(fullFrame, linked_to, fullFrame[CONST.SELECTED_LANGUAGE]);
  config.documentFrame = linked_frames;
  return config;
}
var uiHelper = function uiHelper(args, property) {
  var fullFrame = args.fullFrame,
    reference = args.reference,
    setReference = args.setReference;
  var documentFrame = args.documentFrame;
  var field = documentFrame[property];
  if (util.isDataType(field)) {
    // DATA TYPE
    var dataType = documentFrame[property];
    return widget.getUIDisplay(args, property, dataType);
  } else if (util.isSubDocumentType(field)) {
    // SUBDOCUMENT TYPE
    // make a copy of args
    var argsHolder = _objectSpread({}, args);
    var linked_to = field[CONST.CLASS];
    var extracted = {};
    // if linked_to definition is not available in references
    if (!util.availableInReference(reference, linked_to)) {
      var config = constructSubDocumentConfig(argsHolder, property);
      extracted = (0, _FrameHelpers.getProperties)(config);
    } else {
      // reference available 
      extracted = reference[linked_to];
    }
    // add extracted documentation 
    extracted.extractedDocumentation = argsHolder.extractedDocumentation;

    // check for SubDocument MetaData
    var metaDataType = util.fetchMetaData(documentFrame, property),
      expanded = false;
    if (metaDataType) {
      // expecting JSON at this point
      expanded = metaDataType;
    }
    return widget.getSubDocumentUIDisplay(argsHolder, extracted, property, expanded);
  } else if (util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS
    var _argsHolder = _objectSpread({}, args);
    var _extracted = {};
    var _linked_to = field; //let field = documentFrame[property]
    // if linked_to definition is not available in references
    if (!util.availableInReference(reference, _linked_to)) {
      //addToReference(args, {})

      var _config = constructDocumentConfig(_argsHolder, property, _linked_to);
      (0, _FrameHelpers.addToReference)(_config, {}, _linked_to);
      _extracted = (0, _FrameHelpers.getProperties)(_config);
      // add extracted to references
      (0, _FrameHelpers.addToReference)(args, _extracted, _linked_to);
      // add extracted documentation 
      _extracted.extractedDocumentation = _config.extractedDocumentation;
      return widget.getDocumentUIDisplay(_argsHolder, _extracted, property, _linked_to);
    } else if (reference.hasOwnProperty(_linked_to) && !Object.keys(reference[_linked_to]).length) {
      // here document link is available in reference but is empty
      // reference[type]
      return {};
    } else {
      // reference[type] will have extracted properties at this point
      return widget.getDocumentUIDisplay(_argsHolder, reference[field], property, _linked_to);
    }
  } else if (util.isEnumType(field)) {
    return widget.getEnumUIDisplay(args, property);
  } else if (util.isSysJSONDataType(field)) {
    return widget.getJSONUIDisplay(args, property);
  }
};
exports.uiHelper = uiHelper;