const path = require('path');
const { loaderByName } = require("@craco/craco");
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
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1677ff" },
            javascriptEnabled: true,
          },
        },
        modifyLessModuleRule: (lessModuleRule, context) => {
          lessModuleRule.test = /\.module\.less$/;
          // lessModuleRule.exclude = /node_modules|antd\.css/;
          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]"
          }
          return lessModuleRule;
        },
        cssLoaderOptions: {
          modules: { localIdentName: "[local]_[hash:base64:5]" },
        },
      }
    }
  ],
  //配置代理解决跨域
  devServer: {
    proxy: {
      "/api": {
        target: 'http://10.91.101.35:30010/',
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  }
}
