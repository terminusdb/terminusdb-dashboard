"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBSubDocument = exports.SubDocumentProperties = void 0;
exports.populateSubDocumentData = populateSubDocumentData;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _Collapse = _interopRequireDefault(require("react-bootstrap/Collapse"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _LabelComponent = require("../components/LabelComponent");
var CONST = _interopRequireWildcard(require("../constants"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var util = _interopRequireWildcard(require("../utils"));
var _templates = require("../templates");
var _ai = require("react-icons/ai");
var _documentHelpers = require("../helpers/documentHelpers");
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
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CollapseMessage = function CollapseMessage(_ref) {
  var message = _ref.message,
    name = _ref.name,
    icon = _ref.icon;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, icon, /*#__PURE__*/_react["default"].createElement("small", {
    className: "fst-italic text-light"
  }, "".concat(message, " ").concat(name)));
};

// populate SubDocument data based on modes
function populateSubDocumentData(mode, linked_to, formData, frame) {
  if (mode === CONST.CREATE) return _defineProperty({}, CONST.TYPE, linked_to);else if (mode === CONST.EDIT) {
    if (formData && linked_to === formData[CONST.TYPE]) return formData;else return _defineProperty({}, CONST.TYPE, linked_to);
  }
  return formData;
}
var SubDocumentProperties = function SubDocumentProperties(_ref4) {
  var subDocumentPropertyName = _ref4.subDocumentPropertyName,
    props = _ref4.props,
    order_by = _ref4.order_by,
    index = _ref4.index,
    id = _ref4.id,
    reference = _ref4.reference,
    subDocumentData = _ref4.subDocumentData,
    setSubDocumentData = _ref4.setSubDocumentData,
    properties = _ref4.properties,
    required = _ref4.required,
    onChange = _ref4.onChange,
    args = _ref4.args,
    propertyDocumentation = _ref4.propertyDocumentation;
  //const [fields, setFields] = useState([])

  var uiFrame = args.uiFrame,
    mode = args.mode;
  function handleChange(data, fieldName, selectedOneOf) {
    var tempSubDocumentData = subDocumentData;
    if (fieldName === CONST.ONEOFVALUES) {
      if (selectedOneOf) {
        var tmp = {};
        // change data to add on selected choice from one of 
        tmp[CONST.TYPE] = tempSubDocumentData[CONST.TYPE];
        tmp[selectedOneOf] = data;
        tempSubDocumentData = tmp;
      }
    } else tempSubDocumentData[fieldName] = data;
    setSubDocumentData(tempSubDocumentData);
    if (onChange) onChange(tempSubDocumentData);
  }

  //console.log("subDocumentData SubDocumentProperties", subDocumentData)
  var defaultClassName = "tdb__doc__input";
  var fieldUIFrame = util.getFieldUIFrame(uiFrame, subDocumentPropertyName, defaultClassName, index);
  var getSubDocumentFields = function getSubDocumentFields(subDocumentData) {
    //let subDocumentFields = []

    var subDocConfig = {
      properties: properties,
      propertyName: subDocumentPropertyName,
      id: id,
      key: id,
      formData: subDocumentData,
      required: required,
      mode: mode,
      args: args,
      fieldUIFrame: fieldUIFrame,
      onChange: handleChange,
      defaultClassName: defaultClassName,
      propertyDocumentation: propertyDocumentation
    };
    if (props.hasOwnProperty(CONST.ONEOF_SELECTED)) {
      // some choice might have been selected in @oneOfs
      subDocConfig[CONST.ONEOF_SELECTED] = props[CONST.ONEOF_SELECTED];
    }
    //return displayInternalProperties(subDocConfig)

    // review fix order_by
    var subDocumentFields = (0, _documentHelpers.displayInternalProperties)(subDocConfig);
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, subDocumentFields);
    // sort based on order_by
    //return util.sortDocumentProperties(order_by, subDocumentFields)
  };

  return /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, {
    className: "border-top border-dark"
  }, /*#__PURE__*/_react["default"].createElement(_templates.DisplayDocumentation, {
    documentation: propertyDocumentation
  }), getSubDocumentFields(subDocumentData));
};
exports.SubDocumentProperties = SubDocumentProperties;
var TDBSubDocument = function TDBSubDocument(_ref5) {
  var extracted = _ref5.extracted,
    expanded = _ref5.expanded,
    order_by = _ref5.order_by,
    comment = _ref5.comment,
    props = _ref5.props,
    index = _ref5.index,
    hideFieldLabel = _ref5.hideFieldLabel,
    linked_to = _ref5.linked_to,
    propertyDocumentation = _ref5.propertyDocumentation,
    id = _ref5.id,
    reference = _ref5.reference,
    subDocumentData = _ref5.subDocumentData,
    setSubDocumentData = _ref5.setSubDocumentData,
    args = _ref5.args;
  var _useState = (0, _react.useState)(expanded),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var uiFrame = args.uiFrame,
    mode = args.mode;
  if (mode === CONST.VIEW && !props.formData) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(props.name, "__hidden")
  });
  if (mode === CONST.VIEW && props.formData && !Object.keys(props.formData).length) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(props.name, "__hidden")
  });
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: props.name,
    required: props.required,
    comment: comment,
    className: "tdb__label__width",
    hideFieldLabel: hideFieldLabel
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "tdb__subdocument__input ".concat(util.getBorder(uiFrame, props.name, index), " w-100"),
    key: id
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: "secondary",
    className: "text-start p-4",
    "data-testid": "root_subdocument_".concat(props.name, "_button"),
    name: "root_subdocument_".concat(props.name, "_button"),
    onClick: function onClick() {
      return setOpen(!open);
    },
    "aria-controls": "root_subdocument_".concat(props.name),
    "aria-expanded": open
  }, !open && /*#__PURE__*/_react["default"].createElement(CollapseMessage, {
    message: "Click here to expand SubDocument",
    name: props.name,
    icon: /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineRight, {
      className: "text-light"
    })
  }), open && /*#__PURE__*/_react["default"].createElement(CollapseMessage, {
    message: "Click here to collapse SubDocument",
    name: props.name,
    icon: /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineUp, {
      className: "text-light"
    })
  })), /*#__PURE__*/_react["default"].createElement(_Collapse["default"], {
    "in": open
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "root_subdocument_".concat(props.name)
  }, subDocumentData && linked_to === subDocumentData[CONST.TYPE] && /*#__PURE__*/_react["default"].createElement(SubDocumentProperties, {
    properties: extracted.properties,
    required: extracted.required
    //formData={props.formData}
    ,
    id: id,
    index: index,
    reference: reference,
    order_by: order_by,
    props: props,
    subDocumentPropertyName: props.name,
    propertyDocumentation: propertyDocumentation,
    onChange: props.onChange,
    subDocumentData: subDocumentData,
    setSubDocumentData: setSubDocumentData,
    linked_to: linked_to,
    args: args
  })))));
};
exports.TDBSubDocument = TDBSubDocument;