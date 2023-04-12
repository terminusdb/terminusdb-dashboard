"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiHelper = void 0;
var _react = _interopRequireDefault(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var widget = _interopRequireWildcard(require("./widgetHelper"));
var _FrameHelpers = require("../FrameHelpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function constructDocumentConfig(args, property, linked_to) {
  var fullFrame = args.fullFrame,
    documentFrame = args.documentFrame;
  var linked_frames = fullFrame[linked_to];

  // change frames & type 
  var config = args;
  config.type = linked_to;
  config.extractedDocumentation = util.extractDocumentation(fullFrame, linked_to, fullFrame[CONST.SELECTED_LANGUAGE]);
  config.documentFrame = linked_frames;
  return config;
}
function constructSubDocumentConfig(args, property, field) {
  var fullFrame = args.fullFrame,
    documentFrame = args.documentFrame;
  var linked_to = field[CONST.CLASS];
  var linked_frames = fullFrame[linked_to];

  // change frames & type 
  var config = args;
  config.type = linked_to;
  config.extractedDocumentation = util.extractDocumentation(fullFrame, linked_to, fullFrame[CONST.SELECTED_LANGUAGE]);
  config.documentFrame = linked_frames;
  return config;
}
var uiHelper = function uiHelper(args, property) {
  var fullFrame = args.fullFrame,
    reference = args.reference,
    documentFrame = args.documentFrame;
  var field = documentFrame[property];
  if (util.isDataType(field)) {
    // DATA TYPE
    var dataType = documentFrame[property];
    return widget.getUIDisplay(args, property, dataType);
  } else if (util.isSubDocumentType(field)) {
    // SUBDOCUMENT TYPE
    // make a copy of args
    var argsHolder = _objectSpread({}, args);
    var linked_to = field[CONST.CLASS];
    var extracted = {};
    // if linked_to definition is not available in references
    if (!util.availableInReference(reference, linked_to)) {
      var _field = documentFrame[property];
      var config = constructSubDocumentConfig(argsHolder, property, _field);
      extracted = (0, _FrameHelpers.getProperties)(config);
      // add order_by at this point if meta data available
      var order_by = util.getDocumentOrderBy(fullFrame[linked_to]);
      if (order_by) {
        // rearrange the fields 
        var properties = extracted.properties;
        extracted.properties = util.sortProperties(properties, order_by);
      }
      // add extracted to references
      (0, _FrameHelpers.addToReference)(args, extracted, linked_to);
    } else {
      // reference available 
      extracted = reference[linked_to];
    }
    // add extracted documentation 
    extracted.extractedDocumentation = argsHolder.extractedDocumentation;
    var expanded = util.checkIfSubDocumentShouldBeExpanded(documentFrame, property);
    return widget.getSubDocumentUIDisplay(argsHolder, extracted, property, expanded, linked_to);
  } else if (util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS
    var _argsHolder = _objectSpread({}, args);
    var _extracted = {};
    var _linked_to = field; //let field = documentFrame[property]
    // if linked_to definition is not available in references
    if (!util.availableInReference(reference, _linked_to)) {
      //addToReference(args, {})

      var _config = constructDocumentConfig(_argsHolder, property, _linked_to);
      (0, _FrameHelpers.addToReference)(_config, {}, _linked_to);
      _extracted = (0, _FrameHelpers.getProperties)(_config);
      // add order_by at this point if meta data available
      var _order_by = util.getDocumentOrderBy(fullFrame[field]);
      if (_order_by) {
        // rearrange the fields 
        var _properties = _extracted.properties;
        _extracted.properties = util.sortProperties(_properties, _order_by);
      }
      // add extracted to references
      (0, _FrameHelpers.addToReference)(args, _extracted, _linked_to);
      // add extracted documentation 
      _extracted.extractedDocumentation = _config.extractedDocumentation;
      return widget.getDocumentUIDisplay(_argsHolder, _extracted, property, _linked_to);
    } else if (reference.hasOwnProperty(_linked_to) && !Object.keys(reference[_linked_to]).length) {
      // here document link is available in reference but is empty
      // reference[type]
      return {};
    } else {
      // reference[type] will have extracted properties at this point
      return widget.getDocumentUIDisplay(_argsHolder, reference[field], property, _linked_to);
    }
  } else if (util.isEnumType(field)) {
    return widget.getEnumUIDisplay(args, property);
  } else if (util.isSysJSONDataType(field)) {
    return widget.getJSONUIDisplay(args, property);
  } else if (util.isChoiceSubDocumentType(field)) {
    field.map(function (subDocs) {
      var argsHolder = _objectSpread({}, args);
      var linked_to = subDocs[CONST.CLASS];
      var extracted = {};
      // if linked_to definition is not available in references
      if (!util.availableInReference(reference, linked_to)) {
        var _config2 = constructSubDocumentConfig(argsHolder, property, subDocs);
        extracted = (0, _FrameHelpers.getProperties)(_config2);
        // add extracted documentation 
        extracted.extractedDocumentation = argsHolder.extractedDocumentation;

        // check for SubDocument MetaData
        var metaDataType = util.fetchMetaData(documentFrame, property),
          _expanded = false;
        if (metaDataType) {
          // expecting JSON at this point
          _expanded = metaDataType;
        }
        // add extracted to references
        (0, _FrameHelpers.addToReference)(args, extracted, linked_to);
      } else {
        // reference available 
        extracted = reference[linked_to];
      }
    });
    return widget.getChoiceSubDocumentUIDisplay(args, property);
  } else if (util.isOneOfDataType(documentFrame, property)) {
    //field.map(subDocs => {
    var oneOfField = documentFrame[property][0];
    for (var choices in oneOfField) {
      var _argsHolder2 = _objectSpread({}, args);
      if (oneOfField[choices].hasOwnProperty(CONST.CLASS)) {
        var _linked_to2 = oneOfField[choices][CONST.CLASS];
        var _extracted2 = {};
        // if linked_to definition is not available in references
        if (!util.availableInReference(reference, _linked_to2)) {
          var _config3 = constructSubDocumentConfig(_argsHolder2, property, oneOfField[choices]);
          _extracted2 = (0, _FrameHelpers.getProperties)(_config3);
          // add extracted documentation 
          _extracted2.extractedDocumentation = _argsHolder2.extractedDocumentation;

          // check for SubDocument MetaData
          var metaDataType = util.fetchMetaData(documentFrame, property),
            _expanded2 = false;
          if (metaDataType) {
            // expecting JSON at this point
            _expanded2 = metaDataType;
          }
          // add extracted to references
          (0, _FrameHelpers.addToReference)(args, _extracted2, _linked_to2);
        } else {
          // reference available 
          _extracted2 = reference[_linked_to2];
        }
      }
    }
    return widget.getOneOfUIDisplay(args, property);
  } else if (util.isChoiceDocumentType(field, fullFrame)) {
    // CHOICE DOCUMENTS 

    field.map(function (choices) {
      var argsHolder = _objectSpread({}, args);
      var linked_to = choices;
      var extracted = {};
      // if linked_to definition is not available in references
      if (!util.availableInReference(reference, linked_to)) {
        //let config=constructSubDocumentConfig(argsHolder, property, subDocs)
        var _config4 = constructDocumentConfig(argsHolder, property, linked_to);
        extracted = (0, _FrameHelpers.getProperties)(_config4);
        // add extracted documentation 
        extracted.extractedDocumentation = argsHolder.extractedDocumentation;

        // check for SubDocument MetaData
        var _metaDataType = util.fetchMetaData(documentFrame, property),
          _expanded3 = false;
        if (_metaDataType) {
          // expecting JSON at this point
          _expanded3 = _metaDataType;
        }
        // add extracted to references
        (0, _FrameHelpers.addToReference)(args, extracted, linked_to);
      } else {
        // reference available 
        extracted = reference[linked_to];
      }
    });
    return widget.getChoiceDocumentUIDisplay(args, property);
  } else if (util.isBBoxType(field, property)) {
    return widget.getBBoxUIDisplay(args, property);
  } else if (util.isPointType(field)) {
    return widget.getPointUIDisplay(args, property);
  } else if (util.isLineStringType(field)) {
    return widget.getlineStringUIDisplay(args, property);
  } else if (util.isPolygonType(field) && util.isPolygon(documentFrame)) {
    return widget.getPolygonUIDisplay(args, property);
  } else if (util.isPolygonType(field) && util.isMultiPolygon(documentFrame)) {
    return widget.getMultiPolygonUIDisplay(args, property);
  } else if (util.isRdfLangString(field)) {
    return widget.getRDFLangUIDisplay(args, property);
  } else if (util.isSysUnitDataType(field)) {
    return widget.getSysUnitUIDisplay(args, property);
  }
};
exports.uiHelper = uiHelper;