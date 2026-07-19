const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {
      flexbox: 'no-2009',
      overrideBrowserslist: [
        '> 0.2%',
        'last 4 versions',
        'Firefox ESR',
        'not dead',
        'iOS >= 11',      // iPhone 5s, 6s Plus, 7 Plus sab targets cover ho jayenge
        'Safari >= 11'
      ],
    },
  },
};

export default config;