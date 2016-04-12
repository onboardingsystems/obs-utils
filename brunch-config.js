module.exports = {
  files: {
    javascripts: {
      entryPoints: {
        'app/obs_utils.js': 'obs_utils.js'
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
    // autoRequire: {
    //   'app.js': ['app']
    // }
  }

};
