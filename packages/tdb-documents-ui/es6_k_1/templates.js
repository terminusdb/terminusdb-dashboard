"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayDocumentation = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/** --- Frame Viewer templates --- */
/** 
* 
* @param {*} documentation - extracted documentation from frames
* @returns displays document's comment
*/
var DisplayDocumentation = function DisplayDocumentation(_ref) {
  var documentation = _ref.documentation;
  if (documentation && documentation.hasOwnProperty(_constants.COMMENT)) {
    return /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-muted fw-bold text-left"
    }, documentation[_constants.COMMENT], " ");
  }
  return /*#__PURE__*/_react["default"].createElement("div", null);
};
exports.DisplayDocumentation = DisplayDocumentation;