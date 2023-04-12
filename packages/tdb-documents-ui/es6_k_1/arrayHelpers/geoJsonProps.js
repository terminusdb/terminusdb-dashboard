"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructGeoJSONProps = constructGeoJSONProps;
exports.constructLineStringProps = constructLineStringProps;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("../constants");
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
// POINT
function constructGeoJSONProps(props) {
  // change in lat & lng
  function handleChange(data, name, props) {
    var tmpFormData = props.formData ? props.formData : [];
    if (name === "latitude__0") tmpFormData[0] = data;
    if (name === "longitude__1") tmpFormData[1] = data;
    props.onChange(tmpFormData);
  }
  var geoJSONProps = {
    canAdd: false,
    className: "field field-array field-array-of-string",
    formData: props.formData ? props.formData : [undefined, undefined],
    idSchema: {
      "$id": 'root_coordinates'
    },
    required: props.required,
    title: props.name,
    name: props.name,
    hideFieldLabel: false
  };
  geoJSONProps["items"] = [];
  for (var count = 0; count < 2; count++) {
    var item = {
      children: {
        props: {
          formData: props.formData ? count === 0 ? props.formData[0] : props.formData[1] : undefined,
          idSchema: {
            "$id": "root_coordinates_".concat(count)
          },
          index: count,
          onChange: function onChange(data, name) {
            return handleChange(data, name, props);
          },
          required: true
        }
      },
      className: "array-item",
      hasMoveDown: false,
      hasRemove: false,
      hasMoveUp: false,
      index: count
    };
    geoJSONProps["items"].push(item);
  }
  return geoJSONProps;
}

// LINE_STRING & POLYGON uses the same props
function constructLineStringProps(props) {
  var _useState = (0, _react.useState)(Date.now()),
    _useState2 = _slicedToArray(_useState, 2),
    update = _useState2[0],
    setUpdate = _useState2[1];
  var _useState3 = (0, _react.useState)(gatherItems(props, update)),
    _useState4 = _slicedToArray(_useState3, 2),
    items = _useState4[0],
    setItems = _useState4[1];
  var coordinates = props.formData ? props.formData : [];
  function gatherItems(props, update) {
    if (props.mode === _constants.CREATE) return [];
    // no data available in EDIT Mode
    if (!props.formData.length) return [];
    var itemArray = [];
    for (var index = 0; index < props.formData.length; index++) {
      var itemProps = {
        update: update,
        children: {
          props: {
            formData: props.formData[index] ? props.formData[index] : [undefined, undefined],
            idSchema: {
              "$id": "root_coordinates_".concat(index)
            },
            index: index,
            onChange: function onChange(data, name, index) {
              return handleChange(data, name, index);
            },
            required: true,
            child: true
          }
        },
        className: "array-item",
        hasMoveDown: false,
        hasMoveUp: false,
        hasRemove: false,
        index: index,
        key: "root_coordinates_".concat(index)
      };
      itemArray.push(itemProps);
    }
    return itemArray;
  }

  // change in lat & lng
  function handleChange(data, name, index) {
    // gather coordinate entry lat and lng
    var tmpFormData = coordinates[index] ? coordinates[index] : [undefined, undefined];
    if (name === "latitude__".concat(index)) tmpFormData[0] = data[0];
    if (name === "longitude__".concat(index)) tmpFormData[1] = data[1];
    coordinates[index] = tmpFormData;
    var tmpDocumentFormData = props.formData;
    if (tmpDocumentFormData) tmpDocumentFormData[index] = coordinates[index];else tmpDocumentFormData = coordinates;
    // add on to subdocument formdata based on index
    props.onChange(tmpDocumentFormData); // subdoc change
    // set update to so as to force change in props.formData in document level
    if (props.mode !== _constants.CREATE) setUpdate(Date.now());
  }
  function _onAddClick() {
    // add items based on items.length
    var index = items.length;
    var itemProps = {
      children: {
        props: {
          formData: coordinates[index] ? coordinates[index] : [undefined, undefined],
          idSchema: {
            "$id": "root_coordinates_".concat(index)
          },
          index: index,
          onChange: function onChange(data, name, index) {
            return handleChange(data, name, index);
          },
          required: true,
          child: true // set to true for displayCoordinates onChange factor
        }
      },

      className: "array-item",
      hasMoveDown: false,
      hasMoveUp: false,
      hasRemove: false,
      index: index,
      key: "root_coordinates_".concat(index)
    };
    setItems(function (arr) {
      return [].concat(_toConsumableArray(arr), [itemProps]);
    });
  }
  var geoJSONProps = {
    canAdd: true,
    className: "field field-array field-array-of-string",
    formData: props.formData ? props.formData : [],
    idSchema: {
      "$id": 'root_coordinates'
    },
    required: props.required,
    title: props.name,
    name: props.name,
    hideFieldLabel: false,
    onAddClick: function onAddClick(e) {
      return _onAddClick();
    }
  };
  geoJSONProps["items"] = items;
  return geoJSONProps;
}