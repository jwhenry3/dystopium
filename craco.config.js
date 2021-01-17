module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.module.rules.unshift({
        test: /\.worker\.(js|ts)$/i,
        use: {
          loader: 'comlink-loader',
          options: {
            singleton: true
          }
        }
      });
      return webpackConfig;
    }
  }
};
