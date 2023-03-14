"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBJSON = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactJsonEditorAjrm = _interopRequireDefault(require("react-json-editor-ajrm"));
var _en = _interopRequireDefault(require("react-json-editor-ajrm/locale/en"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var CONST = _interopRequireWildcard(require("../constants"));
var _LabelComponent = require("../components/LabelComponent");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*{
  "kitty": "jose"
}*/

// widget displays input boxes 
var TDBJSON = function TDBJSON(_ref) {
  var id = _ref.id,
    name = _ref.name,
    value = _ref.value,
    required = _ref.required,
    mode = _ref.mode,
    hideFieldLabel = _ref.hideFieldLabel,
    onChange = _ref.onChange,
    comment = _ref.comment,
    label = _ref.label;
  if (mode === CONST.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  function handleInput(data) {
    if (data.hasOwnProperty("jsObject") && Object.keys(data.jsObject).length > 0) {
      onChange(data.jsObject);
    }
  }
  var displayJSON = value ? value : {};
  var readOnly = mode === CONST.VIEW ? true : false;
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    required: required,
    hideFieldLabel: hideFieldLabel,
    comment: comment,
    id: id
  }), /*#__PURE__*/_react["default"].createElement(_reactJsonEditorAjrm["default"], {
    id: id,
    locale: _en["default"],
    height: CONST.JSON_EDITOR_HEIGHT,
    width: CONST.JSON_EDITOR_WIDTH,
    viewOnly: readOnly,
    placeholder: displayJSON,
    onBlur: handleInput
  }));
};
exports.TDBJSON = TDBJSON;