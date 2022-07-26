"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelQueryObj = void 0;

var _constants = require("../components/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PanelQueryObj =
/*#__PURE__*/
function () {
  function PanelQueryObj(id) {
    _classCallCheck(this, PanelQueryObj);

    this.id = id;
    this.isOpen = true;
    this.resultObj = {
      result: null,
      limit: 50,
      currentView: _constants.TABLE_VIEW,
      start: 0,
      orderBy: null,
      totalRows: null,
      graph: null,
      isOpen: true
    };
    this.editorObj = {
      query: null,
      text: '',
      language: "js",
      isOpen: true
    };
    this.queryBuilderObj = {
      isOpen: false
    };
  }

  _createClass(PanelQueryObj, [{
    key: "updateEditorProps",
    value: function updateEditorProps(propID, propValue) {
      this.editorObj[propID] = propValue;
    }
  }, {
    key: "updateResultProps",
    value: function updateResultProps(propID, propValue) {
      this.resultObj[propID] = propValue;
    }
  }, {
    key: "mainPanelIsOpen",
    set: function set(isOpen) {
      this.isOpen = isOpen;
    },
    get: function get() {
      return this.isOpen === false ? false : true;
    }
    /**
     * @param {boolean} isOpen
     */

  }, {
    key: "editorPanelIsOpen",
    set: function set(isOpen) {
      this.editorObj.isOpen = isOpen;
    },
    get: function get() {
      return this.editorObj.isOpen === false ? false : true;
    }
  }, {
    key: "resultPanelIsOpen",
    set: function set(isOpen) {
      this.resultObj.isOpen = isOpen;
    },
    get: function get() {
      return this.resultObj.isOpen === false ? false : true;
    }
  }]);

  return PanelQueryObj;
}();

exports.PanelQueryObj = PanelQueryObj;