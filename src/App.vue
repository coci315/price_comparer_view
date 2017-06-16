<template>
  <div id="app">
    <nav class="menu" :class="{'index_menu': isIndex}">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-offset-2 col-sm-4">
            <a class="navbar-brand nav_btn" href="/">首页</a>
            <a class="navbar-brand nav_btn" href="/focus">关注</a>
          </div>
          <div class="col-sm-offset-3 col-sm-3">
            <span class="navbar-brand nav_btn" @click="showSignup = true" v-show="!showUserName">注册</span>
            <span class="navbar-brand nav_btn" @click="showSignin = true" v-show="!showUserName">登录</span>
            <span class="navbar-brand user" v-show="showUserName">{{userName}}</span>
            <span class="navbar-brand nav_btn" @click="logout" v-show="showUserName">退出</span>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <el-dialog title="注册" :visible.sync="showSignup">
      <signup @successSignup="showSignup = false"></signup>
    </el-dialog>
    <el-dialog title="登录" :visible.sync="showSignin">
      <signin @successSignin="showSignin = false"></signin>
    </el-dialog>
  </div>
</template>

<script>
import signup from './components/signup'
import signin from './components/signin'
import router from './router'
export default {
  name: 'app',
  components: {
    signup,
    signin
  },
  data () {
    return {
      showSignup: false,
      showSignin: false,
      userName: '',
      showUserName: false,
      isIndex: false,
      titles: {
        '/': '首页',
        '/focus': '关注列表',
        '/signin': '登录',
        '/signup': '注册'
      }
    }
  },
  created () {
    this.getUserName()
  },
  updated () {
    this.setMenuClass()
    this.setTitle()
  },
  methods: {
    logout () {
      this.$http.post('/api/logout').then(response => {
        const result = response.data
        if (result.success) {
          this.init()
        }
      })
    },
    init () {
      this.userName = ''
      this.showUserName = false
      this.getUserName()
    },
    getUserName () {
      this.$http.get('/api/username').then(response => {
        const result = response.data
        if (result.success) {
          this.userName = result.userName
          this.showUserName = true
        } else {
          if (this.$route.path !== '/signup' && this.$route.path !== '/signin') {
            router.push('/signin')
          }
        }
      })
    },
    setMenuClass () {
      if (this.$route.path === '/') {
        this.isIndex = true
      } else {
        this.isIndex = false
      }
    },
    setTitle () {
      document.title = this.titles[this.$route.path]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
#app {
  width: 100%;
  height: 100%;
  .menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    &.index_menu {
      background-color: #EDF4ED;
    }
  }
  .nav_btn {
    color: #324157;
    cursor: pointer;
  }
  .user {
    cursor: default;
  }
}
</style>
