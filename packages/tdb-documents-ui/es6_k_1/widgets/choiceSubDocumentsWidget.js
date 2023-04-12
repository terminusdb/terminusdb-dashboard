"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBChoiceSubDocuments = void 0;
var _react = _interopRequireWildcard(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var CONST = _interopRequireWildcard(require("../constants"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _SelectComponent = require("../components/SelectComponent");
var _LabelComponent = require("../components/LabelComponent");
var _subDocumentWidget = require("./subDocumentWidget");
var _widgetHelper = require("../helpers/widgetHelper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DisplaySelectedSubDocument = function DisplaySelectedSubDocument(_ref) {
  var props = _ref.props,
    selected = _ref.selected,
    args = _ref.args,
    id = _ref.id,
    choiceSubDocumentData = _ref.choiceSubDocumentData,
    setChoiceSubDocumentData = _ref.setChoiceSubDocumentData;
  var reference = args.reference,
    mode = args.mode,
    fullFrame = args.fullFrame;
  if (!selected) return /*#__PURE__*/_react["default"].createElement("div", null);
  function handleChoiceDocumentChange(data, fieldName) {
    //setExtractedData(data)
    if (props.onChange) props.onChange(data);
    //console.log("onChange", data, fieldName)
  }

  var extracted = util.availableInReference(reference, selected) ? reference[selected] : {};
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];
  var config = {
    required: props.required,
    name: props.name,
    onChange: handleChoiceDocumentChange,
    formData: choiceSubDocumentData
  };

  // get order_by
  // at this point selected is the linked_to documnet in fullframe
  var order_by = false;
  if (fullFrame.hasOwnProperty(selected)) {
    order_by = util.getOrderBy(fullFrame, selected);
  }
  return /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(_subDocumentWidget.TDBSubDocument, {
    extracted: extracted
    //id={props.idSchema["$id"]}
    ,
    id: id,
    args: args,
    expanded: true,
    index: props.index,
    order_by: order_by,
    subDocumentData: choiceSubDocumentData,
    setSubDocumentData: setChoiceSubDocumentData
    //comment={documentation.comment ? documentation.comment : null} 
    //mode={mode}
    ,
    hideFieldLabel: true,
    propertyDocumentation: (0, _widgetHelper.extractPropertyDocumentation)(extracted.extractedDocumentation, selectedLanguage),
    linked_to: selected,
    props: config
  }));
};
var TDBChoiceSubDocuments = function TDBChoiceSubDocuments(_ref2) {
  var args = _ref2.args,
    props = _ref2.props,
    property = _ref2.property,
    id = _ref2.id,
    choiceSubDocumentData = _ref2.choiceSubDocumentData,
    setChoiceSubDocumentData = _ref2.setChoiceSubDocumentData;
  var _useState = (0, _react.useState)(props.formData ? props.formData["@type"] : false),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    setSelected = _useState2[1];
  var documentFrame = args.documentFrame,
    mode = args.mode;
  (0, _react.useEffect)(function () {
    if (selected) {
      if (mode === CONST.EDIT) {
        if (props.formData && props.formData.hasOwnProperty(CONST.TYPE) && selected !== props.formData[CONST.TYPE]) {
          setChoiceSubDocumentData(_defineProperty({}, CONST.TYPE, selected));
        } else if (props.formData) setChoiceSubDocumentData(props.formData);else setChoiceSubDocumentData(_defineProperty({}, CONST.TYPE, selected)); // when props.formData not populated
      } else if (mode === CONST.CREATE) setChoiceSubDocumentData(_defineProperty({}, CONST.TYPE, selected));
    }
  }, [selected]);
  function handleChoiceSelect(chosen) {
    if (chosen) setSelected(chosen);
  }
  var choices = util.getChoices(documentFrame, property);
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: property,
    required: props.required,
    id: id,
    hideFieldLabel: props.hideFieldLabel
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "w-100 p-3",
    key: id
  }, /*#__PURE__*/_react["default"].createElement(_SelectComponent.SelectComponent, {
    options: choices,
    placeholder: "Select choices ...",
    value: (0, _SelectComponent.getDefaultValue)(choices, selected),
    id: id,
    mode: mode,
    onChange: handleChoiceSelect
  }), /*#__PURE__*/_react["default"].createElement(DisplaySelectedSubDocument, {
    props: props,
    selected: selected,
    choiceSubDocumentData: choiceSubDocumentData,
    setChoiceSubDocumentData: setChoiceSubDocumentData,
    id: id,
    args: args
  })));
};
exports.TDBChoiceSubDocuments = TDBChoiceSubDocuments;