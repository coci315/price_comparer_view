<template>
  <div class="echarts" :style="{width: width + 'px', height: height + 'px'}">
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'echarts',
  props: {
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 400
    },
    title: {
      type: String,
      default: '价格走势'
    },
    type: {
      type: String,
      default: 'line'
    },
    xAxisData: {
      type: Array
    },
    seriesData: {
      type: Array
    },
    seriesName: {
      type: String,
      default: '价格'
    }
  },
  mounted () {
    const myChart = echarts.init(this.$el)
    const option = {
      title: {
        text: this.title
      },
      tooltip: {},
      legend: {
        data: [this.seriesName]
      },
      xAxis: {
        data: this.xAxisData
      },
      yAxis: {},
      series: [{
        name: this.seriesName,
        type: this.type,
        data: this.seriesData
      }]
    }
    myChart.setOption(option)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
