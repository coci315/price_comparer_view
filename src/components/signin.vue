<template>
  <div class="signin container">
    <div class="row">
      <form class="form-horizontal">
        <div class="form-group" :class="{'has-error': nameError}">
          <label for="inputUserName" class="col-sm-2 control-label">用户名</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputUserName" name="user[name]" v-model.trim="name" @input="validateVoid('name')">
            <p>{{nameText}}</p>
          </div>
        </div>
        <div class="form-group" :class="{'has-error': pwdError}">
          <label for="inputPassword1" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword1" name="user[password]" v-model.trim="pwd" @input="validateVoid('pwd')">
            <p>{{pwdText}}</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-8 col-sm-4">
            <button type="button" class="btn btn-danger" @click="reset">重置</button>
            <button type="button" class="btn btn-info btn-signin" @click="signin">登录</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      name: '',
      pwd: '',
      nameText: '',
      pwdText: '',
      label: {
        'name': '用户名',
        'pwd': '密码'
      },
      nameError: false,
      pwdError: false
    }
  },
  methods: {
    validateVoid (field) {
      if (this[field] === '') {
        this[field + 'Text'] = this.label[field] + '不能为空'
        this[field + 'Error'] = true
        return false
      } else {
        this[field + 'Text'] = ''
        this[field + 'Error'] = false
        return true
      }
    },
    reset () {
      this.name = ''
      this.pwd = ''
      this.nameText = ''
      this.pwdText = ''
      this.nameError = false
      this.pwdError = false
    },
    signin () {
      const result = this.validateVoid('name') && this.validateVoid('pwd')
      if (!result) return
      this.$http.post('/api/signin', {
        user: {
          name: this.name,
          password: this.pwd
        }
      }).then(response => {
        console.log(response)
        const result = response.data
        if (result.success) {
          alert('登录成功')
        } else {
          this.nameText = result.msg
          this.nameError = true
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.signin {
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  p {
    padding-top: 10px;
    height: 20px;
    font-size: 14px;
    color: #aaa;
  }
  .has-error p {
    color: #a94442;
  }
  .btn-signin {
    margin-left: 10px;
  }
}
</style>
