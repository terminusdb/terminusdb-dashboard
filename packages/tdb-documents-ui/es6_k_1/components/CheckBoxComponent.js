"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TDBCheckBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _Form = _interopRequireDefault(require("react-bootstrap/Form"));
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var TDBCheckBox = function TDBCheckBox(_ref) {
  var checked = _ref.checked,
    checkBoxKey = _ref.checkBoxKey,
    name = _ref.name,
    _onChange = _ref.onChange;
  /*return <> 
    <input type="radio" 
      id={checkBoxKey} 
      checked={ checked === name ? true : false }
      onChange={(e) => onChange(name)}
      /> 
    <label for={checkBoxKey}>{name}</label>
  </>*/

  return /*#__PURE__*/_react["default"].createElement(_Form["default"].Check, {
    inline: true,
    checked: checked === name ? true : false,
    label: name,
    name: checkBoxKey,
    htmlFor: checkBoxKey,
    "for": checkBoxKey,
    type: "radio",
    id: checkBoxKey,
    key: checkBoxKey,
    onChange: function onChange(e) {
      return _onChange(name);
    }
  });
};
exports.TDBCheckBox = TDBCheckBox;