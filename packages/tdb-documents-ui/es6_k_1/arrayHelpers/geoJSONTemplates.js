"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BBoxFieldTemplate = BBoxFieldTemplate;
exports.CoordinatesArrayFieldTemplate = CoordinatesArrayFieldTemplate;
exports.GetFieldDisplay = void 0;
exports.LineStringFieldTemplate = LineStringFieldTemplate;
exports.MultiPolygonArrayFieldTemplate = MultiPolygonArrayFieldTemplate;
exports.PointFieldTemplate = PointFieldTemplate;
exports.PolygonArrayFieldTemplate = PolygonArrayFieldTemplate;
var _react = _interopRequireWildcard(require("react"));
var _bi = require("react-icons/bi");
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _Card = _interopRequireDefault(require("react-bootstrap/Card"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _ri = require("react-icons/ri");
var _fa = require("react-icons/fa");
var CONST = _interopRequireWildcard(require("../constants"));
var util = _interopRequireWildcard(require("../utils"));
var _LabelComponent = require("../components/LabelComponent");
var _fieldDisplay = require("../helpers/fieldDisplay");
var _placeholderHelper = require("../helpers/placeholderHelper");
var _inputWidgets = require("../widgets/inputWidgets");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Move down button
var MoveDownButton = function MoveDownButton(_ref) {
  var element = _ref.element,
    variant = _ref.variant;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, element.hasMoveDown && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: variant,
    className: "mb-3 tdb__array__item__list bg-transparent border-0",
    title: "Move Down",
    onClick: element.onReorderClick(element.index, element.index + 1)
  }, /*#__PURE__*/_react["default"].createElement(_fa.FaArrowDown, {
    className: "text-light",
    style: {
      fontSize: "20px"
    }
  })));
};

// Move up button
var MoveUpButton = function MoveUpButton(_ref2) {
  var element = _ref2.element,
    variant = _ref2.variant;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, element.hasMoveUp && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: variant,
    title: "Move Up",
    className: "mb-3 tdb__array__item__list bg-transparent border-0",
    onClick: element.onReorderClick(element.index, element.index - 1)
  }, /*#__PURE__*/_react["default"].createElement(_fa.FaArrowUp, {
    className: "text-light",
    style: {
      fontSize: "20px"
    }
  })));
};

// remove button
var RemoveButton = function RemoveButton(_ref3) {
  var element = _ref3.element,
    variant = _ref3.variant;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, element.hasRemove && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    variant: variant,
    className: "mb-3 tdb__array__item__list bg-transparent border-0 ",
    title: "Delete",
    onClick: element.onDropIndexClick(element.index)
  }, /*#__PURE__*/_react["default"].createElement(_ri.RiDeleteBin5Fill, {
    className: "text-danger",
    style: {
      fontSize: "25px"
    }
  })));
};

// Add button
var AddButton = function AddButton(_ref4) {
  var props = _ref4.props,
    label = _ref4.label;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, props.canAdd && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    "data-cy": "add_".concat(props.title),
    variant: "light",
    className: "btn-sm text-dark",
    type: "button",
    onClick: function onClick(e) {
      return props.onAddClick(e);
    }
  }, /*#__PURE__*/_react["default"].createElement(_bi.BiPlus, {
    className: "mr-2"
  }), " ", /*#__PURE__*/_react["default"].createElement("label", null, "Add ".concat(label), " ")));
};

// custom display of elements based on schema
var GetFieldDisplay = function GetFieldDisplay(_ref5) {
  var args = _ref5.args,
    onChange = _ref5.onChange,
    formData = _ref5.formData,
    id = _ref5.id,
    property = _ref5.property;
  function handleFieldChange(data, fieldName) {
    //console.log("data", data, fieldName) 
    //onChange(data, fieldName) 
    if (args.type === CONST.POINT) onChange(data);else {
      if (property === CONST.B_BOX) onChange(data);else onChange(data, fieldName); // pass field name s to match for LINESTRING and other types
    }
  }

  function fieldDisplay() {
    var placeholder = (0, _placeholderHelper.getPlaceholder)(args.documentFrame[property]);
    var newProps = {
      dataType: placeholder,
      name: id,
      // pass id as name latitude__0/ longitude__1
      formData: formData,
      mode: args.mode,
      id: id,
      placeholder: placeholder,
      className: "tdb__doc__input",
      hideFieldLabel: true,
      onChange: handleFieldChange
    };
    return (0, _fieldDisplay.getDisplay)(newProps, args, property);
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-100"
  }, fieldDisplay());
};

// display long and lat input card
exports.GetFieldDisplay = GetFieldDisplay;
function displayCoordinates(args, element, index, property) {
  var id = element.children.props.idSchema["$id"];
  function handleCoordinates(data, fieldName) {
    if (element.children.props.onChange) {
      // data
      var lat = fieldName === "".concat(CONST.LATITUDE, "__").concat(index) ? data : element.children.props.formData[0];
      var lng = fieldName === "".concat(CONST.LONGITUDE, "__").concat(index) ? data : element.children.props.formData[1];

      // child is set to ttrue when nested in subdocument 
      // child is set to true when custom 
      if (element.children.props.child) {
        element.children.props.onChange([lat, lng], fieldName, index);
      } else element.children.props.onChange([lat, lng]);
    }
  }
  var argsHolder = _objectSpread({}, args);
  argsHolder.documentFrame = _defineProperty({}, property, args.documentFrame[property].hasOwnProperty(CONST.CLASS) ? args.documentFrame[property][CONST.CLASS] : args.documentFrame[property]);
  return /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "mb-3 "
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, element.children.props.formData.map(function (el, childIndex) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "d-flex"
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: "latlng-control-label"
    }, childIndex === 0 ? CONST.LATITUDE : CONST.LONGITUDE), /*#__PURE__*/_react["default"].createElement(GetFieldDisplay, {
      args: argsHolder,
      onChange: handleCoordinates,
      formData: el,
      id: childIndex === 0 ? "".concat(CONST.LATITUDE, "__").concat(index) : "".concat(CONST.LONGITUDE, "__").concat(index),
      property: property
    }));
  })));
}

// POINT 
function PointFieldTemplate(args, props, property) {
  var extractedDocumentation = args.extractedDocumentation;
  var variant = "dark";
  var label = props.title;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 mb-3 d-flex")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    hideFieldLabel: props.hideFieldLabel,
    required: props.required,
    comment: documentation.comment,
    id: "root_Set_".concat(label)
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, props.items && props.items.map(function (element, index) {
    var id = index === 0 ? "latitude__".concat(element.index) : "longitude__".concat(element.index);
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "horizontal",
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: "latlng-control-label"
    }, index === 0 ? "latitude" : "longitude"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, /*#__PURE__*/_react["default"].createElement(GetFieldDisplay, {
      args: args,
      onChange: element.children.props.onChange,
      formData: element.children.props.formData,
      id: id,
      property: property
    })), /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(RemoveButton, {
      element: element,
      variant: variant
    }));
  }), /*#__PURE__*/_react["default"].createElement(AddButton, {
    props: props,
    label: CONST.COORDINATES
  }))));
}

// LINE STRING 
function LineStringFieldTemplate(args, props, property) {
  var extractedDocumentation = args.extractedDocumentation;

  //console.log("props", props)
  var variant = "dark";
  var label = props.title;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 mb-3 d-flex")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    required: props.required,
    hideFieldLabel: props.hideFieldLabel,
    comment: documentation.comment,
    id: "root_Set_".concat(label)
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "transparent",
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, props.items && props.items.map(function (element, index) {
    var id = index === 0 ? "latitude__".concat(element.index) : "longitude__".concat(element.index);
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "horizontal",
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, displayCoordinates(args, element, index, property))), /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(RemoveButton, {
      element: element,
      variant: variant
    }));
  }), /*#__PURE__*/_react["default"].createElement(AddButton, {
    props: props,
    label: CONST.COORDINATES
  }))));
}

// DISPLAY ADD POLYGON ARRAY TEMPLATE (POLYGON)
function PolygonArrayFieldTemplate(props) {
  var variant = "secondary";
  var label = props.title;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 mb-3")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    hideFieldLabel: props.hideFieldLabel,
    id: "root_Set_".concat(label)
  }), props.items && props.items.map(function (element) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("div", null, element.children), /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(RemoveButton, {
      element: element,
      variant: variant
    }));
  }), props.items && !props.items.length && /*#__PURE__*/_react["default"].createElement(AddButton, {
    props: props,
    label: CONST.POLYGON
  }));
}

// DISPLAY ADD POLYGON ARRAY TEMPLATE (MULTIPOLYGON)
function MultiPolygonArrayFieldTemplate(props) {
  var variant = "secondary";
  var label = props.title;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 mb-3")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    hideFieldLabel: props.hideFieldLabel,
    id: "root_Set_".concat(label)
  }), props.items && props.items.map(function (element) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("div", null, element.children), /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(RemoveButton, {
      element: element,
      variant: variant
    }));
  }), /*#__PURE__*/_react["default"].createElement("small", {
    className: "text-light fst-italics"
  }, "Click here to add another Polygon"), /*#__PURE__*/_react["default"].createElement(AddButton, {
    props: props,
    label: CONST.POLYGON
  }));
}

// DISPLAY ADD COORDINATES ARRAY TEMPLATE 
function CoordinatesArrayFieldTemplate(args, props, property) {
  var variant = "dark";
  var label = props.title;
  var extractedDocumentation = args.extractedDocumentation;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 mb-3 d-flex")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    hideFieldLabel: props.hideFieldLabel,
    required: props.required,
    comment: documentation.comment,
    id: "root_Set_".concat(label)
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, props.items && props.items.map(function (element, index) {
    var id = index === 0 ? "latitude__".concat(element.index) : "longitude__".concat(element.index);
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "horizontal",
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, displayCoordinates(args, element, index, property)), /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(RemoveButton, {
      element: element,
      variant: variant
    }));
  }), /*#__PURE__*/_react["default"].createElement(AddButton, {
    props: props,
    label: CONST.COORDINATES
  }))));
}

// BINDING BOX 
function BBoxFieldTemplate(args, props, property) {
  var extractedDocumentation = args.extractedDocumentation;

  //console.log("props", props)
  var variant = "dark";
  var label = props.title;
  var documentation = util.checkIfPropertyHasDocumentation(extractedDocumentation, property);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(props.className, " w-100 mb-3 d-flex")
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label,
    required: props.required,
    hideFieldLabel: props.hideFieldLabel,
    comment: documentation.comment,
    id: "root_Set_".concat(label)
  }), /*#__PURE__*/_react["default"].createElement(_Card["default"], {
    bg: "secondary",
    className: "w-100"
  }, /*#__PURE__*/_react["default"].createElement(_Card["default"].Body, null, props.items && props.items.map(function (element, index) {
    var id = "".concat(util.getBBoxLabel(index), "__").concat(element.index);
    return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
      direction: "horizontal",
      key: element.key,
      className: "".concat(element.className, " align-items-baseline w-100")
    }, /*#__PURE__*/_react["default"].createElement("label", {
      className: "latlng-control-label"
    }, util.getBBoxLabel(index)), /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, /*#__PURE__*/_react["default"].createElement(GetFieldDisplay, {
      args: args,
      id: id,
      onChange: element.children.props.onChange,
      formData: element.children.props.formData,
      property: property
    })), /*#__PURE__*/_react["default"].createElement(MoveDownButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(MoveUpButton, {
      element: element,
      variant: variant
    }), /*#__PURE__*/_react["default"].createElement(RemoveButton, {
      element: element,
      variant: variant
    }));
  }), /*#__PURE__*/_react["default"].createElement(AddButton, {
    props: props,
    label: CONST.COORDINATES
  }))));
}