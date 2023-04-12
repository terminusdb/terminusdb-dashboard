"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplay = void 0;
var _react = _interopRequireWildcard(require("react"));
var display = _interopRequireWildcard(require("../helpers/displayHelper"));
var util = _interopRequireWildcard(require("../utils"));
var CONST = _interopRequireWildcard(require("../constants"));
var _uuid = require("uuid");
var geo = _interopRequireWildcard(require("../arrayHelpers/geoJsonProps"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var getDisplay = function getDisplay(props, args, property) {
  var fullFrame = args.fullFrame,
    mode = args.mode,
    documentFrame = args.documentFrame;
  var field = documentFrame[property],
    hideFieldLabel = props.hasOwnProperty(CONST.HIDE_FIELD_LABEL) ? props[CONST.HIDE_FIELD_LABEL] : true; // always hide label for Set fields

  if (util.isDataType(field)) {
    // DATA TYPES
    //(props, args, property, dataType, id, onChange) 
    return display.displayDataTypesWidget(props, args, property, field, props.id, props.onChange); // review
  } else if (util.isSubDocumentType(field)) {
    // SUBDOCUMENT TYPE
    if (props.mode === CONST.VIEW && props.formData === "") return /*#__PURE__*/_react["default"].createElement("div", null);
    var id = props.id,
      linked_to = field[CONST.CLASS];
    var extracted = args.reference[linked_to];
    var expand = props.isArray ? true : props.expand;
    // set default expanded as true for now 
    return display.displaySubDocument(props, args, extracted, property, expand, id, hideFieldLabel, linked_to);
  } else if (util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS 
    var _linked_to = field;
    // at this point we will have reference available for linked_to
    var _extracted = args.reference[field];
    return display.displayDocumentLink(props, args, _extracted, property, _linked_to, hideFieldLabel);
  } else if (util.isEnumType(field)) {
    // ENUM LINKS 
    var _id = props.id;
    return display.displayEnum(args, props, property, _id, hideFieldLabel);
  } else if (util.isSysJSONDataType(field)) {
    // SYS JSON 
    var _id2 = props.id;
    return display.displayJSON(props, args, property, _id2, hideFieldLabel);
  } else if (util.isChoiceDocumentType(field, fullFrame)) {
    // CHOICE DOCUMENTS 
    var _id3 = props.id;
    return display.displayChoiceDocument(props, args, property, _id3);
  } else if (util.isChoiceSubDocumentType(field)) {
    // CHOICE SUB DOCUMENTS 
    var _id4 = props.id;
    return display.displayChoiceSubDocument(props, args, property, _id4);
  } else if (util.isOneOfDataType(documentFrame, property)) {
    // ONE OF 
    var _id5 = props.id;
    return display.displayOneOfProperty(props, args, property, _id5);
  } else if (util.isRdfLangString(field)) {
    // RDF LANGUAGE
    var _id6 = props.id;
    return display.displayRDFLanguageWidget(args, props, property, _id6, hideFieldLabel);
  } else if (util.isSysUnitDataType(field)) {
    // SYS unit
    var _id7 = props.id;
    return display.displaySysUnitWidget(args, props, property, _id7, hideFieldLabel);
  } else if (util.isPointType(field)) {
    // POINT TYPE
    var _id8 = props.id;
    var newProps = geo.constructGeoJSONProps(props);
    if (mode === CONST.VIEW) return display.displayPointDocument(newProps, args, property, _id8);else return display.displayPointEditDocument(newProps, args, property, _id8);
  } else if (util.isLineStringType(field)) {
    // LINE STRING 
    var _id9 = props.id;
    var _newProps = geo.constructLineStringProps(props);
    if (mode === CONST.VIEW) return display.displayLineStringDocument(_newProps, args, property, _id9);else return display.displayLineStringEditDocument(_newProps, args, property, _id9);
  } else if (util.isPolygonType(field)) {
    // POLYGON TYPE
    var _id10 = props.id;
    var _newProps2 = geo.constructLineStringProps(props);
    if (mode === CONST.VIEW) return display.displayPolygonDocument(_newProps2, args, property, _id10);else return display.displayLineStringEditDocument(_newProps2, args, property, _id10);
  } else if (util.isPolygonType(field) && props.hasOwnProperty("currentDocumentClass") && props.currentDocumentClass === CONST.MULTIPOLYGON) {
    // MULTIPOLYGON 
    var _id11 = props.id;
    var _newProps3 = geo.constructLineStringProps(props);
    if (mode === CONST.VIEW) return display.displayPolygonDocument(_newProps3, args, property, _id11);else return display.displayLineStringEditDocument(_newProps3, args, property, _id11);
  }
};
exports.getDisplay = getDisplay;