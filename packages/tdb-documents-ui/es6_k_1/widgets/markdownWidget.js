"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBMarkdown = void 0;
exports.getMarkdownUI = getMarkdownUI;
exports.getViewMarkdownUI = getViewMarkdownUI;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("../constants");
var _LabelComponent = require("../components/LabelComponent");
var _Stack = _interopRequireDefault(require("react-bootstrap/Stack"));
var _reactMdEditor = _interopRequireWildcard(require("@uiw/react-md-editor"));
var _mermaid = _interopRequireDefault(require("mermaid"));
var _reactUuid = _interopRequireDefault(require("react-uuid"));
var _excluded = ["inline", "children", "className"],
  _excluded2 = ["inline", "children", "className"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var parse = require('html-react-parser');
/** get Markdown UI layout for create & edit mode */
function getMarkdownUI(formData, onChange, name) {
  var value = formData ? formData : "";
  var _useState = (0, _react.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    code = _useState2[0],
    setCode = _useState2[1];
  function onInputChange(data) {
    onChange(data);
    setCode(data);
  }
  var getCode = function getCode() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return arr.map(function (dt) {
      if (_typeof(dt) === CONST.STRING_TYPE) {
        return dt;
      }
      if (dt.props && dt.props.children) {
        return getCode(dt.props.children);
      }
      return false;
    }).filter(Boolean).join("");
  };
  var Code = function Code(_ref) {
    var inline = _ref.inline,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);
    var demoid = useRef("dome".concat((0, _reactUuid["default"])()));
    var code = getCode(children);
    var demo = useRef(null);
    useEffect(function () {
      if (demo.current) {
        try {
          var str = _mermaid["default"].render(demoid.current, code, function () {
            return null;
          }, demo.current);
          // @ts-ignore
          demo.current.innerHTML = str;
        } catch (error) {
          // @ts-ignore
          demo.current.innerHTML = error;
        }
      }
    }, [code, demo]);
    if (typeof code === "string" && typeof className === "string" && /^language-mermaid/.test(className.toLocaleLowerCase())) {
      return /*#__PURE__*/_react["default"].createElement("code", {
        ref: demo
      }, /*#__PURE__*/_react["default"].createElement("code", {
        id: demoid.current,
        style: {
          display: "none"
        }
      }));
    }
    return /*#__PURE__*/_react["default"].createElement("code", {
      className: String(className)
    }, children);
  };

  /** set data color mode to dark data-color-mode="dark" */
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "d-block w-100 mb-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-100",
    "data-color-mode": "dark"
  }, /*#__PURE__*/_react["default"].createElement(_reactMdEditor["default"], {
    value: code,
    onChange: onInputChange,
    textareaProps: {
      placeholder: "Please enter Markdown text ... "
    },
    previewOptions: {
      components: {
        code: Code
      }
    }
  })));
}

/** get Markdown UI layout for View mode */
function getViewMarkdownUI(formData, name, uiFrame) {
  var value = formData ? formData : "";
  var _useState3 = (0, _react.useState)(value),
    _useState4 = _slicedToArray(_useState3, 2),
    code = _useState4[0],
    setCode = _useState4[1];
  if (formData) {
    var css = "";
    if (uiFrame && uiFrame.hasOwnProperty(name)) {
      css = uiFrame[name].hasOwnProperty("classNames") ? uiFrame[name]["classNames"] : "";
    }
    var getCode = function getCode() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return arr.map(function (dt) {
        if (typeof dt === "string") {
          return dt;
        }
        if (dt.props && dt.props.children) {
          return getCode(dt.props.children);
        }
        return false;
      }).filter(Boolean).join("");
    };
    var Code = function Code(_ref2) {
      var inline = _ref2.inline,
        _ref2$children = _ref2.children,
        children = _ref2$children === void 0 ? [] : _ref2$children,
        className = _ref2.className,
        props = _objectWithoutProperties(_ref2, _excluded2);
      var demoid = useRef("dome".concat((0, _reactUuid["default"])()));
      var code = getCode(children);
      var demo = useRef(null);
      useEffect(function () {
        if (demo.current) {
          try {
            var str = _mermaid["default"].render(demoid.current, code, function () {
              return null;
            }, demo.current);
            // @ts-ignore
            demo.current.innerHTML = str;
          } catch (error) {
            // @ts-ignore
            demo.current.innerHTML = error;
          }
        }
      }, [code, demo]);
      if (typeof code === "string" && typeof className === "string" && /^language-mermaid/.test(className.toLocaleLowerCase())) {
        return /*#__PURE__*/_react["default"].createElement("code", {
          ref: demo
        }, /*#__PURE__*/_react["default"].createElement("code", {
          id: demoid.current,
          style: {
            display: "none"
          }
        }));
      }
      return /*#__PURE__*/_react["default"].createElement("code", {
        className: String(className)
      }, children);
    };
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "d-block ".concat(css, " w-100 mb-3")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-100"
    }, /*#__PURE__*/_react["default"].createElement(_reactMdEditor["default"], {
      value: code,
      style: {
        whiteSpace: 'pre-wrap',
        padding: 15
      },
      commands: [_reactMdEditor.commands.codePreview],
      height: 500,
      preview: "preview",
      previewOptions: {
        components: {
          code: Code
        }
      }
    })));
  }
  return /*#__PURE__*/_react["default"].createElement("div", null);
}

// widget displays Markdown
var TDBMarkdown = function TDBMarkdown(_ref3) {
  var id = _ref3.id,
    name = _ref3.name,
    value = _ref3.value,
    required = _ref3.required,
    mode = _ref3.mode,
    hideFieldLabel = _ref3.hideFieldLabel,
    onChange = _ref3.onChange,
    comment = _ref3.comment,
    label = _ref3.label;
  if (mode === _constants.VIEW && !value) return /*#__PURE__*/_react["default"].createElement("div", {
    className: "tdb__".concat(name, "__hidden")
  });
  return /*#__PURE__*/_react["default"].createElement(_Stack["default"], {
    direction: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_LabelComponent.TDBLabel, {
    name: label ? label : name,
    required: required,
    comment: comment,
    hideFieldLabel: hideFieldLabel,
    id: id
  }), mode !== _constants.VIEW && getMarkdownUI(value, onChange, name), mode === _constants.VIEW && getViewMarkdownUI(value, name));
};
exports.TDBMarkdown = TDBMarkdown;