"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTotalNumberOfDocuments = exports.getStoredQueryObject = exports.getStoredQueriesNames = exports.getPropertyRelation = exports.getPropertiesOfClass = exports.getDocumentsOfType = exports.getDocsTypeQuery = exports.getDocsQuery = exports.getCountOfDocumentClass = exports.ClassFromSchema = void 0;
var _terminusdbClient = _interopRequireDefault(require("@terminusdb/terminusdb-client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ClassFromSchema = function ClassFromSchema() {
  var WOQL = _terminusdbClient["default"].WOQL;
  return WOQL.quad("v:Class ID", 'type', 'owl:Class', "schema/main").quad("v:Class ID", 'label', "v:Class Name", "schema/main");
};
exports.ClassFromSchema = ClassFromSchema;
var getDocsTypeQuery = function getDocsTypeQuery(type) {
  var WOQL = _terminusdbClient["default"].WOQL;
  var docType = checkIfPrefix(type);
  var q = WOQL.isa("v:Documents", docType);
  return q;
};
exports.getDocsTypeQuery = getDocsTypeQuery;
var getDocsQuery = function getDocsQuery() {
  var WOQL = _terminusdbClient["default"].WOQL;
  var q = WOQL.limit(500).isa("v:Documents", "v:Type");
  return q;
};
exports.getDocsQuery = getDocsQuery;
var getPropertiesOfClass = function getPropertiesOfClass(id, dataProduct, woqlClient) {
  if (!id && !dataProduct && !woqlClient) return null;
  var WOQL = _terminusdbClient["default"].WOQL;
  var user = woqlClient.user();
  var dp = "".concat(user.id, "/").concat(dataProduct);
  return WOQL.using(dp).select("v:Property ID", "v:Property Name", "v:Property Domain", "v:Property Type", "v:Property Range", "v:Property Description").and(WOQL.quad("v:Property ID", "type", "v:OWL Type", "schema/main"), WOQL.and(WOQL.quad("v:Property ID", "domain", id, "schema/main"), WOQL.quad("v:Property ID", "range", "v:Property Range", "schema/main"), WOQL.quad("v:Property ID", "domain", "v:Property Domain", "schema/main")), WOQL.limit(1).or(WOQL.and(WOQL.eq("v:OWL Type", "DatatypeProperty"), WOQL.eq("v:Property Type", "Data")), WOQL.and(WOQL.eq("v:OWL Type", "ObjectProperty"), WOQL.eq("v:Property Type", "Object"))), WOQL.limit(1).or(WOQL.quad("v:Property ID", "label", "v:Property Name", "schema/main"), WOQL.eq("v:Property Name", "")), WOQL.limit(1).or(WOQL.quad("v:Property ID", "comment", "v:Property Description", "schema/main"), WOQL.eq("v:Property Description", "")));
};
exports.getPropertiesOfClass = getPropertiesOfClass;
var getPropertyRelation = function getPropertyRelation(id, dataProduct, woqlClient) {
  if (!id && !dataProduct && !woqlClient) return;
  var WOQL = _terminusdbClient["default"].WOQL;
  var user = woqlClient.user();
  var dp = "".concat(user.id, "/").concat(dataProduct);
  return WOQL.limit(100).triple("v:Subject", id, "v:Predicate");
};
exports.getPropertyRelation = getPropertyRelation;
var getStoredQueriesNames = function getStoredQueriesNames() {
  var WOQL = _terminusdbClient["default"].WOQL;
  return WOQL.using("admin/live").triple("v:Worker", "type", "scm:Worker").triple("v:Worker", "DatabaseID", "Kitty_Bikes").triple("v:Worker", "query", "v:Query").triple("v:Worker", "label", "v:Query Name");
};
exports.getStoredQueriesNames = getStoredQueriesNames;
var getStoredQueryObject = function getStoredQueryObject(id) {
  if (!id) return;
  var WOQL = _terminusdbClient["default"].WOQL;
  var user = woqlClient.user();
  var dp = "".concat(user.id, "/").concat(dataProduct);
  return WOQL.using(dp).triple(id, "query", "v:Query");
};

/**** Document Queries  ****/
exports.getStoredQueryObject = getStoredQueryObject;
var getDocumentsOfType = function getDocumentsOfType(doctype) {
  return '';
  /* let WOQL =  TerminusClient.WOQL
   return  WOQL.and(
       WOQL.lib().document_metadata()
   ).sub(doctype, "v:Type ID")*/
};
/*export const getDocumentsOfType = (doctype) => {
    let WOQL =  TerminusClient.WOQL
    return  WOQL.and(
        WOQL.lib().document_metadata()
    ).sub(doctype, "v:Type ID")
}*/
exports.getDocumentsOfType = getDocumentsOfType;
var checkIfPrefix = function checkIfPrefix(id) {
  if (id.indexOf(":") > -1) {
    return id;
  }
  return "@schema:" + id;
};
// get count of document class instance
var getCountOfDocumentClass = function getCountOfDocumentClass(documentClasses) {
  var WOQL = _terminusdbClient["default"].WOQL;
  var CountArray = [];
  documentClasses.map(function (item) {
    // set type of document
    var scmType = checkIfPrefix(item["@id"]);
    var variable = "v:" + item["@id"];
    var split = item["@id"].split(':');
    if (split.length === 2) {
      scmType = split[1];
    }
    CountArray.push(WOQL.count(variable, WOQL.triple("v:Doc", "rdf:type", scmType)));
  });
  var q = WOQL.and.apply(WOQL, CountArray);
  return q;
};
exports.getCountOfDocumentClass = getCountOfDocumentClass;
var getTotalNumberOfDocuments = function getTotalNumberOfDocuments(documentClasses) {
  var WOQL = _terminusdbClient["default"].WOQL;
  var CountArray = [];
  var variableList = [];
  documentClasses.map(function (item) {
    // set type of document
    var scmType = checkIfPrefix(item["@id"]);
    var variable = "v:" + item["@id"];
    var split = item["@id"].split(':');
    if (split.length === 2) {
      scmType = split[1];
    }
    variableList.push(variable);
    CountArray.push(WOQL.count(variable, WOQL.triple("v:Doc", "rdf:type", scmType)));
  });
  var q = WOQL.and.apply(WOQL, CountArray.concat([WOQL.sum(variableList, "v:Count")]));
  return q;
};
exports.getTotalNumberOfDocuments = getTotalNumberOfDocuments;