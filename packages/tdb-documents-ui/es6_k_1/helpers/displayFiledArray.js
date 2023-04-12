"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayField = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _nestedArrayTemplates = require("../arrayHelpers/nestedArrayTemplates");
var _documentFieldArrayContext = require("./documentFieldArrayContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DisplayField = function DisplayField() {
  var _ArrayFieldObj = (0, _documentFieldArrayContext.ArrayFieldObj)(),
    arrayProps = _ArrayFieldObj.arrayProps,
    args = _ArrayFieldObj.args,
    field = _ArrayFieldObj.field,
    items = _ArrayFieldObj.items,
    handleAdd = _ArrayFieldObj.handleAdd,
    handleDelete = _ArrayFieldObj.handleDelete,
    handleReorderClick = _ArrayFieldObj.handleReorderClick,
    refresh = _ArrayFieldObj.refresh;

  // ({ args, props, property, handleAdd })
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, refresh && /*#__PURE__*/_react["default"].createElement(_nestedArrayTemplates.ArrayFieldTemplate, {
    args: args,
    handleAdd: handleAdd,
    handleDelete: handleDelete,
    handleReorderClick: handleReorderClick,
    items: items,
    props: arrayProps,
    property: field
  }));
};
exports.DisplayField = DisplayField;