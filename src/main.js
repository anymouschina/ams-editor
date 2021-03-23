import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ams from '@/ams';
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons';
import editor from './index.js'
import './styles/variable.css';
Vue.config.productionTip = false;
Vue.use(element)
Vue.use(ams)
Vue.use(editor, {
  store
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
