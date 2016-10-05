module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'obs_utils.js': /^app/,
        'vendor.js': /(?!app)/,
        'test_app.js': /^test_app/
      },
    }
  },

  server: {
    port: 3334
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  paths: {
    watched: ['app', 'vendor', 'test_app']
  },

  modules: {
    autoRequire: {
      'test_app.js': ['test_app/app.js']
    }
  },

  npm: {
    globals: {
      $: "jquery",
      _: "lodash"
    }
  }

  // conventions: {
  //   assets: /assets[\\/]/
  // }

};
