import Vue from 'vue'
import VueRouter from 'vue-router'
import editor_layout from '../views/editor_layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'editor_layout',
    component: editor_layout
  },

]

const router = new VueRouter({
  routes
})

export default router
