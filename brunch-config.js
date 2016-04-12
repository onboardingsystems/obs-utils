module.exports = {
  files: {
    javascripts: {
      entryPoints: {
        'app/app.js': 'app.js'
      },
      order: {
        before: [
          "react",
          "react-dom"
        ]
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
  }

};
