import component from './index.vue';
import application from './store/modules/editor/application';
import viewport from './store/modules/editor/viewport';
import element from 'element-ui'
import Plugins from './service';
import { InputNumber } from 'iview';
import Mixins from './service/mount';

let GaeaEditor = {
  install (Vue, options) {
    let store = options.store;
    if (!store) {
      console.error('gaea editor 需要 vuex');
      return;
    }
    // 注册store 模块
    if (!store.state.application) {
      store.registerModule('application', application);
    }
    if (!store.state.viewport) {
      store.registerModule('viewport', viewport);
    }
    Vue.use(element)
    Vue.component(InputNumber.name, InputNumber)
    // 注册组件
    Vue.component('gaea-editor', component);
    Plugins(Vue);
    Mixins(Vue);
  }
};
export default GaeaEditor;
