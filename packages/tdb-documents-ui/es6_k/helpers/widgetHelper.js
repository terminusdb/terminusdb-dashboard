"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = display;
exports.getDocumentUIDisplay = getDocumentUIDisplay;
exports.getEnumUIDisplay = getEnumUIDisplay;
exports.getJSONUIDisplay = getJSONUIDisplay;
exports.getSubDocumentUIDisplay = getSubDocumentUIDisplay;
exports.getUIDisplay = getUIDisplay;
var _react = _interopRequireDefault(require("react"));
var util = _interopRequireWildcard(require("../utils"));
var _inputWidgets = require("../widgets/inputWidgets");
var _booleanWidget = require("../widgets/booleanWidget");
var _dateWidgets = require("../widgets/dateWidgets");
var _enumWidget = require("../widgets/enumWidget");
var TYPE = _interopRequireWildcard(require("../dataType.constants"));
var _placeholderHelper = require("../helpers/placeholderHelper");
var _subDocumentWidget = require("../widgets/subDocumentWidget");
var _documentWidget = require("../widgets/documentWidget");
var _markdownWidget = require("../widgets/markdownWidget");
var _JSONWidget = require("../widgets/JSONWidget");
var CONST = _interopRequireWildcard(require("../constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/** displays widgets according to dataType */
function display(config) {
  switch (config.dataType) {
    case TYPE.XSD_BOOLEAN:
      //XSD_BOOLEAN
      return /*#__PURE__*/_react["default"].createElement(_booleanWidget.TDBBoolean, {
        name: config.name,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        value: config.formData,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.XSD_DATE_TIME:
      //XSD_DATE_TIME
      return /*#__PURE__*/_react["default"].createElement(_dateWidgets.TDBDateTime, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.XSD_DATE:
      //XSD_DATE
      return /*#__PURE__*/_react["default"].createElement(_dateWidgets.TDBDate, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
    case TYPE.MARKDOWN:
      return /*#__PURE__*/_react["default"].createElement(_markdownWidget.TDBMarkdown, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        className: config.className,
        onChange: config.onChange
      });
    default:
      // ALL OTHER DATA TYPES
      return /*#__PURE__*/_react["default"].createElement(_inputWidgets.TDBInput, {
        name: config.name,
        value: config.formData,
        hideFieldLabel: config.hideFieldLabel,
        label: config.documentation.label,
        comment: config.documentation.comment,
        required: config.required,
        mode: config.mode,
        id: config.id,
        placeholder: config.placeholder,
        className: config.className,
        onChange: config.onChange
      });
  }
}

// NORMAL DATA TYPES
function getUIDisplay(args, property, dataType) {
  var documentFrame = args.documentFrame,
    extractedDocumentation = args.extractedDocumentation,
    mode = args.mode;
  var field = documentFrame[property];
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var config = {};
  // checks for metaData => render_as markdown
  var metaDataType = util.fetchMetaData(documentFrame, property);
  if (metaDataType) {
    // expecting a string metadata type
    dataType = metaDataType;
  }
  function displayWidget(props) {
    // normal data type inputa are being called here 
    // function expects input data and id of field into which user event occurs
    function handleChange(data, id) {
      if (props.onChange) props.onChange(data);
    }

    // condtruct a config object 
    config = {
      dataType: dataType,
      name: props.name,
      formData: props.formData,
      required: props.required,
      mode: mode,
      id: props.idSchema["$id"],
      placeholder: (0, _placeholderHelper.getPlaceholder)(field),
      className: "tdb__doc__input",
      onChange: handleChange,
      documentation: documentation
    };
    return display(config);
  }
  return {
    "ui:field": displayWidget
  };
}

// retrieves declaration for selected language
function extractPropertyDocumentation(extractedDocumentation, selectedLanguage) {
  if (!Array.isArray(extractedDocumentation)) {
    throw new Error("Expected extracted documentation to be an array, but instead got ".concat(extractedDocumentation));
  }
  // includes multi lang support
  var filtered = extractedDocumentation.filter(function (arr) {
    return arr[CONST.SELECTED_LANGUAGE] === selectedLanguage;
  });
  return filtered[0];
}

// SUBDOCUMENT UI
function getSubDocumentUIDisplay(args, extracted, property, expanded) {
  // at this point extracted will have all of the extracted documents from linked_to

  var fullFrame = args.fullFrame,
    extractedDocumentation = args.extractedDocumentation,
    mode = args.mode,
    type = args.type,
    documentFrame = args.documentFrame;
  //let field = documentFrame[property]
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];
  // checks for metaData => render_as { expanded: true/ false }
  // will decide to expand subdocuments accordingly 

  function displaySubDocumentWidget(props) {
    // add logic for required properties 
    return /*#__PURE__*/_react["default"].createElement(_subDocumentWidget.TDBSubDocument, {
      extracted: extracted,
      id: props.idSchema["$id"],
      expanded: expanded,
      comment: documentation.comment ? documentation.comment : null,
      mode: mode,
      propertyDocumentation: extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage),
      linked_to: type,
      props: props
    });
  }
  return {
    "ui:field": displaySubDocumentWidget
  };
}

// DOCUMENT LINKS UI  
function getDocumentUIDisplay(args, extracted, property, linked_to) {
  var fullFrame = args.fullFrame,
    onTraverse = args.onTraverse,
    mode = args.mode,
    onSelect = args.onSelect,
    documentFrame = args.documentFrame,
    reference = args.reference;
  var documentation = util.checkIfPropertyHasDocumentation(extracted.extractedDocumentation, property);
  var selectedLanguage = fullFrame[CONST.SELECTED_LANGUAGE];
  function displayDocumentLinkWidget(props) {
    // add logic for required properties 
    return /*#__PURE__*/_react["default"].createElement(_documentWidget.TDBDocument, {
      extracted: extracted
      //id={props.idSchema["$id"]}
      //comment={documentation.comment ? documentation.comment : null} 
      ,
      mode: mode,
      onSelect: onSelect,
      reference: reference,
      onTraverse: onTraverse,
      propertyDocumentation: extractPropertyDocumentation(extracted.extractedDocumentation, selectedLanguage),
      linked_to: linked_to,
      unfoldable: util.isUnfoldable(documentFrame),
      props: props
    });
  }
  return {
    "ui:field": displayDocumentLinkWidget
  };
}

// ENUM UI 
function getEnumUIDisplay(args, property) {
  var documentFrame = args.documentFrame,
    mode = args.mode,
    fullFrame = args.fullFrame;
  function displayEnumWidget(props) {
    var enumDocumentClass = documentFrame[props.name]["@id"];
    var options = documentFrame[property]["@values"];
    var documentation = util.extractEnumComment(fullFrame, enumDocumentClass, options, props.name);
    var label = documentation && documentation.hasOwnProperty(CONST.LABEL) ? documentation[CONST.LABEL] : props.name;
    if (documentation && documentation.hasOwnProperty(CONST.VALUES)) {
      options = documentation[CONST.VALUES];
    }
    // add logic for required properties 
    return /*#__PURE__*/_react["default"].createElement(_enumWidget.TDBEnum, {
      name: props.name,
      options: options,
      enumDocumentClass: enumDocumentClass,
      value: props.formData,
      mode: mode,
      label: label,
      id: props.idSchema["$id"],
      onChange: props.onChange,
      required: props.required
    });
  }
  return {
    "ui:field": displayEnumWidget
  };
}

// SYS:JSON 
function getJSONUIDisplay(args, property) {
  var mode = args.mode,
    extractedDocumentation = args.extractedDocumentation;

  //let field = documentFrame[property]
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  function displayEnumWidget(props) {
    return /*#__PURE__*/_react["default"].createElement(_JSONWidget.TDBJSON, {
      name: props.name,
      value: props.formData,
      mode: mode,
      comment: documentation.comment ? documentation.comment : null,
      id: props.idSchema["$id"],
      onChange: props.onChange,
      required: props.required
    });
  }
  return {
    "ui:field": displayEnumWidget
  };
}