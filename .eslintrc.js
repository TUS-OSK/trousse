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
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
