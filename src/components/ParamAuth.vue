<template>
  <div>
    <h3>Path Variable</h3>
    <div>
      <param-auth-value :param-info="path.paramInfo.pathVariable" v-model:value="path.paramAuth.pathVariable"></param-auth-value>
    </div>
    <h3>Request Param</h3>
    <div>
      <param-auth-value :param-info="path.paramInfo.requestParam" v-model:value="path.paramAuth.requestParam"></param-auth-value>
    </div>
  </div>
</template>

<script>
import ParamAuthValue from '@/components/ParamAuthValue'

export default {
  name: 'ParamAuth',
  components: { ParamAuthValue },
  props: {
    path: {
      type: Object,
      default: {
        paramInfo: {},
        paramAuth: {
          pathVariable: {},
          requestParam: {}
        }
      }
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
