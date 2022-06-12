import App from './App'

import tool from "@/common/js/tool.js"
import './static/iconfont-weapp-icon.css'
Vue.prototype.$tool=tool

// #ifndef VUE3
import Vue from 'vue'
import moment from 'moment';
import 'moment/locale/zh-cn';
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif