module.exports = {
  files: {
    javascripts: {
      // joinTo: {
      //   'obs_utils.js': /^app/,
      //   'vendor.js': /(?!app)/
      // },
      entryPoints: {
        'app/obs_utils.js': 'obs-utils.js'
      }
    }
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  },

  modules: {
    // wrapper: false,
    // definition: false
    autoRequire: {
      'obs-utils.js': ['obs_utils']
    }
  }

};
