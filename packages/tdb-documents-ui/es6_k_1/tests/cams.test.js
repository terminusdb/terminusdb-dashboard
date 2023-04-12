"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _react = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _FrameViewer = require("../FrameViewer");
var CONST = _interopRequireWildcard(require("./constants/cams.constants"));
require("@testing-library/jest-dom");
var _dom = require("@testing-library/dom");
var _reactSelectEvent = _interopRequireDefault(require("react-select-event"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Create/ Edit  an Asset in CAMS Data Product
 */
describe("Create/ Edit an Asset in CAMS Data Product", function () {
  /**
   * 
   * @returns submitted data from <FrameViewer/>
  */
  var setup = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(config) {
      var data, handleSubmit, _render, container, getByLabelText, getByTestId, applicableHazardsButton, applicableHazardsGradeInput, assetIdentifierInput, designStandardsInput, cityInput, postalCodeInput, stateInput, streetInput, latInput, lngInput, nameInput, costInput, descriptionButton, descrInput, createNew, spatialWedInput, commisioningDate, lastMaintainedDate, submitButton;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            handleSubmit = function _handleSubmit(submittedData) {
              data = submittedData;
              return data;
            };
            // submitted data via <FrameViewer/>
            data = false; // callback function which returns back data submitted via <FrameViewer/>
            // render FrameViewer 
            _render = (0, _react.render)( /*#__PURE__*/React.createElement(_FrameViewer.FrameViewer, {
              frame: config.frame,
              type: config.type,
              uiFrame: config.uiFrame,
              formData: config.formData,
              mode: config.mode,
              onSubmit: handleSubmit
            })), container = _render.container, getByLabelText = _render.getByLabelText, getByTestId = _render.getByTestId; //logRoles(container)
            // applicable hazard
            applicableHazardsButton = _react.screen.getByRole("button", {
              name: "Add applicable_hazards"
            });
            _context.next = 6;
            return expect(applicableHazardsButton).toBeInTheDocument();
          case 6:
            _context.next = 8;
            return _userEvent["default"].click(applicableHazardsButton);
          case 8:
            // applicable hazard grade
            applicableHazardsGradeInput = document.getElementById("root_applicable_hazards_0__0_Grade");
            _context.next = 11;
            return expect(applicableHazardsGradeInput).toBeInTheDocument();
          case 11:
            _react.fireEvent.change(applicableHazardsGradeInput, {
              target: {
                value: config.input["applicable_hazards"][0]["Grade"]
              }
            });

            //  applicable hazard hazard
            _context.next = 14;
            return _reactSelectEvent["default"].select(getByLabelText('hazard'), [config.input["applicable_hazards"][0]["hazard"]]);
          case 14:
            _context.next = 16;
            return _reactSelectEvent["default"].select(getByLabelText('assetType'), [config.input["assetType"]]);
          case 16:
            // asset_identifier
            assetIdentifierInput = document.getElementById("root_asset_identifier");
            _context.next = 19;
            return expect(assetIdentifierInput).toBeInTheDocument();
          case 19:
            _react.fireEvent.change(assetIdentifierInput, {
              target: {
                value: config.input["asset_identifier"]
              }
            });

            // design_standards
            designStandardsInput = document.getElementById("root_design_standards");
            _context.next = 23;
            return expect(designStandardsInput).toBeInTheDocument();
          case 23:
            _react.fireEvent.change(designStandardsInput, {
              target: {
                value: config.input["design_standards"]
              }
            });

            // location city
            cityInput = document.getElementById("root_location_city");
            _context.next = 27;
            return expect(cityInput).toBeInTheDocument();
          case 27:
            _react.fireEvent.change(cityInput, {
              target: {
                value: config.input["location"]["city"]
              }
            });

            // location postal code
            postalCodeInput = document.getElementById("root_location_postal_code");
            _context.next = 31;
            return expect(postalCodeInput).toBeInTheDocument();
          case 31:
            _react.fireEvent.change(postalCodeInput, {
              target: {
                value: config.input["location"]["postal_code"]
              }
            });

            // location state
            stateInput = document.getElementById("root_location_state");
            _context.next = 35;
            return expect(stateInput).toBeInTheDocument();
          case 35:
            _react.fireEvent.change(stateInput, {
              target: {
                value: config.input["location"]["state"]
              }
            });

            // location street
            streetInput = document.getElementById("root_location_street");
            _context.next = 39;
            return expect(streetInput).toBeInTheDocument();
          case 39:
            _react.fireEvent.change(streetInput, {
              target: {
                value: config.input["location"]["street"]
              }
            });

            // geometry_location
            _context.next = 42;
            return _reactSelectEvent["default"].select(getByLabelText('geometry_location'), [config.input["location"]["geometry_location"]["@type"]]);
          case 42:
            // location coordinates 
            // latitude__0
            latInput = document.getElementById("latitude__0");
            _context.next = 45;
            return expect(latInput).toBeInTheDocument();
          case 45:
            _react.fireEvent.change(latInput, {
              target: {
                value: config.input["location"]["geometry_location"]["coordinates"][0]
              }
            });

            // longitude__1
            lngInput = document.getElementById("longitude__1");
            _context.next = 49;
            return expect(lngInput).toBeInTheDocument();
          case 49:
            _react.fireEvent.change(lngInput, {
              target: {
                value: config.input["location"]["geometry_location"]["coordinates"][1]
              }
            });

            // type
            _context.next = 52;
            return _reactSelectEvent["default"].select(getByLabelText('type'), [config.input["location"]["geometry_location"]["type"]]);
          case 52:
            // name
            nameInput = document.getElementById("root_name");
            _context.next = 55;
            return expect(nameInput).toBeInTheDocument();
          case 55:
            _react.fireEvent.change(nameInput, {
              target: {
                value: config.input["name"]
              }
            });

            // cost
            costInput = document.getElementById("root_cost");
            _context.next = 59;
            return expect(costInput).toBeInTheDocument();
          case 59:
            _react.fireEvent.change(costInput, {
              target: {
                value: config.input["cost"]
              }
            });

            // operating
            _context.next = 62;
            return _reactSelectEvent["default"].select(getByLabelText('operating'), [config.input["operating"]]);
          case 62:
            // description 
            descriptionButton = _react.screen.getByRole("button", {
              name: "Add description"
            });
            _context.next = 65;
            return expect(descriptionButton).toBeInTheDocument();
          case 65:
            _context.next = 67;
            return _userEvent["default"].click(descriptionButton);
          case 67:
            // description first entry
            descrInput = document.getElementById("root_description_0__0");
            _context.next = 70;
            return expect(descrInput).toBeInTheDocument();
          case 70:
            _react.fireEvent.change(descrInput, {
              target: {
                value: config.input["description"][0]
              }
            });

            // spatial_web_identifier  create new 
            createNew = document.getElementById("Create New Document__1");
            _context.next = 74;
            return expect(createNew).toBeInTheDocument();
          case 74:
            _context.next = 76;
            return _userEvent["default"].click(createNew);
          case 76:
            // spatial_web_identifier
            spatialWedInput = document.getElementById("root_spatial_web_identifier_id_1");
            _context.next = 79;
            return expect(spatialWedInput).toBeInTheDocument();
          case 79:
            _react.fireEvent.change(spatialWedInput, {
              target: {
                value: config.input["spatial_web_identifier"]["id"]
              }
            });

            // add test to check date widgets 
            // commisioning_date
            commisioningDate = getByTestId("date-picker__commisioning_date");
            _context.next = 83;
            return expect(commisioningDate).toBeInTheDocument();
          case 83:
            // last_maintained
            lastMaintainedDate = getByTestId("date-picker__last_maintained");
            _context.next = 86;
            return expect(lastMaintainedDate).toBeInTheDocument();
          case 86:
            // expect(commisioningDate.value).toBe("06 April, 2023");
            // add test to check date widgets 
            // last_maintained
            // last_modified
            // check if submit button is available 
            submitButton = _react.screen.getByText("Submit"); // check if submit button is available
            expect(submitButton).toBeInTheDocument();
            // click on submit button 
            _context.next = 90;
            return _userEvent["default"].click(submitButton);
          case 90:
            return _context.abrupt("return", data);
          case 91:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function setup(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // create 
  test("Create an Asset", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var config, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          config = CONST.CREATE_CONFIG; // setup FrameViewer 
          _context2.next = 3;
          return setup(config);
        case 3:
          data = _context2.sent;
          // check if data is same as expected data
          expect(data).toStrictEqual(config.input);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));

  // view
  test("View as Asset", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var config, _render2, container, getByTestId, applicableHazardsGradeInput, assetIdentifierInput, designStandardsInput, cityInput, postalCodeInput, stateInput, streetInput, map, nameInput, costInput, descrInput;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          config = CONST.VIEW_CONFIG; // render FrameViewer in View mode
          _render2 = (0, _react.render)( /*#__PURE__*/React.createElement(_FrameViewer.FrameViewer, {
            frame: CONST.VIEW_CONFIG.frame,
            type: CONST.VIEW_CONFIG.type,
            uiFrame: CONST.VIEW_CONFIG.uiFrame,
            formData: CONST.VIEW_CONFIG.input,
            mode: CONST.VIEW_CONFIG.mode
          })), container = _render2.container, getByTestId = _render2.getByTestId; //logRoles(container)
          // applicable hazard grade
          applicableHazardsGradeInput = document.getElementById("root_applicable_hazards_0__0_Grade");
          _context3.next = 5;
          return expect(applicableHazardsGradeInput).toBeInTheDocument();
        case 5:
          _context3.next = 7;
          return expect(applicableHazardsGradeInput.value).toStrictEqual(config.input["applicable_hazards"][0]["Grade"]);
        case 7:
          // asset_identifier
          assetIdentifierInput = document.getElementById("root_asset_identifier");
          _context3.next = 10;
          return expect(assetIdentifierInput).toBeInTheDocument();
        case 10:
          _context3.next = 12;
          return expect(assetIdentifierInput.value).toStrictEqual(config.input["asset_identifier"]);
        case 12:
          // design_standards
          designStandardsInput = document.getElementById("root_design_standards");
          _context3.next = 15;
          return expect(designStandardsInput).toBeInTheDocument();
        case 15:
          _context3.next = 17;
          return expect(designStandardsInput.value).toStrictEqual(config.input["design_standards"]);
        case 17:
          // location city
          cityInput = document.getElementById("root_location_city");
          _context3.next = 20;
          return expect(cityInput).toBeInTheDocument();
        case 20:
          _context3.next = 22;
          return expect(cityInput.value).toStrictEqual(config.input["location"]["city"]);
        case 22:
          // location postal code
          postalCodeInput = document.getElementById("root_location_postal_code");
          _context3.next = 25;
          return expect(postalCodeInput).toBeInTheDocument();
        case 25:
          _context3.next = 27;
          return expect(postalCodeInput.value).toStrictEqual(config.input["location"]["postal_code"]);
        case 27:
          // location state
          stateInput = document.getElementById("root_location_state");
          _context3.next = 30;
          return expect(stateInput).toBeInTheDocument();
        case 30:
          _context3.next = 32;
          return expect(stateInput.value).toStrictEqual(config.input["location"]["state"]);
        case 32:
          // location street
          streetInput = document.getElementById("root_location_street");
          _context3.next = 35;
          return expect(streetInput).toBeInTheDocument();
        case 35:
          _context3.next = 37;
          return expect(streetInput.value).toStrictEqual(config.input["location"]["street"]);
        case 37:
          // location coordinates 
          map = getByTestId("map-leaflet-id");
          _context3.next = 40;
          return expect(map).toBeInTheDocument();
        case 40:
          // name
          nameInput = document.getElementById("root_name");
          _context3.next = 43;
          return expect(nameInput).toBeInTheDocument();
        case 43:
          _context3.next = 45;
          return expect(nameInput.value).toStrictEqual(config.input["name"]);
        case 45:
          // cost
          costInput = document.getElementById("root_cost");
          _context3.next = 48;
          return expect(costInput).toBeInTheDocument();
        case 48:
          _context3.next = 50;
          return expect(costInput.value).toStrictEqual(config.input["cost"]);
        case 50:
          // description first entry
          descrInput = document.getElementById("root_description_0__0");
          _context3.next = 53;
          return expect(descrInput).toBeInTheDocument();
        case 53:
          _context3.next = 55;
          return expect(descrInput.value).toStrictEqual(config.input["description"][0]);
        case 55:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
});