(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.reset = function() {
    modules = {};
    cache = {};
    aliases = {};
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("app.js", function(exports, require, module) {
'use strict';

// Forms
var FormBuilder = require('./forms/form-builder');
// import FormBuilder     from './forms/form-builder'
// import AddressUS       from './forms/address-us'
// import CompoundLayout  from './forms/compound-layout'
// import Error           from './forms/error'
// import Form            from './forms/form'
// import FormattedText   from './forms/formatted-text'
// import Hint            from './forms/hint'
// import Label           from './forms/label'
// import RequiredMarker  from './forms/required-marker'
// import Text            from './forms/text'
// import Textarea        from './forms/textarea'
// export { FormBuilder, AddressUS, CompoundLayout, Error, Form, FormattedText, Hint, Label, RequiredMarker, Text, Textarea }
//
// // Formatters
// import Formatters from './formatters/formatters'
// export { Formatters }

// const stuff = {
//   FormBuilder: require('./forms/form-builder'),
//   Form: require('./forms/form')
// }

module.exports = {
  success: true,
  Forms: {
    // AddressUS:       require('./forms/address-us'),
    // CompoundLayout:  require('./forms/compound-layout'),
    Error: require('./forms/error') //,
    // Form:            require('./forms/form'),
    // FormattedText:   require('./forms/formatted-text'),
    // Hint:            require('./forms/hint'),
    // Label:           require('./forms/label'),
    // RequiredMarker:  require('./forms/required-marker'),
    // Text:            require('./forms/text'),
    // Textarea:        require('./forms/textarea')
  } //,
  // Formatters: require("./formatters/formatters")
};
});

;
//# sourceMappingURL=obs-utils.js.map