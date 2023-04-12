"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocumentLinkChoiceDescription = getDocumentLinkChoiceDescription;
exports.getLinkedDescription = getLinkedDescription;
var _react = _interopRequireDefault(require("react"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _ai = require("react-icons/ai");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// description field for document links 
// shows to which document a property is linked
function getLinkedDescription(linked) {
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    gap: 2,
    className: "fw-bold"
  }, /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineLink, {
    className: "text-warning h6 mt-1"
  }), /*#__PURE__*/_react["default"].createElement("small", {
    className: "fst-italic text-light"
  }, "Linked to document: ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-warning fw-bold"
  }, linked)));
}

// provides a small description text for document link choices
function getDocumentLinkChoiceDescription(name, linked_to) {
  return /*#__PURE__*/_react["default"].createElement("small", {
    className: "fst-italic text-muted"
  }, "Use below options to link property ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "fw-bold"
  }, name), ". You can either Create New", /*#__PURE__*/_react["default"].createElement("span", {
    className: "fw-bold"
  }, linked_to), " or link to an existing ", /*#__PURE__*/_react["default"].createElement("span", {
    className: "fw-bold"
  }, linked_to));
}