/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    {
      'postcss-preset-env': {
        browsers: 'last 2 versions',
      },
    },
    // eslint-disable-next-line global-require
    require('css-mqpacker'),
  ],
};
