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

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  paths: {
    watched: ['app', 'vendor', 'test_app']
  },

  npm: {
    globals: {
      "_": 'lodash'
    }
  },

  modules: {
    autoRequire: {
      'test_app.js': ['test_app/app.js']
    }
  }

  // conventions: {
  //   assets: /assets[\\/]/
  // }

};
