"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSetFrames = makeSetFrames;
var util = _interopRequireWildcard(require("./utils"));
var CONST = _interopRequireWildcard(require("./constants"));
var helper = _interopRequireWildcard(require("./arrayFrames/helpers"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
function makeSetFrames(args, dataFrames, property) {
  var uiLayout = {};
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation;
  var layout = {
    "type": CONST.ARRAY_TYPE,
    "title": property,
    "minItems": helper.getSetMinItems(),
    "items": {
      type: dataFrames.properties[property].type
    }
  };
  if (mode === CONST.VIEW) {
    // hide Add array button in View mode
    uiLayout = helper.getViewArrayUILayout(mode, dataFrames, property, extractedDocumentation);
  } else {
    // Create and Edit 
    uiLayout = helper.getArrayUILayout(mode, CONST.SET, dataFrames, property, extractedDocumentation);
  }
  return {
    layout: layout,
    uiLayout: uiLayout
  };
}