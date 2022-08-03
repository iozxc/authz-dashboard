<template>
  <div>
      {{ paramAuth }}
  </div>
</template>

<script>
export default {
  name: 'ParamAuth',
  props: {
    paramAuth: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
