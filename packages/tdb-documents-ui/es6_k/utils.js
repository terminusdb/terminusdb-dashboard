"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableInReference = availableInReference;
exports.checkIfPropertyHasDocumentation = checkIfPropertyHasDocumentation;
exports.extractDocumentation = extractDocumentation;
exports.extractFrames = exports.extractEnumComment = void 0;
exports.fetchMetaData = fetchMetaData;
exports.getFormDataPerProperty = getFormDataPerProperty;
exports.getMetaData = getMetaData;
exports.isUnfoldable = exports.isSysJSONDataType = exports.isSubDocumentType = exports.isSet = exports.isOptional = exports.isMandatory = exports.isList = exports.isEnumType = exports.isDocumentType = exports.isDataType = void 0;
var CONST = _interopRequireWildcard(require("./constants"));
var TYPE = _interopRequireWildcard(require("./dataType.constants"));
var _documentationTemplates = require("./documentationTemplates");
var _dataTypePrefix;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/***  util functions to check Mandatory/ Optional/ Set/ List property */
/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Mandaroty 
 */
var isMandatory = function isMandatory(frame, property) {
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return true;
  if (field.hasOwnProperty(CONST.TYPE)) {
    if (field[CONST.TYPE] === CONST.OPTIONAL) return false;
    if (field[CONST.TYPE] === CONST.SET) return false;
    if (field[CONST.TYPE] === CONST.LIST) return false;
  }
  return true;
};

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Mandaroty 
 */
exports.isMandatory = isMandatory;
var isOptional = function isOptional(frame, property) {
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (field.hasOwnProperty(CONST.TYPE) && field[CONST.TYPE] === CONST.OPTIONAL) return true;
  return false;
};

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is Set 
 */
exports.isOptional = isOptional;
var isSet = function isSet(frame, property) {
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (field.hasOwnProperty("@type") && field["@type"] === CONST.SET) return true;
  return false;
};

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is list 
 */
exports.isSet = isSet;
var isList = function isList(frame, property) {
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (field.hasOwnProperty("@type") && field["@type"] === CONST.LIST) return true;
  return false;
};

/***  ------ util functions to check type of property ------ */

// returns true for properties which are of data types xsd and xdd
exports.isList = isList;
var dataTypePrefix = (_dataTypePrefix = {}, _defineProperty(_dataTypePrefix, CONST.XSD_DATA_TYPE_PREFIX, CONST.XSD_DATA_TYPE_PREFIX), _defineProperty(_dataTypePrefix, CONST.XDD_DATA_TYPE_PREFIX, CONST.XDD_DATA_TYPE_PREFIX), _dataTypePrefix);

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type normal data type xsd/ xdd/ rdf
 */
var isDataType = function isDataType(field) {
  if (!field) return false;
  if (_typeof(field) === CONST.OBJECT_TYPE) return false;
  return dataTypePrefix[field.substring(0, 4)] || false;
};

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is subdocument
 */
exports.isDataType = isDataType;
var isSubDocumentType = function isSubDocumentType(field) {
  if (!field) return false;
  if (field.hasOwnProperty(CONST.SUBDOCUMENT)) return CONST.SUBDOCUMENT;
  return false;
};

/**
 * 
 * @param {*} field - field of a property
 * @returns true for properties linked to an enum class
 */
exports.isSubDocumentType = isSubDocumentType;
var isEnumType = function isEnumType(field) {
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (field["@type"] === CONST.ENUM) return true;
};

/**
 * 
 * @param {*} field - field of a property
 * @param {*} fullFrame - data product's entire frames
 * @returns true for properties linked to other document classes
 */
exports.isEnumType = isEnumType;
var isDocumentType = function isDocumentType(field, fullFrame) {
  if (_typeof(field) === CONST.OBJECT_TYPE) return false;
  if (!fullFrame) return false;
  var document = "".concat(field);
  if (fullFrame[document]) {
    // make sure document is a class and not @subdocument class
    if (fullFrame[document]["@type"] === CONST.DOCUMENT && !fullFrame[document][CONST.SUBDOCUMENT]) return true;
  }
  return false;
};

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is sys:JSON
 */
exports.isDocumentType = isDocumentType;
var isSysJSONDataType = function isSysJSONDataType(field) {
  if (_typeof(field) === CONST.OBJECT_TYPE) return false;
  if (field.substring(0, 8) === TYPE.SYS_JSON_TYPE) return true;
  return false;
};

/***  extract metadata */

/**
 * 
 * @param {*} frame frame of interest
 * @returns metadata json type
 */
exports.isSysJSONDataType = isSysJSONDataType;
function getMetaData(frame) {
  if (frame && frame.hasOwnProperty(CONST.METADATA)) {
    return frame[CONST.METADATA];
  }
  return false;
}

/***  extract documentation */
/**
 * 
 * @param {*} frame - full frame from a data product
 * @param {*} item - item 
 * @returns - returns documentation of item of interest
 */
function extractDocumentation(frame, item, language) {
  var documentation = [];
  if (frame.hasOwnProperty(item) && frame[item].hasOwnProperty(CONST.DOCUMENTATION)) {
    var docArr = [];
    if (language) {
      if (Array.isArray(frame[item][CONST.DOCUMENTATION])) {
        // expecting an array with multi language definitions
        frame[item][CONST.DOCUMENTATION].map(function (doc) {
          var obj = {};
          for (var things in doc) {
            obj[things] = doc[things];
          }
          obj[CONST.SELECTED_LANGUAGE] = language;
          docArr.push(obj);
        });
      } else if (_typeof(frame[item][CONST.DOCUMENTATION]) === CONST.OBJECT_TYPE) {
        // expecting an object
        var obj = {};
        for (var things in frame[item][CONST.DOCUMENTATION]) {
          obj[things] = frame[item][CONST.DOCUMENTATION][things];
        }
        obj[CONST.SELECTED_LANGUAGE] = language;
        docArr.push(obj);
      }
      documentation = docArr;
    } else documentation = frame[item][CONST.DOCUMENTATION];
  }
  return documentation;
}

/**
 * returns property's documentation from extractedDocumentation frame
 */
function checkIfPropertyHasDocumentation(extractedDocumentation, property) {
  var label, comment;
  if (!extractedDocumentation) return {
    label: label,
    comment: comment
  };
  if (extractedDocumentation.hasOwnProperty("@properties") && extractedDocumentation["@properties"].hasOwnProperty(property)) {
    // @label
    label = extractedDocumentation["@properties"][property].hasOwnProperty(CONST.LABEL) ? extractedDocumentation["@properties"][property][CONST.LABEL] : null;
    // @comment
    comment = extractedDocumentation["@properties"][property].hasOwnProperty(CONST.COMMENT) ? extractedDocumentation["@properties"][property][CONST.COMMENT] : extractedDocumentation["@properties"][property];
  }
  return {
    label: label,
    comment: comment
  };
}

/***  util functions to extract frame from Optional/ Set/ List */
var extractFrames = function extractFrames(frame, item, language) {
  if (!frame.hasOwnProperty(item)) {
    throw new Error("Extracted frame does not have ".concat(item, " defined ... "));
  }
  if (!frame[item].hasOwnProperty("@class")) {
    throw new Error("Extracted frame does not have @class defined ... ");
  }
  var extracted = _defineProperty({}, item, frame[item]["@class"]);
  // extract documentation to append to optional/set or list frmaes
  var documentation = extractDocumentation(frame, item);
  if (documentation) {
    extracted[CONST.DOCUMENTATION] = documentation;
  }
  //if(getMetaData(frame[item])) {
  var metadata = getMetaData(frame);
  if (metadata) {
    // extract metaData and append to optional/set or list frmaes
    extracted[CONST.METADATA] = metadata;
  }
  return extracted;
};

/** checks if document type reference definition is available or not */
exports.extractFrames = extractFrames;
function availableInReference(references, documentType) {
  if (!Object.keys(references).length) return false;
  if (references.hasOwnProperty(documentType)) return true;
  return false;
}

// gets form data per property 
// used to get config form data for subdocuments, documentlinks etc.
function getFormDataPerProperty(subDocumentData, fieldName) {
  if (subDocumentData.hasOwnProperty(fieldName)) return subDocumentData[fieldName];
  return "";
}

// @unfoldable  - checks if a document class is unfoldable
var isUnfoldable = function isUnfoldable(documentFrame) {
  if (documentFrame.hasOwnProperty(CONST.UNFOLDABLE)) return true;
  return false;
};

/**** METADATA util functions */
exports.isUnfoldable = isUnfoldable;
function fetchMetaData(documentFrame, property) {
  if (!documentFrame.hasOwnProperty(CONST.METADATA)) return false;
  if (documentFrame[CONST.METADATA].hasOwnProperty(CONST.RENDER_AS)) {
    // render as info
    if (documentFrame[CONST.METADATA][CONST.RENDER_AS].hasOwnProperty(property)) return documentFrame[CONST.METADATA][CONST.RENDER_AS][property];
    return false;
  }
  return false;
}

/** ENUM DOCUMENTATION */
var extractEnumComment = function extractEnumComment(fullFrame, enumDocumentClass, options, property) {
  if (!fullFrame.hasOwnProperty(enumDocumentClass)) {
    throw new Error("Expected full frames to have ".concat(enumDocumentClass, " defined ..."));
  }
  if (!fullFrame[enumDocumentClass].hasOwnProperty(CONST.DOCUMENTATION)) return false;
  var language = fullFrame[CONST.SELECTED_LANGUAGE];
  // add chosen language to documentation array
  var extractedDocumentation = extractDocumentation(fullFrame, enumDocumentClass, language);
  return (0, _documentationTemplates.getLabelFromEnumDocumentation)(property, extractedDocumentation, options);
};
exports.extractEnumComment = extractEnumComment;