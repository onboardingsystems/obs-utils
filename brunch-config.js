module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'obs-utils.js': /^app\/app.js/
      },
      entryPoints: {
        'app/app.js': 'test.js'
      }
    }
  },

  paths: {
    public: "dist"
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  modules: {
    // wrapper: false,
    // definition: false
    autoRequire: {
      'test.js': ['app/forms/app']
    }
  }

};
