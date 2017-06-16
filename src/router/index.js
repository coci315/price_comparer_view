import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import focus from '@/components/focus'
import signupPage from '@/components/signup_page'
import signinPage from '@/components/signin_page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/focus',
    name: 'focus',
    component: focus
  }, {
    path: '/signup',
    name: 'signup-page',
    component: signupPage
  }, {
    path: '/signin',
    name: 'signin-page',
    component: signinPage
  }]
})
