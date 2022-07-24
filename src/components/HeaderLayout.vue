<template>
	<header class="header" :class="{'header-show':show,'header-fade':!show,
					 'scroll-top': isTop,'scroll-not-top': !isTop}">
		<div class="logo">
			<router-link to="/">
				<img src="http://cdn.omisheep.cn/upload/img/sys/omisheep.png" alt="omisheep" width="130" height="40">
			</router-link>
		</div>
		<div class="header-menu">
			<div class="menu-item hover-hand" @click="goto" :style="{color: activeId===1?'#ce7e49':''}">
				<icon-font type="icon-index" style="font-size: 20px"></icon-font>
				主页
			</div>
			<div class="menu-item hover-hand" @click="toSearch" :style="{color: activeId===2?'#89c449':''}">
				<icon-font type="icon-explore" style="font-size: 20px"></icon-font>
				探索
			</div>
		</div>
		<div class="user-info-space">
			<div class="user-info" v-if="username">
				<router-link to="/user">
					<a-avatar src="@/assets/img/login.png" :size="54"></a-avatar>
				</router-link>
			</div>
			<router-link to="/login" v-if="!username">
				<div class="user-info user-info-none">
					<a-avatar src="" :size="54"></a-avatar>
					<span class="login">登录</span>
				</div>
			</router-link>
		</div>


	</header>
</template>

<script>
import { mapState } from "vuex";
import { IconFont } from "@/utils/common";

export default {
	name: 'HeaderLayout',
	comments: {
		IconFont
	},
	data () {
		return {
			showToTop: false,
			show: true,
			scroll: 0,
			isTop: false,
		}
	},
	mounted () {
		window.addEventListener('scroll', this.handleScroll, true);
	},
	computed: {
		...mapState(['username']),
		activeId () {
			console.log(this.$route.path)
			if (this.$route.path === '/') return 1;
			if (this.$route.path.startsWith('/search')) return 2;
			if (this.$route.path.startsWith('/user')) return 3;
		},
		// showUserInfo () {
		// 	return !this.$route.path.startsWith('/user')
		// },
		loginUrl () {
			return 'http://omisheep.cn/login'
		}
	},
	methods: {

		toHome () {
			this.$router.push("/user").catch(err => {

			})
		},
		goto () {
			this.$router.push('/').catch(err => {
			})
		},
		toSearch () {
			this.$router.push('/search').catch(err => {
			})
		},
		login () {
			console.log("login")
		},
		handleScroll () {
			// 页面滚动距顶部距离
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			this.isTop = scrollTop <= 0
		}
	},

}
</script>

<style lang="less" scoped>
.header {
	position: fixed;
	width: 100%;
	height: 64px;
	line-height: 64px;
	padding: 0 50px;
	background-color: rgba(255, 255, 255, .2);
	box-shadow: initial;
	horiz-align: center;
	z-index: 999;
	user-select: none;
	transition: background-color, top .3s ease-in-out;

	display: flex;
	align-items: center;
}

.user-info-none {
	cursor: url("~@/assets/img/cursor_hand.png"), url("~@/assets/img/cursor.png"), default;
}

.header-show {
	top: 0;
}

.header-fade {
	top: -64px;
}

.scroll-top {
	background-color: rgba(255, 255, 255, 0.2);
}

.scroll-not-top {
	background-color: rgba(255, 255, 255, 0.8);
	background-color: #fff;
	box-shadow: 0 2px 4px #00000014;
}

//.header{
//	background-color: #fff;
//	box-shadow: 0 2px 4px #00000014;
//}

.logo {
	overflow: hidden;
	display: inline-block;
	cursor: pointer;

	.logo-font {
		font-size: 20px;
		margin-left: 3px;
	}
}

.user-info {
	cursor: url("~@/assets/img/cursor_hand.png"), default;
	float: right;
	width: 100px;
	height: 100%;
	padding: 5px;
	line-height: 100%;
	text-align: center;
}

.header:hover {
	//background-color: rgba(255, 255, 255, 0.8);
	//border-bottom: 1px solid rgb(210, 205, 205);
	background-color: #fff;
	box-shadow: 0 2px 4px #00000014;
}

.header-menu {
	display: flex;
	align-items: center;
	margin-left: auto;
	padding: 0 15px;
	font-size: 20px;
}

.user-info-space {
	display: flex;
	margin-left: auto;
}

.menu-item {
	overflow: hidden;
	height: 64px;
}

.menu-item:not(:last-child) {
	margin-right: 20px;
}

.notify {
	position: relative;
}

.notify:before {
	content: "";
	position: absolute;
	background-color: #fdca00;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	right: -6px;
	top: 20px;
}

</style>
