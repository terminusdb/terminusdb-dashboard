"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewDocument = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _widgetHelper = require("../helpers/widgetHelper");
var _LabelComponent = require("./LabelComponent");
var _ToggleDocumentLink = require("./ToggleDocumentLink");
var _DescriptionComponent = require("./DescriptionComponent");
var _uuid = require("uuid");
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _bs = require("react-icons/bs");
var _SearchExistingLink = require("./SearchExistingLink");
var _CreateDocumentLink = require("./CreateDocumentLink");
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DisplayFilledFrame = function DisplayFilledFrame(_ref) {
  var documentData = _ref.documentData,
    reference = _ref.reference,
    cardKey = _ref.cardKey,
    onTraverse = _ref.onTraverse,
    setDocumentData = _ref.setDocumentData,
    unfoldable = _ref.unfoldable,
    action = _ref.action,
    formData = _ref.formData,
    onChange = _ref.onChange,
    documentLinkPropertyName = _ref.documentLinkPropertyName,
    extracted = _ref.extracted,
    required = _ref.required,
    mode = _ref.mode,
    linked_to = _ref.linked_to;
  if (action === CONST.LINK_NEW_DOCUMENT) {
    var handleChange = function handleChange(data, fieldName) {
      var tempDocumentData = documentData;
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      tempDocumentData[fieldName ? fieldName : documentLinkPropertyName] = data;
      setDocumentData(tempDocumentData);
      if (onChange) onChange(tempDocumentData);
    }; // definitions will have definitions of linked_to frames
    var fields = [];
    var deifinitions = util.availableInReference(reference, linked_to) ? reference[linked_to] : extracted.properties;

    //for(let field in extracted.properties) {
    for (var field in deifinitions.properties) {
      //if(field === documentLinkPropertyName) {
      linked_to = deifinitions.properties[field][CONST.PLACEHOLDER];
      if (util.availableInReference(reference, linked_to)) {
        if (!formData.hasOwnProperty(field)) fields.push( /*#__PURE__*/_react["default"].createElement("div", {
          className: "empty"
        }));else fields.push( /*#__PURE__*/_react["default"].createElement(ViewDocument, {
          name: field,
          onChange: handleChange,
          linked_to: linked_to,
          mode: mode,
          depth: cardKey,
          reference: reference,
          unfoldable: unfoldable,
          formData: formData[field],
          extracted: deifinitions
          //comment={comment}  // review
          ,
          required: required
        }));
      } else {
        var _config;
        // internal properties
        var fieldName = deifinitions.properties[field].title;
        var fieldID = "root_".concat(documentLinkPropertyName, "_").concat(fieldName, "_").concat(cardKey);
        var config = (_config = {
          dataType: deifinitions.properties[field][CONST.PLACEHOLDER],
          // dataType will be xsd:string or xsd:dateTime etc
          name: fieldName,
          key: "".concat(linked_to, "__").concat((0, _uuid.v4)()),
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: deifinitions.required.includes(fieldName),
          mode: mode,
          id: fieldID
        }, _defineProperty(_config, "formData", documentData[field]), _defineProperty(_config, "placeholder", deifinitions.properties[field][CONST.PLACEHOLDER]), _defineProperty(_config, "className", "tdb__doc__input"), _defineProperty(_config, "onChange", handleChange), _defineProperty(_config, "documentation", ""), _config);
        fields.push((0, _widgetHelper.display)(config));
      }
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-4"
    }, fields);
  } else if (action === CONST.LINK_EXISTING_DOCUMENT) {
    return /*#__PURE__*/_react["default"].createElement(_SearchExistingLink.SearchExistingLink, {
      mode: mode,
      formData: formData,
      onChange: onChange,
      onTraverse: onTraverse,
      id: cardKey,
      linked_to: linked_to
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", null);
};
function getAction(formData, unfoldable) {
  if (unfoldable && _typeof(formData) === CONST.OBJECT_TYPE) return CONST.LINK_NEW_DOCUMENT;
  return CONST.LINK_EXISTING_DOCUMENT;
}
var ViewHelper = function ViewHelper(_ref2) {
  var linked_to = _ref2.linked_to;
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    gap: 4
  }, (0, _DescriptionComponent.getLinkedDescription)(linked_to));
};

// VIEW MODE
var ViewDocument = function ViewDocument(_ref3) {
  var name = _ref3.name,
    required = _ref3.required,
    reference = _ref3.reference,
    depth = _ref3.depth,
    comment = _ref3.comment,
    formData = _ref3.formData,
    linked_to = _ref3.linked_to,
    extracted = _ref3.extracted,
    mode = _ref3.mode,
    onChange = _ref3.onChange,
    unfoldable = _ref3.unfoldable,
    onTraverse = _ref3.onTraverse;
  var _useState = (0, _react.useState)(getAction(formData, unfoldable)),
    _useState2 = _slicedToArray(_useState, 2),
    action = _useState2[0],
    setAction = _useState2[1];
  var _useState3 = (0, _react.useState)(formData),
    _useState4 = _slicedToArray(_useState3, 2),
    documentData = _useState4[0],
    setDocumentData = _useState4[1];
  var _useState5 = (0, _react.useState)(depth + 1),
    _useState6 = _slicedToArray(_useState5, 2),
    cardKey = _useState6[0],
    setCardKey = _useState6[1];
  if (mode === CONST.VIEW && !formData) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: name,
    required: required,
    comment: comment,
    className: "tdb__label__width"
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "mb-3 border border-dark w-100",
    key: cardKey
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(ViewHelper, {
    linked_to: linked_to
  })), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(DisplayFilledFrame, {
    action: action,
    extracted: extracted,
    required: required,
    mode: mode,
    unfoldable: unfoldable,
    onTraverse: onTraverse,
    onChange: onChange,
    linked_to: linked_to,
    cardKey: cardKey,
    reference: reference,
    formData: formData,
    documentLinkPropertyName: name,
    documentData: documentData,
    setDocumentData: setDocumentData
  }))));
};
exports.ViewDocument = ViewDocument;