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
      <h5>license:</h5>
      <div style="margin-left: 10px">
        <h6>{{ docs.license.name }} :
          <a class="license-url" target="_blank" :href="docs.license.url">
            {{ docs.license.url }}
          </a>
        </h6>
      </div>
      <h5>description:</h5>
      <div style="margin-left: 10px">
        <div>{{ docs.info.description }}</div>
      </div>
    </div>
    <div class="info-header">
      Server
    </div>
    <div class="info-content">
       <h5>Application : <span class="h-inner-content">{{ docs.appVersionInfo.application }}</span> </h5>
       <h5>App Name : <span class="h-inner-content">{{ docs.appVersionInfo.appName }}</span> </h5>
       <h5>Host : <span class="h-inner-content">{{ docs.appVersionInfo.host }}</span>  </h5>
       <h5>Port : <span class="h-inner-content">{{ docs.appVersionInfo.port }}</span>  </h5>
       <h5>Base Url : <span class="h-inner-content">{{ getUrl(docs.appVersionInfo.baseUrl) }}</span>  </h5>
       <h5>OS : <span class="h-inner-content">{{ docs.appVersionInfo.os }}</span>  </h5>
       <h5>Src Folder : <span class="h-inner-content">{{ docs.appVersionInfo.srcFolder }}</span>  </h5>
       <h5>Modify Count : <span class="h-inner-content">{{ docs.appVersionInfo.version }}</span>  </h5>
       <h5>Service Count : <span class="h-inner-content">{{ docs.conns.length }}</span>  </h5>
       <h5>Services : </h5>
        <div class="server-card-list">
          <div v-for="server in servers">
            <server-card v-for="_server in server" :key="'server-'+_server.host+'-'+_server.port"
                         :server="_server">
            </server-card>
          </div>
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
import { mapMutations, mapState } from 'vuex'
import { api } from '@/utils/api'
import { trans} from '@/utils/tanslate'

export default {
  name: 'Index',
  components: {
    ServerCard,
    ApiList
  },
  data () {
    return {
      load: false
    }
  },
  methods: {
    ...mapMutations(['setServer','setDocs']),
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
    ...mapState(['docs']),
    token () {
      return getToken()
    },
    servers () {
      let k = 0
      let arr = []
      let _arr = []
      for (let i = 0, j = 0; i < this.docs.conns.length; i++) {
        if (i !== 0 && j % 5 === 0) {
          arr[k++] = _arr
          j = j % 5
          _arr = []
        }
        _arr[j++] = this.docs.conns[i]
      }
      arr[k] = _arr
      return arr
    }
  },
  mounted () {
    this.$http.get(api('/docs')).then(res => {
      this.setDocs(res.data)
      this.setServer(this.docs.appVersionInfo)
      this.load = true
    }).catch(e=>{
      this.$error(trans("token 过期, 请重新登录"))
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
    border-radius: 10px;
    padding: 10px;
    white-space: nowrap;
    overflow-y: scroll;
    overflow-x: scroll;
    background-color: #d8d8d83b;
  }
}

@media screen and (max-width: 800px) {
  #index {
    padding: 15px;
  }
}

@media screen and (max-width: 700px) {
  #index {
    padding: 10px;
  }
}

@media screen and (max-width: 600px) {
  #index {
    padding: 5px;
  }
}
</style>
