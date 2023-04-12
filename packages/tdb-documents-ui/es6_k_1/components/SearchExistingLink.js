"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchExistingLink = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var _ai = require("react-icons/ai");
var _UnlinkButton = require("./UnlinkButton");
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
// checks if @unfoldable is false if there is filled data in EDIT Mode only
function fetchSelected(formData) {
  if (_typeof(formData) === CONST.STRING_TYPE && formData) return {
    id: formData,
    label: formData
  };
  return false;
}
var LinkedDocument = function LinkedDocument(_ref) {
  var selected = _ref.selected,
    onTraverse = _ref.onTraverse;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    clicked = _useState2[0],
    setClicked = _useState2[1];
  (0, _react.useEffect)(function () {
    if (!clicked.id) return;
    if (onTraverse) onTraverse(clicked.id);
  }, [clicked.update]);
  var handleClick = function handleClick(e, val) {
    // view if on traverse function defined
    setClicked({
      id: val,
      update: Date.now()
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineCheck, {
    className: "text-success mr-1 mt-1"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-break text-decoration-underline",
    onClick: function onClick(e) {
      return handleClick(e, selected.id);
    },
    style: {
      cursor: "pointer"
    },
    id: selected.id
  }, selected.label ? selected.label : selected.id));
};

// Selected link component 
var Selected = function Selected(_ref2) {
  var selected = _ref2.selected,
    onTraverse = _ref2.onTraverse,
    setShowSearch = _ref2.setShowSearch,
    setSelected = _ref2.setSelected,
    id = _ref2.id,
    onChange = _ref2.onChange;
  if (!selected) return /*#__PURE__*/_react["default"].createElement("div", null);
  function handleDelete() {
    setSelected(false);
    setShowSearch(true); // show search component 
    onChange(null);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-100 d-flex justify-content-end"
  }, /*#__PURE__*/_react["default"].createElement("small", {
    className: "fst-italic fw-bold text-warning mt-1"
  }, "Selected:  "), /*#__PURE__*/_react["default"].createElement(LinkedDocument, {
    selected: selected,
    onTraverse: onTraverse
  }), /*#__PURE__*/_react["default"].createElement(_UnlinkButton.UnlinkButton, {
    onDelete: handleDelete,
    title: "Delete link",
    label: "Change Link",
    id: id
  }));
};
var SearchExistingLink = function SearchExistingLink(_ref3) {
  var onSelect = _ref3.onSelect,
    onTraverse = _ref3.onTraverse,
    linked_to = _ref3.linked_to,
    mode = _ref3.mode,
    onChange = _ref3.onChange,
    formData = _ref3.formData,
    id = _ref3.id;
  var _useState3 = (0, _react.useState)(fetchSelected(formData)),
    _useState4 = _slicedToArray(_useState3, 2),
    selected = _useState4[0],
    setSelected = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    showSearch = _useState6[0],
    setShowSearch = _useState6[1];
  (0, _react.useEffect)(function () {
    if (selected && onChange) {
      onChange(selected.id);
      setSelected(selected);
      setShowSearch(false);
    }
  }, [selected]);
  if (mode === CONST.VIEW) {
    return /*#__PURE__*/_react["default"].createElement(LinkedDocument, {
      selected: selected,
      onTraverse: onTraverse
    });
  }

  // onSelect is not provided for VIEW MODE
  if (!onSelect) return /*#__PURE__*/_react["default"].createElement("div", null);
  var displayComponent = /*#__PURE__*/_react["default"].cloneElement(onSelect, {
    setSelected: setSelected,
    doctype: linked_to
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showSearch && /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "transparent",
    className: "p-4 mt-3",
    key: id
  }, displayComponent), selected && /*#__PURE__*/_react["default"].createElement(Selected, {
    selected: selected,
    setSelected: setSelected,
    onTraverse: onTraverse,
    setShowSearch: setShowSearch,
    id: id,
    onChange: onChange
  }));
};
exports.SearchExistingLink = SearchExistingLink;