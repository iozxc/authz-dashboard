<template>
  <div class="card">
    {{ path }}
    {{ rateLimit }}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    path: {
      type: Object
    },
    rateLimit: {
      type: Object
    },
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.card {
}
</style>
