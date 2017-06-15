import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import signup from '@/components/signup'
import signin from '@/components/signin'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
  }, {
    path: '/signup',
    name: 'signup',
    component: signup
  }, {
    path: '/signin',
    name: 'signin',
    component: signin
  }]
})
