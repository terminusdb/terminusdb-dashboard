"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointMapViewer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = _interopRequireWildcard(require("../constants"));
var _markers = require("./markers");
require("leaflet-arrowheads");
var _leaflet = _interopRequireDefault(require("leaflet"));
var _reactUuid = _interopRequireDefault(require("react-uuid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var pointMapViewer = function pointMapViewer(args) {
  var documents = args.documents,
    zoom = args.zoom,
    onMarkerClick = args.onMarkerClick,
    center = args.center,
    bounds = args.bounds;
  var mapID = (0, _reactUuid["default"])();
  (0, _react.useEffect)(function () {
    map();
  }, []);
  var map = function map() {
    // gather lat and lng
    var coordinates = [{
      lat: documents[0],
      lng: documents[1]
    }];
    var mapOptions = (0, _markers.customMapOptions)(zoom, center, coordinates);
    var markerOptions = (0, _markers.customMarkerOptions)(_constants["default"]);
    var map = _leaflet["default"].map("map-leaflet-id-".concat(mapID), mapOptions);

    // set bounds if available
    if (bounds && Array.isArray(bounds) && bounds.length > 0) {
      map.fitBounds(bounds);
    }
    var tileLayer = _leaflet["default"].tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    tileLayer.addTo(map);

    // Draw Markers
    coordinates.map(function (docs) {
      // set lat and lng
      var coord = {
        id: docs.id,
        name: docs.name,
        lat: docs.lat,
        lng: docs.lng
      };
      var marker = _leaflet["default"].marker(coord, markerOptions).bindPopup("lat: ".concat(coord.lat, " lng: ").concat(coord.lng)).on('click', function (e) {
        var cData = coord;
        cData[_constants.REFRESH] = Date.now();
        if (onMarkerClick) onMarkerClick(cData);
      });
      marker.addTo(map);
    });
    window.map = map;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "map-leaflet-id-".concat(mapID),
    className: "rounded",
    "data-testid": "map-leaflet-id"
  });
};
exports.pointMapViewer = pointMapViewer;