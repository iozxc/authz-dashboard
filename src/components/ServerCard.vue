<template>
  <a ref="a" @click.prevent="click" :href="url" target="_blank" class="server-card-a"
     :class="{'not-allowed':!server.dashboard}">
    <div class="server-card" :class="{'not-allowed':!server.dashboard,'allowed': server.dashboard}">
      <svg class="icon" aria-hidden="true" style="margin-left: 10px" v-if="server.dashboard && !eq">
        <use xlink:href="#icon-server"></use>
      </svg>
      <svg class="icon" aria-hidden="true" style="margin-left: 10px" v-if="!server.dashboard">
        <use xlink:href="#icon-ban"></use>
      </svg>
      <svg class="icon" aria-hidden="true" style="margin-left: 10px" v-if="server.dashboard && eq">
        <use xlink:href="#icon-targeting"></use>
      </svg>
      <div class="server-info">
          <div>host: {{ server.host }}</div>
          <div>port: {{ server.port }}</div>
        </div>
    </div>
  </a>
</template>

<script>
import { getUrl } from '@/utils/utils'
import { getToken } from '@/utils/token'
import { mapState } from 'vuex'

export default {
  name: 'ServerCard',
  props: {
    server: {
      type: Object,
      default: {
        dashboard: null
      }
    }
  },
  computed: {
    ...mapState(['currentServer']),
    url () {
      if (!this.server.dashboard) return ''
      return `${getUrl(this.server.dashboard)}#/?uuid=${getToken()}`
    },
    eq () {
      return this.server.appName === this.currentServer.appName
        && this.server.application === this.currentServer.application
        && this.server.port === this.currentServer.port
        && this.server.host === this.currentServer.host
    }
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    click () {
      if (!this.server.dashboard) {
        this.$message.warning('Dashboard is not allowed')
      } else {
        window.open(this.url, '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.server-card {
  -webkit-user-drag: none;
  width: 170px;
  height: 50px;
  line-height: 20px;
  display: flex;
  background-color: #e0e1e0a8;
  align-items: center;
  justify-items: center;
  border-radius: 5px;
  padding: 2px;
  user-select: none;
  transition: all .2s ease-in-out;
  box-shadow: 0 2px 4px #0e0c0c38;
  margin: 10px;
}

.server-card:hover {
  background-color: #e0e1e0;
}

.server-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: auto;
}

.server-card-a {
  color: #000000c7;
  font-weight: 400;
  display: inline-block;
}

</style>
