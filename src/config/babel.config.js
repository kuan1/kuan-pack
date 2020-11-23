module.exports = function (api) {
  if (api) {
    api.cache.never()
  }

  const { BABEL_MODULE } = process.env
  const useESModules = BABEL_MODULE !== 'commonjs'

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: useESModules ? false : 'commonjs',
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          useESModules,
        },
      ],
      '@vue/babel-plugin-jsx',
      '@babel/plugin-transform-object-assign',
    ],
  }
}
