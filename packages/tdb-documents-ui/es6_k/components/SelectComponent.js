"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectComponent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSelect = _interopRequireDefault(require("react-select"));
var _chromaJs = _interopRequireDefault(require("chroma-js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SelectComponent = function SelectComponent(_ref) {
  var options = _ref.options,
    onChange = _ref.onChange,
    value = _ref.value,
    id = _ref.id,
    placeholder = _ref.placeholder;
  /*const optionsExample = [
    { value: 'chocolate', label: 'Chocolate', color: "#adb5bd" },
    { value: 'strawberry', label: 'Strawberry', color: "#adb5bd" },
    { value: 'vanilla', label: 'Vanilla', color: "#adb5bd" }
  ]*/

  // review - customizing color 
  var colourStyles = {
    control: function control(styles) {
      return _objectSpread(_objectSpread({}, styles), {}, {
        backgroundColor: "transparent",
        width: "100%",
        border: "1px solid #666"
      });
    },
    menu: function menu(styles) {
      return _objectSpread(_objectSpread({}, styles), {}, {
        backgroundColor: '#444'
      });
    },
    option: function option(styles, _ref2) {
      var data = _ref2.data,
        isDisabled = _ref2.isDisabled,
        isFocused = _ref2.isFocused,
        isSelected = _ref2.isSelected;
      var color = (0, _chromaJs["default"])(data.color);
      return _objectSpread(_objectSpread({}, styles), {}, {
        backgroundColor: "transparent",
        color: isDisabled ? '#ccc' : isSelected ? _chromaJs["default"].contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': _objectSpread(_objectSpread({}, styles[':active']), {}, {
          backgroundColor: !isDisabled ? isSelected ? data.color : color.alpha(0.3).css() : undefined
        }),
        ':hover': _objectSpread(_objectSpread({}, styles[':hover']), {}, {
          backgroundColor: "black",
          color: "text-light"
        })
      });
    },
    input: function input(styles) {
      return _objectSpread(_objectSpread({}, styles), {}, {
        color: "#f8f9fa !important"
      });
    },
    singleValue: function singleValue(styles, _ref3) {
      var data = _ref3.data;
      var color = (0, _chromaJs["default"])(data.color);
      return _objectSpread(_objectSpread({}, styles), {}, {
        color: color
      });
    },
    multiValue: function multiValue(styles, _ref4) {
      var data = _ref4.data;
      var color = (0, _chromaJs["default"])(data.color);
      return _objectSpread(_objectSpread({}, styles), {}, {
        backgroundColor: color.alpha(0.1).css()
      });
    },
    multiValueLabel: function multiValueLabel(styles, _ref5) {
      var data = _ref5.data;
      return _objectSpread(_objectSpread({}, styles), {}, {
        color: data.color
      });
    },
    multiValueRemove: function multiValueRemove(styles, _ref6) {
      var data = _ref6.data;
      return _objectSpread(_objectSpread({}, styles), {}, {
        color: data.color,
        ':hover': {
          backgroundColor: data.color,
          color: 'white'
        }
      });
    }
  };
  function handleChange(selected) {
    //console.log("selected", selected)
    if (onChange) onChange(selected.value);
  }
  return /*#__PURE__*/_react["default"].createElement(_reactSelect["default"], {
    options: options,
    onChange: handleChange,
    placeholder: placeholder,
    "data-testid": "select",
    inputId: id,
    defaultValue: value,
    styles: colourStyles
  });
};
exports.SelectComponent = SelectComponent;