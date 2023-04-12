"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeArrayFrames = makeArrayFrames;
var _react = _interopRequireWildcard(require("react"));
var util = _interopRequireWildcard(require("./utils"));
var CONST = _interopRequireWildcard(require("./constants"));
var helper = _interopRequireWildcard(require("./arrayHelpers/helpers"));
var _uiHelper = require("./helpers/uiHelper");
var _typeHelper = require("./helpers/typeHelper");
var template = _interopRequireWildcard(require("./arrayHelpers/templates"));
var _placeholderHelper = require("./helpers/placeholderHelper");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * 
 * @param {*} arrayType - SET/ LIST/ ARRAY
 * @returns minimum number of items to be displayed 
 * if array is of type List then we show at least one entry of array to be required
 * helper.getListMinItems() returns 1 for List ( where min one entry is required )
 * helper.getSetMinItems() returns 0 for Sets/ Array ( where no min entry required )
 */
function getMinItemsToDisplay(arrayType) {
  return arrayType === CONST.LIST ? helper.getListMinItems() : helper.getSetMinItems();
}

/**
 * 
 * @param {*} arrayType - SET/ LIST/ ARRAY
 * @param {*} mode - Create/ Edit or View mode
 * @returns if View mode then return CONST.UI_HIDDEN_ARRAY_OPTIONS where add/ delete/ order
 * components are not displayed
 * For Create/ Edit mode, check the type of array. If type is LIST/ ARRAY then 
 * return CONST.LIST_UI_ARRAY_OPTIONS where ordering components are displayed
 * if arrayType is SET return CONST.SET_UI_ARRAY_OPTIONS where ordering components 
 * are NOT displayed
 */
function getUIArrayOptions(arrayType, mode) {
  if (mode === CONST.VIEW) return CONST.UI_HIDDEN_ARRAY_OPTIONS;
  return arrayType === CONST.SET ? CONST.SET_UI_ARRAY_OPTIONS : CONST.LIST_UI_ARRAY_OPTIONS;
}

// copy args document frame manually 
// reason for doing this is to not modify the original frames so we can call
// multiple frameviewer from same page ( mostly used in diffViewer )
function makeACopy(args, property) {
  var argsHolder = {};
  for (var props in args) {
    if (props === "documentFrame") {
      argsHolder["documentFrame"] = {};
      for (var docProperty in args["documentFrame"]) {
        if (docProperty === property) {
          argsHolder["documentFrame"][property] = args["documentFrame"][property].hasOwnProperty(CONST.CLASS) ? args["documentFrame"][property][CONST.CLASS] : args["documentFrame"][property];
        } else argsHolder["documentFrame"][docProperty] = args["documentFrame"][docProperty];
      }
    } else argsHolder[props] = args[props];
  }
  return argsHolder;
}

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
function makeArrayFrames(args, property, arrayType) {
  var mode = args.mode,
    documentFrame = args.documentFrame,
    fullFrame = args.fullFrame;

  /** gather layout of property  */
  // construct new frame to be passed as array 
  var arrayFrame = _defineProperty({}, property, documentFrame[property].hasOwnProperty(CONST.CLASS) ? documentFrame[property][CONST.CLASS] : documentFrame[property]),
    isArray = true;
  var layout = _defineProperty({
    "type": CONST.ARRAY_TYPE,
    "title": property,
    "minItems": getMinItemsToDisplay(arrayType),
    "items": {
      type: (0, _typeHelper.typeHelper)(arrayFrame, property, fullFrame, isArray)
    }
  }, CONST.PLACEHOLDER, (0, _placeholderHelper.getPlaceholder)(args.documentFrame[property]));
  var argsHolder = makeACopy(args, property);
  function showEachField(props) {
    return template.ArrayFieldTemplate(argsHolder, props, property);
    //return template.ArrayFieldTemplate(args, props, property)
  }

  var uiLayout = {};
  uiLayout = {
    "ui:options": getUIArrayOptions(arrayType, mode),
    "ui:ArrayFieldTemplate": showEachField
  };
  return {
    layout: layout,
    uiLayout: uiLayout
  };
}