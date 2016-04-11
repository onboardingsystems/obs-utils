module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'form-builder.js': /^app\/forms\/form-builder/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  }
};
