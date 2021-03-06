module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'space-before-function-paren': ['error', 'never'],
    // 'keyword-spacing': ['error', {
    //   'before': true,
    //   'after': true
    // }],
    // 'space-before-blocks': 'error',
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 0
    }],
    'eol-last': 2,
    'generator-star-spacing': 'off',
    'space-infix-ops': 'error',
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ?
      ['error', { allow: ["warn", "error"] }] :
      'off'
  }
}
