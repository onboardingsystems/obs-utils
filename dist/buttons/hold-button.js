'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoldButton = function (_React$Component) {
  _inherits(HoldButton, _React$Component);

  function HoldButton(props) {
    _classCallCheck(this, HoldButton);

    var _this = _possibleConstructorReturn(this, (HoldButton.__proto__ || Object.getPrototypeOf(HoldButton)).call(this, props));

    _this.state = {
      clicked: false,
      percent: 0,
      mouseDown: null,
      timeout: null
    };

    _this._increment = 100;

    _this.fireAction = _this.fireAction.bind(_this);
    _this.incrementPercent = _this.incrementPercent.bind(_this);
    _this.mouseDown = _this.mouseDown.bind(_this);
    _this.mouseUp = _this.mouseUp.bind(_this);
    _this.renderLabel = _this.renderLabel.bind(_this);
    _this.renderProgressBar = _this.renderProgressBar.bind(_this);
    _this.timeout = _this.timeout.bind(_this);
    _this.startAction = _this.startAction.bind(_this);
    _this.stopAction = _this.stopAction.bind(_this);
    _this.fireAction = _this.fireAction.bind(_this);
    return _this;
  }

  _createClass(HoldButton, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.timeout != null) {
        clearTimeout(this.state.timeout);
      }
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown(e) {
      if (this.state.percent < 100) {
        var timeout = setTimeout(this.timeout, this._increment);
        this.startAction();
        this.setState({ clicked: true, percent: 0, timeout: timeout, mouseDown: new Date() });
      }
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp() {
      clearTimeout(this.state.timeout);
      if (this.state.percent < 100) {
        this.stopAction();
        this.setState({ percent: 0, timeout: null, mouseDown: null });
      }
    }
  }, {
    key: 'timeout',
    value: function timeout() {
      if (this.state.mouseDown != null) {
        var percent = this.incrementPercent();
        var timeout = null;
        if (percent >= 100) {
          percent = 100;
          setTimeout(this.fireAction, 100);
        } else {
          timeout = setTimeout(this.timeout, this._increment);
        }
        this.setState({ percent: percent, timeout: timeout });
      }
    }
  }, {
    key: 'startAction',
    value: function startAction() {
      if (typeof this.props.onStart != "undefined") {
        this.props.onStart();
      }
    }
  }, {
    key: 'stopAction',
    value: function stopAction() {
      if (typeof this.props.onStop != "undefined") {
        this.props.onStop();
      }
    }
  }, {
    key: 'fireAction',
    value: function fireAction() {
      if (typeof this.props.onAction != "undefined") {
        this.props.onAction();
      }
    }
  }, {
    key: 'incrementPercent',
    value: function incrementPercent() {
      return Math.floor(this._increment / this.props.wait * 100 + this.state.percent);
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (this.state.clicked) {
        return "Hold to " + this.props.label;
      } else {
        return this.props.label;
      }
    }
  }, {
    key: 'renderProgressBar',
    value: function renderProgressBar() {
      if (this.state.mouseDown != null) {
        var style = {
          width: this.state.percent + "%",
          background: this.props.transitionColor
        };

        return _react2.default.createElement(
          'div',
          { className: 'progress' },
          _react2.default.createElement('div', { className: 'progress-bar progress-bar-striped', role: 'progressbar', style: style })
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = this.props.classes + " hold-button";
      if (this.state.percent == 100) {
        classes += " disabled done";
      }
      var doneIcon = "fa fa-" + this.props.doneIcon + " done-icon";

      return _react2.default.createElement(
        'div',
        { className: classes, onMouseDown: this.mouseDown, onMouseUp: this.mouseUp },
        _react2.default.createElement(
          'div',
          { className: 'message' },
          this.renderLabel()
        ),
        this.renderProgressBar(),
        _react2.default.createElement('i', { className: doneIcon, style: { color: this.props.doneColor } })
      );
    }
  }]);

  return HoldButton;
}(_react2.default.Component);

HoldButton.defaultProps = {
  label: "Delete",
  classes: "btn btn-default",
  doneIcon: "check-circle-o",
  transitionColor: "#337ab7",
  doneColor: "#27ae60",
  wait: 750
};

HoldButton.propTypes = {
  label: _propTypes2.default.string, // button text
  classes: _propTypes2.default.string, // top level css classes
  wait: _propTypes2.default.number, // time in ms to wait for confirmation
  onStart: _propTypes2.default.func, // function called when mouse is pressed
  onStop: _propTypes2.default.func, // function called when mouse is released
  onAction: _propTypes2.default.func // function called after confirmation clicked
};

module.exports = HoldButton;