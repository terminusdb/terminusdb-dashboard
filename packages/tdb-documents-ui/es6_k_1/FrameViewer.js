"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameViewer = FrameViewer;
var _react = _interopRequireWildcard(require("react"));
var _rjsfCore = _interopRequireDefault(require("@terminusdb/rjsf-core"));
var _FrameHelpers = require("./FrameHelpers");
var CONST = _interopRequireWildcard(require("./constants"));
var _reactBootstrap = require("react-bootstrap");
var util = _interopRequireWildcard(require("./utils"));
var _uuid = require("uuid");
var _formActions = require("./formActions");
var _templates = require("./templates");
var _Viewer = require("./Viewer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/*
**  frame     - full json schema of a document
**  uiFrame   - ui json of a document
**  type      - document type of interest
**  mode      - create/ edit/ view
**  submitButton - submit button configuration json object
**  formData  - filled value of the document
**  onSubmit  - a function with have custom logic to process data submitted
**  hideSubmit - hides Submit button - this is helpfull when you want to display nested FrameViewers
**  onChange   - a function with custom logic to process data when form data is changed
**  onSelect   - a js function which gets back the selected value from selects
**  onTraverse - a js function which gets back the ID of a document on click
**  FieldTemplate - a js function which you can pass at root level of FrameViewer to alter look and feel of fields
**  language - language code parameters to support a wide variety of languages in Ui as defined in schema
*/
function FrameViewer(_ref) {
  var frame = _ref.frame,
    uiFrame = _ref.uiFrame,
    type = _ref.type,
    mode = _ref.mode,
    formData = _ref.formData,
    onSubmit = _ref.onSubmit,
    onTraverse = _ref.onTraverse,
    onSelect = _ref.onSelect,
    hideSubmit = _ref.hideSubmit,
    onChange = _ref.onChange,
    language = _ref.language;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    schema = _useState2[0],
    setSchema = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    uiSchema = _useState4[0],
    setUISchema = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    display = _useState6[0],
    setDisplay = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    readOnly = _useState8[0],
    setReadOnly = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    lang = _useState10[0],
    setLanguage = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    error = _useState12[0],
    setError = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    documentation = _useState14[0],
    setDocumentation = _useState14[1];
  var _useState15 = (0, _react.useState)(formData),
    _useState16 = _slicedToArray(_useState15, 2),
    data = _useState16[0],
    setData = _useState16[1];
  var _useState17 = (0, _react.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    message = _useState18[0],
    setMessage = _useState18[1];
  var _useState19 = (0, _react.useState)({}),
    _useState20 = _slicedToArray(_useState19, 2),
    reference = _useState20[0],
    setReference = _useState20[1];
  var current = "".concat(type);
  var formDataTemp = formData;
  function clear() {
    setSchema(false);
    setUISchema(false);
    setReadOnly(false);
    setLanguage(false);
  }
  (0, _react.useEffect)(function () {
    //try{ 
    if (frame && type && mode) {
      clear();
      //let extractedDocumentation= util.extractDocumentation(frame, current, language)
      //store selected language here to get access to ENUM docs based on selected language
      frame[CONST.SELECTED_LANGUAGE] = language ? language : CONST.DEFAULT_LANGUAGE;
      var extractedDocumentation = util.extractDocumentation(frame, type, language);
      setDocumentation(extractedDocumentation);
      var fullFrame = frame;
      var documentFrame = frame[current];
      var properties = (0, _FrameHelpers.getProperties)({
        fullFrame: fullFrame,
        type: type,
        documentFrame: documentFrame,
        uiFrame: uiFrame,
        mode: mode,
        formData: formData,
        onTraverse: onTraverse,
        onSelect: onSelect,
        extractedDocumentation: extractedDocumentation,
        reference: reference,
        setReference: setReference
      });
      var _schema = {
        type: CONST.OBJECT_TYPE,
        properties: properties.properties,
        required: properties.required,
        dependencies: properties.dependencies
      };
      /*console.log("schema", JSON.stringify(schema, null, 2))
      console.log("uiSchema", JSON.stringify(properties.uiSchema, null, 2))*/

      console.log("schema", _schema);
      console.log("properties.uiSchema", properties.uiSchema);
      //setUISchema(uiSchema)
      //setSchema(schema)

      // order is set to place @documentation field at the start of the document
      properties.uiSchema["ui:order"] = util.getDocumentOrderBy(documentFrame);
      var schemata = {
        schema: _schema,
        uiSchema: properties.uiSchema
      };
      setDisplay(schemata);

      //console.log("uiSchema", uiSchema)

      if (mode === CONST.VIEW) {
        setReadOnly(true);
      } else if (mode === CONST.EDIT && util.isValueHashDocument(frame[current])) {
        setMessage(util.getValueHashMessage());
        setReadOnly(true);
      }
      //else if(mode === CONST.CREATE) setInput(formData)
      /*
      else {
      		setReadOnly(false)
      }
      setSchema(schema)
      const uiSchema = properties.uiSchema
      	// get form level ui schema 
      if(uiFrame && uiFrame.hasOwnProperty("classNames")) uiSchema["classNames"]= uiFrame.classNames
      if(uiFrame && uiFrame.hasOwnProperty("ui:order")) uiSchema["ui:order"]=uiFrame["ui:order"]
      if(uiFrame && uiFrame.hasOwnProperty("ui:title")) uiSchema["ui:title"]= uiFrame["ui:title"]
      if(uiFrame && uiFrame.hasOwnProperty("ui:description")) uiSchema["ui:description"]= uiFrame["ui:description"]
      
      // order is set to place @documentation field at the start of the document
      if(frame) {
      	uiSchema["ui:order"] = util.getOrderFromMetaData(frame[type])
      }
      
      setUISchema(uiSchema)
      	// process form data to check if one ofs are available
      if(mode !== CONST.CREATE) {
      		setData(util.getFormData(formData))
      }*/
    }
    //}
    //catch(e) {
    //setError(`An error has occured in generating frames. Err - ${e}`)
    //}
  }, [frame, uiFrame, type, mode, formData, language]);
  if (!frame) return /*#__PURE__*/_react["default"].createElement("div", null, "No schema provided!");
  if (!mode) return /*#__PURE__*/_react["default"].createElement("div", null, "Please include a mode - Create/ Edit/ View");
  if (mode === CONST.VIEW && !formData) return /*#__PURE__*/_react["default"].createElement("div", null, "Mode is set to View, please provide filled form data");
  if (!type) return /*#__PURE__*/_react["default"].createElement("div", null, "Please include the type of document");
  if (error) {
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Alert, {
      variant: "danger"
    }, error);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__frame__viewer "
  }, /*#__PURE__*/_react["default"].createElement(_Viewer.Viewer, {
    display: display,
    message: message,
    mode: mode,
    type: type,
    onSubmit: onSubmit,
    readOnly: readOnly,
    data: data,
    setData: setData,
    documentation: documentation
  }));
}