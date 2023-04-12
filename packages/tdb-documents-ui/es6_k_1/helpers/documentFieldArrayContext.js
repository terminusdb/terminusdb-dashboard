"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayFieldProvider = exports.ArrayFieldObj = exports.ArrayFieldContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ArrayFieldContext = /*#__PURE__*/_react["default"].createContext();
exports.ArrayFieldContext = ArrayFieldContext;
var ArrayFieldObj = function ArrayFieldObj() {
  return (0, _react.useContext)(ArrayFieldContext);
};

/**
 * 
 * @returns custom array templates - mostly used for displaying ARRAY s inside a Document
 */
exports.ArrayFieldObj = ArrayFieldObj;
var ArrayFieldProvider = function ArrayFieldProvider(_ref) {
  var children = _ref.children,
    args = _ref.args,
    field = _ref.field,
    fieldID = _ref.fieldID,
    docConfig = _ref.docConfig,
    expanded = _ref.expanded;
  // keeos a tag on how many items have been added/ deleted in array 
  var _useState = (0, _react.useState)(gatherDisplayItems(docConfig, field)),
    _useState2 = _slicedToArray(_useState, 2),
    items = _useState2[0],
    setItems = _useState2[1];
  var _useState3 = (0, _react.useState)(Date.now()),
    _useState4 = _slicedToArray(_useState3, 2),
    refresh = _useState4[0],
    setRefresh = _useState4[1];
  // keeps a tag on formData 
  var _useState5 = (0, _react.useState)(docConfig.formData.hasOwnProperty(field) ? docConfig.formData[field] : []),
    _useState6 = _slicedToArray(_useState5, 2),
    fieldDataArray = _useState6[0],
    setFieldDataArray = _useState6[1];

  // on click of Add 
  function handleAdd(fieldID, property, items, setItems, fieldDataArray, setFieldDataArray, docConfig) {
    // add field on button click 
    var newIndex = items.length;
    var eachField = constructEachField(fieldID, property, newIndex, items, fieldDataArray, setFieldDataArray, docConfig);
    setItems(function (arr) {
      return [].concat(_toConsumableArray(arr), [eachField]);
    });
  }

  // template
  var arrayProps = {
    canAdd: args.mode === CONST.VIEW ? false : true,
    className: "field field-array field-array-of-string",
    id: fieldID,
    items: items,
    title: field,
    hideFieldLabel: false
  };

  // construct each field on click of add item
  function constructEachField(property, currentIndex, eachFieldData) {
    var field = {
      children: {
        props: {
          "idSchema": {
            "$id": "".concat(fieldID, "__").concat(currentIndex)
          },
          //formData: fetchFilled (docConfig, property, newIndex),
          onChange: function onChange(data, index) {
            return handleFieldOnChange(data, index);
          },
          title: property,
          child: true
        }
      },
      index: currentIndex,
      hasMoveDown: args.mode === CONST.VIEW ? false : args["extractedType"] === CONST.SET ? false : true,
      hasMoveUp: CONST.VIEW ? false : args["extractedType"] === CONST.SET ? false : true,
      hasRemove: args.mode === CONST.VIEW ? false : true
    };
    if (eachFieldData) field.children.props.formData = eachFieldData;
    return field;
  }

  /**
   * 
   * @param {*} data - data enetered by user
   * @param {*} index - index of field in which user enters data
   * field on change also stores data for onChange of document
   */
  function handleFieldOnChange(data, index) {
    // each field's onChange
    var tempFieldDataArray = fieldDataArray;
    tempFieldDataArray[index] = data;
    setFieldDataArray(tempFieldDataArray);
    // pass property so as to map fields in subDocument Widget's onChange
    docConfig.onChange(tempFieldDataArray, field);
  }

  /**
   * 
   * @param {*} docConfig - configuration
   * @param {*} property - property name
   * @returns filled frames of EDIT or VIEW mode
   */
  function gatherDisplayItems(docConfig, property) {
    var filledItems = [];

    // display nothing if formdata not avaialble
    if (!docConfig) return filledItems;
    if (!docConfig.formData.hasOwnProperty(property)) return filledItems;
    docConfig.formData[property].map(function (eachFieldData, fieldDataIndex) {
      var eachField = constructEachField(field, fieldDataIndex, eachFieldData);
      filledItems.push(eachField);
    });
    return filledItems;
  }

  /**
   * 
   * @param {*} e event on handle click 
   */
  function handleAdd(e) {
    var newIndex = items.length;
    var eachField = constructEachField(field, newIndex);
    setItems(function (arr) {
      return [].concat(_toConsumableArray(arr), [eachField]);
    });
  }

  /**
   * 
   * @param {*} deleteIndex - index to be deleted
   */
  function handleDelete(deleteIndex) {
    var temp = items;
    temp.splice(deleteIndex, 1);
    fieldDataArray.splice(deleteIndex, 1);
    // on delete change SUBDOCUMENT onChange
    docConfig.onChange(fieldDataArray, field);
    setRefresh(Date.now());
    setItems(temp);
  }

  /**
   * 
   * @param {*} index - current index of element
   * @param {*} newIndex - new index to be shifted to 
   * @param {*} keyedFormData - stored formData 
   * @returns reordered array
   */
  function reArrange(index, newIndex, keyedFormData) {
    // Copy item
    var _newKeyedFormData = keyedFormData.slice();

    // Moves item from index to newIndex
    _newKeyedFormData.splice(index, 1);
    _newKeyedFormData.splice(newIndex, 0, keyedFormData[index]);
    return _newKeyedFormData;
  }

  /**
   * 
   * @param {*} index - current index of element
   * @param {*} newIndex - new index to be shifted to 
   * function deals with reordering of arrays 
   */
  function handleReorderClick(index, newIndex) {
    // Copy item
    var temp = reArrange(index, newIndex, items);
    var temp_formData = reArrange(index, newIndex, fieldDataArray);
    setItems(temp);
    // on reorder change SUBDOCUMENT onChange
    docConfig.onChange(temp_formData, field);
    setRefresh(Date.now());
  }
  return /*#__PURE__*/_react["default"].createElement(ArrayFieldContext.Provider, {
    value: {
      items: items,
      arrayProps: arrayProps,
      args: args,
      field: field,
      handleAdd: handleAdd,
      handleDelete: handleDelete,
      handleReorderClick: handleReorderClick,
      refresh: refresh
    }
  }, children);
};
exports.ArrayFieldProvider = ArrayFieldProvider;