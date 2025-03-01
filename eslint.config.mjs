// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
).prepend().overrideRules({
  '@typescript-eslint/no-explicit-any': 'off',
  'vue/require-default-prop': 'off',
})
