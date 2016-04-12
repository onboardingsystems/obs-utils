module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app\/app/,
        'forms/address-us.js': /^app\/forms\/address-us/
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
    // autoRequire: {
    //   'test.js': ['app/forms/app']
    // }
  }

};
