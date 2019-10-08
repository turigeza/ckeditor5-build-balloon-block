/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

'use strict';

module.exports = {
	extends: 'ckeditor5',
    globals: {
      'console': true,
      'prompt': true,

    },
    // add your custom rules here
    'rules': {
        
      // // allow async-await
      // 'generator-star-spacing': 'off',
      //
      // // allow paren-less arrow functions
      // 'arrow-parens': 0,
      // 'one-var': 0,
      //
      // 'import/first': 0,
      // 'import/named': 2,
      // 'import/namespace': 2,
      // 'import/default': 2,
      // 'import/export': 2,
      // 'import/extensions': 0,
      // 'import/no-unresolved': 0,
      // 'import/no-extraneous-dependencies': 0,

      // allow debugger during development
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      //
      // // added by me
      // 'vue/no-side-effects-in-computed-properties': 1, // let quasar dev start
      // 'semi': ["error", "always"], // i prefer semi colons
      // 'indent': ['error', 4, {}], // so i prefer 4 spaces to 2,
      // 'no-unused-vars': 1,
      // 'vue/no-unused-vars': 0,
      // 'camelcase': ["off", { properties: "never" }],
      // // 'import/no-duplicates': 0
      // 'vue/no-unused-components': 0
    }
};
