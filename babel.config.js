module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@assets": './src/assets',
          "@features": './src/features',
          "@navigation": './src/navigation',
          "@components": './src/components',
          "@state": './src/state',
          "@store": './src/store',
          "@service": './src/service',
          "@styles": './src/styles',
          "@utils": './src/utils',
          "@i18n": './src/i18n',
          "@theme": './src/theme',
          "@types": './src/types',
          "@constants": './src/constants',
          "@context": './src/context',
          "@hooks": './src/hooks',
        }
      }
    ],
  ]
};
