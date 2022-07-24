<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {},
  mounted () {
    this.$http.get('v1/api/echo?msg=ok').then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style lang="less">
</style>
