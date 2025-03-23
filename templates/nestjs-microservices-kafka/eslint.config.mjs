import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';

export default tseslint.config(
  eslint.configs.recommended,
  sonarjs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'error',
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-commented-code': 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['INFO']
        }
      ]
    },
  },
);
