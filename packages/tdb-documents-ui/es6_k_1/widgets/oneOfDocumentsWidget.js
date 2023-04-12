"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBOneOfDocuments = void 0;
var _react = _interopRequireWildcard(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var CONST = _interopRequireWildcard(require("../constants"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _SelectComponent = require("../components/SelectComponent");
var _LabelComponent = require("../components/LabelComponent");
var _subDocumentWidget = require("./subDocumentWidget");
var _widgetHelper = require("../helpers/widgetHelper");
var _fieldDisplay = require("../helpers/fieldDisplay");
var _dataType = require("../dataType.constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DisplaySelectedChoices = function DisplaySelectedChoices(_ref) {
  var props = _ref.props,
    selected = _ref.selected,
    args = _ref.args,
    id = _ref.id,
    oneOfDocumentData = _ref.oneOfDocumentData,
    setOneOfDocumentData = _ref.setOneOfDocumentData;
  var reference = args.reference,
    mode = args.mode,
    fullFrame = args.fullFrame;
  if (!selected) return /*#__PURE__*/_react["default"].createElement("div", null);
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];

  // get order_by
  // at this point selected is the linked_to documnet in fullframe
  var order_by = false;
  if (fullFrame.hasOwnProperty(selected)) {
    order_by = util.getOrderBy(fullFrame, selected);
  }
  var selectedFrame = args.documentFrame[CONST.ONEOFVALUES][0][selected];

  // construct args
  var argsHolder = _objectSpread({}, args);
  argsHolder.documentFrame = _defineProperty({}, selected, selectedFrame);
  function handleOneOfChange(data, name) {
    //console.log(data, name) 
    if (props.onChange) props.onChange(data, name, selected);
  }

  // construct props
  var oneOfProps = {};
  oneOfProps.documentFrame = _defineProperty({}, selected, args.documentFrame[CONST.ONEOFVALUES][0][selected]);
  oneOfProps.expand = true;
  oneOfProps.name = selected;
  oneOfProps.required = true;
  oneOfProps.formData = oneOfDocumentData;
  oneOfProps.onChange = handleOneOfChange;
  oneOfProps[CONST.ONEOF_SELECTED] = selected;
  return /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, (0, _fieldDisplay.getDisplay)(oneOfProps, argsHolder, selected));
};

/** populate one of data when selected has changed  */
function setOneOfFormData(args, selected, data) {
  // subdocuments
  if (args.documentFrame[CONST.ONEOFVALUES][0][selected].hasOwnProperty(CONST.CLASS)) return _defineProperty({}, CONST.TYPE, selected);else if (args.documentFrame[CONST.ONEOFVALUES][0][selected] === _dataType.SYS_UNIT_DATA_TYPE) return [];else return "";
}
var TDBOneOfDocuments = function TDBOneOfDocuments(_ref3) {
  var args = _ref3.args,
    props = _ref3.props,
    property = _ref3.property,
    id = _ref3.id,
    setOneOfDocumentData = _ref3.setOneOfDocumentData,
    oneOfDocumentData = _ref3.oneOfDocumentData;
  var _useState = (0, _react.useState)(props[CONST.ONEOF_SELECTED] ? props[CONST.ONEOF_SELECTED] : false),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    setSelected = _useState2[1];
  var documentFrame = args.documentFrame,
    mode = args.mode;
  (0, _react.useEffect)(function () {
    if (selected) {
      if (mode === CONST.EDIT) {
        if (props.formData && props.formData.hasOwnProperty(CONST.TYPE) && selected === props[CONST.ONEOF_SELECTED]) {
          setOneOfDocumentData(props.formData);
        } else {
          if (util.isDataType(args.documentFrame[CONST.ONEOFVALUES][0][selected])) setOneOfDocumentData("");else setOneOfDocumentData(_defineProperty({}, CONST.TYPE, selected)); // when props.formData not populated
        }
      } else if (mode === CONST.CREATE) {
        setOneOfDocumentData(setOneOfFormData(args, selected));
      }
      if (args.documentFrame[CONST.ONEOFVALUES][0][selected] === _dataType.SYS_UNIT_DATA_TYPE) {
        // SET DEFAULT VALUE [] if selected is sys:Unit type
        if (props.onChange) props.onChange([], CONST.ONEOFVALUES, selected);
      }
    }
  }, [selected]);
  function handleChoiceSelect(chosen) {
    if (chosen) setSelected(chosen);
  }
  var choices = util.getOneOfChoices(documentFrame["@oneOf"][0]);
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "w-100 ",
    key: id
  }, /*#__PURE__*/_react["default"].createElement(_SelectComponent.SelectComponent, {
    options: choices,
    mode: mode,
    placeholder: "Select choices ...",
    value: (0, _SelectComponent.getDefaultValue)(choices, selected),
    id: id,
    required: true,
    onChange: handleChoiceSelect
  }), /*#__PURE__*/_react["default"].createElement(DisplaySelectedChoices, {
    props: props,
    selected: selected,
    oneOfDocumentData: oneOfDocumentData,
    setOneOfDocumentData: setOneOfDocumentData,
    id: id,
    args: args
  })));
};
exports.TDBOneOfDocuments = TDBOneOfDocuments;