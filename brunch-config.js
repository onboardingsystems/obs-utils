module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'obs_utils.js': /^app/,
        'vendor.js': /(?!app)/,
        'test_app.js': /^test_app/
      },
    },
    stylesheets: {
      joinTo: {
        "app.css": /^(sass\/app.scss)|(node_modules)/
      },
    }
  },

  server: {
    port: 3334
  },

  plugins: {
    babel: {
      presets: ['es2015', 'react']
    }
  },

  paths: {
    watched: ['app', 'vendor', 'test_app', 'sass']
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
};
