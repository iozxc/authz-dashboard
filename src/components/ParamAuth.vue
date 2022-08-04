<template>
  <div class="param-auth-page" :class="s?'compact-item':''">
    <h2><span class="compact" @click="compact">参数权限</span></h2>
    <param-auth-value :info="info" :path="path" :param-info="path.paramAuth"></param-auth-value>
  </div>
</template>

<script>
import ParamAuthValue from '@/components/ParamAuthValue'

export default {
  name: 'ParamAuth',
  components: { ParamAuthValue },
  props: {
    info:{

    },
    path: {
      type: Object,
      default: {
        paramInfo: {},
        paramAuth: {

        }
      }
    }
  },
  created () {
  },
  data () {
    return {
      s: false
    }
  },
  methods: {
    compact () {
      this.s = !this.s
    },
  }
}
</script>

<style lang="less" scoped>

.compact {
  margin-bottom: 15px;
  cursor: pointer;
  user-select: none;
}

.compact-item {
  height: 26px;
  overflow: hidden;
}

h2 {
  //margin-top: 15px;
  margin-bottom: 15px;
}

//.param-auth-page {
//  margin-bottom: 30px;
//}

</style>
