"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlaceholder = getPlaceholder;
var CONST = _interopRequireWildcard(require("../constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * 
 * @param {*} frame frame defintion 
 * @returns placeholder for field
 */
function getPlaceholder(frame) {
  if (_typeof(frame) === CONST.STRING_TYPE) return frame;
  if (frame.hasOwnProperty(CONST.TYPE) && frame[CONST.TYPE] === CONST.ENUM) {
    // frame["@id"] will contain the name of enum class
    return "".concat(frame["@id"]);
  }
  // Object 
  //if(!frame.hasOwnProperty(CONST.TYPE)) {
  //throw new Error(`Expected to have ${CONST.TYPE}... but received ${frame} instead`)
  //}
  return frame[CONST.CLASS];
}