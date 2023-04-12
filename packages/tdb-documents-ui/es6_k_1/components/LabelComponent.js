"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBLabel = void 0;
var _react = _interopRequireDefault(require("react"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _documentationTemplates = require("../documentationTemplates");
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// displays all labels of properies
var TDBLabel = function TDBLabel(_ref) {
  var name = _ref.name,
    required = _ref.required,
    comment = _ref.comment,
    className = _ref.className,
    id = _ref.id,
    isKey = _ref.isKey,
    hideFieldLabel = _ref.hideFieldLabel;
  // hideFieldLabel is true for sets/lists
  if (hideFieldLabel) return /*#__PURE__*/_react["default"].createElement("label", {
    className: "tdb__label__width invisible",
    htmlFor: id
  }, name);
  if (required) {
    // required then add required identifier 
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "veritcal",
      className: className
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: "control-label",
      htmlFor: id
    }, name, isKey && (0, _utils.displayIfKeyField)(isKey, name), /*#__PURE__*/_react["default"].createElement(_documentationTemplates.DisplayPropertyNameAndComment, {
      comment: comment
    })), required && /*#__PURE__*/_react["default"].createElement("span", {
      className: "required"
    }));
  }

  // !required
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    className: "control-label ".concat(className, " rounded"),
    htmlFor: id
  }, name, isKey && (0, _utils.displayIfKeyField)(isKey, name), /*#__PURE__*/_react["default"].createElement(_documentationTemplates.DisplayPropertyNameAndComment, {
    comment: comment
  })));
};
exports.TDBLabel = TDBLabel;