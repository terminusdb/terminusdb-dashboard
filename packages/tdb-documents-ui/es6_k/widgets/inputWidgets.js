"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _constants = require("../constants");
var _dataType = require("../dataType.constants");
var _LabelComponent = require("../components/LabelComponent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// widget displays input boxes 
var TDBInput = function TDBInput(_ref) {
  var id = _ref.id,
    name = _ref.name,
    value = _ref.value,
    required = _ref.required,
    hideFieldLabel = _ref.hideFieldLabel,
    mode = _ref.mode,
    placeholder = _ref.placeholder,
    className = _ref.className,
    _onChange = _ref.onChange,
    comment = _ref.comment,
    label = _ref.label;
  if (mode === _constants.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    required: required,
    comment: comment,
    id: id,
    hideFieldLabel: hideFieldLabel
  }), placeholder !== _dataType.XSD_STRING && /*#__PURE__*/_react["default"].createElement("input", {
    type: "text",
    id: id,
    name: id,
    className: "".concat(className, " rounded w-100 mb-3"),
    value: value,
    placeholder: placeholder,
    required: required,
    onChange: function onChange(event) {
      return _onChange(event.target.value, name);
    }
  }), placeholder === _dataType.XSD_STRING && /*#__PURE__*/_react["default"].createElement("textarea", {
    type: "text",
    id: id,
    name: id,
    className: "".concat(className, " rounded w-100 mb-3"),
    value: value,
    placeholder: placeholder,
    required: required,
    onChange: function onChange(event) {
      return _onChange(event.target.value, name);
    }
  }));
};
exports.TDBInput = TDBInput;