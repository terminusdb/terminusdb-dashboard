"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayLinkID = exports.DisplayLink = void 0;
exports.getClassNames = getClassNames;
var _react = _interopRequireWildcard(require("react"));
var _ai = require("react-icons/ai");
var _LabelComponent = require("./LabelComponent");
var _constants = require("../constants");
var _TraverseDocumentLinks = require("./TraverseDocumentLinks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DisplayLinkID = function DisplayLinkID(_ref) {
  var linkProps = _ref.linkProps,
    onClick = _ref.onClick,
    selected = _ref.selected,
    className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineCheck, {
    className: "text-success mr-1 mt-1"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-break text-decoration-underline ".concat(className),
    onClick: onClick,
    style: {
      cursor: "pointer"
    },
    id: selected
  }, selected));
};
exports.DisplayLinkID = DisplayLinkID;
var LinkedUnfoldedDocument = function LinkedUnfoldedDocument(_ref2) {
  var selected = _ref2.selected,
    linkProps = _ref2.linkProps,
    className = _ref2.className;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showUnfoldedDocs = _useState2[0],
    setShowUnfoldedDocs = _useState2[1];
  var handleClick = function handleClick(e, val) {
    // on click of link 
    setShowUnfoldedDocs(Date.now());
  };
  var handleClose = function handleClose() {
    return setShowUnfoldedDocs(false);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "d-flex mb-3"
  }, showUnfoldedDocs && /*#__PURE__*/_react["default"].createElement(_TraverseDocumentLinks.TraverseDocumentLinks, {
    onHide: handleClose,
    linkProps: linkProps,
    clicked: linkProps.dataID
  }), /*#__PURE__*/_react["default"].createElement(DisplayLinkID, {
    linkProps: linkProps,
    className: className,
    onClick: handleClick,
    selected: selected
  }));
};
function getDocumentDiffClassNames(borderClassName) {
  if (borderClassName === "tdb__diff__original-border") return "tdb__diff__original-underline";
  return "tdb__diff__changed-underline";
}
function getClassNames(uiFrame, documentLinkPropertyName) {
  return uiFrame && uiFrame.hasOwnProperty(documentLinkPropertyName) && uiFrame[documentLinkPropertyName].hasOwnProperty(_constants.BORDER) ? getDocumentDiffClassNames(uiFrame[documentLinkPropertyName][_constants.BORDER]) : "";
}
var DisplayLink = function DisplayLink(linkProps) {
  var documentLinkPropertyName = linkProps.documentLinkPropertyName,
    uiFrame = linkProps.uiFrame;
  var className = getClassNames(uiFrame, documentLinkPropertyName);
  return /*#__PURE__*/_react["default"].createElement(LinkedUnfoldedDocument, {
    selected: linkProps.dataID,
    className: className,
    linkProps: linkProps
  });
};
exports.DisplayLink = DisplayLink;