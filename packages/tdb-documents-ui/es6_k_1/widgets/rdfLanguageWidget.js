"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBRDFLanguage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var CONST = _interopRequireWildcard(require("../constants"));
var _dataType = require("../dataType.constants");
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _LabelComponent = require("../components/LabelComponent");
var _inputWidgets = require("./inputWidgets");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function extractValue(mode, formData) {
  if (mode === CONST.EDIT && formData) return formData;else return {};
}

/**
 * 
 * if property rdf:language display 2 fields language & value
 */
var TDBRDFLanguage = function TDBRDFLanguage(_ref) {
  var name = _ref.name,
    formData = _ref.formData,
    mode = _ref.mode,
    comment = _ref.comment,
    id = _ref.id,
    className = _ref.className,
    onChange = _ref.onChange,
    required = _ref.required,
    hideFieldLabel = _ref.hideFieldLabel;
  var _useState = (0, _react.useState)(extractValue(mode, formData)),
    _useState2 = _slicedToArray(_useState, 2),
    rdfData = _useState2[0],
    setRDFData = _useState2[1];
  function handleChange(data, fieldName) {
    var tempRDFData = rdfData;
    tempRDFData[fieldName] = data;
    setRDFData(tempRDFData);
    if (onChange) onChange(tempRDFData);
  }
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: name,
    required: required,
    comment: comment,
    className: "tdb__label__width",
    id: id,
    hideFieldLabel: hideFieldLabel
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(_inputWidgets.TDBInput, {
    name: CONST.RDF_LANGUAGE,
    value: formData && formData.hasOwnProperty(CONST.RDF_LANGUAGE) ? formData[CONST.RDF_LANGUAGE] : "",
    label: CONST.RDF_LANGUAGE_LABEL,
    mode: mode,
    id: "".concat(CONST.RDF_LANGUAGE_LABEL, "_").concat(id),
    placeholder: _dataType.XSD_STRING,
    className: className,
    onChange: handleChange
  }), /*#__PURE__*/_react["default"].createElement(_inputWidgets.TDBInput, {
    name: CONST.RDF_VALUE,
    value: formData && formData.hasOwnProperty(CONST.RDF_VALUE) ? formData[CONST.RDF_VALUE] : "",
    label: CONST.RDF_VALUE_LABEL,
    mode: mode,
    id: "".concat(CONST.RDF_VALUE_LABEL, "_").concat(id),
    placeholder: _dataType.XSD_STRING,
    className: className,
    onChange: handleChange
  }))));
};
exports.TDBRDFLanguage = TDBRDFLanguage;