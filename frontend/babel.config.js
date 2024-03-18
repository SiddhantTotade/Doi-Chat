module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets: './src/screens/',
          common: './src/common/',
          core: './src/core/',
          screens: './src/screens/',
        },
      },
    ],
  ],
};
