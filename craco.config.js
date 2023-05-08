const path = require('path');
const CracoLessPlugin = require("craco-less");

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    configure:(webpackConfig,{env,paths}) => {
      // 修改build的生成文件名称
      paths.appBuild = 'react_web';
      webpackConfig.output ={
        ...webpackConfig.output,
        path: path.resolve(__dirname,'react_web'),
        publicPath: '/'
      }
      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: { localIdentName: "[local]_[hash:base64:5]" },
        }
      }
    }
  ],
}
