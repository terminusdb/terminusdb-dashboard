"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeHelper = void 0;
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var TYPE = _interopRequireWildcard(require("../dataType.constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var typeHelper = function typeHelper(documentFrame, property, fullFrame, isArray) {
  var field = documentFrame[property];
  if (util.isDataType(field)) {
    // DATA TYPE
    if (field === TYPE.XSD_BOOLEAN) return CONST.BOOLEAN_TYPE;
    return CONST.STRING_TYPE;
  } else if (util.isSubDocumentType(field)) {
    // SUBDOCUMENT TYPE 
    return CONST.OBJECT_TYPE;
  } else if (util.isEnumType(field)) {
    // ENUM TYPE
    return CONST.STRING_TYPE;
  } else if (util.isDocumentType(field, fullFrame)) {
    // DOCUMENT LINKS 
    // if isArray then we are only expecting Object Types
    if (isArray) return [CONST.STRING_TYPE, CONST.OBJECT_TYPE];
    // document links on create mode can expect 2 parameters
    // to link to an existing document or to create a new document all together
    // pass NULL type object as well when you unlink an existing link
    return [CONST.STRING_TYPE, CONST.OBJECT_TYPE, "null"];
  } else if (util.isChoiceSubDocumentType(field)) {
    return CONST.OBJECT_TYPE;
  } else if (util.isRdfLangString(field)) {
    return CONST.OBJECT_TYPE;
  } else if (util.isPointType(field) || util.isLineStringType(field) || util.isPolygonType(field)) {
    // GEO JSON Types
    return CONST.ARRAY_TYPE;
  } else if (util.isFeatureCollection(field)) {
    // FEATURE COLLECTION
    return CONST.OBJECT_TYPE;
  }
  return CONST.OBJECT_TYPE;
};
exports.typeHelper = typeHelper;