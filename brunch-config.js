module.exports = {
  files: {
    javascripts: {
      entryPoints: {
        'app/app.js': 'react-utils.js'
      }
    }
  },

  paths: {
    // Where to compile files to
    public: "dist"
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  }

  // modules: {
  //   wrapper: false
  // }

};
