"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayFieldTemplate = void 0;
var _react = _interopRequireWildcard(require("react"));
var _bi = require("react-icons/bi");
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ri = require("react-icons/ri");
var _fa = require("react-icons/fa");
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _LabelComponent = require("../components/LabelComponent");
var _fieldDisplay = require("../helpers/fieldDisplay");
var _placeholderHelper = require("../helpers/placeholderHelper");
var _templates = require("./templates");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// EDIT or CREATE MODE
// Array field templates for lists and sets 
var ArrayFieldTemplate = function ArrayFieldTemplate(_ref) {
  var args = _ref.args,
    props = _ref.props,
    property = _ref.property,
    items = _ref.items,
    handleAdd = _ref.handleAdd,
    handleDelete = _ref.handleDelete,
    handleReorderClick = _ref.handleReorderClick;
  /** 
   * constants for dealing with update - when it comes to document links rjsf lib 
   * has a problem in which it fails to update documentlinks of different types (object/ string)
   * in this case we force update 
   */
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    update = _useState2[0],
    setUpdate = _useState2[1];
  var _useState3 = (0, _react.useState)(Date.now()),
    _useState4 = _slicedToArray(_useState3, 2),
    refresh = _useState4[0],
    setRefresh = _useState4[1];

  //console.log("props", props)

  var extractedDocumentation = args.extractedDocumentation,
    mode = args.mode;

  //hide set when mode is view
  if (mode === CONST.VIEW && items && !items.length) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(props.title, "__hidden")
  });

  //console.log("props", props)
  var variant = "dark";
  var label = props.title;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 tdb__array__holder")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    comment: documentation.comment,
    id: "root_Set_".concat(label)
  }), refresh && items && items.map(function (element, index) {
    //let id = `${props.idSchema["$id"]}_${CONST.SET}_${index}`

    var id = "".concat(element.children.props.idSchema["$id"], "__").concat(element.index);
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "horizontal",
      key: id,
      className: "".concat(element.className, " tdb__array__input align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, update && /*#__PURE__*/_react["default"].createElement(_templates.GetFieldDisplay, {
      args: args,
      props: props,
      element: element,
      id: id,
      update: update,
      setUpdate: setUpdate,
      property: property
    })), element.hasMoveDown && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      variant: variant,
      className: "mb-3 tdb__array__item__list bg-transparent border-0",
      title: "Move Down",
      id: "MoveDown_".concat(id),
      onClick: function onClick(e) {
        handleReorderClick(element.index, element.index + 1);
      }
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaArrowDown, {
      className: "text-light",
      style: {
        fontSize: "20px"
      }
    })), element.hasMoveUp && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      variant: variant,
      title: "Move Up",
      id: "MoveDown_".concat(id),
      className: "mb-3 tdb__array__item__list bg-transparent border-0",
      onClick: function onClick(e) {
        handleReorderClick(element.index, element.index - 1);
      }
    }, /*#__PURE__*/_react["default"].createElement(_fa.FaArrowUp, {
      className: "text-light",
      style: {
        fontSize: "20px"
      }
    })), element.hasRemove && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      variant: variant,
      className: "mb-3 tdb__array__item__list bg-transparent border-0 ",
      title: "Delete",
      id: "Remove_".concat(id),
      onClick: function onClick(e) {
        return handleDelete(element.index);
      }
      //onClick={ (e) => deleteIndex(element.index, props.items) }
      //onClick={ (e) => { element.hide = true; setUpdate(Date.now) }}
    }, /*#__PURE__*/_react["default"].createElement(_ri.RiDeleteBin5Fill, {
      className: "text-danger",
      style: {
        fontSize: "25px"
      }
    })));
  }), props.canAdd && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    "data-cy": "add_".concat(label),
    variant: "light",
    className: " tdb__add__button btn-sm text-dark",
    type: "button",
    onClick: handleAdd
  }, /*#__PURE__*/_react["default"].createElement(_bi.BiPlus, {
    className: "mr-2"
  }), " ", /*#__PURE__*/_react["default"].createElement("label", null, "Add ", " ", label))));
};
exports.ArrayFieldTemplate = ArrayFieldTemplate;