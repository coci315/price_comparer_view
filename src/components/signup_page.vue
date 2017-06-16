<template>
  <div class="signup_page">
    <div class="signup_wrap">
      <signup></signup>
    </div>
  </div>
</template>

<script>
import signup from './signup'
export default {
  name: 'signup-page',
  components: {
    signup
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.signup_page {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to left, #77A1D3, #79CBCA, #E684AE);
}

.signup_wrap {
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
