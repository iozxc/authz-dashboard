<template>
  <div id="api-list">
      <a-collapse @change="changeActiveKey">
      <a-collapse-panel v-for="(v1,v2, index1) in docs.controllers" :key="index1"
                        :show-arrow="false"
                        style="background: rgb(247, 247, 247);border-radius: 4px;margin-bottom: 4px;">
        <span slot="header">
          <a-badge :count="v1.length"
                   :number-style="{backgroundColor: '#fff',color: '#999',boxShadow: '0 0 0 1px #d9d9d9 inset'}"
                   :offset="[15,0]">
            <span class="controller-name">
              {{ v2 }}
            </span>
          </a-badge>
        </span>
        <a-collapse @change="changeActiveKey">
          <a-collapse-panel :key="index1+'-'+index2" v-for="(v11,index2) in v1" :show-arrow="false"
                            style="margin-bottom: 15px" :style="methodStyle[v11.method]">
            <div slot="header" class="collapse-header">
              <span class="api-method" :class="methodColorClass(v11.method)">{{ v11.method }}</span>
              <div class="api-path">
                <span v-html="parsePath(v11.path)"></span>
                <svg class="icon" aria-hidden="true" v-if="hasAuth(v11)">
                  <use xlink:href="#icon-menu_rolepermiss"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="hasRateLimitR(v11)">
                  <use xlink:href="#icon-rate"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="hasRequireLogin(v11)">
                  <use xlink:href="#icon-Login"></use>
                </svg>
              </div>

            </div>
            <div style="position: relative">
              <div class="p-tags">

                <a-tag v-if="hasAuth(v11)"
                       style="background-color: var(--success-color);user-select: none;
                       color: white;
                       margin-bottom: 5px; width: 120px;text-align: center;">
                  {{ getPath(v11).requireLogin ? 'Login Required' : 'No Login Required' }}
                </a-tag>
                <a-checkable-tag v-model="getPath(v11).requireLogin"
                                 v-else
                                 @change="handleChange(v11)"
                                 style="margin-bottom: 5px; width: 120px;text-align: center;">
                  {{ hasRequireLogin(v11) ? 'Login Required' : 'No Login Required' }}
                </a-checkable-tag>
                <a-tag v-if="hasAuth(v11)"
                       style="background-color: var(--main-color) !important; color: white;
                       cursor: unset;margin-bottom: 5px;text-align: center;">
                  Auth
                </a-tag>

                <a-tag v-if="!hasRateLimit(v11)" @click="addRateLimit(v11)"
                       style="background-color: #eacc6a !important; color: #090808;
                       float: right;
                       cursor: pointer;margin-bottom: 5px;text-align: center;">
                  添加 RateLimit
                </a-tag>
                  <a-tag @click="addAuth(v11)" v-if="!docs.paths[v11.path][v11.method].auth"
                         style="background-color: var(--main-color) !important; color: white;
                         float: right;
                         cursor: pointer;margin-bottom: 5px;text-align: center;">
                  添加 Auth
                </a-tag>
              </div>
              <card class="card-item div-text-scroll"
                    v-if="docs.paths[v11.path][v11.method].auth"
                    :path="docs.paths[v11.path][v11.method]">
                </card>
                <div class="delete delete-api-per"
                     v-if="docs.paths[v11.path][v11.method].auth"
                     @click="deleteAuth(v11)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                  </svg>
                </div>
                <div class="save save-api-per"
                     v-if="docs.paths[v11.path][v11.method].auth"
                     @click="saveAuth(v11)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-save"></use>
                  </svg>
                </div>

            </div>
            <div class="card-item div-text-scroll ratelimit" v-if="hasRateLimit(v11)">
              <rate-limit :rate-limit="rateLimit(v11)">
              </rate-limit>
              <div class="delete delete-rate-limit" @click="deleteRateLimit(v11)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-delete"></use>
                </svg>
              </div>
              <div class="save save-rate-limit" @click="saveRateLimit(v11)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-save"></use>
                </svg>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { api } from '@/utils/api'
import RateLimit from '@/components/RateLimit'

export default {
  name: 'ApiList',
  components: {
    RateLimit,
    Card
  },
  props: {
    docs: {
      type: Object,
      default: {
        controllers: [],
        paths: {},
        rateLimit: {}
      },
    }
  },
  data () {
    return {
      methodStyle: {
        'GET': 'background-color: rgba(97,175,254,.1);',
        'POST': 'background-color: rgba(73,204,144,.1);',
        'HEAD': 'background-color: rgba(144,18,254,.1);',
        'PUT': 'background-color: rgba(252,161,48,.1);',
        'DELETE': 'background-color: rgb(249,62,62,.1)',
        'OPTIONS': 'background-color: rgb(13,90,167,.1);',
        'PATCH': 'background-color: rgba(80,227,194,.1);',
      }
    }
  },
  methods: {
    deleteRateLimit (v) {
      this.$confirm({
        title: '确认删除RateLimit?',
        content: h => <div style="color:red;">删除后接口的请求速率将不做保护</div>,
        onOk: () => {
          this.$delete(this.docs.rateLimit[v.path], v.method)
          if (this.docs.rateLimit[v.path].length === 0) {
            this.$delete(this.docs.rateLimit, v.path)
          }
          let data = {
            operate: 'delete',
            target: 'rate',
            api: v.path,
            method: v.method
          }

          this.$http.post(api('/operate'), data).then(res => {
            if (res.data.code === 100) {
              this.$message.success(
                <div style="margin-top: 10px">
                  <div>接口 : {v.method} {v.path}</div>
                  <div>速率权限删除成功</div>
                </div>
              )
            } else {
              this.$message.error(`删除失败，网络异常`)
            }
          })

        }
      })
    },
    saveRateLimit (v) {
      let rateLimit = this.rateLimit(v)
      let data = {
        operate: 'update',
        target: 'rate',
        api: v.path,
        method: v.method,
        rateLimit
      }

      this.$http.post(api('/operate'), data).then(res => {
        if (res.data.code === 100) {
          this.getPath(v).hasRateLimit = true
          this.docs.rateLimit[v.path][v.method] = res.data.data.rateLimit
          this.$message.success(
            <div style="margin-top: 10px">
              <div>接口 : {v.method} {v.path}</div>
              <div>速率权限已修改</div>
            </div>
          )
        } else {
          this.$message.error(`修改失败`)
        }
      })
    },
    addRateLimit (v) {
      if (!this.docs.rateLimit[v.path]) {
        this.docs.rateLimit[v.path] = {}
      }
      this.docs.rateLimit[v.path][v.method] = {
        window: 10000,
        maxRequests: 3,
        minInterval: 0,
        checkType: 'ip',
        punishmentTime: [
          3000,
          5000,
          10000
        ]
      }
      this.$forceUpdate()
    },
    deleteAuth (v) {
      this.$confirm({
        title: '确认删除 Auth ?',
        content: h => <div style="color:red;">删除后的接口将不做权限保护</div>,
        onOk: () => {
          this.$delete(this.docs.paths[v.path][v.method], 'auth')
          this.docs.paths[v.path][v.method].isAuth = false
          let data = {
            operate: 'delete',
            target: 'api',
            api: v.path,
            method: v.method
          }

          this.$http.post(api('/operate'), data).then(res => {
            if (res.data.code === 100) {
              this.$message.success(
                <div style="margin-top: 10px">
                  <div>接口 : {v.method} {v.path}</div>
                  <div>API权限删除成功</div>
                </div>
              )
            } else {
              this.$message.error(`删除失败，网络异常`)
            }
          })

        }
      })
    },
    addAuth (v) {
      console.log('addAuth')
      this.docs.paths[v.path][v.method].auth = {}
      console.log('= {}')
      this.$forceUpdate()
      console.log('$forceUpdate')
    },
    saveAuth (v) {
      let auth = this.docs.paths[v.path][v.method].auth
      let data = {
        'operate': 'update',
        'target': 'api',
        'method': v.method,
        'api': v.path,
        'role': {
          'require': auth.requireRoles,
          'exclude': auth.excludeRoles
        },
        'permission': {
          'require': auth.requirePermissions,
          'exclude': auth.excludePermissions
        }
      }
      console.log(this.docs.paths[v.path][v.method])

      this.$http.post(api('/operate'), data).then(res => {
        console.log(res.data)
        if (res.data.code === 100) {
          let _path = res.data.data
          if (!_path.auth) {
            _path.auth = {
              requireRoles: [],
              requirePermissions: [],
              excludeRoles: [],
              excludePermissions: []
            }
          } else {
            if (!_path.auth.requireRoles) _path.auth.requireRoles = []
            if (!_path.auth.requirePermissions) _path.auth.requirePermissions = []
            if (!_path.auth.excludeRoles) _path.auth.excludeRoles = []
            if (!_path.auth.excludePermissions) _path.auth.excludePermissions = []
          }
          this.$set(this.docs.paths[v.path], v.method, _path)
          this.$message.success('保存成功，已自动去重')
        }
        console.log(this.docs.paths[v.path][v.method])
      })
    },
    changeActiveKey (key) {
    },
    handleChange (v) {
      let k = this.hasRequireLogin(v)
      let data = {
        'target': 'login',
        'method': v.method,
        'api': v.path,
        'value': k
      }

      this.$http.post(api('/operate'), data).then(res => {
        if (res.data.code === 100) {
          this.$message.success(
            <div style="margin-top: 10px">
              <div>接口 : {v.method} {v.path}</div>
              <div>登录权限已修改 : {k ? ' Login Required ' : ' No Login Required '}</div>
            </div>
          )
        } else {
          this.getPath(v).requireLogin = !k
          this.$message.error(`接口登录权限修改失败`)
        }
      })

    },
    hasRateLimit (v) {
      return this.docs.rateLimit[v.path] && this.docs.rateLimit[v.path][v.method]
    },
    hasRateLimitR (v) {
      return this.getPath(v).hasRateLimit
    },
    rateLimit (v) {
      return this.hasRateLimit(v) ? this.docs.rateLimit[v.path][v.method] : null
    },
    hasAuth (v) {
      return this.getPath(v).isAuth
    },
    hasRequireLogin (v) {
      return this.getPath(v).requireLogin
    },
    getPath (v) {
      return this.docs.paths[v.path][v.method]
    },
    methodColorClass (method) {
      return `api-method-${method.toLowerCase()}`
    },
    parsePath (path) {
      let _p = ''
      do {
        let n = path.search(/{.*?}/g)
        if (n === -1) break
        let f = path.indexOf('}', n)
        _p = _p + `${path.substring(0, n)}<span style="color: var(--main-color)">${path.substring(n, f + 1)}</span>`
        path = path.substring(f + 1)
      } while (true)
      if (_p) return _p
      return path
    }
  }
}
</script>

<style lang="less" scoped>
#api-list {
  width: 100%;

  .api-method {
    font-size: 14px;
    font-weight: 700;
    //min-width: 80px;
    padding: 6px 10px;
    text-align: center;
    border-radius: 3px;
    background: #000;
    text-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    color: #fff;
    //display: inline-block;

    display: flex;
    align-items: center;
    justify-items: center;
    place-items: center;
    height: 34px;

  }

  .api-method-get {
    background: rgb(97, 175, 254);
  }

  .api-method-post {
    background: rgb(73, 204, 144);
  }

  .api-method-head {
    background: rgb(144 18 254);
  }

  .api-method-put {
    background: rgb(252 161 48);
  }

  .api-method-delete {
    background: rgb(249 62 62)
  }

  .api-method-options {
    background: rgb(13 90 167);
  }

  .api-method-patch {
    background: rgb(80 227 194);
  }

  .collapse-header {
    display: flex;
    align-items: center;
    justify-items: center;
  }

  .api-path {
    margin-left: 20px;
    line-height: 34px;
    vertical-align: middle;
    text-align: center;

    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 0;
    -ms-flex: 0 3 auto;
    flex: 0 3 auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    word-break: break-all;
    font-weight: 600;
    color: #3b4151;
  }

  .ant-collapse-item .ant-collapse-no-arrow {

  }

  .controller-name {
    font-size: 24px;
    color: #3b4151;
    margin-left: 20px;
  }

  @media screen and (max-width: 500px) {
    .controller-name {
      font-size: 16px;
      margin-left: 10px;
    }

    .api-path {
      margin-left: 10px;
      //line-height: 34px;
      vertical-align: middle;
      text-align: center;
      font-size: 12px;
      line-height: 12px;
    }

    .api-method {
      height: 24px;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .p-tags {
    //display: flex;
    //justify-items: center;
    //align-items: center;
    margin-bottom: 7px;
    padding: 10px 10px 4px 10px;
    background-color: var(--item-color);
    box-shadow: var(--item-shadow);
    border-radius: 10px;
  }
}

.card-item {
  padding: 20px;
  max-height: 400px;
  background-color: var(--item-color);
  box-shadow: var(--item-shadow);
  border-radius: 10px;
  position: relative;
}

.save {
  position: absolute;
  right: 18px;
  cursor: pointer;
  padding: 10px;
  background-color: #e6e6e654;
  border-radius: 10px;
  box-shadow: var(--button-shadow-color);
}

.delete {
  position: absolute;
  right: 80px;
  bottom: 14px;
  cursor: pointer;
  padding: 10px;
  background-color: #ff000099;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(185, 37, 37, 0.21);
}

.delete-rate-limit {

}

.save-api-per {
  bottom: 15px;
}

.delete-api-per {

}

.save-rate-limit {
  bottom: 15px;
}

.ratelimit {
  margin-top: 7px;
  user-select: none;
}

@media screen and (max-width: 765px) {
  .save-rate-limit {
    top: 15px;
    bottom: unset;
  }
}

@media screen and (max-width: 500px) {
  .save {
    bottom: 10px;
    right: 13px;
    padding: 5px;
  }

  .card-item {
    padding: 10px;
  }
}

</style>
