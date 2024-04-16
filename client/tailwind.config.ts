import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/flowbite/**/*.js',
    'node_modules/flowbite-react/lib/esm/**/*.tsx',
    './node_modules/flowbite/**/*.tsx'
  ],
  theme: {
    fontFamily: {
      sans: [
        '"Inter var", sans-serif',
        {
          fontFeatureSettings: '"cv11", "ss01"',
          fontVariationSettings: '"opsz" 32'
        },
      ]
    }
    ,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'green-bg': '#171d24',
      'green-hd': '#00131a',
      'green-t' : '#00b6f0',
      'green-t2': '#163949',
      'line;': '#3b424b'
    }
  },
  plugins: [
    require('flowbite/plugin')
]
}
export default config
