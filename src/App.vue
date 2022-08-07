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
import { initTimeOut } from '@/utils/token'

export default {
  name: 'App',
  components: { HeaderLayout },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  mounted () {
    initTimeOut()
  }
}
</script>

<style lang="less">
</style>
