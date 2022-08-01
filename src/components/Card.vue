<template>
  <div class="card">
    <h5>requireRoles</h5>
    <and-or-select v-if="path && path.auth" :items="path.auth.requireRoles"></and-or-select>

    <h5>requirePerms</h5>
    <and-or-select v-if="path && path.auth" :items="path.auth.requirePermissions"></and-or-select>

    <h5>excludeRoles</h5>
    <and-or-select v-if="path && path.auth" :items="path.auth.excludeRoles"></and-or-select>

    <h5>excludePerms</h5>
    <and-or-select v-if="path && path.auth" :items="path.auth.excludePermissions"></and-or-select>
  </div>
</template>

<script>
import AndOrSelect from '@/components/AndOrSelect'

export default {
  name: 'Card',
  components: { AndOrSelect },
  props: {
    path: {
      type: Object,
      default: {
        auth: {
          requireRoles: [],
          requirePermissions: [],
          excludeRoles: [],
          excludePermissions: []
        }
      }
    },
    rateLimit: {
      type: Object
    },
  },
  mounted () {
    console.log(this.path.auth)
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
