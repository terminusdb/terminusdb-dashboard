"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBChoiceDocuments = void 0;
var _react = _interopRequireWildcard(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var CONST = _interopRequireWildcard(require("../constants"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _SelectComponent = require("../components/SelectComponent");
var _LabelComponent = require("../components/LabelComponent");
var _documentWidget = require("./documentWidget");
var _widgetHelper = require("../helpers/widgetHelper");
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
var DisplaySelectedDocument = function DisplaySelectedDocument(_ref) {
  var props = _ref.props,
    selected = _ref.selected,
    args = _ref.args,
    id = _ref.id,
    clickedUnlinked = _ref.clickedUnlinked,
    choiceDocumentData = _ref.choiceDocumentData,
    setChoiceDocumentData = _ref.setChoiceDocumentData;
  var reference = args.reference,
    mode = args.mode,
    fullFrame = args.fullFrame,
    onSelect = args.onSelect,
    onTraverse = args.onTraverse,
    documentFrame = args.documentFrame;
  if (!selected) return /*#__PURE__*/_react["default"].createElement("div", null);
  function handleChoiceDocumentChange(data, fieldName) {
    // make sure data has @type same as that of selected 
    // if not then we force at this point - logic for type is controlled in 
    // choice documents rather than in TDB Document widget
    if (_typeof(data) === CONST.OBJECT_TYPE) {
      data[CONST.TYPE] = selected;
    }
    if (props.onChange) props.onChange(data);
  }
  var extracted = util.availableInReference(reference, selected) ? reference[selected] : {};
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];
  var config = {
    required: props.required,
    name: props.name,
    onChange: handleChoiceDocumentChange,
    formData: extractDataBasedOnChoices(choiceDocumentData, selected)
    //formData: selected===choiceDocumentData[CONST.TYPE] ? choiceDocumentData : {}
  };

  return /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(_documentWidget.TDBDocument, {
    extracted: extracted,
    linkId: props.hasOwnProperty("id") ? props["id"] : null
    //comment={documentation.comment ? documentation.comment : null} 
    ,
    mode: mode,
    hideFieldLabel: true,
    args: args,
    onSelect: onSelect,
    clickedUnlinked: clickedUnlinked,
    reference: reference,
    onTraverse: onTraverse,
    propertyDocumentation: (0, _widgetHelper.extractPropertyDocumentation)(extracted.extractedDocumentation, selectedLanguage),
    linked_to: selected,
    unfoldable: util.isUnfoldable(fullFrame[selected]),
    props: config
  }));
};
function getChoicesToDisplay(mode, documentFrame, property, unlinked, choiceDocumentData) {
  var choices = util.getChoices(documentFrame, property);
  if (mode === CONST.EDIT && !unlinked && choiceDocumentData.hasOwnProperty(CONST.TYPE)) {
    // show only linked type here
    // if user wants to change this user will have to unlink the document 
    //to get both the choices back
    choices = choices.filter(function (arr) {
      return arr.value === choiceDocumentData[CONST.TYPE];
    });
  }
  //else if(mode === CONST.EDIT && unlinked) choices = util.getChoices(documentFrame, property)
  return choices;
}

// function which provides data to TDBDocuments based on choices selected 
function extractDataBasedOnChoices(choiceDocumentData, selected) {
  if (selected === extractSelectedChoice(choiceDocumentData)) return choiceDocumentData;
  return {};
}

// extract selected type from filled data when its a string (@unfoldbale is false)
function getTypeFromFilledData(formData) {
  var arr = formData.split("/");
  return arr[0]; // arr[0] will have the type chosen to be displayed in select component 
}

// extract selected choice to display in select component
function extractSelectedChoice(formData) {
  if (formData) {
    if (_typeof(formData) === CONST.STRING_TYPE) {
      //@unfolded is false in this case
      return getTypeFromFilledData(formData);
    }
    return formData["@type"]; // @unfolded is true
  }

  return false;
}
var TDBChoiceDocuments = function TDBChoiceDocuments(_ref2) {
  var args = _ref2.args,
    props = _ref2.props,
    property = _ref2.property,
    id = _ref2.id,
    choiceDocumentData = _ref2.choiceDocumentData,
    setChoiceDocumentData = _ref2.setChoiceDocumentData;
  var _useState = (0, _react.useState)(extractSelectedChoice(props.formData)),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    setSelected = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    unlinked = _useState4[0],
    clickedUnlinked = _useState4[1];
  var documentFrame = args.documentFrame,
    mode = args.mode;
  var displayChoices = getChoicesToDisplay(mode, documentFrame, property, unlinked, choiceDocumentData);
  var _useState5 = (0, _react.useState)(displayChoices),
    _useState6 = _slicedToArray(_useState5, 2),
    choices = _useState6[0],
    setChoices = _useState6[1];
  (0, _react.useEffect)(function () {
    if (unlinked) setChoices(util.getChoices(documentFrame, property));
  }, [unlinked]);
  function handleChoiceSelect(chosen) {
    if (chosen) setSelected(chosen);
  }
  var documentation = util.checkIfPropertyHasDocumentation(args.extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    className: "mb-3"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: documentation.label ? documentation.label : property,
    required: props.required,
    comment: documentation.comment,
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
    mode: args.mode,
    id: id,
    onChange: handleChoiceSelect
  }), /*#__PURE__*/_react["default"].createElement(DisplaySelectedDocument, {
    props: props,
    selected: selected,
    clickedUnlinked: clickedUnlinked,
    choiceDocumentData: choiceDocumentData,
    setChoiceDocumentData: setChoiceDocumentData,
    id: id,
    args: args
  })));
};
exports.TDBChoiceDocuments = TDBChoiceDocuments;