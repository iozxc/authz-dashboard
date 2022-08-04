<template>
  <div>
      <a-tabs :default-active-key="0">
        <a-tab-pane :key="v3" v-for="(v1,v2,v3) in paramInfo">
          <span slot="tab">
            <a-icon type="build" theme="twoTone" v-if="v1.paramType==='pathVariable'"/>
            <a-icon type="api" theme="twoTone" v-else/>
            {{ v2 }} ({{ v1.valueType }})
          </span>
          <div v-if="v1.valueMatchType==='other'" class="non">暂时无法配置</div>
          <a-row v-else v-for="(meta,index) in v1.paramMetaList"
                 :key="'param-meta-one-auth-'+index"
                 class="param-meta-one-auth">
             <div class="delete delete-param-meta" @click="deleteParamMeta(v1,index)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-delete"></use>
                </svg>
              </div>
             <a-col :xs="24" :sm="24" :md="13" :lg="10" :xl="10" style="text-align: center;">
                <div class="param-inner-rr div-text-scroll">
                  <h3>Resource</h3>
                  <div v-for="(r,i) in meta.resources" :key="'resources-'+index+'-'+r+'-'+i" class="range-input">
                   <range-input :items="meta.resources" :item-index="i"></range-input>
                  </div>
                  <a-button type="dashed" class="add-rr-button" @click="addResources(meta)">
                    新增
                  </a-button>
                  <h3>Range</h3>
                  <div v-for="(r,i) in meta.range" :key="'range-'+index+'-'+r+'-'+i" class="range-input">
                   <range-input :items="meta.range" :item-index="i"></range-input>
                  </div>
                   <a-button type="dashed" class="add-rr-button" @click="addRange(meta)">
                    新增
                  </a-button>
                </div>
               </a-col>
             <a-col :xs="24" :sm="24" :md="11" :lg="14" :xl="14">
                <h3 style="text-align: center">Auth</h3>
                <div class="param-inner-role-permissions div-text-scroll">
                    <h4>Roles</h4>
                    <div style="margin-left: 10px">
                      <h5>Require</h5>
                      <and-or-select class="div-text-scroll" :items="meta.requireRoles"></and-or-select>
                      <h5>Exclude</h5>
                      <and-or-select class="div-text-scroll" :items="meta.excludeRoles"></and-or-select>
                    </div>

                    <h4>Permissions</h4>
                    <div style="margin-left: 10px">
                      <h5>Require</h5>
                      <and-or-select class="div-text-scroll" :items="meta.requirePermissions"></and-or-select>
                      <h5>Exclude</h5>
                      <and-or-select class="div-text-scroll" :items="meta.excludePermissions"></and-or-select>
                    </div>

                </div>
              </a-col>
          </a-row>
          <div class="param-meta-one-auth param-meta-one-auth-add" @click="addMeta(v1)">新增</div>
        </a-tab-pane>
      </a-tabs>
  </div>
</template>

<script>
import AndOrSelect from '@/components/AndOrSelect'
import RangeInput from '@/components/RangeInput'

export default {
  name: 'ParamAuthValue',
  components: {
    RangeInput,
    AndOrSelect
  },
  props: {
    paramInfo: {
      type: Object,
      default: {
        '': {
          paramType: '',
          valueMatchType: '',
          paramMetaList: [{
            resources: [],
            range: []
          }],
          clz: ''
        }
      }
    }
  },
  data () {
    return {}
  },
  created () {
    for (let i in this.paramInfo) {
      let param = this.paramInfo[i]
      if (param.valueMatchType === 'other') continue

      if (!param.paramMetaList) {
        this.$set(param, 'paramMetaList', [])
        continue
      }

      for (let index in param.paramMetaList) {
        let meta = param.paramMetaList[index]
        if (!meta.requireRoles) this.$set(meta, 'requireRoles', [])
        if (!meta.excludeRoles) this.$set(meta, 'excludeRoles', [])
        if (!meta.requirePermissions) this.$set(meta, 'requirePermissions', [])
        if (!meta.excludePermissions) this.$set(meta, 'excludePermissions', [])
      }
    }
  },
  methods: {
    deleteParamMeta (v, index) {
      console.log(v)
      console.log(index)
      this.$delete(v.paramMetaList, index)
    },
    change (v1) {
      console.log(v1)
    },
    addMeta (v) {
      if (!v.paramMetaList) {
        this.$set(v, 'paramMetaList', [])
      }
      v.paramMetaList.push({
        requireRoles: [],
        excludeRoles: [],
        excludePermissions: [],
        requirePermissions: []
      })
    },
    addRange (v) {
      console.log(v)
      if (!v.range) {
        this.$set(v, 'range', [])
      }
      v.range.push('0')
    },
    addResources (v) {
      if (!v.resources) {
        this.$set(v, 'resources', [])
      }
      v.resources.push('0')
    }
  }
}
</script>

<style lang="less" scoped>

.param-meta-list {
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}

.param-info-head {
}

.param-info-head-item {
  padding: 10px 10px 0 10px;
}

.param-info-item {
  border-radius: 10px;
  margin-top: 10px;
  padding: 15px;
  background-color: #d1d1d15c;

  .param-info-head-item-n {
    background-color: #ffffff78;
    border-radius: 10px;
    padding: 10px;
  }
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.input-more {
  background-color: #d4d4d4;
  width: 100px;
  margin: auto;
  padding: 2px;
  border-radius: 3px;
  cursor: pointer;
}

.param-meta-one-auth {
  border-radius: 10px;
  background-color: #fffcfc70;
  padding: 10px;
  border: 2px dashed darkgrey;
  margin: 10px;
  max-height: 350px;
}

.param-meta-one-auth-add {
  text-align: center;
  cursor: pointer;
}

.range-input {
  margin: 10px;
  text-align: center;
}

.non {
  text-align: center;
}

.param-inner-role-permissions {
  max-height: 300px;
}

.param-inner-rr {
  max-height: 330px;
}

.add-rr-button {
  margin-bottom: 10px;
  width: 290px;
}

.delete {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 3px;
  background-color: #ff000099;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(185, 37, 37, 0.21);
  cursor: pointer;
  z-index: 10;
}

</style>
