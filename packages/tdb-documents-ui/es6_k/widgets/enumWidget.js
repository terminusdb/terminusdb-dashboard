"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBEnum = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _constants = require("../constants");
var _SelectComponent = require("../components/SelectComponent");
var _LabelComponent = require("../components/LabelComponent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// construct options to be supported by react-select
function constructOptions(options) {
  var constructed = [];
  options.map(function (opts) {
    constructed.push(
    // default color "#adb5bd"
    {
      value: opts,
      label: opts,
      color: "#adb5bd"
    });
  });
  return constructed;
}

// sends default value from options
function getDefaultValue(options, value) {
  var extractedOption = options.filter(function (opts) {
    return opts.value === value;
  });
  return extractedOption;
}

// widget displays enum widget
var TDBEnum = function TDBEnum(_ref) {
  var id = _ref.id,
    options = _ref.options,
    name = _ref.name,
    value = _ref.value,
    required = _ref.required,
    mode = _ref.mode,
    enumDocumentClass = _ref.enumDocumentClass,
    hideFieldLabel = _ref.hideFieldLabel,
    onChange = _ref.onChange,
    label = _ref.label;
  if (mode === _constants.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  if (mode === _constants.VIEW && value) return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    hideFieldLabel: hideFieldLabel,
    required: required,
    id: id
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-100"
  }, value));
  var constructedOpts = constructOptions(options);
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    required: required,
    id: id
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_SelectComponent.SelectComponent, {
    options: constructedOpts,
    placeholder: "Select ".concat(enumDocumentClass, " ..."),
    value: getDefaultValue(constructedOpts, value),
    id: id,
    onChange: onChange
  })));
};
exports.TDBEnum = TDBEnum;