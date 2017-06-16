import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import signupPage from '@/components/signup_page'
import signinPage from '@/components/signin_page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Hello',
    component: Hello
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
