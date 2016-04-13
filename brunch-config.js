module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'obs_utils.js': /^app/,
        'vendor.js': /(?!app)/
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
      'obs_utils.js': ['obs_utils']
    }
  }

};
