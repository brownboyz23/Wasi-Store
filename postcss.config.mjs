import autoprefixer from "autoprefixer";

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      flexbox: 'no-2009',
      overrideBrowserslist: [
        '>0.5%',
        'last 4 versions',
        'Firefox ESR',
        'not dead',
        'iOS >= 10',
        'Safari >= 10'
      ]
    }
  },
};

export default config;
