module.exports = function (api) {
  if (api) {
    api.cache.never()
  }

  return {
    presets: [
      [
        '@babel/preset-env'
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
