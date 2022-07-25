<template>
  <div id="index" v-if="load">
    <div class="info-header">Authz {{ docs.authz ? `-${docs.authz}` : '' }}</div>
    <div class="info-content">
      <h5>{{ docs.info.title }} <span class="h-inner-content">{{ docs.info.version }}</span></h5>
      <div style="margin-left: 10px">
        <h6>api description:
          <a target="_blank" :href="`${getUrl(docs.appVersionInfo.dashboardApiHelper)}${token?'?uuid='+token:''}`">
            {{ getUrl(docs.appVersionInfo.dashboardApiHelper) }}
          </a>
        </h6>
        <h6>api docs:
          <a target="_blank" :href="`${getUrl(docs.appVersionInfo.dashboardDocs)}${token?'?uuid='+token:''}`">
            {{ getUrl(docs.appVersionInfo.dashboardDocs) }}
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
      Server
    </div>
    <div class="info-content">
       <h5>Application : <span class="h-inner-content">{{ docs.appVersionInfo.application }}</span> </h5>
       <h5>App Name : <span class="h-inner-content">{{ docs.appVersionInfo.appName }}</span> </h5>
       <h5>Base Url : <span class="h-inner-content">{{ getUrl(docs.appVersionInfo.baseUrl) }}</span>  </h5>
       <h5>Service Count : <span class="h-inner-content">{{ docs.conns.length }}</span>  </h5>
       <h5>Services : </h5>
        <div class="server-card-list">
          <server-card v-for="server in docs.conns" :key="'server-'+server.host+'-'+server.port"
                       :server="server"></server-card>
        </div>
    </div>
    <div class="info-header">Api Permissions</div>
    <api-list :docs="docs"></api-list>
  </div>
</template>

<script>
import ApiList from '@/components/ApiList'
import { getToken } from '@/utils/token'
import ServerCard from '@/components/ServerCard'
import { prefix } from '@/utils/utils'
import { mapMutations } from 'vuex'

export default {
  name: 'Index',
  components: {
    ServerCard,
    ApiList
  },
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
  methods: {
    ...mapMutations(['setServer']),
    getUrl (v1, v2) {
      let i = window.location.href.indexOf(':')
      let h = window.location.href.substring(0, i)
      if (!v2) {
        return `${h}://${v1}`
      } else {
        return `${h}://${v1}:${v2}`
      }
    }
  },
  computed: {
    token () {
      return getToken()
    }
  },
  mounted () {
    this.$http.get(`${prefix}/docs?uuid=${getToken()}`).then(res => {
      this.docs = res.data
      this.setServer(this.docs.appVersionInfo)
      this.load = true
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

  .server-card-list {
    max-height: 320px;
    overflow: scroll;
    border-radius: 10px;
    padding: 10px;
  }
}
</style>
