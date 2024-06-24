const withMT = require("@material-tailwind/html/utils/withMT");

const config: typeof withMT = {
  // darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      colors: {
        'git-badges-main': 'rgb(113, 183, 255)',
        'git-badges-sec': 'rgba(64, 158, 255, 0.1)',
      },
    },
  },
};
export default config;
