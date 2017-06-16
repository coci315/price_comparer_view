<template>
  <div class="signin_page">
    <div class="signin_wrap">
      <signin></signin>
    </div>
  </div>
</template>

<script>
import signin from './signin'
export default {
  name: 'signin-page',
  components: {
    signin
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.signin_page {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #77A1D3, #79CBCA, #E684AE);
}

.signin_wrap {
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
