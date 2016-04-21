module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'obs_utils.js': /^app/,
        'vendor.js': /(?!app)/
      },
    }
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  npm: {
    globals: {
      '$': 'jquery'
    }
  }

};
