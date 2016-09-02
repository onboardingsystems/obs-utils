var React = require('react');
var cx = require('classnames');

var Modal = React.createClass({
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    focusFirst: React.PropTypes.bool,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
    onClose: React.PropTypes.func,
    onShown: React.PropTypes.func
  },

  $: function() {
    return $(ReactDOM.findDOMNode(this));
  },

  getDefaultProps: function() {
    return {
      focusFirst: true,
      size: 'medium'
    };
  },

  componentDidMount: function() {
    var $modal = this.$();
    $modal.modal({
      show: this.props.show
    });
    $modal.on('shown.bs.modal', (function(_this) {
      return function() {
        return _this.modalShown();
      };
    })(this));
    return $modal.on('hidden.bs.modal', (function(_this) {
      return function(e) {
        var base;
        return typeof (base = _this.props).onClose === "function" ? base.onClose() : void 0;
      };
    })(this));
  },

  componentWillReceiveProps: function(newProps) {
    var action = newProps.show ? 'show' : 'hide';
    var $modal = this.$();
    return $modal.modal(action);
  },

  componentWillUnmount: function() {
    var $modal = this.$();
    $modal.off('shown.bs.modal');
    $modal.off('hidden.bs.modal');
    return $modal.modal('hide');
  },

  modalShown: function() {
    var base;
    if (this.props.focusFirst) {
      $(ReactDOM.findDOMNode(this)).find('.modal-children :focusable:first').focus();
    }
    return typeof (base = this.props).onShown === "function" ? base.onShown() : void 0;
  },

  render: function() {
    var modalDialogClasses = cx({
      "modal-dialog": true,
      "modal-sm": this.props.size === 'small',
      "modal-md": this.props.size === 'medium',
      "modal-lg": this.props.size === 'large'
    });

    // only render children if the modal is being shown
    return(
      <div className={"modal obs-modal fade " + this.props.className}>
        <div className={modalDialogClasses}>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" type="button" data-dismiss="modal" aria-hidden="true">
                <i className="icon-remove fa fa-times" />
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-children">
              {this.props.show
                ? this.props.children
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
