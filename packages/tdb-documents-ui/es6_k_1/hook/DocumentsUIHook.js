"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentsUIHook = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _GeneralQueries = require("./GeneralQueries");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var DocumentsUIHook = function DocumentsUIHook(woqlClient) {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    documentClasses = _useState6[0],
    setDocumentClasses = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    perDocumentCount = _useState8[0],
    setPerDocument = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    totalDocumentCount = _useState10[0],
    setTotalDocumentCount = _useState10[1];
  // null nothing is done
  // object - complete
  // false - failed
  var _useState11 = (0, _react.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    documentTablesConfig = _useState12[0],
    setDocumentTablesConfig = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    selectedDocument = _useState14[0],
    setSelectedDocument = _useState14[1];
  var _useState15 = (0, _react.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    frames = _useState16[0],
    setFrames = _useState16[1];

  //get all the Document Classes (no abstract or subdocument)
  // I can need to call this again
  // improve performance with check last commit
  function getUpdatedDocumentClasses() {
    return _getUpdatedDocumentClasses.apply(this, arguments);
  } // count the number of document I need this in 
  // docHome and query builder
  // I need to reload the class too
  function _getUpdatedDocumentClasses() {
    _getUpdatedDocumentClasses = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var dataProduct, classDocumentsResult, classDocumentOrder;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            if (!woqlClient) {
              _context.next = 11;
              break;
            }
            setDocumentClasses(false);
            setLoading(true);
            setError(false);
            dataProduct = woqlClient.db(); // the list of classes
            _context.next = 8;
            return woqlClient.getClassDocuments(dataProduct);
          case 8:
            classDocumentsResult = _context.sent;
            classDocumentOrder = (0, _utils.sortAlphabetically)(classDocumentsResult, true);
            setDocumentClasses(classDocumentOrder);
          case 11:
            _context.next = 17;
            break;
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            setError(_context.t0.data || _context.t0.message);
            console.log("Error in init woql while getting classes of data product", _context.t0.message);
          case 17:
            _context.prev = 17;
            setLoading(false);
            return _context.finish(17);
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 13, 17, 20]]);
    }));
    return _getUpdatedDocumentClasses.apply(this, arguments);
  }
  function getDocNumber() {
    return _getDocNumber.apply(this, arguments);
  } // next step good cache policy
  // I needd a way to cache this so I can
  // not call frame for a specific dataP if not changes
  // classes and frames we need only one but count can change
  // we reset all the object
  /* useEffect(() => {
       resetAll()
       // reset frames and table....
   },[dataProduct])
     function resetAll(){
       setDocumentClasses(false)
       setTotalDocumentCount(false)
       setPerDocument(false)
       setFrames(null)
       setSelectedDocument(null)
       setDocumentTablesConfig(null)
   }*/
  /*  useEffect(() => {
         //remove the error from the preview page
         if(error!== false)setError(false)
     },[window.location.pathname])*/
  // this work in edit and view 
  // not works for new document, I have to add it inside new document too
  // I prefer do the call in the single page maybe ??
  // to review
  // we need frame in the diff page too for this we are listening changeid status
  /* useEffect(() => {
       // only if I'm in change request mode 
       // I do not need to reload because the schema can not change
       //if(!currentChangeRequest || documentTablesConfig === null) 
       // we need in edit/insert
       if(id || changeid) {              
           getUpdatedFrames()  
           if(id){
               getGraphqlTableConfig()
               let documentID=decodeUrl(id)
               getDocument(documentID)
           }
       }
   },[id,changeid])*/
  function _getDocNumber() {
    _getDocNumber = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var dataProduct, classDocumentsResult, classes, totalQ, _totalDocumentCount, getTotal;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            setDocumentClasses(false);
            setTotalDocumentCount(false);
            setPerDocument(false);
            setLoading(true);
            setError(false);
            dataProduct = woqlClient.db(); // I need to reload because I do not know if this can change
            //let classDocumentOrder
            _context2.next = 9;
            return woqlClient.getClassDocuments(dataProduct);
          case 9:
            classDocumentsResult = _context2.sent;
            classes = (0, _utils.sortAlphabetically)(classDocumentsResult, true);
            if (!(Array.isArray(classes) && classes.length > 0)) {
              _context2.next = 20;
              break;
            }
            totalQ = (0, _GeneralQueries.getTotalNumberOfDocuments)(classes); //give me back count with the total documents number and total for classes too
            _context2.next = 15;
            return woqlClient.query(totalQ);
          case 15:
            _totalDocumentCount = _context2.sent;
            //get the total number
            getTotal = _totalDocumentCount.bindings[0].Count["@value"];
            delete _totalDocumentCount.bindings[0].Count;
            setTotalDocumentCount(getTotal);
            //pass the count per class
            setPerDocument(_totalDocumentCount.bindings[0]);
          case 20:
            setDocumentClasses(classes);
            _context2.next = 27;
            break;
          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](0);
            setError(_context2.t0.data || _context2.t0.message);
            console.log("Error in init woql while getting classes of data product", _context2.t0.message);
          case 27:
            _context2.prev = 27;
            setLoading(false);
            return _context2.finish(27);
          case 30:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 23, 27, 30]]);
    }));
    return _getDocNumber.apply(this, arguments);
  }
  function getGraphqlTableConfig() {
    if (woqlClient) {
      setLoading(true);
      // create a  new client instance copying all the settings
      var clientCopy = woqlClient.copy();
      clientCopy.connectionConfig.api_extension = 'api/';
      // I need to remove the team name in the url
      // this call is for the cloud-api
      if (clientCopy.connectionConfig.baseServer) {
        clientCopy.connectionConfig.server = clientCopy.connectionConfig.baseServer;
      }
      var baseUrl = clientCopy.connectionConfig.branchBase("tables");
      clientCopy.sendCustomRequest("GET", baseUrl).then(function (result) {
        setDocumentTablesConfig(result);
      })["catch"](function (err) {
        setError(err.data || err.message);
        console.log(err);
        setDocumentTablesConfig(false);
      })["finally"](setLoading(false));
    }
  }
  function getUpdatedFrames() {
    // setFrames(null)
    if (woqlClient) {
      setLoading(true);
      woqlClient.getSchemaFrame().then(function (res) {
        setFrames(res);
      })["catch"](function (err) {
        setFrames(false);
        setError(err.data || err.message);
      })["finally"](setLoading(false));
    }
  }
  function createDocument(_x2) {
    return _createDocument.apply(this, arguments);
  }
  function _createDocument() {
    _createDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(jsonDocument) {
      var res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            setLoading(true);
            //await checkStatus()
            _context3.next = 4;
            return woqlClient.addDocument(jsonDocument);
          case 4:
            res = _context3.sent;
            return _context3.abrupt("return", res);
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            setError(_context3.t0.data || _context3.t0.message);
          case 11:
            _context3.prev = 11;
            setLoading(false);
            return _context3.finish(11);
          case 14:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 8, 11, 14]]);
    }));
    return _createDocument.apply(this, arguments);
  }
  function getDocument(_x3) {
    return _getDocument.apply(this, arguments);
  } // delete documents
  function _getDocument() {
    _getDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(documentId) {
      var params, res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            setLoading(true);
            setError(false);
            params = {
              id: documentId
            };
            _context4.next = 6;
            return woqlClient.getDocument(params);
          case 6:
            res = _context4.sent;
            setSelectedDocument(res);
            _context4.next = 13;
            break;
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            setError(_context4.t0.data || _context4.t0.message);
          case 13:
            _context4.prev = 13;
            setLoading(false);
            return _context4.finish(13);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 10, 13, 16]]);
    }));
    return _getDocument.apply(this, arguments);
  }
  function deleteDocument(_x4) {
    return _deleteDocument.apply(this, arguments);
  }
  function _deleteDocument() {
    _deleteDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(documentId) {
      var params, commitMsg, res;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            setLoading(true);
            setError(false);
            // await checkStatus ()
            params = {
              id: documentId
            };
            commitMsg = "Deleting document ".concat(documentId);
            _context5.next = 7;
            return woqlClient.deleteDocument(params, null, commitMsg);
          case 7:
            res = _context5.sent;
            return _context5.abrupt("return", true);
          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            setError(_context5.t0.data || _context5.t0.message);
          case 14:
            _context5.prev = 14;
            setLoading(false);
            return _context5.finish(14);
          case 17:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 11, 14, 17]]);
    }));
    return _deleteDocument.apply(this, arguments);
  }
  function updateDocument(_x5) {
    return _updateDocument.apply(this, arguments);
  }
  function _updateDocument() {
    _updateDocument = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(jsonDoc) {
      var commitMsg, res;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            setLoading(true);
            setError(false);
            // await checkStatus ()
            commitMsg = "Updating document ".concat(jsonDoc["@id"]); // pass create:true 
            _context6.next = 6;
            return woqlClient.updateDocument(jsonDoc, {}, null, commitMsg, false, false, false, true);
          case 6:
            res = _context6.sent;
            return _context6.abrupt("return", res);
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            //display conflict
            setError(_context6.t0.data || _context6.t0.message);
          case 13:
            _context6.prev = 13;
            setLoading(false);
            return _context6.finish(13);
          case 16:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 10, 13, 16]]);
    }));
    return _updateDocument.apply(this, arguments);
  }
  return {
    setError: setError,
    selectedDocument: selectedDocument,
    getDocument: getDocument,
    deleteDocument: deleteDocument,
    createDocument: createDocument,
    updateDocument: updateDocument,
    getDocNumber: getDocNumber,
    getUpdatedFrames: getUpdatedFrames,
    loading: loading,
    getUpdatedDocumentClasses: getUpdatedDocumentClasses,
    error: error,
    perDocumentCount: perDocumentCount,
    totalDocumentCount: totalDocumentCount,
    documentClasses: documentClasses,
    getGraphqlTableConfig: getGraphqlTableConfig,
    documentTablesConfig: documentTablesConfig,
    frames: frames
  };
};
exports.DocumentsUIHook = DocumentsUIHook;