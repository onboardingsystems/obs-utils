module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app\/app/,
        'forms/address-us.js': /^app\/forms\/address-us/,
        'forms/checkbox.js': /^app\/forms\/checkbox/,
        'forms/compound-layout.js': /^app\/forms\/compound-layout/,
        'forms/error.js': /^app\/forms\/error/,
        'forms/form-builder.js': /^app\/forms\/form-builder/,
        'forms/form.js': /^app\/forms\/form/,
        'forms/formatted-text.js': /^app\/forms\/formatted-text/,
        'forms/hint.js': /^app\/forms\/hint/,
        'forms/label.js': /^app\/forms\/label/,
        'forms/required-marker.js': /^app\/forms\/required-marker/,
        'forms/text.js': /^app\/forms\/text/,
        'forms/textarea.js': /^app\/forms\/textarea/,

        'formatters/formatters.js': /^app\/formatters/,

        'vendor.js': /(?!app)/
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
