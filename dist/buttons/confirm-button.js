'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmButton = function (_React$Component) {
  _inherits(ConfirmButton, _React$Component);

  function ConfirmButton(props) {
    _classCallCheck(this, ConfirmButton);

    var _this = _possibleConstructorReturn(this, (ConfirmButton.__proto__ || Object.getPrototypeOf(ConfirmButton)).call(this, props));

    _this.state = {
      confirm: _this.props.mode == "confirm",
      timeout: null
    };

    _this._onClick = _this._onClick.bind(_this);
    _this._onMouseOut = _this._onMouseOut.bind(_this);
    _this._onMouseOver = _this._onMouseOver.bind(_this);
    _this.clearTimeout = _this.clearTimeout.bind(_this);
    _this.timeout = _this.timeout.bind(_this);
    _this.endConfirm = _this.endConfirm.bind(_this);
    return _this;
  }

  _createClass(ConfirmButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.mode == "confirm" !== this.state.confirm) {
        this.clearTimeout();
        this.setState({ confirm: nextProps.mode == "confirm" });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimeout();
    }
  }, {
    key: '_onClick',
    value: function _onClick(e) {
      if (typeof e != "undefined") {
        e.stopPropagation();
      }

      if (this.state.confirm) {
        this.endConfirm();
        if (typeof this.props.onAction != "undefined") {
          this.props.onAction();
        }
      } else {
        this.setState({ confirm: true });
        if (typeof this.props.onConfirm != "undefined") {
          this.props.onConfirm();
        }
      }
    }
  }, {
    key: '_onMouseOver',
    value: function _onMouseOver() {
      if (this.state.confirm) {
        this.clearTimeout();
      }
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut() {
      if (this.state.confirm) {
        var timeout = setTimeout(this.timeout, this.props.wait);
        this.setState({ timeout: timeout });
      }
    }
  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      if (this.state.timeout != null) {
        clearTimeout(this.state.timeout);
        this.setState({ timeout: null });
      }
    })
  }, {
    key: 'timeout',
    value: function timeout() {
      if (typeof this.props.onTimeout != "undefined") {
        this.props.onTimeout();
      }
      this.endConfirm();
    }
  }, {
    key: 'endConfirm',
    value: function endConfirm() {
      this.clearTimeout();
      this.setState({ confirm: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)({
        'btn': true,
        'btn-default': !this.state.confirm,
        'btn-danger': this.state.confirm
      });

      var message = this.props.label;
      if (this.state.confirm) {
        message = this.props.message;
      }
      if (this.props.children != null) {
        message = this.props.children;
        classes = (0, _classnames2.default)({});
      }

      return _react2.default.createElement(
        'div',
        { className: classes, onMouseOver: this._onMouseOver, onMouseOut: this._onMouseOut, onClick: this._onClick },
        message
      );
    }
  }]);

  return ConfirmButton;
}(_react2.default.Component);

ConfirmButton.defaultProps = {
  label: "Delete",
  message: "Are you sure?",
  mode: null,
  wait: 3000
};

ConfirmButton.propTypes = {
  label: _propTypes2.default.string, // Button text before click
  message: _propTypes2.default.string, // Button text after click
  wait: _propTypes2.default.number, // time in ms to wait for confirmation
  mode: _propTypes2.default.string,
  onAction: _propTypes2.default.func, // function called after confirmation clicked
  onConfirm: _propTypes2.default.func, // function called on first click
  onTimeout: _propTypes2.default.func // function called on timeout
};

module.exports = ConfirmButton;