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
             <div class="delete delete-param-meta" @click="deleteParamMeta(v1,v2,index)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-delete"></use>
                </svg>
              </div>
             <div class="save save-param-meta" @click="saveParamParamMeta(v1,v2,index)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-save"></use>
                </svg>
              </div>

             <a-col :xs="24" :sm="24" :md="13" :lg="10" :xl="10" style="text-align: center;">
                <div class="param-inner-rr div-text-scroll">
                  <h3>Resource （ 限制 访问此资源 <span style="color: green">需要</span> 某 <span
                    style="color: #ce7e49">身份｜权限</span> ）</h3>
                  <div v-for="(r,i) in meta.resources" :key="'resources-'+index+'-'+r+'-'+i" class="range-input">
                   <range-input :value-type="v1.valueType" :value-match-type="v1.valueMatchType" :items="meta.resources"
                                :item-index="i"></range-input>
                  </div>
                  <a-button type="dashed" class="add-rr-button" @click="addResources(meta)">
                    新增
                  </a-button>
                  <h3>Range （ 限制 某 <span style="color: #ce7e49">身份｜权限</span> <span style="color: red">只能</span> 访问此资源 ） </h3>
                  <div v-for="(r,i) in meta.range" :key="'range-'+index+'-'+r+'-'+i" class="range-input">
                   <range-input :value-type="v1.valueType" :value-match-type="v1.valueMatchType" :items="meta.range"
                                :item-index="i"></range-input>
                  </div>
                   <a-button type="dashed" class="add-rr-button" @click="addRange(meta)">
                    新增
                  </a-button>
                </div>
               </a-col>
             <a-col :xs="24" :sm="24" :md="11" :lg="14" :xl="14">
                <h3 style="text-align: center">Auth</h3>
                <a-row class="param-inner-role-permissions div-text-scroll">

                  <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <h4>Roles</h4>
                    <div style="margin-left: 10px">
                      <h5>Require</h5>
                      <and-or-select class="div-text-scroll" :items="meta.requireRoles"></and-or-select>
                      <h5>Exclude</h5>
                      <and-or-select class="div-text-scroll" :items="meta.excludeRoles"></and-or-select>
                    </div>
                  </a-col>

                  <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <h4>Permissions</h4>
                    <div style="margin-left: 10px">
                      <h5>Require</h5>
                      <and-or-select class="div-text-scroll" :items="meta.requirePermissions"></and-or-select>
                      <h5>Exclude</h5>
                      <and-or-select class="div-text-scroll" :items="meta.excludePermissions"></and-or-select>
                    </div>
                  </a-col>

                </a-row>
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
import { mapState } from 'vuex'

export default {
  name: 'ParamAuthValue',
  components: {
    RangeInput,
    AndOrSelect
  },
  props: {
    info: {},
    path:{},
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

    console.log(this.docs.argResource)
  },
  computed:{
    ...mapState(['docs'])
  },
  methods: {
    saveParamParamMeta (v, paramName, index) {
      let paramMeta = v.paramMetaList[index]
      let data = {
        operate: 'update',
        target: 'parameter',
        method: this.info.method,
        api: this.info.path,
        paramName,
        index,
        ...paramMeta
      }

      console.log(data)
      this.$http.post('/operate', data).then(res => {
        console.log(res)
        if (res.code === 100) {
          let _paramMeta = res.data
          if (!_paramMeta.requireRoles) _paramMeta.requireRoles = []
          if (!_paramMeta.requirePermissions) _paramMeta.requirePermissions = []
          if (!_paramMeta.excludeRoles) _paramMeta.excludeRoles = []
          if (!_paramMeta.excludePermissions) _paramMeta.excludePermissions = []
          if (!_paramMeta.range) _paramMeta.range = []
          if (!_paramMeta.resources) _paramMeta.resources = []
          paramMeta = _paramMeta
          this.$message.success('成功')
        }

      })
    },
    deleteParamMeta (v, paramName, index) {
      console.log(v)
      this.$confirm({
        title: `确认删除接口 ${this.info.method} ${this.info.path} 下的 ${paramName} 的参数权限 ?`,
        content: h => <div style="color:red;">删除后将不做权限保护</div>,
        onOk: () => {
          this.$delete(v.paramMetaList, index)

          if (this.path.hasParamAuth) {
            let data = {
              operate: 'delete',
              target: 'parameter',
              api: this.info.path,
              method: this.info.method,
              index,
              paramName
            }
            this.$http.post('/operate', data).then(res => {
              if (res.code === 100) {
                this.$message.success(
                  <div style="margin-top: 10px">
                  <div>参数 : {this.info.method} {this.info.path} - {paramName} </div>
                  <div>参数权限删除成功</div>
                </div>
                )
              } else {
                this.$message.error(`删除失败，网络异常`)
              }
            })
          }
          this.$set(this.path, 'hasParamAuth', false)
        }
      })

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
  right: 55px;
  top: 10px;
  padding: 3px;
  background-color: #ff000099;
  box-shadow: 0 1px 2px rgba(185, 37, 37, 0.21);
  border-radius: 10px;
  cursor: pointer;
  z-index: 10;
}

.save {
  position: absolute;
  right: 18px;
  cursor: pointer;
  padding: 3px;
  background-color: #36c217c7;
  border-radius: 10px;
  box-shadow: var(--button-shadow-color);
  z-index: 10;
}

</style>
