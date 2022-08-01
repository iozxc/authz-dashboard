<template>
  <div id="api-list">
      <a-collapse @change="changeActivekey">
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
        <a-collapse @change="changeActivekey">
          <a-collapse-panel :key="index1+'-'+index2" v-for="(v11,index2) in v1" :show-arrow="false"
                            style="margin-bottom: 15px" :style="methodStyle[v11.method]">
            <div slot="header" class="collapse-header">
              <span class="api-method" :class="methodColorClass(v11.method)">{{ v11.method }}</span>
              <div class="api-path">
                <span v-html="parsePath(v11.path)"></span>
                <svg class="icon" aria-hidden="true" v-if="hasAuth(v11)">
                  <use xlink:href="#icon-menu_rolepermiss"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="hasRateLimit(v11)">
                  <use xlink:href="#icon-rate"></use>
                </svg>
                <svg class="icon" aria-hidden="true" v-if="hasRequireLogin(v11)">
                  <use xlink:href="#icon-Login"></use>
                 </svg>
              </div>

            </div>
            <div>
              <div class="p-tags">
                <a-checkable-tag v-model="getPath(v11).requireLogin"
                                 @change="handleChange(v11)"
                                 style="background: #f7f7f7;margin-bottom: 5px; width: 90px;text-align: center;">
                  {{ getPath(v11).requireLogin ? 'Require Login' : 'Not Login' }}
                </a-checkable-tag>
                <a-tag v-if="hasAuth(v11)"
                       style="background-color: var(--main-color) !important;cursor: unset;margin-bottom: 5px;text-align: center;">
                  Auth
                </a-tag>
              </div>
              <card class="card-item div-text-scroll" :path="getPath(v11)" :rateLimit="rateLimit(v11)">
              </card>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
import Card from '@/components/Card'

export default {
  name: 'ApiList',
  components: {
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
    changeActivekey (key) {
    },
    handleChange (v) {
      this.getPath(v).requireLogin !== this.getPath(v).requireLogin // axios
    },
    hasRateLimit (v) {
      return this.docs.rateLimit[v.path] && this.docs.rateLimit[v.path][v.method]
    },
    rateLimit (v) {
      return this.hasRateLimit(v) ? this.docs.rateLimit[v.path][v.method] : null
    },
    hasAuth (v) {
      return this.getPath(v).auth
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
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }
}

.card-item {
  margin-right: 110px;
  padding: 10px;
  max-height: 300px;
}
</style>
