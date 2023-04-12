"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiffViewer = void 0;
var _react = _interopRequireDefault(require("react"));
var _FrameViewer = require("../FrameViewer");
var CONST = _interopRequireWildcard(require("../constants"));
var _reactBootstrap = require("react-bootstrap");
var _Headers = require("./Headers");
var DIFFCONST = _interopRequireWildcard(require("./diff.constants"));
var _diffHelpers = require("./diffHelpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DiffViewer = function DiffViewer(args) {
  var frame = args.frame,
    type = args.type,
    oldValue = args.oldValue,
    newValue = args.newValue,
    diffPatch = args.diffPatch,
    oldValueHeader = args.oldValueHeader,
    newValueHeader = args.newValueHeader;
  if (!frame) return /*#__PURE__*/_react["default"].createElement("div", null, "Include frames to view Diffs");
  if (!type) return /*#__PURE__*/_react["default"].createElement("div", null, "Include document type to view Diffs");
  if (!diffPatch) return /*#__PURE__*/_react["default"].createElement("div", null, "Include diff patch JSON Object to view diffs");
  if (!frame.hasOwnProperty(type)) return /*#__PURE__*/_react["default"].createElement("div", null, "Frame of type ".concat(type, " not found"));
  var frame_ref_1 = frame;
  var frame_ref_2 = frame;
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    md: 6
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Header, null, /*#__PURE__*/_react["default"].createElement(_Headers.OldValueHeader, {
    oldValueHeader: oldValueHeader
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Body, null, /*#__PURE__*/_react["default"].createElement(_FrameViewer.FrameViewer, {
    frame: frame_ref_1,
    uiFrame: (0, _diffHelpers.generateDiffUIFrames)(diffPatch, DIFFCONST.BEFORE),
    type: type,
    formData: oldValue,
    mode: CONST.VIEW,
    hideSubmit: true
  })))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    md: 6
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Header, null, /*#__PURE__*/_react["default"].createElement(_Headers.NewValueHeader, {
    newValueHeader: newValueHeader
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Card.Body, null, /*#__PURE__*/_react["default"].createElement(_FrameViewer.FrameViewer, {
    frame: frame_ref_2,
    uiFrame: (0, _diffHelpers.generateDiffUIFrames)(diffPatch, DIFFCONST.AFTER),
    type: type,
    formData: newValue,
    mode: CONST.VIEW,
    hideSubmit: true
  })))));
};
exports.DiffViewer = DiffViewer;