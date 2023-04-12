"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDocument = exports.CreateDisplay = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _display = require("../helpers/display");
var _LabelComponent = require("./LabelComponent");
var _ToggleDocumentLink = require("./ToggleDocumentLink");
var _DescriptionComponent = require("./DescriptionComponent");
var _uuid = require("uuid");
var _SearchExistingLink = require("./SearchExistingLink");
var _templates = require("../templates");
var _documentHelpers = require("../helpers/documentHelpers");
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
// display based on action  
var DisplayLinkFrame = function DisplayLinkFrame(_ref) {
  var reference = _ref.reference,
    args = _ref.args,
    linkPropertyComment = _ref.linkPropertyComment,
    order_by = _ref.order_by,
    onSelect = _ref.onSelect,
    propertyDocumentation = _ref.propertyDocumentation,
    documentData = _ref.documentData,
    cardKey = _ref.cardKey,
    setDocumentData = _ref.setDocumentData,
    action = _ref.action,
    onChange = _ref.onChange,
    documentLinkPropertyName = _ref.documentLinkPropertyName,
    extracted = _ref.extracted,
    required = _ref.required,
    mode = _ref.mode,
    linked_to = _ref.linked_to,
    linkId = _ref.linkId;
  var nextCreateLink = false;
  if (action === CONST.LINK_NEW_DOCUMENT) {
    var handleChange = function handleChange(data, fieldName) {
      //console.log("documentData", documentData)
      var tempDocumentData = documentData;
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      // nextCreateLink stores the next link 
      //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      tempDocumentData[fieldName ? fieldName : nextCreateLink] = data;
      setDocumentData(tempDocumentData);
      if (onChange) onChange(tempDocumentData);
    }; // definitions will have definitions of linked_to frames
    var fields = [];
    var definitions = util.availableInReference(reference, linked_to) ? reference[linked_to] : extracted.properties;
    for (var field in definitions.properties) {
      linked_to = definitions.properties[field][CONST.PLACEHOLDER];
      // if field is a document link then @placeholder will point to linked document at this point
      if (util.availableInReference(reference, linked_to)) {
        // store the field name here to connect to correct changed data on create
        nextCreateLink = field;
        // another document link 
        fields.push( /*#__PURE__*/_react["default"].createElement(CreateDocument, {
          name: field,
          linked_to: linked_to,
          propertyDocumentation: propertyDocumentation,
          mode: mode
          //hideFieldLabel={hideFieldLabel}
          ,
          linkId: linkId,
          onSelect: onSelect,
          args: args,
          depth: cardKey,
          reference: reference,
          extracted: definitions,
          onChange: handleChange,
          linkPropertyComment: linkPropertyComment,
          required: required
        }));
      } else {
        // internal properties
        var fieldName = definitions.properties[field].title;
        var fieldID = "root_".concat(documentLinkPropertyName, "_").concat(fieldName, "_").concat(cardKey);
        var defaultClassName = "tdb__doc__input";
        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, subDocumentPropertyName, defaultClassName, index)

        var config = {
          properties: definitions.properties,
          propertyName: documentLinkPropertyName,
          id: fieldID,
          key: "".concat(linked_to, "__").concat((0, _uuid.v4)()),
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: definitions.required.includes(fieldName),
          mode: mode,
          args: args,
          //fieldUIFrame: fieldUIFrame, // review diff ui
          onChange: handleChange,
          defaultClassName: defaultClassName,
          currentDocumentClass: documentData[CONST.TYPE],
          propertyDocumentation: propertyDocumentation
        };

        // review fix order_by
        fields.push((0, _documentHelpers.documentInternalProperties)(config, field));
      }
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-4"
    }, fields);
  } else if (action === CONST.LINK_EXISTING_DOCUMENT) {
    return /*#__PURE__*/_react["default"].createElement(_SearchExistingLink.SearchExistingLink, {
      onSelect: onSelect,
      mode: mode,
      formData: null,
      onChange: onChange,
      id: cardKey,
      linked_to: linked_to
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", null);
};
var CreateDisplay = function CreateDisplay(_ref2) {
  var args = _ref2.args,
    name = _ref2.name,
    linkPropertyComment = _ref2.linkPropertyComment,
    order_by = _ref2.order_by,
    reference = _ref2.reference,
    required = _ref2.required,
    onSelect = _ref2.onSelect,
    propertyDocumentation = _ref2.propertyDocumentation,
    cardKey = _ref2.cardKey,
    linked_to = _ref2.linked_to,
    extracted = _ref2.extracted,
    mode = _ref2.mode,
    onChange = _ref2.onChange,
    action = _ref2.action,
    setAction = _ref2.setAction,
    documentData = _ref2.documentData,
    setDocumentData = _ref2.setDocumentData,
    linkId = _ref2.linkId;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _DescriptionComponent.getDocumentLinkChoiceDescription)(name, linked_to), /*#__PURE__*/_react["default"].createElement(_ToggleDocumentLink.ToggleComponent, {
    action: action,
    setAction: setAction,
    toggleKey: cardKey
  }), /*#__PURE__*/_react["default"].createElement(DisplayLinkFrame, {
    action: action,
    extracted: extracted,
    required: required,
    linkId: linkId,
    args: args,
    linkPropertyComment: linkPropertyComment,
    mode: mode,
    propertyDocumentation: propertyDocumentation,
    cardKey: cardKey,
    reference: reference,
    onChange: onChange,
    onSelect: onSelect,
    order_by: order_by,
    linked_to: linked_to,
    documentLinkPropertyName: name,
    documentData: documentData,
    setDocumentData: setDocumentData
  }));
};
exports.CreateDisplay = CreateDisplay;
function getID(linkId, depth) {
  if (linkId) {
    return "".concat(linkId, "__").concat(depth + 1);
  }
  return depth + 1;
}

// CREATE MODE
var CreateDocument = function CreateDocument(_ref3) {
  var args = _ref3.args,
    name = _ref3.name,
    required = _ref3.required,
    onSelect = _ref3.onSelect,
    reference = _ref3.reference,
    order_by = _ref3.order_by,
    hideFieldLabel = _ref3.hideFieldLabel,
    linked_to = _ref3.linked_to,
    extracted = _ref3.extracted,
    mode = _ref3.mode,
    onChange = _ref3.onChange,
    depth = _ref3.depth,
    propertyDocumentation = _ref3.propertyDocumentation,
    linkId = _ref3.linkId;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    action = _useState2[0],
    setAction = _useState2[1];
  var _useState3 = (0, _react.useState)(_defineProperty({}, CONST.TYPE, linked_to)),
    _useState4 = _slicedToArray(_useState3, 2),
    documentData = _useState4[0],
    setDocumentData = _useState4[1];
  //const [cardKey, setCardKey]=useState(uuidv4())
  var _useState6 = (0, _react.useState)(getID(linkId, depth)),
    _useState7 = _slicedToArray(_useState6, 2),
    cardKey = _useState7[0],
    setCardKey = _useState7[1];
  var linkPropertyDocumentation = util.checkIfPropertyHasDocumentation(propertyDocumentation, name);
  var comment = linkPropertyDocumentation.hasOwnProperty("comment") ? linkPropertyDocumentation["comment"] : "";
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_templates.DisplayDocumentation, {
    documentation: propertyDocumentation
  }), /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: name,
    required: required,
    comment: comment,
    className: "tdb__label__width",
    hideFieldLabel: hideFieldLabel
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "mb-3 border border-dark w-100",
    key: cardKey
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, (0, _DescriptionComponent.getLinkedDescription)(linked_to)), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(CreateDisplay, {
    name: name,
    required: required,
    comment: comment,
    linked_to: linked_to,
    extracted: extracted,
    mode: mode,
    linkId: linkId,
    args: args,
    order_by: order_by,
    propertyDocumentation: propertyDocumentation,
    reference: reference,
    onSelect: onSelect,
    cardKey: cardKey,
    onChange: onChange,
    action: action,
    setAction: setAction,
    documentData: documentData,
    setDocumentData: setDocumentData
  })))));
};
exports.CreateDocument = CreateDocument;