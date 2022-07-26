"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateNewDataProductStates = useCreateNewDataProductStates;
exports.createNewDataProduct = createNewDataProduct;
exports.deleteDataProduct = deleteDataProduct;

var _react = require("react");

var _initWoqlClient = require("../init-woql-client");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useCreateNewDataProductStates() {
  var _WOQLClientObj = (0, _initWoqlClient.WOQLClientObj)(),
      woqlClient = _WOQLClientObj.woqlClient,
      setDataProduct = _WOQLClientObj.setDataProduct,
      reconnectToServer = _WOQLClientObj.reconnectToServer;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      result = _useState4[0],
      setResult = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      updateList = _useState6[0],
      setUpdateList = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      showNewDataProductModal = _useState8[0],
      setShowNewDataProductModal = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
      _useState10 = _slicedToArray(_useState9, 2),
      newDataProductInfo = _useState10[0],
      setNewDataProductInfo = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      showDeleteDataProductModal = _useState12[0],
      setShowDeleteDataProductModal = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = _slicedToArray(_useState13, 2),
      deleteDataProductInfo = _useState14[0],
      setDeleteDataProductInfo = _useState14[1];

  (0, _react.useEffect)(function () {
    if (woqlClient && newDataProductInfo.id && newDataProductInfo.label) {
      setLoading(true);
      newDataProductInfo.organization = woqlClient.organization();
      createNewDataProduct(woqlClient, newDataProductInfo, setResult, setLoading, setShowNewDataProductModal, setDataProduct, reconnectToServer);
    }
  }, [newDataProductInfo]);
  (0, _react.useEffect)(function () {
    if (woqlClient && deleteDataProductInfo.name && deleteDataProductInfo.name == woqlClient.db()) {
      setLoading(true);
      deleteDataProduct(woqlClient, deleteDataProductInfo, setResult, setLoading, setShowDeleteDataProductModal, setDataProduct, reconnectToServer);
    }
  }, [deleteDataProductInfo]);

  function handleNew() {
    setShowNewDataProductModal(true);
  }

  return {
    newDataProductInfo: newDataProductInfo,
    setNewDataProductInfo: setNewDataProductInfo,
    loading: loading,
    setLoading: setLoading,
    result: result,
    setResult: setResult,
    handleNew: handleNew,
    setShowNewDataProductModal: setShowNewDataProductModal,
    showNewDataProductModal: showNewDataProductModal,
    showDeleteDataProductModal: showDeleteDataProductModal,
    setDeleteDataProductInfo: setDeleteDataProductInfo,
    setShowDeleteDataProductModal: setShowDeleteDataProductModal
  };
} //export async function createNewDataProduct (woqlClient, meta, onDone, setLoading, setShowNewDataProductModal, setDataProduct) {
//let org = meta.organization || "admin" // get this organization from log in details once intergrated
//TO BE REVIEW 


function createNewDataProduct(woqlClient, meta, onDone, setLoading, setShowNewDataProductModal, setDataProduct, reconnectToServer) {
  var org;
  return regeneratorRuntime.async(function createNewDataProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          org = meta.organization || "admin"; // get this organization from log in details once intergrated

          setLoading(true);
          _context.next = 4;
          return regeneratorRuntime.awrap(woqlClient.createDatabase(meta.id, meta).then(function (res) {
            setLoading(false); //onDone(res)
          })["catch"](function (err) {
            return console.log(err);
          })["finally"](function () {
            setShowNewDataProductModal(false);
            woqlClient.db(meta.id);
            reconnectToServer();
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteDataProduct(woqlClient, meta, onDone, setLoading, setShowDeleteDataProductModal, setDataProduct, reconnectToServer) {
  var id;
  return regeneratorRuntime.async(function deleteDataProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          setLoading(true);
          id = meta.name;
          _context2.next = 4;
          return regeneratorRuntime.awrap(woqlClient.deleteDatabase(id, woqlClient.organization(), true).then(function (res) {
            onDone(res);
            setLoading(false);
            setShowDeleteDataProductModal(false);
            setDataProduct(false);
            reconnectToServer();
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}