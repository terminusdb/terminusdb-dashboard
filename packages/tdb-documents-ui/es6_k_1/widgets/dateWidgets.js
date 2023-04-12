"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBDateTime = exports.TDBDate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDatetimePicker = _interopRequireDefault(require("react-datetime-picker"));
require("react-datetime-picker/dist/DateTimePicker.css");
require("react-calendar/dist/Calendar.css");
require("react-clock/dist/Clock.css");
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _constants = require("../constants");
var _utils = require("../utils");
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
function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(s);
  //return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

// get default value to pass to date-picker
function fetchDateValue(value) {
  if (value) return parseISOString(value);
  return null;
}

//XSD_DATE_TIME
var TDBDateTime = function TDBDateTime(_ref) {
  var id = _ref.id,
    name = _ref.name,
    value = _ref.value,
    required = _ref.required,
    isKey = _ref.isKey,
    mode = _ref.mode,
    onChange = _ref.onChange,
    comment = _ref.comment,
    label = _ref.label,
    hideFieldLabel = _ref.hideFieldLabel;
  var _useState = (0, _react.useState)(fetchDateValue(value)),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    setSelected = _useState2[1];
  if (mode === _constants.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  function handleOnChange(data) {
    setSelected(data);
    // convert to ISO timeStamp 
    if (data) onChange(data.toISOString());
  }

  //"2023-03-15T08:44:00.000Z"
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    required: required,
    hideFieldLabel: hideFieldLabel,
    isKey: isKey,
    comment: comment,
    className: "tdb__label__width"
  }), /*#__PURE__*/_react["default"].createElement(_reactDatetimePicker["default"], {
    amPmAriaLabel: "Select AM/PM",
    id: id,
    "data-testid": "date-picker__".concat(name),
    disabled: (0, _utils.checkIfReadOnly)(mode, selected, isKey),
    calendarAriaLabel: "Toggle calendar",
    clearAriaLabel: "Clear value",
    dayAriaLabel: "Day",
    hourAriaLabel: "Hour",
    maxDetail: "second",
    minuteAriaLabel: "Minute",
    monthAriaLabel: "Month",
    nativeInputAriaLabel: "Date and time",
    required: required,
    onChange: handleOnChange,
    secondAriaLabel: "Second",
    disableClock: true,
    value: selected,
    yearAriaLabel: "Year"
  }));
};

//XSD_DATE
exports.TDBDateTime = TDBDateTime;
var TDBDate = function TDBDate(_ref2) {
  var id = _ref2.id,
    name = _ref2.name,
    value = _ref2.value,
    required = _ref2.required,
    isKey = _ref2.isKey,
    mode = _ref2.mode,
    onChange = _ref2.onChange,
    comment = _ref2.comment,
    hideFieldLabel = _ref2.hideFieldLabel;
  var _useState3 = (0, _react.useState)(fetchDateValue(value)),
    _useState4 = _slicedToArray(_useState3, 2),
    selected = _useState4[0],
    setSelected = _useState4[1];
  if (mode === _constants.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  function handleOnChange(data) {
    setSelected(data);
    // convert yyyy-mm-dd
    if (data) {
      var date = new Date(data);
      var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      onChange(dateString);
    }
  }
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "tdb__date__input"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: name,
    hideFieldLabel: hideFieldLabel,
    required: required,
    isKey: isKey,
    comment: comment,
    className: "tdb__label__width"
  }), /*#__PURE__*/_react["default"].createElement(_reactDatetimePicker["default"], {
    onChange: handleOnChange,
    value: selected,
    "data-testid": "date-picker__".concat(name),
    disabled: (0, _utils.checkIfReadOnly)(mode, selected, isKey),
    format: "dd/MM/yyyy"
  }));
};
exports.TDBDate = TDBDate;