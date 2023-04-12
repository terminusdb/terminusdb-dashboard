"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polylineMapViewer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = _interopRequireWildcard(require("../constants"));
var _markers = require("./markers");
require("leaflet-arrowheads");
var _leaflet = _interopRequireDefault(require("leaflet"));
var _map = require("./map.constants");
var _reactUuid = _interopRequireDefault(require("react-uuid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var polylineMapViewer = function polylineMapViewer(args) {
  var property = args.property,
    documents = args.documents,
    zoom = args.zoom,
    icon = args.icon,
    center = args.center,
    bounds = args.bounds;
  var mapID = (0, _reactUuid["default"])();
  (0, _react.useEffect)(function () {
    map();
  }, []);
  var map = function map() {
    var mapOptions = (0, _markers.customMapOptions)(zoom, center);
    var markerOptions = (0, _markers.customMarkerOptions)(icon);
    var map = _leaflet["default"].map("map-polyline-id-".concat(mapID));

    // set center of maps 
    if (bounds && Array.isArray(bounds) && bounds.length > 0) {
      //map.setView([40.866667, 34.566667], 5) 
      map.fitBounds(bounds);
      map.flyToBounds(bounds);
    }
    var tileLayer = _leaflet["default"].tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    tileLayer.addTo(map);
    var polyline = _leaflet["default"].polyline(documents, {
      color: "black"
    }).addTo(map);

    // add markers
    if (Array.isArray(documents)) {
      documents.map(function (mrk) {
        _leaflet["default"].marker(mrk, _map.MARKER_OPTION).addTo(map);
      });
    }

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());
    window.map = map;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "map-polyline-id-".concat(mapID),
    style: {
      height: "100vh"
    }
  });
};
exports.polylineMapViewer = polylineMapViewer;