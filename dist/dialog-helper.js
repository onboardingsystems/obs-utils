'use strict';

var DialogHelper = {
  alertError: function alertError(message, options) {
    if (options == null) {
      options = {};
    }
    var title = options.title || 'Error';
    return bootbox.alert({
      className: 'obs-modal modal-danger',
      title: title,
      message: message
    });
  },

  // Convenience wrapper to the custom Bootbox.dialog for a standard "confirm delete" dialog.
  confirmDelete: function confirmDelete(message, callback) {
    return bootbox.dialog({
      message: message,
      title: "Are you sure?",
      buttons: {
        cancel: {
          label: "No",
          className: "btn-primary"
        },
        confirm: {
          label: "Yes, delete it",
          className: "btn-danger",
          callback: callback
        }
      },
      onEscape: function onEscape() {
        return true;
      }
    });
  },

  //  Helper for confirming a dangerous action.
  //  Defaults values to work like "confirmDelete". Allows
  //  for customizing dialog title and confirmLabel text.
  //
  //  Options:
  //    * title - Dialog title text
  //    * confirmLabel - text on "Yes" confirmation button.
  confirmDanger: function confirmDanger(message, options, callback) {
    if (options == null) {
      options = {};
    }
    var title = options.title || 'Are you sure?';
    var confirmLabel = options.confirmLabel || "Yes, delete it";
    return bootbox.dialog({
      message: message,
      title: title,
      buttons: {
        cancel: {
          label: "No",
          className: "btn-primary"
        },
        confirm: {
          label: confirmLabel,
          className: "btn-danger",
          callback: callback
        }
      },
      onEscape: function onEscape() {
        return true;
      }
    });
  }
};

module.exports = DialogHelper;