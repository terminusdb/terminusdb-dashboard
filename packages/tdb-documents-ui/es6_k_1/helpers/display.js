"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = display;
var _react = _interopRequireWildcard(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var _inputWidgets = require("../widgets/inputWidgets");
var _booleanWidget = require("../widgets/booleanWidget");
var _dateWidgets = require("../widgets/dateWidgets");
var TYPE = _interopRequireWildcard(require("../dataType.constants"));
var _markdownWidget = require("../widgets/markdownWidget");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** displays widgets according to dataType */
function display(config) {
  switch (config.dataType) {
    case TYPE.XSD_BOOLEAN:
      //XSD_BOOLEAN
      return /*#__PURE__*/_react["default"].createElement(_booleanWidget.TDBBoolean, {
        name: config.name,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        value: config.formData,
        isKey: config.isKey,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.XSD_DATE_TIMESTAMP:
      //XSD_DATE_TIME_STAMP
      return /*#__PURE__*/_react["default"].createElement(_dateWidgets.TDBDateTime, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        isKey: config.isKey,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.XSD_DATE_TIME:
      //XSD_DATE_TIME
      return /*#__PURE__*/_react["default"].createElement(_dateWidgets.TDBDateTime, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        isKey: config.isKey,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.XSD_DATE:
      //XSD_DATE
      return /*#__PURE__*/_react["default"].createElement(_dateWidgets.TDBDate, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        isKey: config.isKey,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.MARKDOWN:
      return /*#__PURE__*/_react["default"].createElement(_markdownWidget.TDBMarkdown, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        className: config.className,
        onChange: config.onChange
      });
    default:
      // ALL OTHER DATA TYPES
      return /*#__PURE__*/_react["default"].createElement(_inputWidgets.TDBInput, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        isKey: config.isKey,
        inputKey: config.key,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
  }
}