"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAdditionalLayout = extractAdditionalLayout;
exports.gatherItemsLayout = gatherItemsLayout;
exports.getArrayUILayout = getArrayUILayout;
exports.getListMinItems = getListMinItems;
exports.getSetMinItems = getSetMinItems;
exports.getViewArrayUILayout = getViewArrayUILayout;
var _react = _interopRequireDefault(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var CONST = _interopRequireWildcard(require("../constants"));
var template = _interopRequireWildcard(require("./templates"));
var _widgetHelper = require("../helpers/widgetHelper");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * 
 * @returns length of array to populate number of already stored fields in edit mode for Set
 */
function getSetMinItems() {
  return 0;
}

/**
 * 
 * @returns length of array to populate number of already stored fields in edit mode for List
 */
function getListMinItems() {
  return 1;
}

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array when in View Mode by hiding the add array button from view
 */
function getViewArrayUILayout(mode, dataFrames, property, extractedDocumentation) {
  function showEachViewField(props) {
    return template.ArrayFieldTemplate(props, dataFrames, property, mode, extractedDocumentation);
  }
  var uiLayout = {
    "ui:options": CONST.SET_UI_HIDDEN_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate": showEachViewField
  };
  return uiLayout;
}

/**
 * 
 * @param {*} frame - frame of document
 * @param {*} item - current property
 * @returns UI Layout for Set Array  
 */
function getArrayUILayout(mode, type, dataFrames, property, extractedDocumentation) {
  function showEachField(props) {
    return template.ArrayFieldTemplate(props, dataFrames, property, mode, extractedDocumentation);
  }
  var uiLayout = {};
  // default ui
  uiLayout = {
    "ui:options": type === CONST.SET ? CONST.SET_UI_ARRAY_OPTIONS : CONST.LIST_UI_ARRAY_OPTIONS,
    "ui:ArrayFieldTemplate": showEachField
  };
  return uiLayout;
}

/**
 * 
 * @param {*} dataFrames - frame of data type 
 * @param {*} property - property of interest 
 * @returns returns item layout
 */
function gatherItemsLayout(dataFrames, property, formData) {
  if (!dataFrames.properties.hasOwnProperty(property)) {
    throw new Error("Expected dataframes to have ".concat(property, " definition inside ... "));
  }
  return dataFrames.properties[property];
}

/**
 * 
 * @param {*} dataFrames - frame of document
 * @param {*} property - current property
 * @returns default layout without default populated in it
 */
function extractAdditionalLayout(dataFrames, property) {
  if (!dataFrames.properties.hasOwnProperty(property)) {
    throw new Error("Expected dataframes to have ".concat(property, " definition inside ... "));
  }
  return dataFrames.properties[property];
}