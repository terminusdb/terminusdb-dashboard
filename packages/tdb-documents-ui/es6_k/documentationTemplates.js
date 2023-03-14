"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayPropertyNameAndComment = DisplayPropertyNameAndComment;
exports.getEnumLabelDescription = getEnumLabelDescription;
exports.getLabelFromEnumDocumentation = getLabelFromEnumDocumentation;
exports.getPropertyLabelFromDocumentation = getPropertyLabelFromDocumentation;
var _react = _interopRequireDefault(require("react"));
var _fa = require("react-icons/fa");
var _reactBootstrap = require("react-bootstrap");
var CONST = _interopRequireWildcard(require("./constants"));
var _OverlayTrigger = _interopRequireDefault(require("react-bootstrap/OverlayTrigger"));
var _Tooltip = _interopRequireDefault(require("react-bootstrap/Tooltip"));
var _fi = require("react-icons/fi");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/** displays documentation for enum with @comment*/
function getEnumLabelDescription(item, documentation) {
  if (!documentation) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "control-label"
  }, item);
  if (!documentation.hasOwnProperty(CONST.COMMENT)) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "control-label"
  }, item);
  return /*#__PURE__*/_react["default"].createElement(DisplayPropertyNameAndComment, {
    comment: documentation[CONST.COMMENT],
    label: item
  });
  //return <small className="fst-italic text-muted">{documentation[CONST.COMMENT]}</small>
}

/** 
 * 
 * @param {*} documentation - documentation object which contains labels and comments
 * @param {*} item - item 
 * @param {*} values - choice property value array 
 * @returns - returns label in which item is to be displayed in UI 
 */
function getLabelFromEnumDocumentation(item, documentation, values) {
  var enumDocumentation = {
    "@label": item,
    "@values": values
  };
  if (!documentation) return enumDocumentation;
  //if(typeof documentation === CONST.OBJECT_TYPE) return getEnumLabelDescription(item, documentation)
  if (!Array.isArray(documentation)) return enumDocumentation;
  var valueArray = [];
  documentation.map(function (doc) {
    if (doc.hasOwnProperty(CONST.SELECTED_LANGUAGE)) {
      // search documentation to display selected language from UI 
      if (doc["@language"] === doc["@selectedLanguge"]) {
        // language match found
        if (doc.hasOwnProperty("@label")) {
          enumDocumentation["@label"] = doc["@label"]; // extract enum property label
        }

        if (doc.hasOwnProperty("@values")) {
          // extract enum option labels
          for (var val in doc["@values"]) {
            if (doc["@values"][val].hasOwnProperty("@label")) valueArray.push(doc["@values"][val]["@label"]);
          }
          enumDocumentation["@values"] = valueArray;
        } else enumDocumentation["@values"] = values;
      }
      return enumDocumentation;
    } else {
      enumDocumentation["@label"] = item;
      enumDocumentation["@values"] = values;
    }
  });
  return enumDocumentation;
}

/** 
 * 
 * @param {*} label - property name to be displayed
 * @param {*} comment - documentation comment which will be displayed as a description tool tip in the UI 
 * @returns 
 */
function DisplayPropertyNameAndComment(_ref) {
  var comment = _ref.comment;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, comment && /*#__PURE__*/_react["default"].createElement(_OverlayTrigger["default"], {
    key: comment,
    placement: 'right',
    overlay: /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
      id: "tooltip-right"
    }, /*#__PURE__*/_react["default"].createElement("small", {
      className: "text-gray"
    }, comment))
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
    className: "btn-sm text-light bg-transparent border-0",
    id: "tdb__documentation__button"
  }, /*#__PURE__*/_react["default"].createElement(_fi.FiHelpCircle, {
    className: "h5 mb-2"
  }))));
}

/**
 * 
 * @param {*} label - property name to be displayed
 * @returns 
 */
function DisplayPropertyName(_ref2) {
  var label = _ref2.label;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    id: "tdb__property__name__label",
    className: "h6"
  }, label));
}

/**
 * 
 * @param {*} doc - documentation info extracted from documentation array
 * @param {*} item - property of interest at this point
 * @returns 
 */
function extractLabelAndComment(doc, item) {
  var label = item,
    comment = false;
  if (doc.hasOwnProperty(CONST.PROPERTY) && doc[CONST.PROPERTY].hasOwnProperty(item)) {
    // extract label
    if (doc[CONST.PROPERTY][item].hasOwnProperty(CONST.LABEL)) {
      label = doc[CONST.PROPERTY][item][CONST.LABEL];
    } else label = item;

    // extract comment
    if (doc[CONST.PROPERTY][item].hasOwnProperty(CONST.COMMENT)) {
      comment = doc[CONST.PROPERTY][item][CONST.COMMENT];
    }
  }
  return {
    label: label,
    comment: comment
  };
}

/**
* 
* @param {*} documentation - documentation object which contains labels and comments
* @param {*} item - property 
* @returns - returns label extracted from documentation along with comment
* if no documentation provided, the name of property is returned back
*/
function getPropertyLabelFromDocumentation(item, documentation, displayOnlyLabel) {
  if (!documentation) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, item);
  if (!Array.isArray(documentation)) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, item);
  if (!documentation.length) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, item);
  var extracted = {
    label: item,
    comment: false
  };
  documentation.map(function (doc) {
    // search documentation to display selected language in UI 
    if (doc.hasOwnProperty(CONST.SELECTED_LANGUAGE)) {
      if (doc[CONST.LANGUAGE] === doc[CONST.SELECTED_LANGUAGE]) {
        extracted = extractLabelAndComment(doc, item);
      }
    } else {
      // language match found with default language en
      if (doc[CONST.LANGUAGE] === CONST.DEFAULT_LANGUAGE) {
        extracted = extractLabelAndComment(doc, item);
      }
    }
  });
  if (displayOnlyLabel) return /*#__PURE__*/_react["default"].createElement(DisplayPropertyName, {
    label: extracted.label
  });else return /*#__PURE__*/_react["default"].createElement(DisplayPropertyNameAndComment, {
    comment: extracted.comment,
    label: extracted.label
  });
}