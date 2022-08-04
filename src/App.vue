<template>
  <div id="app">
    <header-layout class="header"></header-layout>
		<section class="container">
			<main class="main">
				<div class="main-content">
					<router-view/>
				</div>
			</main>
		</section>
  </div>
</template>


<script>

import HeaderLayout from '@/components/HeaderLayout'
import axios from '_axios@0.21.4@axios'
import { getToken, removeToken, saveToken } from '@/utils/token'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  components: { HeaderLayout },
  data () {
    return {}
  },
  computed: {
    ...mapState(['checkStatus'])
  },
  methods: {
    ...mapMutations(['setUser']),
    status () {
      if (getToken()==null) {
        if (this.$route.path!=='/login'){
          this.$router.push('/login')
        }
        return
      }
      axios.get(`/user/check-login`).then(res => {
        if (res.code !== 100) {
          removeToken()
          this.setUser(null)
          this.$router.push('/login')
        }
      })
    }
  },
  mounted () {
    if (this.fuc == null) this.fuc = window.setInterval(this.status, 30000)
  }
}
</script>

<style lang="less">
//#app > .container {
//  padding: 30px;
//  max-width: 1460px;
//  margin: 60px auto auto;
//}
</style>
