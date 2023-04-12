"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeMandatoryFrames = makeMandatoryFrames;
var CONST = _interopRequireWildcard(require("./constants"));
var util = _interopRequireWildcard(require("./utils"));
var _uiHelper = require("./helpers/uiHelper");
var _placeholderHelper = require("./helpers/placeholderHelper");
var _typeHelper = require("./helpers/typeHelper");
var _addGeoJSONLayout = require("./addGeoJSONLayout");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - property 
 * @param {*} uiFrame - custom UI to change appearance
 * @param {*} mode - mode in which FrameViewer is being called
 * @param {*} formData - filled data to be displayed in form 
 * @param {*} documentation - formData - filled data to be displayed in form 
 * @returns a data field 
 */
function makeMandatoryFrames(args, property) {
  var documentFrame = args.documentFrame,
    fullFrame = args.fullFrame;
  var placeholder = (0, _placeholderHelper.getPlaceholder)(args.documentFrame[property]),
    isArray = false;

  /** gather layout of property  */
  var layout = _defineProperty({
    "type": (0, _typeHelper.typeHelper)(documentFrame, property, fullFrame, isArray),
    "title": property
  }, CONST.PLACEHOLDER, placeholder);
  if (util.isInherritedFromGeoJSONTypes(documentFrame)) {
    (0, _addGeoJSONLayout.addGeoJSONLayout)(layout, documentFrame, property);
  }
  if (util.isSysUnitDataType(documentFrame[property])) {
    // assign default value if sys unit
    layout["default"] = [];
  }
  var uiLayout = (0, _uiHelper.uiHelper)(args, property);
  return {
    layout: layout,
    uiLayout: uiLayout
  };
}