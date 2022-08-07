<template>
  <div id="device">
    <device-list :blacklist="blacklist"></device-list>
  </div>
</template>

<script>
import DeviceList from '@/components/DeviceList'

export default {
  name: 'Device',
  components: { DeviceList },
  data () {
    return {
      blacklist: {}
    }
  },
  mounted () {
    this.$http.get('/device/get-all-deny-info').then(res => {
      console.log(res.data)
      this.blacklist = res.data
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
#device {
  padding: 100px 30px 30px 30px;
  max-width: 1460px;
  margin: auto;
}
</style>
