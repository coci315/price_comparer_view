<template>
  <div class="index">
    <div class="products_wrap">
      <ul v-if="products.length > 0">
        <li v-for="product in products">
          <img :src="product.picLink" alt="商品">
          <span>{{product.name}}</span>
        </li>
      </ul>
      <div class="info" v-show="products.length === 0">
        <p>关注列表空空如也</p>
        <p>点击
          <span class="btn_add" @click="goFocus">
            <i class="el-icon-plus"></i>
          </span>
          前往关注页面
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  beforeRouteEnter (to, from, next) {
    if (to.path !== from.path) {
      next(vm => {
        vm.$router.go(0)
      })
    } else {
      next()
    }
  },
  data () {
    return {
      products: []
    }
  },
  created () {
    this.$http.get('/api/products').then(response => {
      const result = response.data
      if (result.success) {
        this.products = result.products
      }
    })
  },
  methods: {
    goFocus () {
      this.$router.push('/focus')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
.index {
  box-sizing: border-box;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background-color: #F9F9F9;
  .info {
    text-align: center;
    font-size: 18px;
    color: #37a;
    cursor: default;
    .btn_add {
      display: inline-block;
      background-color: #37a;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      i {
        color: #EDF4ED;
      }
    }
  }
}
</style>
