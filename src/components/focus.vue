<template>
  <div class="focus">
    <ul v-loading.fullscreen.lock="fullscreenLoading">
      <li class="clearfix title">
        <span class="productId_title">ProductId</span>
        <span class="action">操作</span>
      </li>
      <li v-for="item in focus" class="clearfix">
        <span class="productId label label-primary">{{item}}</span>
        <div class="button_wrap">
          <button class="btn btn-danger" @click="delFocus(item)">删除</button>
          <button class="btn btn-info" @click="crawl(item)">抓取</button>
        </div>
      </li>
    </ul>
    <div class="btn_add_wrap">
      <span class="btn_add" @click="addFocus">
        <i class="el-icon-plus"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'focus',
  data () {
    return {
      focus: [],
      fullscreenLoading: false
    }
  },
  created () {
    this.getFocus()
  },
  methods: {
    addFocus () {
      this.$prompt('请输入productId', '添加关注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\d+/,
        inputErrorMessage: 'productId格式不正确'
      }).then(({ value }) => {
        console.log(value)
        this.$http.post('/api/focus', {
          productId: value
        }).then(response => {
          console.log(response)
          this.getFocus()
        })
      }).catch(() => {
        return
      })
    },
    delFocus (item) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除')
        this.$http.delete('/api/focus', {
          data: { productId: item }
        }).then(response => {
          console.log(response)
          this.getFocus()
        })
      }).catch(() => {
        return
      })
    },
    getFocus () {
      this.$http.get('/api/focus').then(response => {
        const result = response.data
        if (result.success) {
          this.focus = result.focus
        }
      })
    },
    crawl (item) {
      this.fullscreenLoading = true
      this.$http.post('/api/products', {
        productId: item
      }).then(response => {
        this.fullscreenLoading = false
        const result = response.data
        if (result.success) {
          this.$message({
            type: 'success',
            message: '抓取成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '抓取失败'
          })
        }
      }).catch(() => {
        this.fullscreenLoading = false
        return
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss">
.focus {
  box-sizing: border-box;
  padding-top: 80px;
  width: 100%;
  height: 100%;
  background-color: #F9F9F9;
  .btn_add_wrap {
    text-align: center;
  }
  .btn_add {
    // position: absolute;
    // bottom: 40px;
    // left: 50%;
    // margin-left: -15px;
    display: inline-block;
    background-color: #37a;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 20px;
      line-height: 30px;
      color: #EDF4ED;
    }
  }
  ul {
    margin-bottom: 30px;
    li {
      width: 60%;
      margin: 10px auto;
    }
    li.title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #337ab7;
      cursor: default;
    }
    .productId,
    .productId_title {
      float: left;
      margin-right: 60px;
      font-size: 14px;
      line-height: 1.42857143;
      padding: 6px 12px;
    }
    .productId_title {
      font-size: 16px;
      padding-left: 4px;
    }
    .button_wrap {
      float: right;
    }
    .action {
      float: right;
      padding: 6px 12px;
      margin-right: 26px;
      margin-bottom: 0;
      line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
}
</style>
