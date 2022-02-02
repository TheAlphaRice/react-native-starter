const babelModuleConfig = require('./babel-module.config');

const lineMaxLength = 120;

const baseConfig = {
  root: true,
  extends: ['airbnb'],
  parser: '@babel/eslint-parser',
  plugins: ['jest', 'babel', 'jsx-max-len', 'lodash', 'react-native'],
  env: {
    'jest/globals': true,
  },
  globals: {
    __DEV__: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: babelModuleConfig.extensions,
      },
      'babel-module': babelModuleConfig,
    },
  },
  rules: {
    /**
     * @description New or updated rules since upgrading to latest eslint dependencies
     *
     */
    'react/default-props-match-prop-types': 'warn',
    'react/jsx-no-bind': 'warn',
    'class-methods-use-this': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'no-irregular-whitespace': 'warn',
    // Force object properties to be on their own lines to improve code readability
    'no-plusplus': 'off',
    'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: false }],
    'react/jsx-props-no-multi-spaces': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-indent-props': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-indent': 'warn',
    'react/jsx-curly-spacing': [
      'warn',
      {
        when: 'always',
        children: true,
      },
    ],
    'react/jsx-curly-newline': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    // Prop types will be unnecessary when we add typescript
    'react/prop-types': [
      'warn',
      {
        skipUndeclared: true,
      },
    ],
    // raw text rule encourages better practices with how we format text inside of text elements
    'react-native/no-raw-text': [
      'warn',
      {
        skip: ['H1', 'H2', 'H3', 'H4', 'Title', 'Subtitle'],
      },
    ],
    // Not needed unless we have a constructor and are not initializing state within the constructor
    'react/state-in-constructor': 'warn',
    'import/extensions': [
      'off',
      {
        json: true,
      },
    ],
    'max-classes-per-file': 'off',
    'import/no-cycle': 'warn',
    'func-names': ['warn', 'as-needed'],
    /* END OF NEW RULES */
    'react/jsx-props-no-spreading': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'max-len': [
      'warn',
      {
        code: lineMaxLength,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info', 'tron'],
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          consistent: true,
          multiline: true,
        },
        ObjectPattern: {
          consistent: true,
          multiline: true,
        },
        ImportDeclaration: {
          consistent: true,
          multiline: true,
        },
        ExportDeclaration: {
          consistent: true,
          multiline: true,
        },
      },
    ],
    'no-underscore-dangle': 'off',
    'no-else-return': 'off',
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: false,
      },
    ],
    'babel/semi': ['error', 'always'],
    'no-use-before-define': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    curly: ['error', 'all'],
    yoda: [
      'error',
      'never',
      {
        exceptRange: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'lodash/import-scope': ['error', 'full'],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'global-require': 'off',
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^React$',
      },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['jsx', '.js'],
      },
    ],
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any', 'array'],
      },
    ],
    'react/sort-comp': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-max-len/jsx-max-len': [
      'error',
      {
        lineMaxLength,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'e2e/**',
          './typings/**',
          '**/*.test.{js,ts,tsx}',
          '**/__mocks__/*',
          '**/*Reactotron*',
          'scripts/**',
          'jest.setup.js',
        ],
      },
    ],
  },
};

/**
 * Typescript file overrides
 * Uses a custom tsconfig.eslint.json to prevent tsc from pulling in unnecessary files during linting process
 */
const typescriptOverrides = {
  files: ['**/*.{ts,tsx}'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    project: ['./tsconfig.eslint.json'],
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    // Use debugLevel to debug the typescript parser
    // debugLevel: true,
  },
  rules: {
    ...baseConfig.rules,
    // eslint-no-unused-vars already does this
    '@typescript-eslint/no-unused-vars': 'off',
    'react/jsx-filename-extension': 'off',
  },
};

/**
 * overrides for E2E folder and related files
 */
const e2eOverrides = {
  files: ['e2e/**/*.{js,ts}', 'src/**/*pageobject.{js,ts}'],
  globals: {
    driver: true,
    $: true,
    $$: true,
    jasmine: true,
  },
  rules: {
    ...baseConfig.rules,
    'no-console': 'off',
    'no-named-export': 'off',
  },
};

const themeOverrides = {
  files: ['src/themes/**/*.{js,ts}'],
  rules: {
    ...baseConfig.rules,
    'import/no-extraneous-dependencies': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'prefer-destructuring': 'warn',
  },
};

module.exports = {
  ...baseConfig,
  overrides: [
    typescriptOverrides,
    e2eOverrides,
    themeOverrides,
    {
      files: ['**/*.style.js'],
      rules: {
        'sort-keys': [
          'error',
          'asc',
          {
            caseSensitive: true,
            natural: true,
          },
        ],
      },
    },
    {
      files: ['**/*.test.js'],
      rules: {
        'arrow-body-style': 'off',
      },
    },
  ],
};
