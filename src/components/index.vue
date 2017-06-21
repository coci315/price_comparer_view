<template>
  <div class="index">
    <div class="products_wrap">
      <ul v-if="products.length > 0">
        <li v-for="(product,index) in products">
          <div class="text">
            <a :href="product.link">
              <img :src="product.picLink" alt="商品">
            </a>
            <span class="name" :title="product.name">
              <a :href="product.link">{{product.name}}</a>
            </span>
            <span class="price">
              <span class="price_price">{{product.lowestPrice.price | formatPrice}}</span>
              <span>{{product.lowestPrice.date}}</span>
            </span>
            <button class="btn btn-danger" @click="delFocus(product.productId)">取消关注</button>
          </div>
          <div class="echarts_wrap">
            <echarts :xAxisData="product.price.map(item => {return item.date})" :seriesData="product.price.map(item => {return item.price})"></echarts>
          </div>
        </li>
      </ul>
      <div class="info" v-show="showInfo">
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
import echarts from './echarts'
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
      products: [],
      showInfo: false
    }
  },
  components: {
    echarts
  },
  created () {
    this.getProducts()
  },
  methods: {
    goFocus () {
      this.$router.push('/focus')
    },
    getProducts () {
      this.$http.get('/api/products').then(response => {
        const result = response.data
        if (result.success) {
          this.products = result.products
          if (this.products.length === 0) {
            this.showInfo = true
          } else {
            this.showInfo = false
          }
        }
      })
    },
    delFocus (productId) {
      this.$confirm('确定要取消关注吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('取消')
        this.$http.delete('/api/focus', {
          data: { productId: productId }
        }).then(response => {
          console.log(response)
          this.getProducts()
        })
      }).catch(() => {
        return
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
.index {
  box-sizing: border-box;
  padding-top: 100px;
  min-width: 800px;
  min-height: 100%;
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
  ul {
    cursor: default;
    min-width: 800px;
    background-color: #F9F9F9;
    li+li {
      margin-top: 20px;
    }
    li {
      min-width: 800px;
      .text {
        min-width: 800px;
        margin-bottom: 10px;
        text-align: center;
        &>* {
          vertical-align: middle;
        }
      }
      .echarts {
        margin: 0 auto;
      }
      .name {
        margin-left: 20px;
        display: inline-block;
        width: 300px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        margin-left: 20px;
        margin-right: 20px;
        color: #e4393c;
        .price_price {
          margin-right: 10px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
