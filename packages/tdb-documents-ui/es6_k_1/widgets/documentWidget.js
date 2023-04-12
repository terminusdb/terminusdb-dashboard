"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBDocument = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _LabelComponent = require("../components/LabelComponent");
var _DescriptionComponent = require("../components/DescriptionComponent");
var _CreateDocumentLink = require("../components/CreateDocumentLink");
var _EditDocumentLink = require("../components/EditDocumentLink");
var _ViewDocumentLink = require("../components/ViewDocumentLink");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var TDBDocument = function TDBDocument(_ref) {
  var args = _ref.args,
    extracted = _ref.extracted,
    reference = _ref.reference,
    uiFrame = _ref.uiFrame,
    clickedUnlinked = _ref.clickedUnlinked,
    order_by = _ref.order_by,
    onTraverse = _ref.onTraverse,
    onSelect = _ref.onSelect,
    hideFieldLabel = _ref.hideFieldLabel,
    unfoldable = _ref.unfoldable,
    props = _ref.props,
    mode = _ref.mode,
    linked_to = _ref.linked_to,
    propertyDocumentation = _ref.propertyDocumentation,
    linkId = _ref.linkId;
  var depth = 0;
  if (mode === CONST.CREATE) return /*#__PURE__*/_react["default"].createElement(_CreateDocumentLink.CreateDocument, {
    name: props.name,
    onChange: props.onChange,
    linked_to: linked_to,
    depth: depth,
    linkId: linkId,
    order_by: order_by,
    args: args,
    onSelect: onSelect,
    mode: mode,
    hideFieldLabel: hideFieldLabel,
    reference: reference,
    extracted: extracted,
    propertyDocumentation: propertyDocumentation,
    required: props.required
  });
  if (mode === CONST.EDIT) return /*#__PURE__*/_react["default"].createElement(_EditDocumentLink.EditDocument, {
    name: props.name,
    onChange: props.onChange,
    linked_to: linked_to,
    clickedUnlinked: clickedUnlinked,
    depth: depth,
    reference: reference,
    mode: mode,
    order_by: order_by,
    args: args,
    index: props.index,
    hideFieldLabel: hideFieldLabel,
    onSelect: onSelect,
    onTraverse: onTraverse,
    unfoldable: unfoldable,
    propertyDocumentation: propertyDocumentation,
    formData: props.formData,
    extracted: extracted,
    required: props.required
  });
  if (mode === CONST.VIEW) return /*#__PURE__*/_react["default"].createElement(_ViewDocumentLink.ViewDocument, {
    name: props.name,
    onChange: props.onChange,
    linked_to: linked_to,
    mode: mode,
    uiFrame: uiFrame,
    args: args,
    depth: depth,
    order_by: order_by,
    reference: reference,
    onTraverse: onTraverse,
    hideFieldLabel: hideFieldLabel,
    unfoldable: unfoldable,
    propertyDocumentation: propertyDocumentation,
    formData: props.formData,
    extracted: extracted,
    required: props.required
  });
};
exports.TDBDocument = TDBDocument;