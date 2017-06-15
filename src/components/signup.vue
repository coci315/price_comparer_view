<template>
  <div class="signup container">
    <div class="row">
      <form class="form-horizontal">
        <div class="form-group" :class="{'has-error': nameError, 'has-success': nameSuccess}">
          <label for="inputUserName" class="col-sm-2 control-label">用户名</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputUserName" name="user[name]" v-model.trim="name" @input="validateName">
            <p>{{nameText}}</p>
          </div>
        </div>
        <div class="form-group" :class="{'has-error': mailError, 'has-success': mailSuccess}">
          <label for="inputUserMail" class="col-sm-2 control-label">邮箱</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputUserMail" name="user[mail]" v-model.trim="mail" @input="validateMail">
            <p>{{mailText}}</p>
          </div>
        </div>
        <div class="form-group" :class="{'has-error': pwdError, 'has-success': pwdSuccess}">
          <label for="inputPassword1" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword1" name="user[password]" v-model.trim="pwd" @input="validatePwd">
            <p>{{pwdText}}</p>
          </div>
        </div>
        <div class="form-group" :class="{'has-error': repeatePwdError, 'has-success': repeatePwdSuccess}">
          <label for="inputPassword2" class="col-sm-2 control-label">密码确认</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword2" v-model.trim="repeatePwd" @input="validateRepeatePwd">
            <p>{{repeatePwdText}}</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-8 col-sm-4">
            <button type="button" class="btn btn-danger" @click="reset">重置</button>
            <button type="button" class="btn btn-info" @click="signup">注册</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const pwdReg = /^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\[\\].<>){6,22}$/
const mailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
export default {
  name: 'signup',
  data () {
    return {
      name: '',
      nameError: false,
      nameSuccess: false,
      mail: '',
      mailError: false,
      mailSuccess: false,
      pwd: '',
      pwdError: false,
      pwdSuccess: false,
      repeatePwd: '',
      repeatePwdError: false,
      repeatePwdSuccess: false,
      nameText: '',
      mailText: '',
      pwdText: '',
      repeatePwdText: '',
      label: {
        'name': '用户名',
        'mail': '邮箱',
        'pwd': '密码',
        'repeatePwd': '密码确认'
      },
      initText: {
        'name': '必填，长度为4-16个字符',
        'mail': '必填，请输入邮箱地址',
        'pwd': '必填，长度为6-22个英文数字符号',
        'repeatePwd': '必填，再次输入相同密码'
      }
    }
  },
  created () {
    this.nameText = this.initText.name
    this.mailText = this.initText.mail
    this.pwdText = this.initText.pwd
    this.repeatePwdText = this.initText.repeatePwd
  },
  methods: {
    getLen (str) {
      let len = 0
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
          len += 2
        } else {
          len++
        }
      }
      return len
    },
    validateVoid (field, len) {
      if (len === 0) {
        this[field + 'Text'] = this.label[field] + '不能为空'
        return false
      } else {
        return true
      }
    },
    validateLen (field, len, min, max) {
      if (len >= min && len <= max) {
        return true
      } else {
        this[field + 'Text'] = this.label[field] + '长度必须为' + min + '-' + max + '位'
        return false
      }
    },
    validateReg (field, str, reg) {
      if (reg.test(str)) {
        this[field + 'Text'] = this.label[field] + '格式正确'
        return true
      } else {
        this[field + 'Text'] = this.label[field] + '格式错误'
        return false
      }
    },
    validateSameStr (field, str, anotherStr) {
      if (str === anotherStr) {
        this[field + 'Text'] = '两次输入一致'
        return true
      } else {
        this[field + 'Text'] = '两次输入不一致'
        return false
      }
    },
    validateName () {
      const field = 'name'
      const len = this.getLen(this[field])
      const result = this.validateVoid(field, len) && this.validateLen(field, len, 4, 16)
      if (result) {
        this[field + 'Text'] = '用户名格式正确'
        this[field + 'Error'] = false
        this[field + 'Success'] = true
        return true
      } else {
        this[field + 'Success'] = false
        this[field + 'Error'] = true
        return false
      }
    },
    validateMail () {
      const field = 'mail'
      const len = this.getLen(this[field])
      const result = this.validateVoid(field, len) && this.validateReg(field, this[field], mailReg)
      if (result) {
        this[field + 'Error'] = false
        this[field + 'Success'] = true
        return true
      } else {
        this[field + 'Success'] = false
        this[field + 'Error'] = true
        return false
      }
    },
    validatePwd () {
      const field = 'pwd'
      const len = this.getLen(this[field])
      const result = this.validateVoid(field, len) && this.validateLen(field, len, 6, 22) && this.validateReg(field, this[field], pwdReg)
      if (result) {
        this[field + 'Error'] = false
        this[field + 'Success'] = true
        return true
      } else {
        this[field + 'Success'] = false
        this[field + 'Error'] = true
        return false
      }
    },
    validateRepeatePwd () {
      const field = 'repeatePwd'
      const len = this.getLen(this[field])
      const result = this.validateVoid(field, len) && this.validateSameStr(field, this[field], this.pwd)
      if (result) {
        this[field + 'Error'] = false
        this[field + 'Success'] = true
        return true
      } else {
        this[field + 'Success'] = false
        this[field + 'Error'] = true
        return false
      }
    },
    reset () {
      const fields = Object.keys(this.label)
      fields.forEach(field => {
        this[field] = ''
        this[field + 'Text'] = this.initText[field]
        this[field + 'Success'] = false
        this[field + 'Error'] = false
      })
    },
    signup () {
      const result = this.validateName() && this.validateMail() && this.validatePwd() && this.validateRepeatePwd()
      if (!result) return
      this.$http.post('/api/signup', {
        user: {
          name: this.name,
          mail: this.mail,
          password: this.pwd
        }
      }).then(response => {
        console.log(response)
        const result = response.data
        this.reset()
        if (result.success) {
          alert('注册成功')
        } else {
          alert('注册失败')
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.signup {
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  p {
    padding-top: 10px;
    font-size: 14px;
    color: #aaa;
  }
  .has-error p {
    color: #a94442;
  }
  .has-success p {
    color: #67b168;
  }
}
</style>
