<template>
  <div class="card">
    {{path}}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    path: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.card{
}
</style>
