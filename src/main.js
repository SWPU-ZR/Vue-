import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//让element组件库运行生效
import './plugins/element.js'
//让axios配置文件运行生效
import "./utils/request"
//引入api对象
import api from "@/api/index"
//全局挂载api对象
Vue.prototype.$api=api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
