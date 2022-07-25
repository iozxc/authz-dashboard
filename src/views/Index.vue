<template>
  <div id="index">
    <div class="info-header">Authz {{ docs.authz ? `-${docs.authz}` : '' }}</div>
    <div class="info-content">
      <h5>{{ docs.info.title }} <span class="h-inner-content">{{ docs.info.version }}</span></h5>
      <div style="margin-left: 10px">
        <h6>api description:
          <a target="_blank" :href="`${docs.appVersionInfo.dashboardApiHelper}${token?'?uuid='+token:''}`">
            {{ docs.appVersionInfo.dashboardApiHelper }}
          </a>
        </h6>
        <h6>api docs:
          <a target="_blank" :href="`${docs.appVersionInfo.dashboardDocs}${token?'?uuid='+token:''}`">
            {{ docs.appVersionInfo.dashboardDocs }}
          </a>
        </h6>
      </div>
      <h5>description:</h5>
      <div style="margin-left: 10px">
        <div>{{ docs.info.description }}</div>
      </div>
      <h5>license:</h5>
      <div style="margin-left: 10px">
        <div class="license-name">{{ docs.info.license.name }}</div>
        <a class="license-url" target="_blank" :href="docs.info.license.url">{{ docs.info.license.url }}</a>
      </div>
    </div>
    <div class="info-header">
      Server Info
    </div>
    <div class="info-content">
       <h5>App Name : <span class="h-inner-content">{{ docs.appVersionInfo.appName }}</span> </h5>
       <h5>Base Url : <span class="h-inner-content">{{ docs.appVersionInfo.baseUrl }}</span>  </h5>
       <h5>Count : <span class="h-inner-content">{{ docs.conns.length }}</span>  </h5>
      <div>{{ docs.appVersionInfo }}</div>
    </div>
    <div class="info-header">Api Permissions</div>
    <api-list v-if="load" :docs="docs"></api-list>
  </div>
</template>

<script>
import ApiList from '@/components/ApiList'
import { getToken } from '@/utils/token'

export default {
  name: 'Index',
  components: { ApiList },
  data () {
    return {
      docs: {
        controllers: [],
        paths: {},
        rateLimit: {},
        appVersionInfo: {},
        info: {
          license: {}
        },
        conns: []
      },
      load: false
    }
  },
  methods: {},
  computed: {
    token () {
      return getToken()
    }
  },
  mounted () {
    this.$http.get(`v1/api/docs?uuid=${getToken()}`).then(res => {
      this.docs = res.data.data
      this.load = true
      console.log(this.docs)
    })
  }
}
</script>

<style lang="less" scoped>
#index {
  padding: 30px;
  max-width: 1460px;
  margin: 60px auto auto;

  .info-header {
    font-size: 25px;
    font-weight: 600;
    color: #0b0b0bd6;
  }

  .info-content {
    margin-left: 10px;
    margin-bottom: 20px;
  }

  .license-name {
    font-size: 12px;
    font-weight: 400;
  }

  .h-inner-content {
    font-weight: 700;
    color: #d04a1bcc;
  }
}
</style>
