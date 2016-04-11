module.exports = {
  files: {
    javascripts: {
      entryPoints: {
        'app/app.js': 'react-utils.js'
      }
    }
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  }
};
