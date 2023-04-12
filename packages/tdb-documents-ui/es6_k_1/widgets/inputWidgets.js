"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _constants = require("../constants");
var _utils = require("../utils");
var _dataType = require("../dataType.constants");
var _LabelComponent = require("../components/LabelComponent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// widget displays input boxes 
var TDBInput = function TDBInput(_ref) {
  var id = _ref.id,
    name = _ref.name,
    value = _ref.value,
    required = _ref.required,
    isKey = _ref.isKey,
    hideFieldLabel = _ref.hideFieldLabel,
    mode = _ref.mode,
    placeholder = _ref.placeholder,
    className = _ref.className,
    _onChange = _ref.onChange,
    comment = _ref.comment,
    label = _ref.label;
  // use this input Value to indentify if value was filled or not in EDIT mode 
  // input Value is used to check if peoperty isKey in EDIT mode so as to stop user 
  // from altering the value
  var _useState = (0, _react.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  if (mode === _constants.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    required: required,
    comment: comment,
    isKey: isKey,
    id: id,
    hideFieldLabel: hideFieldLabel
  }), placeholder !== _dataType.XSD_STRING && /*#__PURE__*/_react["default"].createElement("input", {
    type: "number",
    id: id,
    name: id,
    pattern: "[0-9]*",
    className: "".concat(className, " rounded w-100"),
    value: value
    //key={inputKey}
    ,
    readOnly: (0, _utils.checkIfReadOnly)(mode, inputValue, isKey),
    placeholder: placeholder,
    required: required,
    onChange: function onChange(event) {
      return _onChange(event.target.value, name);
    }
  }), placeholder === _dataType.XSD_STRING && /*#__PURE__*/_react["default"].createElement("textarea", {
    type: "text",
    id: id,
    name: id
    //key={inputKey}
    ,
    className: "".concat(className, " rounded w-100"),
    value: value,
    placeholder: placeholder,
    required: required,
    readOnly: (0, _utils.checkIfReadOnly)(mode, inputValue, isKey),
    onChange: function onChange(event) {
      return _onChange(event.target.value, name);
    }
  }));
};
exports.TDBInput = TDBInput;