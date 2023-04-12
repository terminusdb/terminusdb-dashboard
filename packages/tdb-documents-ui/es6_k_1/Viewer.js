"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _rjsfCore = _interopRequireDefault(require("@terminusdb/rjsf-core"));
var CONST = _interopRequireWildcard(require("./constants"));
var _formActions = require("./formActions");
var _templates = require("./templates");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Viewer = function Viewer(_ref) {
  var display = _ref.display,
    message = _ref.message,
    mode = _ref.mode,
    type = _ref.type,
    _onSubmit = _ref.onSubmit,
    readOnly = _ref.readOnly,
    data = _ref.data,
    setData = _ref.setData,
    documentation = _ref.documentation;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__frame__viewer "
  }, display && message && message, /*#__PURE__*/_react["default"].createElement(_templates.DisplayDocumentation, {
    documentation: documentation
  }), display && /*#__PURE__*/_react["default"].createElement(_rjsfCore["default"], {
    schema: display.schema,
    uiSchema: display.uiSchema,
    mode: mode,
    onSubmit: function onSubmit(data) {
      return (0, _formActions.handleSubmit)(data, _onSubmit, setData, type, mode);
    },
    readonly: readOnly,
    formData: data,
    showErrorList: true,
    children: mode === CONST.VIEW ? true : false
  }));
};
exports.Viewer = Viewer;