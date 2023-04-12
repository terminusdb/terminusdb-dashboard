"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableInReference = availableInReference;
exports.checkForSysUnit = checkForSysUnit;
exports.checkIfBoundsAvailable = checkIfBoundsAvailable;
exports.checkIfKey = checkIfKey;
exports.checkIfPropertyHasDocumentation = checkIfPropertyHasDocumentation;
exports.checkIfReadOnly = checkIfReadOnly;
exports.checkIfSubDocumentShouldBeExpanded = checkIfSubDocumentShouldBeExpanded;
exports.displayIfKeyField = displayIfKeyField;
exports.extractDocumentation = extractDocumentation;
exports.extractFrames = exports.extractEnumComment = void 0;
exports.fetchMetaData = fetchMetaData;
exports.getBBoxLabel = getBBoxLabel;
exports.getBorder = getBorder;
exports.getChoices = getChoices;
exports.getDocumentOrderBy = getDocumentOrderBy;
exports.getFieldUIFrame = getFieldUIFrame;
exports.getFormDataPerProperty = getFormDataPerProperty;
exports.getMetaData = getMetaData;
exports.getMinItems = getMinItems;
exports.getOneOfChoices = getOneOfChoices;
exports.getOrderBy = getOrderBy;
exports.getUIClassNames = getUIClassNames;
exports.getValueHashMessage = getValueHashMessage;
exports.isArrayTypeFromFrames = exports.isArrayType = void 0;
exports.isBBoxType = isBBoxType;
exports.isEnumType = exports.isDocumentType = exports.isDataType = exports.isChoiceSubDocumentType = exports.isChoiceDocumentType = void 0;
exports.isFeatureCollection = isFeatureCollection;
exports.isInherritedFromGeoJSONTypes = isInherritedFromGeoJSONTypes;
exports.isLineStringType = isLineStringType;
exports.isMandatory = void 0;
exports.isMultiPolygon = isMultiPolygon;
exports.isOneOfDataType = isOneOfDataType;
exports.isOptional = void 0;
exports.isPointType = isPointType;
exports.isPolygon = isPolygon;
exports.isPolygonType = isPolygonType;
exports.isUnfoldable = exports.isSysUnitDataType = exports.isSysJSONDataType = exports.isSubDocumentType = exports.isRdfLangString = void 0;
exports.isValueHashDocument = isValueHashDocument;
exports.setBounds = setBounds;
exports.sortProperties = sortProperties;
var _react = _interopRequireDefault(require("react"));
var CONST = _interopRequireWildcard(require("./constants"));
var TYPE = _interopRequireWildcard(require("./dataType.constants"));
var _documentationTemplates = require("./documentationTemplates");
var _fc = require("react-icons/fc");
var _dataTypePrefix;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
  if (!frame) return false;
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return true;
  if (field.hasOwnProperty(CONST.TYPE)) {
    if (field[CONST.TYPE] === CONST.OPTIONAL) return false;
    if (field[CONST.TYPE] === CONST.SET) return false;
    if (field[CONST.TYPE] === CONST.LIST) return false;
    if (field[CONST.TYPE] === CONST.ARRAY) {
      // return true if geo json else false
      return isInherritedFromGeoJSONTypes(frame);
    }
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
  if (!frame) return false;
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (field.hasOwnProperty(CONST.TYPE) && field[CONST.TYPE] === CONST.OPTIONAL) return true;
  return false;
};

/**
 * 
 * @param {*} frame - sub frame of properties
 * @param {*} property - property 
 * @returns true if property is SET/ LIST/ ARRAY 
 */
exports.isOptional = isOptional;
var isArrayTypeFromFrames = function isArrayTypeFromFrames(frame, property) {
  if (!frame) return false;
  var field = frame[property];
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (field.hasOwnProperty(CONST.TYPE)) {
    // return true for SETs/ LIST
    if (field[CONST.TYPE] === CONST.SET || field[CONST.TYPE] === CONST.LIST) return true;
    if (field[CONST.TYPE] === CONST.ARRAY) {
      // check if frame is inherrited from Geo JSON constants 
      if (frame.hasOwnProperty(CONST.INHERITS)) {
        // return false if not geoJSON types
        if (isInherritedFromGeoJSONTypes(frame)) return false;else return true;
      }
      return true;
    }
  }
  return false;
};

// just returns back the type
exports.isArrayTypeFromFrames = isArrayTypeFromFrames;
var isArrayType = function isArrayType(type) {
  if (type === CONST.SET || type === CONST.LIST || type === CONST.ARRAY) return true;
  return false;
};

/***  ------ util functions to check type of property ------ */

// returns true for properties which are of data types xsd and xdd
exports.isArrayType = isArrayType;
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
 * @param {*} frame - property frame
 * @param {*} property - property name
 */
exports.isDocumentType = isDocumentType;
function isOneOfDataType(frame, property) {
  if (property === CONST.ONEOFVALUES && Array.isArray(frame[property])) return true;
  return false;
}

/**
 * 
 * @param {*} field - field of a property
 * @returns true if type is sys:JSON
 */
var isSysJSONDataType = function isSysJSONDataType(field) {
  if (_typeof(field) === CONST.OBJECT_TYPE) return false;
  if (field && field.substring(0, 8) === TYPE.SYS_JSON_TYPE) return true;
  return false;
};

/**
* 
* @param {*} field - field of a property
* @returns true if type is sys:Unit
*/
exports.isSysJSONDataType = isSysJSONDataType;
var isSysUnitDataType = function isSysUnitDataType(field) {
  if (_typeof(field) === CONST.OBJECT_TYPE) return false;
  if (field && field.substring(0, 8) === TYPE.SYS_UNIT_DATA_TYPE) return true;
  return false;
};

// returns true for properties which are of data types is rdf:langString
exports.isSysUnitDataType = isSysUnitDataType;
var isRdfLangString = function isRdfLangString(field) {
  if (_typeof(field) === CONST.OBJECT_TYPE) return false;
  if (field === CONST.RDF_LANG_STRING) return true;
  return false;
};

/**
 * 
 * @param {*} field - field of a property
 * @returns true if choice sub documenst
 */
exports.isRdfLangString = isRdfLangString;
var isChoiceSubDocumentType = function isChoiceSubDocumentType(field) {
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (Array.isArray(field) && field.length) {
    var props = field[0];
    if (props.hasOwnProperty(CONST.CLASS) && props.hasOwnProperty(CONST.SUBDOCUMENT)) return true;
    return false;
  }
  return false;
};

/**
 * 
 * @param {*} field - field of a property
 * @param {*} fullFrame - fullFrame of data product
 * @returns true if choice documents
 */
exports.isChoiceSubDocumentType = isChoiceSubDocumentType;
var isChoiceDocumentType = function isChoiceDocumentType(field, fullFrame) {
  if (_typeof(field) !== CONST.OBJECT_TYPE) return false;
  if (Array.isArray(field) && field.length) {
    // check if fields in array are document classes 
    // just check for first class
    if (fullFrame.hasOwnProperty(field[0])) return true;
    return false;
  }
  return false;
};

/** choice documents/ sub documents/ oneOf utils */
/**
 * 
 * @param {*} documentFrame document frame
 * @param {*} property property
 * @returns extracts choices from frame to be displayed in select component 
 */
exports.isChoiceDocumentType = isChoiceDocumentType;
function getChoices(documentFrame, property) {
  var options = [];
  // documentFrame[property] will have choices
  documentFrame[property].map(function (docs) {
    // docs[CONST.CLASS] will be defined in the case of choice sub documents 
    var documentChoice = docs.hasOwnProperty(CONST.CLASS) ? docs[CONST.CLASS] : docs;
    options.push({
      value: documentChoice,
      label: documentChoice,
      color: "#adb5bd"
    });
  });
  return options;
}

/**
 * 
 * @param {*} documentFrame document frame
 * @param {*} property property
 * @returns extracts choices from frame to be displayed in select component 
 */
function getOneOfChoices(oneOfFrame) {
  var options = [];
  // oneOfFrame will have choices
  for (var choices in oneOfFrame) {
    //let documentChoice=oneOfFrame[choices].hasOwnProperty(CONST.CLASS) ? oneOfFrame[choices][CONST.CLASS] : oneOfFrame[choices]
    options.push({
      value: choices,
      label: choices,
      color: "#adb5bd"
    });
  }
  return options;
}

// this function checks if any properties in nested documents have sys:unit properties
// if sys:Unit property available then we assign default value [] to formData
function checkForSysUnit(args, props, linked_to) {
  for (var subProps in args.documentFrame) {
    if (isSysUnitDataType(args.documentFrame[subProps])) {
      // assigning default value 
      props.formData[CONST.TYPE] = linked_to;
      props.formData["subProps"] = [];
    }
  }
  return;
}

/***  extract metadata */

/**
 * 
 * @param {*} frame frame of interest
 * @returns metadata json type
 */
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
  if (documentFrame && documentFrame.hasOwnProperty(CONST.UNFOLDABLE)) return true;
  return false;
};

/**** METADATA util functions */
// RENDER_AS
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

// ORDER_BY
// get order by for parent document type
function getDocumentOrderBy(documentFrame) {
  if (!documentFrame || !documentFrame.hasOwnProperty(CONST.METADATA)) return false;
  if (documentFrame[CONST.METADATA].hasOwnProperty(CONST.ORDER_BY)) {
    // order by info
    return documentFrame[CONST.METADATA][CONST.ORDER_BY];
  }
  return false;
}

// get order by for documents which are subdocuments/ choice sub documents or links pointing to document 
function getOrderBy(fullFrame, linked_to) {
  if (!fullFrame.hasOwnProperty(linked_to)) {
    throw new Error("Expectd to find ".concat(linked_to, " in frames, but instead didnt find definition"));
  }
  if (!fullFrame[linked_to].hasOwnProperty(CONST.METADATA)) return false;
  if (fullFrame[linked_to][CONST.METADATA].hasOwnProperty(CONST.ORDER_BY)) {
    // order by info
    return fullFrame[linked_to][CONST.METADATA][CONST.ORDER_BY];
  }
  return false;
}

// if subdocument should be expanded
function checkIfSubDocumentShouldBeExpanded(documentFrame, property) {
  // check for SubDocument MetaData
  var metaDataType = fetchMetaData(documentFrame, property),
    expanded = false;
  if (metaDataType) {
    // expecting JSON at this point
    expanded = metaDataType["expand"];
  }
  return expanded;
}

// sort remaining properties not mentioned in order_by
function addRemainingProperties(properties, sortedFieldNames, sorted) {
  var remainingFields = {};
  // all fields have been sorted correctly
  if (Object.keys(properties).length === Object.keys(sorted).length) return sorted;
  // if length do not match then some fields are remaining

  remainingFields = sorted;
  for (var props in properties) {
    // check if fields are included in sortedFieldNames
    if (!sortedFieldNames.includes(props)) {
      remainingFields[props] = properties[props];
    }
  }
  //console.log("remainingFields", remainingFields)
  return remainingFields;
}
function sortProperties(properties, order_by) {
  if (Array.isArray(order_by) && order_by.length) {
    var sorted = {},
      sortedFieldNames = [];
    order_by.map(function (field) {
      if (properties.hasOwnProperty(field)) {
        //sorted.push(properties[field])

        sorted[field] = properties[field];
        sortedFieldNames.push(field);
      }
    });
    return addRemainingProperties(properties, sortedFieldNames, sorted);
    //return sorted
  }

  return properties;
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

/** Geo JSON util functions */

// get min items to display 
exports.extractEnumComment = extractEnumComment;
function getMinItems(documentFrame, property) {
  var dimension = documentFrame[property][CONST.DIMENSIONS];
  if (dimension === CONST.POINT_TYPE_DIMENSIONS) {
    //@dimension = 1
    if (property === CONST.B_BOX) return CONST.BBOX_MIN_ITEMS;
    return CONST.POINT_MIN_ITEMS;
  }
}

// setBounds converts geo json bound to bounds format supported in leaflet 
function setBounds(data) {
  if (data.length < 4) return [];
  //[west, south, east, north]
  var westSouth = [data[0], data[1]];
  var eastNorth = [data[2], data[3]];
  var bounds = [westSouth, eastNorth];
  return bounds;
}

// get bbox label based on index 
function getBBoxLabel(index) {
  if (index === 0) return "left";else if (index === 1) return "bottom";else if (index === 2) return "right";else return "top";
}

// sets b_box from tdb to react leaflet b_box
function checkIfBoundsAvailable(frame, formData) {
  if (frame.hasOwnProperty(CONST.B_BOX) && frame[CONST.B_BOX][CONST.DIMENSIONS] === 1 && formData.hasOwnProperty(CONST.B_BOX)) {
    return setBounds(formData[CONST.B_BOX]);
  }
  return [];
}

// checks if field is point type
function isPointType(field) {
  if (field && field.hasOwnProperty(CONST.TYPE) && field[CONST.TYPE] === CONST.ARRAY && field.hasOwnProperty(CONST.DIMENSIONS) && field[CONST.DIMENSIONS] === CONST.POINT_TYPE_DIMENSIONS) {
    return true;
  }
  return false;
}

// checks if field is line string type
function isLineStringType(field) {
  if (field && field.hasOwnProperty(CONST.TYPE) && field[CONST.TYPE] === CONST.ARRAY && field.hasOwnProperty(CONST.DIMENSIONS) && field[CONST.DIMENSIONS] === CONST.LINE_STRING_TYPE_DIMENSIONS) {
    return true;
  }
  return false;
}

// checks if field is polygon/ multipolygon type & matches with dimension 3
function isPolygonType(field) {
  if (field && field.hasOwnProperty(CONST.TYPE) && field[CONST.TYPE] === CONST.ARRAY && field.hasOwnProperty(CONST.DIMENSIONS) && field[CONST.DIMENSIONS] === CONST.POLYGON_TYPE_DIMENSIONS) {
    return true;
  }
  return false;
}

// checks if polygon from type 
function isPolygon(frame) {
  if (frame.hasOwnProperty("type") && frame["type"].hasOwnProperty("@values") && frame["type"]["@values"][0] === CONST.POLYGON) return true;
  return false;
}

// checks if MultiPolygon from type 
function isMultiPolygon(frame) {
  if (frame.hasOwnProperty("type") && frame["type"].hasOwnProperty("@values") && frame["type"]["@values"][0] === CONST.MULTIPOLYGON) return true;
  return false;
}

// checks if field is binding box type
function isBBoxType(field, property) {
  if (property === CONST.B_BOX) {
    return isPointType(field);
  }
  return false;
}

// function which checks if all array are equal
function arrayEquals(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every(function (val, index) {
    return val === b[index];
  });
}

// feature collection
function isFeatureCollection(field) {
  if (arrayEquals(field, CONST.GEOMETRY_ARRAY)) return true;
  return false;
}

/***
 * checks if frame is inherrited from geo json types
 */
function isInherritedFromGeoJSONTypes(frame) {
  if (!frame.hasOwnProperty(CONST.INHERITS)) return false;
  return frame[CONST.INHERITS].every(function (item) {
    return CONST.GEOJSON_ARRAY_TYPES.includes(item);
  });
}

/*** Key utility */
/**  check if field is a key */
/**
 *  
 * @param {*} property - property 
 * @param {*} key - key field 
 * @returns  checks if property is a key of a document
 */
function checkIfKey(property, key) {
  if (!key) return;
  if (!key["@fields"]) return;
  return key["@fields"].filter(function (arr) {
    return arr === property;
  });
}

/**
 * 
 * @param {*} label name of the property 
 * @returns a key symbol along with property label in UI - to tell user that this is a lexical field
 */
function displayIfKeyField(isKey, label) {
  if (!isKey.length) return /*#__PURE__*/_react["default"].createElement("div", null);
  return /*#__PURE__*/_react["default"].createElement("span", {
    key: label,
    className: "mt-1",
    id: "tdb__property__key__icon",
    title: "".concat(label, " is a key field. Once created, you will not be able to update this field.")
  }, /*#__PURE__*/_react["default"].createElement(_fc.FcKey, {
    className: "mr-2"
  }));
}

// function to check if field is lexical key 
// if mode === EDIT, and isKey = true, set input field to readOnly
function checkIfReadOnly(mode, value, isKey) {
  if (mode === CONST.VIEW) return true;
  if (mode === CONST.EDIT && value && isKey && isKey.length) return true;
  return false;
}

/**
 * 
 * @param {*} frame - document frame
 * @returns true if document has ValueHash type key
*/
function isValueHashDocument(frame) {
  if (!frame) return null;
  if (frame["@key"] && frame["@key"]["@type"] && frame["@key"]["@type"] === CONST.VALUE_HASH_KEY) {
    return true;
  }
  return false;
}

/**
 * 
 * @returns a help message on why value hah field cant be edited
 */
function getValueHashMessage() {
  return /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-warning fst-light small"
  }, /*#__PURE__*/_react["default"].createElement(_fc.FcKey, {
    className: "mr-2"
  }), "Edit is disabled for a document with Value Hash key. A Value Hash object will change its id and is generated from its properties. Best way would be to delete this document and create a new one.");
}

/**** ui frame functions */

/**
 * 
 * @param {*} uiFrame ui json  
 * @returns custom ui function
 */
function getUIClassNames(uiFrame, property, defaultClassName, index) {
  if (uiFrame && uiFrame.hasOwnProperty(property)) {
    if (Array.isArray(uiFrame[property])) {
      // SET/ LIST/ ARRAY
      // expecting index to be populated from Array templates 
      return index === undefined ? "" : uiFrame[property][index] !== undefined ? "".concat(uiFrame[property][index][CONST.CLASSNAME]) : "tdb__doc__input";
    } else if (uiFrame[property].hasOwnProperty(CONST.CLASSNAME)) {
      // SUBDOCUMENTS ( property will be fields of subdocuments)
      // NORMAL DATA TYPES
      return "".concat(uiFrame[property][CONST.CLASSNAME]);
    } else return defaultClassName;
  }
  return defaultClassName;
}

/**
 * 
 * @param {c} uiFrame ui frame 
 * @param {*} subDocumentPropertyName subdocument property name 
 * @param {*} defaultClassName default classname "tdb__doc__input"
 * @returns  ui frame for subdocument property which would contain each field uiframes to display from diffviewer
 */
function getFieldUIFrame(uiFrame, subDocumentPropertyName, defaultClassName, index) {
  if (uiFrame && uiFrame.hasOwnProperty(subDocumentPropertyName)) {
    if (index) return uiFrame[subDocumentPropertyName][index];else return uiFrame[subDocumentPropertyName];
  }
  return defaultClassName;
}

/**
 * 
 * @param {*} uiFrame ui frame 
 * @param {*} subDocumentPropertyName subdocument property name 
 * @param {*} index index for Arrays
 * @returns 
 */
function getBorder(uiFrame, subDocumentPropertyName, index) {
  if (uiFrame && uiFrame.hasOwnProperty(subDocumentPropertyName)) {
    if (index) {
      if (uiFrame[subDocumentPropertyName][index].hasOwnProperty(CONST.BORDER)) {
        return uiFrame[subDocumentPropertyName][index][CONST.BORDER];
      } else return "border border-dark";
    } else {
      if (uiFrame[subDocumentPropertyName].hasOwnProperty(CONST.BORDER)) return uiFrame[subDocumentPropertyName][CONST.BORDER];
    }
  }
  return "border border-dark";
}