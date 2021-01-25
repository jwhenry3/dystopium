const WorkerPlugin = require("worker-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins.unshift(new WorkerPlugin());
    
      return webpackConfig;
    }
  }
};
