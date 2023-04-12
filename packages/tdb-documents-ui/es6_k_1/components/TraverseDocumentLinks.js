"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraverseDocumentLinks = void 0;
exports.onTraverse = onTraverse;
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
var CONST = _interopRequireWildcard(require("../constants"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ai = require("react-icons/ai");
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _uuid = require("uuid");
var _LabelComponent = require("./LabelComponent");
var util = _interopRequireWildcard(require("../utils"));
var _documentHelpers = require("../helpers/documentHelpers");
var _DisplayLink = require("./DisplayLink");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * 
 * @param {*} clicked document clicked by user to traverse
 * @param {*} setClicked function to store which document has been clicked by user
 * this function is only used in DocumentView & for Traversing via documents
 */
function onTraverse(documentID, setClicked) {
  if (setClicked) setClicked(documentID);
}
function checkIfUIFrameAvailable(uiFrame) {
  if (uiFrame && Object.keys(uiFrame).length && uiFrame.hasOwnProperty(documentLinkPropertyName)) {
    return linkProps.uiFrame[documentLinkPropertyName];
  }
  return {};
}
var ShowLinkRoute = function ShowLinkRoute(_ref) {
  var linkArray = _ref.linkArray,
    setDocumentID = _ref.setDocumentID;
  var elements = [];
  linkArray.map(function (link, index) {
    elements.push( /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      variant: "link",
      onClick: function onClick(e) {
        return setDocumentID(link);
      }
    }, "".concat(link)), index !== linkArray.length - 1 && /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineArrowRight, {
      className: "fw-bold h4 mt-2 "
    })));
  });
  if (linkArray && linkArray.length) {
    return /*#__PURE__*/_react["default"].createElement(_Card["default"], {
      className: "border bg-dark border-secondary mb-4"
    }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, {
      className: "small fw-bold text-muted"
    }, "Click through below links to traverse through documents ..."), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, elements));
  }
  return /*#__PURE__*/_react["default"].createElement("div", null);
};
var TraverseDocumentLinks = function TraverseDocumentLinks(_ref2) {
  var onHide = _ref2.onHide,
    clicked = _ref2.clicked,
    linkProps = _ref2.linkProps;
  var _useState = (0, _react.useState)(linkProps.dataID),
    _useState2 = _slicedToArray(_useState, 2),
    documentID = _useState2[0],
    setDocumentID = _useState2[1];
  var _useState3 = (0, _react.useState)(linkProps),
    _useState4 = _slicedToArray(_useState3, 2),
    linkDetails = _useState4[0],
    setlinkDetails = _useState4[1];
  var _useState5 = (0, _react.useState)(linkProps.documentLinkPropertyName),
    _useState6 = _slicedToArray(_useState5, 2),
    type = _useState6[0],
    setType = _useState6[1];
  var calculation = (0, _react.useMemo)(function () {
    return constructDisplayElements(linkDetails);
  }, [linkDetails]);

  // document tarverse array
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    linkArray = _useState8[0],
    setLinkArray = _useState8[1];
  //let linkArray=[]

  (0, _react.useEffect)(function () {
    if (clicked) {
      setDocumentID(clicked);
    }
  }, [clicked]);
  function removeDocumentIDFromLinkArray(setLinkArray) {
    // clear array on close
    setLinkArray([]);
  }
  function handleClose(e) {
    removeDocumentIDFromLinkArray(setLinkArray);
    onHide();
  }
  function constructDisplayElements(linkProps) {
    var fields = [];
    var dataID = linkProps.dataID,
      documentData = linkProps.documentData,
      args = linkProps.args,
      uiFrame = linkProps.uiFrame,
      propertyDocumentation = linkProps.propertyDocumentation,
      reference = linkProps.reference,
      cardKey = linkProps.cardKey,
      onTraverse = linkProps.onTraverse,
      setDocumentData = linkProps.setDocumentData,
      unfoldable = linkProps.unfoldable,
      action = linkProps.action,
      formData = linkProps.formData,
      onChange = linkProps.onChange,
      documentLinkPropertyName = linkProps.documentLinkPropertyName,
      extracted = linkProps.extracted,
      required = linkProps.required,
      mode = linkProps.mode,
      linked_to = linkProps.linked_to;
    function handleChange(data, fieldName) {
      var tempDocumentData = documentData;
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      tempDocumentData[fieldName ? fieldName : documentLinkPropertyName] = data;
      setDocumentData(tempDocumentData);
      if (onChange) onChange(tempDocumentData);
    }

    // definitions will have definitions of linked_to frames
    var definitions = util.availableInReference(reference, linked_to) ? reference[linked_to] : extracted.properties;
    var defaultClassName = "tdb__doc__input";
    var _loop = function _loop(field) {
      linked_to = definitions.properties[field][CONST.PLACEHOLDER];
      if (util.availableInReference(reference, linked_to)) {
        // unfolderdLinkPropertyName stores the property name which is linked to unfolded Document
        // we need this value to understand diff uis 
        if (!formData.hasOwnProperty(field)) fields.push( /*#__PURE__*/_react["default"].createElement("div", {
          className: "empty"
        }));else {
          var handleInternalClick = function handleInternalClick(linkProps) {
            setDocumentID(linkProps.formData[field]["@id"]);
            var newProps = {
              mode: linkProps.mode,
              action: linkProps.action,
              extracted: newExtracted,
              required: linkProps.required,
              args: linkProps.args,
              unfoldable: linkProps.unfoldable,
              onTraverse: linkProps.onTraverse,
              uiFrame: checkIfUIFrameAvailable(linkProps.uiFrame),
              onChange: linkProps.onChange,
              linked_to: field_linked_to,
              propertyDocumentation: linkProps.propertyDocumentation,
              cardKey: linkProps.cardKey,
              reference: linkProps.reference,
              formData: linkProps.formData[field],
              dataID: linkProps.formData[field]["@id"],
              documentLinkPropertyName: field,
              documentData: linkProps.formData[field],
              id: linkProps.cardKey,
              hideFieldLabel: false,
              child: true,
              setDocumentData: linkProps.SetDocumentData
            };
            setlinkDetails(newProps);
          };
          var field_linked_to = linkProps.extracted.properties[field][CONST.PLACEHOLDER];
          var newExtracted = linkProps.reference[field_linked_to];
          var className = (0, _DisplayLink.getClassNames)(checkIfUIFrameAvailable(linkProps.uiFrame), field);
          fields.push( /*#__PURE__*/_react["default"].createElement("div", {
            className: "d-flex mb-3"
          }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
            name: field
            //required={linkProps.required} 
            ,
            comment: linkProps.comment,
            className: "tdb__label__width"
          }), /*#__PURE__*/_react["default"].createElement(_DisplayLink.DisplayLinkID, {
            linkProps: linkProps,
            hideFieldLabel: true,
            className: className,
            onClick: function onClick(e) {
              return handleInternalClick(linkProps);
            },
            selected: linkProps.formData[field]["@id"]
          })));
        }
      } else {
        // internal properties
        var fieldName = definitions.properties[field].title;
        var fieldID = "root_".concat(documentLinkPropertyName, "_").concat(fieldName, "_").concat(cardKey);
        var _defaultClassName = "tdb__doc__input";
        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, documentLinkPropertyName, defaultClassName, index)

        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, documentLinkPropertyName, defaultClassName, null)

        var fieldUIFrame = linkProps.uiFrame && linkProps.uiFrame.hasOwnProperty(documentLinkPropertyName) && linkProps.uiFrame[documentLinkPropertyName].hasOwnProperty(field) && linkProps.uiFrame[documentLinkPropertyName][field].hasOwnProperty(CONST.CLASSNAME) ? linkProps.uiFrame[documentLinkPropertyName][field][CONST.CLASSNAME] : "tdb__doc__input";
        var config = {
          properties: definitions.properties,
          propertyName: documentLinkPropertyName,
          id: fieldID,
          key: "".concat(linked_to, "__").concat((0, _uuid.v4)()),
          formData: _defineProperty({}, fieldName, util.getFormDataPerProperty(documentData, fieldName)),
          required: definitions.required.includes(fieldName),
          mode: mode,
          args: args,
          hideFieldLabel: true,
          fieldUIFrame: _defineProperty({}, field, _defineProperty({}, CONST.CLASSNAME, fieldUIFrame)),
          onChange: handleChange,
          defaultClassName: _defaultClassName,
          propertyDocumentation: propertyDocumentation
        };

        // review fix order_by
        fields.push((0, _documentHelpers.documentInternalProperties)(config, field));
      }
    };
    for (var field in definitions.properties) {
      _loop(field);
    }
    if (linkProps.dataID) {
      //getDocument(documentID)
      //let extractedType = documentID.substring(0, documentID.indexOf("/"))
      //setType(extractedType)
      var tempArray = linkArray ? linkArray : [];
      if (tempArray.includes(linkProps.dataID)) {
        //tempArray.filter(arr => arr !== documentID)
        //let elemsToDelete = tempArray.length - 1 - tempArray.indexOf(linkProps.dataID)
        var elemsToDelete = tempArray.length - tempArray.indexOf(linkProps.dataID);
        tempArray.splice(tempArray.length - elemsToDelete, elemsToDelete);
      } else tempArray.push(linkProps.dataID);
    }
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, null, fields);
  }
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal, {
    show: true,
    dialogClassName: "modal-90w",
    onHide: handleClose,
    size: "md",
    "aria-labelledby": "traverse__document__links",
    centered: true
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Title, {
    as: "h6",
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    gap: 3
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-break"
  }, /*#__PURE__*/_react["default"].createElement("small", {
    className: "text-muted"
  }, "id: "), documentID), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    className: " ms-auto btn btn-sm bg-transparent text-light border-0",
    title: "Close",
    onClick: handleClose
  }, /*#__PURE__*/_react["default"].createElement(_ai.AiOutlineClose, null))))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, {
    style: {
      height: "auto"
    },
    className: "p-4"
  }, calculation));
};
exports.TraverseDocumentLinks = TraverseDocumentLinks;