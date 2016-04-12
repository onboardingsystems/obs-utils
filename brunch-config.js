module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'react-utils.js': /^app/
      }
    }
  },

  paths: {
    // Where to compile files to
    public: "dist"
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  modules: {
    // wrapper: false,
    // definition: false
  }

};
