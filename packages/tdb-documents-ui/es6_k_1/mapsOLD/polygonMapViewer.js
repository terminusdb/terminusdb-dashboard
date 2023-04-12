"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polygonMapViewer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = _interopRequireWildcard(require("../constants"));
var _markers = require("./markers");
require("leaflet-arrowheads");
var _leaflet = _interopRequireDefault(require("leaflet"));
var _map = require("./map.constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var polygonMapViewer = function polygonMapViewer(args) {
  var property = args.property,
    documents = args.documents,
    zoom = args.zoom,
    icon = args.icon,
    center = args.center,
    bounds = args.bounds,
    type = args.type;
  var mapID = crypto.randomUUID();
  (0, _react.useEffect)(function () {
    map();
  }, []);
  var map = function map() {
    var mapOptions = (0, _markers.customMapOptions)(zoom, [37, -109.05], documents, type);
    var markerOptions = (0, _markers.customMarkerOptions)(icon);
    var map = _leaflet["default"].map("map-polygon-id-".concat(mapID), mapOptions);

    // set center of maps 
    if (bounds && Array.isArray(bounds) && bounds.length > 0) {
      //map.setView([40.866667, 34.566667], 5) 
      map.fitBounds(bounds);
      map.flyToBounds(bounds);
    }
    var tileLayer = new _leaflet["default"].tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    tileLayer.addTo(map);

    //console.log("documents", documents)
    var polygonMap = _leaflet["default"].polygon(documents, {
      color: 'purple',
      smoothFactor: 5
    }).addTo(map);

    // zoom the map to the polygon
    map.fitBounds(polygonMap.getBounds());
    window.map = map;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "map-polygon-id-".concat(mapID),
    style: {
      height: "100vh"
    }
  });
};
exports.polygonMapViewer = polygonMapViewer;