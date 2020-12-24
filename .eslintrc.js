module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prefer-const': 'warn',
    'no-const-assign': 'warn',
    'spaced-comment': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'standard/no-callback-literal': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
