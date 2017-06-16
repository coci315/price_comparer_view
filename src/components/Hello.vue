<template>
  <div class="hello">
    hello
  </div>
</template>

<script>
export default {
  name: 'hello',
  beforeRouteEnter (to, from, next) {
    if (to.path !== from.path) {
      next(vm => {
        vm.$router.go(0)
      })
    } else {
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
