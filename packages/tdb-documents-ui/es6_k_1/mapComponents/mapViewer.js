"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapViewer = void 0;
var _react = _interopRequireWildcard(require("react"));
require("leaflet-arrowheads");
var _leaflet = _interopRequireDefault(require("leaflet"));
var CONST = _interopRequireWildcard(require("../constants"));
var _pointMapView = require("./pointMapView");
var _lineStringMapView = require("./lineStringMapView");
var _bboxMapView = require("./bboxMapView");
var _polygonMapView = require("./polygonMapView");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var MapViewer = function MapViewer(_ref) {
  var mapConfig = _ref.mapConfig;
  switch (mapConfig.type) {
    case CONST.B_BOX:
      return (0, _bboxMapView.bboxMapViewer)(mapConfig);
    case CONST.POINT:
      return (0, _pointMapView.pointMapViewer)(mapConfig);
    case CONST.LINE_STRING_TYPE:
      return (0, _lineStringMapView.lineStringMapViewer)(mapConfig);
    case CONST.POLYGON:
      return (0, _polygonMapView.polygonMapViewer)(mapConfig);
    /*case CONST.FEATURE_COLLECTION: 
    	return geoJSONMapViewer(args) */
  }
};
exports.MapViewer = MapViewer;