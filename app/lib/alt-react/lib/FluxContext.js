'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _proptypes = require('prop-types');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'FluxContext',

  childContextTypes: {
    flux: _proptypes.object
  },

  getChildContext: function getChildContext() {
    return { flux: this.props.flux };
  },

  render: function render() {
    return this.props.children;
  }
});
module.exports = exports['default'];