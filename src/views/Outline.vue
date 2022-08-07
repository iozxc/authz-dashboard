<template>
  <div class="outline-content">
		<h1>由于您长时间未操作，请重新登录！</h1>
		<p style="text-align: center;">
			<span id="second" style="color: red; font-size: 20px;">{{ count }}</span>s后，您将返回 <router-link
      to="/login">登录</router-link>
      页面。
		</p>
	</div>
</template>

<script>
export default {
  name: 'Outline',
  data () {
    return {
      count: 10
    }
  },
  methods: {},
  mounted () {
    let timer = setInterval(() => {
      this.count--
      if (this.count === 0) {
        clearInterval(timer)
        this.$router.push('/login')
      }
    }, 1000)

  }
}
</script>

<style lang="less" scoped>

.outline-content {
  padding: 265px 20px 0 20px;
  text-align: center;
}

.outline-content h1 {
  font-size: 36px;
  color: #cb9f63;
  line-height: 60px;
  text-align: center;
}

.outline-content p {
  font-size: 18px;
  color: #66686A;
  line-height: 24px;
  text-align: center;
}

</style>
