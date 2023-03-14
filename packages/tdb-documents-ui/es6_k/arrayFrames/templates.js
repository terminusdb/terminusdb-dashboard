"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayFieldTemplate = ArrayFieldTemplate;
var _react = _interopRequireDefault(require("react"));
var _bi = require("react-icons/bi");
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ri = require("react-icons/ri");
var _fa = require("react-icons/fa");
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _widgetHelper = require("../helpers/widgetHelper");
var _LabelComponent = require("../components/LabelComponent");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// returns each field info 
var ConfigureEachField = function ConfigureEachField(_ref) {
  var dataFrames = _ref.dataFrames,
    property = _ref.property,
    mode = _ref.mode,
    id = _ref.id,
    element = _ref.element;
  var field = [];
  var propertyType = dataFrames.properties[property][CONST.PLACEHOLDER];
  var fieldID = "".concat(id);
  function handleChange(data) {
    if (element.children.props.onChange) element.children.props.onChange(data);
  }
  function getFormData() {
    return element.children.props.formData ? element.children.props.formData : "";
  }
  var config = {
    dataType: propertyType,
    //dataType: deifinitions.properties[field][CONST.PLACEHOLDER], // dataType will be xsd:string or xsd:dateTime etc
    name: fieldID,
    key: fieldID,
    ///props.idSchema["$id"],
    formData: getFormData(),
    //required: deifinitions.required.includes(fieldName), 
    mode: mode,
    hideFieldLabel: true,
    id: fieldID,
    placeholder: propertyType,
    className: "tdb__doc__input",
    onChange: handleChange,
    documentation: "" //util.checkIfPropertyHasDocumentation(propertyDocumentation, fieldName)  
  };

  field.push((0, _widgetHelper.display)(config));
  return field;
};

// EDIT or CREATE MODE
// Array field templates for lists and sets 
function ArrayFieldTemplate(props, dataFrames, property, mode, extractedDocumentation) {
  //console.log("props", props)
  var variant = "dark";
  var label = props.title;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    comment: documentation.comment,
    id: "root_Set_".concat(label)
  }), props.items && props.items.map(function (element, index) {
    var id = "".concat(props.idSchema["$id"], "_").concat(CONST.SET, "_").concat(index);
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "horizontal",
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, /*#__PURE__*/_react["default"].createElement(ConfigureEachField, {
      mode: mode,
      element: element,
      id: id,
      dataFrames: dataFrames,
      property: property
    })), element.hasMoveDown && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
      variant: variant,
      className: "mb-3 tdb__array__item__list bg-transparent border-0",
      title: "Move Down",
      id: "MoveDown_".concat(id),
      onClick: element.onReorderClick(element.index, element.index + 1)
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
      onClick: element.onReorderClick(element.index, element.index - 1)
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
      onClick: element.onDropIndexClick(element.index)
    }, /*#__PURE__*/_react["default"].createElement(_ri.RiDeleteBin5Fill, {
      className: "text-danger",
      style: {
        fontSize: "25px"
      }
    })));
  }), props.canAdd && /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "col-xs-3 col-xs-offset-9 array-item-add text-right"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    "data-cy": "add_".concat(label),
    variant: "light",
    className: "btn-sm text-dark",
    type: "button",
    onClick: props.onAddClick
  }, /*#__PURE__*/_react["default"].createElement(_bi.BiPlus, {
    className: "mr-2"
  }), " ", /*#__PURE__*/_react["default"].createElement("label", null, "Add ", " ", label)))));
}