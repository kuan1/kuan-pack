module.exports = function (api) {
  if (api) {
    api.cache.never()
  }

  return {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
        },
      ],
      '@vue/babel-plugin-jsx',
      '@babel/plugin-transform-object-assign',
    ],
  }
}
