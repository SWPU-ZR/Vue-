const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //开发代理服务器配置
  devServer: {
    proxy: {
      //匹配路径以api开头的所有请求
      '/api': {
        target: "http://nocat.life:3008",//目标服务器地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''//将所有请求中的/api替换成空字符串
        }
      }
    }
  }
})
