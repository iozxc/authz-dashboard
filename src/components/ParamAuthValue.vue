<template>
  <div>
    <div v-for="(v1,v2,v3) in paramInfo" style="width: 100%">
      <div>
        {{ v2 }} - {{ v1 }}
      </div>
      <div v-if="value[v2] && value[v2].rolesMetaList" v-for="r in value[v2].rolesMetaList" class="param-meta-list">
  <!--            <div>-->
                <!--              <h4>Require</h4>-->
                <!--              <div>{{ r.require }}</div>-->
                <!--                <h4>Exclude</h4>-->
                <!--              <div>{{ r.exclude }}</div>-->
                <!--            </div>-->
          <a-row>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <h4>Resource</h4>
              <div>{{ r.resource }}</div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <h4>Range</h4>
               <div>{{ r.range }}</div>
            </a-col>
          </a-row>
        </div>

      <!--      <div v-if="value[v2] && value[v2].permissionsMetaList">-->
<!--          <div v-for="p in value[v2].permissionsMetaList">-->
<!--            {{ p }}-->
<!--          </div>-->
<!--        </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParamAuthValue',
  props: {
    paramInfo: {
      type: Object,
      default: {}
    },
    value: {
      type: Object,
      default: {
        '': {
          rolesMetaList: {},
          permissionsMetaList: {}
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
.param-meta-list {
  //width: 100%;
  //display: flex;
}
</style>
