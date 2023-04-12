"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditDocument = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _display = require("../helpers/display");
var _LabelComponent = require("./LabelComponent");
var _ToggleDocumentLink = require("./ToggleDocumentLink");
var _DescriptionComponent = require("./DescriptionComponent");
var _uuid = require("uuid");
var _bs = require("react-icons/bs");
var _CreateDocumentLink = require("./CreateDocumentLink");
var _UnlinkButton = require("./UnlinkButton");
var _SearchExistingLink = require("./SearchExistingLink");
var _documentHelpers = require("../helpers/documentHelpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DisplayFilledFrame = function DisplayFilledFrame(_ref) {
  var args = _ref.args,
    documentData = _ref.documentData,
    propertyDocumentation = _ref.propertyDocumentation,
    onTraverse = _ref.onTraverse,
    onSelect = _ref.onSelect,
    reference = _ref.reference,
    setDocumentData = _ref.setDocumentData,
    unfoldable = _ref.unfoldable,
    cardKey = _ref.cardKey,
    action = _ref.action,
    formData = _ref.formData,
    onChange = _ref.onChange,
    documentLinkPropertyName = _ref.documentLinkPropertyName,
    extracted = _ref.extracted,
    required = _ref.required,
    mode = _ref.mode,
    linked_to = _ref.linked_to,
    clickedUnlinked = _ref.clickedUnlinked;
  if (action === CONST.LINK_NEW_DOCUMENT) {
    var handleChange = function handleChange(data, fieldName) {
      var tempDocumentData = documentData;
      // if field name is undefined
      // at this point means that its the document link's data 
      // so we pass linked_to as param
      //tempDocumentData[fieldName ? fieldName : documentLinkPropertyName]=data
      tempDocumentData[fieldName ? fieldName : nextCreateLink] = data;
      setDocumentData(tempDocumentData);
      if (onChange) onChange(tempDocumentData);
    }; // definitions will have definitions of linked_to frames
    var fields = [];
    var nextCreateLink = false;
    var definitions = util.availableInReference(reference, linked_to) ? reference[linked_to] : extracted.properties;

    //for(let field in extracted.properties) { 
    for (var field in definitions.properties) {
      linked_to = definitions.properties[field][CONST.PLACEHOLDER];
      if (util.availableInReference(reference, linked_to)) {
        if (!formData.hasOwnProperty(field)) {
          nextCreateLink = field;
          fields.push( /*#__PURE__*/_react["default"].createElement(_CreateDocumentLink.CreateDocument, {
            name: field,
            linked_to: linked_to,
            mode: mode,
            args: args,
            propertyDocumentation: propertyDocumentation,
            depth: cardKey,
            onSelect: onSelect,
            reference: reference,
            extracted: extracted,
            onChange: handleChange
            //comment={comment}  // review
            ,
            required: required
          }));
        } else {
          nextCreateLink = field;
          fields.push( /*#__PURE__*/_react["default"].createElement(EditDocument, {
            name: field,
            onChange: handleChange,
            linked_to: linked_to,
            mode: mode,
            clickedUnlinked: clickedUnlinked,
            depth: cardKey,
            onSelect: onSelect,
            reference: reference,
            propertyDocumentation: propertyDocumentation,
            args: args,
            onTraverse: onTraverse,
            unfoldable: unfoldable,
            formData: formData[field],
            extracted: definitions
            //comment={comment}  // review
            ,
            required: required
          }));
        }
      } else {
        // internal properties
        var fieldName = definitions.properties[field].title;
        var fieldID = "root_".concat(documentLinkPropertyName, "_").concat(fieldName, "_").concat(cardKey);
        var defaultClassName = "tdb__doc__input";
        //let fieldUIFrame= util.getFieldUIFrame (uiFrame, subDocumentPropertyName, defaultClassName, index)

        var config = {
          properties: definitions.properties,
          propertyName: documentLinkPropertyName,
          id: fieldID,
          key: "".concat(linked_to, "__").concat((0, _uuid.v4)()),
          formData: _defineProperty({}, fieldName, util.getFormDataPerProperty(documentData, fieldName)),
          required: definitions.required.includes(fieldName),
          mode: mode,
          args: args,
          //fieldUIFrame: fieldUIFrame, // review diff ui
          onChange: handleChange,
          currentDocumentClass: documentData[CONST.TYPE],
          defaultClassName: defaultClassName,
          propertyDocumentation: propertyDocumentation
        };

        // review fix order_by
        fields.push((0, _documentHelpers.documentInternalProperties)(config, field));

        // internal properties
        //let fieldName = extracted.properties[field].title
        /*let fieldName = deifinitions.properties[field].title
        let fieldID=`root_${documentLinkPropertyName}_${fieldName}_${cardKey}`
        let config = {
          dataType: deifinitions.properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
          name: fieldName,
          key: `${linked_to}__${uuidv4()}`,
          formData: util.getFormDataPerProperty(documentData, fieldName),
          required: deifinitions.required.includes(fieldName), 
          mode: mode, 
          id: fieldID, 
          formData: documentData[field],
          placeholder: deifinitions.properties[field][CONST.PLACEHOLDER],
          className: "tdb__doc__input",
          onChange: handleChange,
          documentation: "" // review util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
        }
        fields.push(display(config)) */
      }
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-4"
    }, fields);
  } else if (action === CONST.LINK_EXISTING_DOCUMENT) {
    return /*#__PURE__*/_react["default"].createElement(_SearchExistingLink.SearchExistingLink, {
      onSelect: onSelect,
      mode: mode,
      formData: formData,
      onChange: onChange,
      onTraverse: onTraverse,
      id: cardKey,
      linked_to: linked_to
    });
  }
  return /*#__PURE__*/_react["default"].createElement("div", null);
};
var assignDepth = function assignDepth(data) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var propertyLink = arguments.length > 2 ? arguments[2] : undefined;
  if (!data) return depth;
  if (data.hasOwnProperty(propertyLink)) {
    depth += 1;
    return assignDepth(data[propertyLink], depth, propertyLink);
  }
  return depth;
};
function getAction(formData, unfoldable) {
  if (!formData) return false;
  if (unfoldable && _typeof(formData) === CONST.OBJECT_TYPE) return CONST.LINK_NEW_DOCUMENT;
  return CONST.LINK_EXISTING_DOCUMENT;
}
var EditHelper = function EditHelper(_ref2) {
  var linked_to = _ref2.linked_to,
    cardKey = _ref2.cardKey,
    setDeleteLink = _ref2.setDeleteLink,
    clickedUnlinked = _ref2.clickedUnlinked;
  function handleDelete(e) {
    // clickedUnlinked is set in the case of choice documents 
    // where user has decided to unlink doc - after unlink is clicked all 
    // other choices will appear in the select component 
    if (clickedUnlinked) clickedUnlinked(Date.now());
    setDeleteLink(Number(e.target.id));
  }
  // <BsTrashFill className="text-danger"/>
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal",
    gap: 4
  }, (0, _DescriptionComponent.getLinkedDescription)(linked_to), /*#__PURE__*/_react["default"].createElement(_UnlinkButton.UnlinkButton, {
    onDelete: handleDelete,
    title: "Delete document",
    label: "Unlink",
    id: cardKey
  }));
};

// EDIT MODE
var EditDocument = function EditDocument(_ref3) {
  var name = _ref3.name,
    args = _ref3.args,
    reference = _ref3.reference,
    onTraverse = _ref3.onTraverse,
    clickedUnlinked = _ref3.clickedUnlinked,
    index = _ref3.index,
    order_by = _ref3.order_by,
    propertyDocumentation = _ref3.propertyDocumentation,
    hideFieldLabel = _ref3.hideFieldLabel,
    onSelect = _ref3.onSelect,
    required = _ref3.required,
    comment = _ref3.comment,
    formData = _ref3.formData,
    linked_to = _ref3.linked_to,
    extracted = _ref3.extracted,
    mode = _ref3.mode,
    onChange = _ref3.onChange,
    unfoldable = _ref3.unfoldable,
    depth = _ref3.depth;
  var _useState = (0, _react.useState)(getAction(formData, unfoldable)),
    _useState2 = _slicedToArray(_useState, 2),
    action = _useState2[0],
    setAction = _useState2[1];
  var _useState3 = (0, _react.useState)(formData),
    _useState4 = _slicedToArray(_useState3, 2),
    documentData = _useState4[0],
    setDocumentData = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    deleteLink = _useState6[0],
    setDeleteLink = _useState6[1];
  var _useState7 = (0, _react.useState)(depth + 1),
    _useState8 = _slicedToArray(_useState7, 2),
    cardKey = _useState8[0],
    setCardKey = _useState8[1];
  //const [cardKey, setCardKey]=useState(uuidv4())

  // constants to link new document 
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    linkNewAction = _useState10[0],
    setLinkNewAction = _useState10[1];
  var _useState11 = (0, _react.useState)(_defineProperty({}, CONST.TYPE, linked_to)),
    _useState12 = _slicedToArray(_useState11, 2),
    linkNewDocumentData = _useState12[0],
    setLinkNewDocumentData = _useState12[1];
  (0, _react.useEffect)(function () {
    if (linked_to) setLinkNewDocumentData(_defineProperty({}, CONST.TYPE, linked_to));
  }, [linked_to]);

  //let depth=assignDepth(formData, 0, name)

  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: name,
    required: required,
    comment: comment,
    className: "tdb__label__width",
    hideFieldLabel: hideFieldLabel
  }), deleteLink !== cardKey && /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "mb-3 border border-dark w-100",
    key: cardKey
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Header, null, /*#__PURE__*/_react["default"].createElement(EditHelper, {
    linked_to: linked_to,
    cardKey: cardKey,
    setDeleteLink: setDeleteLink,
    clickedUnlinked: clickedUnlinked
  })), /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, action && /*#__PURE__*/_react["default"].createElement(DisplayFilledFrame, {
    action: action,
    depth: depth,
    extracted: extracted,
    required: required,
    args: args,
    onTraverse: onTraverse,
    propertyDocumentation: propertyDocumentation,
    mode: mode,
    clickedUnlinked: clickedUnlinked,
    cardKey: cardKey,
    unfoldable: unfoldable,
    reference: reference,
    onChange: onChange,
    linked_to: linked_to,
    onSelect: onSelect,
    formData: formData,
    documentLinkPropertyName: name,
    documentData: documentData,
    setDocumentData: setDocumentData
  }), !action && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_CreateDocumentLink.CreateDisplay, {
    name: name,
    required: required,
    cardKey: cardKey,
    comment: comment,
    propertyDocumentation: propertyDocumentation,
    args: args,
    onSelect: onSelect,
    reference: reference,
    linked_to: linked_to,
    extracted: extracted,
    mode: mode,
    onChange: onChange,
    action: linkNewAction,
    setAction: setLinkNewAction,
    documentData: linkNewDocumentData // pass branch new info here
    ,
    setDocumentData: setLinkNewDocumentData
  })))), deleteLink === cardKey && /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "mb-3 border border-dark w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, /*#__PURE__*/_react["default"].createElement(_CreateDocumentLink.CreateDisplay, {
    name: name,
    required: required,
    cardKey: cardKey,
    comment: comment,
    onSelect: onSelect,
    reference: reference,
    propertyDocumentation: propertyDocumentation,
    args: args,
    linked_to: linked_to,
    extracted: extracted,
    mode: mode,
    onChange: onChange,
    action: linkNewAction,
    setAction: setLinkNewAction,
    documentData: linkNewDocumentData // pass branch new info here
    ,
    setDocumentData: setLinkNewDocumentData
  }))));
};
exports.EditDocument = EditDocument;