"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TO = exports.SWAP_VALUE = exports.SWAP_LIST = exports.SUBDOCUMENT_DOSENT_EXIST = exports.REST = exports.PATCH_LIST = exports.PATCH = exports.ORIGINAL_VALUE = exports.ORIGINAL_UI_FRAME = exports.OPERATION = exports.KEEP_LIST = exports.JSON_DIFF_STYLES = exports.INSERT = exports.DIFF_ORIGINAL_SELECT_STYLES = exports.DIFF_CHANGED_SELECT_STYLES = exports.DELETE = exports.COPY_LIST = exports.CHANGED_VALUE = exports.CHANGED_UI_FRAME = exports.BEFORE = exports.AFTER = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var REST = "@rest";
exports.REST = REST;
var BEFORE = "@before";
exports.BEFORE = BEFORE;
var AFTER = "@after";
exports.AFTER = AFTER;
var PATCH = "@patch";
exports.PATCH = PATCH;
var TO = "@to";
exports.TO = TO;
var OPERATION = "@op";
exports.OPERATION = OPERATION;
var INSERT = "Insert";
exports.INSERT = INSERT;
var DELETE = "Delete";
exports.DELETE = DELETE;
var PATCH_LIST = "PatchList";
exports.PATCH_LIST = PATCH_LIST;
var COPY_LIST = "CopyList";
exports.COPY_LIST = COPY_LIST;
var SWAP_VALUE = "SwapValue";
exports.SWAP_VALUE = SWAP_VALUE;
var KEEP_LIST = "KeepList";
exports.KEEP_LIST = KEEP_LIST;
var SWAP_LIST = "SwapList";
exports.SWAP_LIST = SWAP_LIST;
var SUBDOCUMENT_DOSENT_EXIST = "No SubDocument to display";

// diff titles
exports.SUBDOCUMENT_DOSENT_EXIST = SUBDOCUMENT_DOSENT_EXIST;
var ORIGINAL_VALUE = "Original UI";
exports.ORIGINAL_VALUE = ORIGINAL_VALUE;
var CHANGED_VALUE = "Changed UI";
exports.CHANGED_VALUE = CHANGED_VALUE;
var ORIGINAL_UI_FRAME = "originalUIFrame";
exports.ORIGINAL_UI_FRAME = ORIGINAL_UI_FRAME;
var CHANGED_UI_FRAME = "changedUIFrame";

// default select styles
exports.CHANGED_UI_FRAME = CHANGED_UI_FRAME;
var DIFF_ORIGINAL_SELECT_STYLES = {
  control: function control(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: '#f8d7da',
      borderColor: "#f5c2c7 !important",
      width: "100%"
    });
  },
  menu: function menu(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: '#f8d7da',
      width: "100%"
    });
  },
  option: function option(styles, _ref) {
    var data = _ref.data,
      isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected;
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: isDisabled ? undefined : isSelected ? "black" : isFocused ? "black" : undefined,
      color: isDisabled ? '#ccc' : isSelected,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': _objectSpread(_objectSpread({}, styles[':active']), {}, {
        backgroundColor: !isDisabled ? isSelected ? "black" : "black" : undefined
      })
    });
  },
  input: function input(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: '#842029'
    });
  },
  singleValue: function singleValue(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: '#842029'
    });
  }
};
exports.DIFF_ORIGINAL_SELECT_STYLES = DIFF_ORIGINAL_SELECT_STYLES;
var DIFF_CHANGED_SELECT_STYLES = {
  control: function control(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: '#d1e7dd',
      borderColor: "#badbcc !important",
      width: "100%"
    });
  },
  menu: function menu(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: '#d1e7dd',
      width: "100%"
    });
  },
  option: function option(styles, _ref2) {
    var data = _ref2.data,
      isDisabled = _ref2.isDisabled,
      isFocused = _ref2.isFocused,
      isSelected = _ref2.isSelected;
    return _objectSpread(_objectSpread({}, styles), {}, {
      backgroundColor: isDisabled ? undefined : isSelected ? "black" : isFocused ? "black" : undefined,
      color: isDisabled ? '#ccc' : isSelected,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': _objectSpread(_objectSpread({}, styles[':active']), {}, {
        backgroundColor: !isDisabled ? isSelected ? "black" : "black" : undefined
      })
    });
  },
  input: function input(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: '#0f5132'
    });
  },
  singleValue: function singleValue(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: '#0f5132'
    });
  }
};

// default json diff 
exports.DIFF_CHANGED_SELECT_STYLES = DIFF_CHANGED_SELECT_STYLES;
var JSON_DIFF_STYLES = {
  variables: {
    dark: {
      addedBackground: "#00bc8c"
    }
  }
};
exports.JSON_DIFF_STYLES = JSON_DIFF_STYLES;