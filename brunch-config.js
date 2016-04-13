module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'obs_utils.js': /^app/
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
    wrapper: false,
    definition: false
  }

};
