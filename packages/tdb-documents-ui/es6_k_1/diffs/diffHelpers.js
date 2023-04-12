"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDiffUIFrames = generateDiffUIFrames;
var CONST = _interopRequireWildcard(require("../constants"));
var DIFFCONST = _interopRequireWildcard(require("./diff.constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// function to generate border class
function getBorder(diffState) {
  if (diffState === DIFFCONST.BEFORE) {
    return "tdb__diff__original-border";
  }
  return "tdb__diff__changed-border";
}

// SETS/ LIST/ ARRAY
function processOperation(diff, diffState) {
  if (diff[DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE) {
    return swapOperation(diffState);
  }
}

// get diff & css for each entry of array
function getEachArrayDiff(diffPatch, diffState) {
  var uiArray = [];
  // SETS/ LIST/ ARRAY
  diffPatch.map(function (diff) {
    if (diff.hasOwnProperty[DIFFCONST.OPERATION]) {
      uiArray.push(processOperation(diff, diffState));
    } else {
      // SUBDOCUMENTS SET/ LIST/ ARRAY
      var ui = generateDiffUIFrames(diff, diffState);
      if (Object.keys(ui).length) {
        // add border only if changes are there in document properties 
        // if no changes then ui = {}
        ui[CONST.BORDER] = getBorder(diffState);
      }
      uiArray.push(ui);
    }
  });
  return uiArray;
}

// @op = SwapValue
function swapOperation(diffState) {
  if (diffState === DIFFCONST.BEFORE) {
    return _defineProperty({}, CONST.CLASSNAME, "tdb__doc__input tdb__diff__original");
  }
  return _defineProperty({}, CONST.CLASSNAME, "tdb__doc__input tdb__diff__changed");
}
function getDiffUi(diffPatch, diffState) {
  var uiFrame = {};
  if (diffPatch.hasOwnProperty(DIFFCONST.OPERATION)) {
    if (diffPatch[DIFFCONST.OPERATION] === DIFFCONST.SWAP_VALUE) {
      // SWAP VALUE OPERATION
      uiFrame = swapOperation(diffState);
    } else if (diffPatch[DIFFCONST.OPERATION] === DIFFCONST.PATCH_LIST) {
      // PATCH LIST OPERATION
      var uiArray = [];
      // pass @patch array
      var patchList = getEachArrayDiff(diffPatch[DIFFCONST.PATCH], diffState);
      // add pacth list to ui array
      uiArray = patchList;
      // pass @rest 
      if (diffPatch.hasOwnProperty(DIFFCONST.REST)) {
        // now add @to 
        for (var count = 0; count < diffPatch[DIFFCONST.REST][DIFFCONST.TO]; count++) {
          // set default class name
          uiArray.push(_defineProperty({}, CONST.CLASSNAME, "tdb__doc__input"));
        }
        var restUi = getDiffUi(diffPatch[DIFFCONST.REST], diffState);
        // merge patchlist & rest list
        var merged = [].concat(_toConsumableArray(uiArray), _toConsumableArray(restUi));
        uiArray = merged;
      }
      uiFrame = uiArray;
    } else if (diffPatch[DIFFCONST.OPERATION] === DIFFCONST.COPY_LIST) {
      // COPY LIST
      // pass @rest array
      if (Array.isArray(diffPatch[DIFFCONST.REST])) {
        uiFrame = getEachArrayDiff(diffPatch[DIFFCONST.REST], diffState);
      }
      // pass @rest object
      else {
        var patchTESTList = getDiffUi(diffPatch[DIFFCONST.REST], diffState);
        uiFrame = patchTESTList;
      }
    } else if (diffPatch[DIFFCONST.OPERATION] === DIFFCONST.KEEP_LIST) {
      // send remaining default classname
      return [_defineProperty({}, CONST.CLASSNAME, "tdb__doc__input")];
    }
  } else {
    if (Array.isArray(diffPatch)) {
      uiFrame = getEachArrayDiff(diffPatch, diffState);
    } else {
      // SUBDOCUMENTS 
      uiFrame = generateDiffUIFrames(diffPatch, diffState);
      if (Object.keys(uiFrame).length) uiFrame[CONST.BORDER] = getBorder(diffState);
    }
  }
  return uiFrame;
}

/**
 * 
 * @param {*} args 
 * @param {*} diffState diff state is @before or @after - the state in which we view diffs
 * @returns 
 */
function generateDiffUIFrames(diffPatch, diffState) {
  var uiFrame = {};
  for (var property in diffPatch) {
    if (property === "@id") continue;else {
      var diffUi = getDiffUi(diffPatch[property], diffState);
      if (Object.keys(diffUi).length) uiFrame[property] = diffUi;
    }
  }
  console.log("!!! uiFrame !!!", diffState, uiFrame);
  return uiFrame;
}