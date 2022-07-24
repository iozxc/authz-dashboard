<template>
  <div id="api-list">
    <a-collapse @change="changeActivekey" v-if="load">
      <a-collapse-panel v-for="(v1,v2, index1) in docs.controllers" :key="index1"
                        :show-arrow="false" style="background: rgb(247, 247, 247);border-radius: 4px;margin-bottom: 4px;">
        <span slot="header">
          <a-badge :count="v1.length"
                   :number-style="{backgroundColor: '#fff',color: '#999',boxShadow: '0 0 0 1px #d9d9d9 inset'}"
                   :offset="[15,0]">
            <span style="font-size: 24px;font-family: Titillium Web,sans-serif;color: #3b4151;margin-left: 20px">
              {{v2 }}
            </span>
          </a-badge>
        </span>
        <a-collapse @change="changeActivekey">
          <a-collapse-panel :key="index1+'-'+index2" v-for="(v11,index2) in v1" :show-arrow="false"
                            style="margin-bottom: 15px" :style="methodStyle[v11.method]">
            <div slot="header" class="collapse-header">
              <span class="api-method" :class="methodColorClass[v11.method]">{{ v11.method }}</span>
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
              <a-tag v-if="hasAuth(v11)"
                     style="float: right;background-color: var(--main-color) !important;cursor: unset;">
                Auth
              </a-tag>
              <a-checkable-tag v-else v-model="getPath(v11).requireLogin" @change="handleChange(v11)"
                               style="background: #f7f7f7;float: right;">
                {{ getPath(v11).requireLogin ? 'Require Login' : 'Not Login' }}
              </a-checkable-tag>
              <card :path="getPath(v11)">
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
  name: 'Index',
  components: { Card },
  data () {
    return {
      methodStyle: {
        'GET': 'background-color: rgba(97,175,254,.1);',
        'POST': 'background-color: rgba(73,204,144,.1);'
      },
      methodColorClass: {
        'GET': 'api-method-get',
        'POST': 'api-method-post',
      },
      docs: {
        controllers: [],
        paths: {},
        rateLimit: {}
      },
      load: false
    }
  },
  methods: {
    changeActivekey (key) {
      console.log(key)
    },
    handleChange (v) {
      this.getPath(v).requireLogin !== this.getPath(v).requireLogin // axios
    },
    hasRateLimit (v) {
      return this.docs.rateLimit[v.path] && this.docs.rateLimit[v.path][v.method]
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
  },
  mounted () {
    this.$http.get(`v1/api/docs?uuid=${getToken()}`).then(res => {
      console.log(res.data)
      this.docs = res.data.data
      this.load = true
      console.log(this.docs)
      console.log(this.docs.controllers)
    })
    console.log(this.$route.path)
  }
}
</script>

<style lang="less" scoped>
#api-list {
  padding: 30px;

  .api-method {
    font-size: 14px;
    font-weight: 700;
    min-width: 80px;
    padding: 6px 10px;
    text-align: center;
    border-radius: 3px;
    background: #000;
    text-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    color: #fff;
    display: inline-block;

  }

  .api-method-get {
    background: #61affe;
  }

  .api-method-post {
    background: #49cc90;
  }

  .collapse-header {
    display: flex;
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

}
</style>
