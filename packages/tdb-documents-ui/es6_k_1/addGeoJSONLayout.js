"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGeoJSONLayout = addGeoJSONLayout;
var CONST = _interopRequireWildcard(require("./constants"));
var util = _interopRequireWildcard(require("./utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function addGeoJSONLayout(layout, documentFrame, property) {
  // GEO JSON types so set items in layout 
  var field = documentFrame[property];
  if (util.isPointType(field)) {
    // display 2 (CONST.POINT_MIN_ITEMS) items for lat & lng for point
    layout["items"] = {
      type: CONST.STRING_TYPE
    };
    layout["minItems"] = util.getMinItems(documentFrame, property);
  } else if (util.isLineStringType(field)) {
    layout["items"] = {
      "type": CONST.ARRAY_TYPE,
      "items": {
        type: CONST.STRING_TYPE
      },
      "minItems": CONST.POINT_MIN_ITEMS
    };
    layout["additionalItems"] = {
      "type": CONST.ARRAY_TYPE,
      "items": {
        type: CONST.STRING_TYPE
      },
      "minItems": CONST.POINT_MIN_ITEMS
    };
  } else if (util.isPolygonType(field) && util.isPolygon(documentFrame)) {
    layout["items"] = {
      "type": CONST.ARRAY_TYPE,
      "items": {
        "type": CONST.ARRAY_TYPE,
        "items": {
          type: CONST.STRING_TYPE
        },
        "minItems": CONST.POINT_MIN_ITEMS
      }
    };
  } else if (util.isPolygonType(field) && util.isMultiPolygon(documentFrame)) {
    layout["items"] = {
      "type": CONST.ARRAY_TYPE,
      "items": {
        "type": CONST.ARRAY_TYPE,
        "items": {
          type: CONST.STRING_TYPE
        },
        "minItems": CONST.POINT_MIN_ITEMS
      }
    };
  }
}