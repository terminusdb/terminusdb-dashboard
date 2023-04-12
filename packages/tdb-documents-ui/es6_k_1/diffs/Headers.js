"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OldValueHeader = exports.NewValueHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var DIFFCONST = _interopRequireWildcard(require("./diff.constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * 
 * @param {*} oldValueHeader Custom React Element to display in Card Header of old branch  
 * @returns A React Element to display in Card Header of old branch
*/
var OldValueHeader = function OldValueHeader(_ref) {
  var oldValueHeader = _ref.oldValueHeader;
  if (oldValueHeader) return oldValueHeader;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, DIFFCONST.ORIGINAL_VALUE, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Subtitle, {
    className: "mt-1 text-muted"
  }, /*#__PURE__*/_react["default"].createElement("small", null, "Old Values are highlighted in", /*#__PURE__*/_react["default"].createElement("small", {
    className: "text-danger fw-bold m-1"
  }, "red"))));
};

/**
 * 
 * @param {*} newValueHeader Custom React Element to display in Card Header of tracking branch  
 * @returns A React Element to display in Card Header of tracking branch
*/
exports.OldValueHeader = OldValueHeader;
var NewValueHeader = function NewValueHeader(_ref2) {
  var newValueHeader = _ref2.newValueHeader;
  if (newValueHeader) return newValueHeader;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, DIFFCONST.CHANGED_VALUE, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Subtitle, {
    className: "mt-1 text-muted"
  }, /*#__PURE__*/_react["default"].createElement("small", null, "Changes are highlighted in", /*#__PURE__*/_react["default"].createElement("small", {
    className: "text-success fw-bold m-1"
  }, "green"))));
};
exports.NewValueHeader = NewValueHeader;