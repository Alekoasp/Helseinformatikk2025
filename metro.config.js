const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts = [
  ...config.resolver.assetExts,
  'json',
  'jpg',
  'jpeg',
  'png'
];

module.exports = config;