"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapViewer = void 0;
var _react = _interopRequireWildcard(require("react"));
var CONST = _interopRequireWildcard(require("../constants"));
var _markers = require("./markers");
require("leaflet-arrowheads");
var _leaflet = _interopRequireDefault(require("leaflet"));
var _pointTypeMap = require("./pointTypeMap");
var _polylineMapViewer = require("./polylineMapViewer");
var _polygonMapViewer = require("./polygonMapViewer");
var _geoJSONMapViewer = require("./geoJSONMapViewer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function buildMap(lat, lon) {
  document.getElementById('tdb__map__leaflet__id').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' + ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    osmLayer = new _leaflet["default"].TileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttribution
    });
  var map = new _leaflet["default"].Map('map');
  map.setView(new _leaflet["default"].LatLng(lat, lon), 9);
  map.addLayer(osmLayer);
  var validatorsLayer = new OsmJs.Weather.LeafletLayer({
    lang: 'en'
  });
  map.addLayer(validatorsLayer);
}
var MapViewer = function MapViewer(args) {
  var property = args.property,
    type = args.type,
    documents = args.documents,
    zoom = args.zoom,
    scrollWheelZoom = args.scrollWheelZoom,
    display = args.display,
    onMarkerClick = args.onMarkerClick,
    polyline = args.polyline,
    polygon = args.polygon,
    icon = args.icon,
    geojsonFeature = args.geojsonFeature,
    center = args.center,
    bounds = args.bounds;
  if (!type) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Expected the type of vector displayed in map like ".concat(CONST.POINT_TYPE, " or ").concat(CONST.LINE_STRING_TYPE, "... instead received ").concat(type));

  // nothing to display on maps
  if (!Object.keys(documents).length) return /*#__PURE__*/_react["default"].createElement("div", null);

  /*let lat = "53.30975648987139", lon="-6.267268390534857"
  buildMap(lat, lon)  */

  switch (type) {
    case CONST.POINT_TYPE:
      return (0, _pointTypeMap.pointMapViewer)(args);
    case CONST.LINE_STRING_TYPE:
      return (0, _polylineMapViewer.polylineMapViewer)(args);
    case CONST.POLYGON:
      return (0, _polygonMapViewer.polygonMapViewer)(args);
    case CONST.FEATURE_COLLECTION:
      return (0, _geoJSONMapViewer.geoJSONMapViewer)(args);
  }
};
exports.MapViewer = MapViewer;