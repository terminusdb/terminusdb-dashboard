"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlinkButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var UnlinkButton = function UnlinkButton(_ref) {
  var onDelete = _ref.onDelete,
    id = _ref.id,
    title = _ref.title,
    label = _ref.label;
  return /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    className: "btn-sm btn ms-auto text-light fw-bold border border-danger rounded",
    variant: "dark",
    title: title,
    onClick: onDelete,
    id: id
  }, label);
};
exports.UnlinkButton = UnlinkButton;