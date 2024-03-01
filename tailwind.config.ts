import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tw-elements-react/dist/js/**/*.js"

  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor: {
        'tertiary':'#BFA75D',
        'secondary':'#606060',
        'primary':'#C9C9C9',
        'quaternary': '#222222'

      },
      borderColor:{
        'tertiary':'#BFA75D',
        'secondary':'#606060',
        'primary':'#C9C9C9',
        'quaternary': '#222222'

      },
      backgroundColor:{
        'tertiary':'#BFA75D',
        'secondary':'#606060',
        'primary':'#C9C9C9',
        'quaternary': '#222222'
      }

      
      

    },
  },
  plugins: [],
}
export default config
