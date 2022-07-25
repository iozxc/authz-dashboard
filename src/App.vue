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

export default {
  name: 'App',
  components: { HeaderLayout },
  mounted () {
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
