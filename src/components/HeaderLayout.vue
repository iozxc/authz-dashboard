<template>
	<header class="header" :class="{'header-show':show,'header-fade':!show,
					 'scroll-top': isTop,'scroll-not-top': !isTop}">
		<div class="logo">
			<router-link to="/">
				<img style="-webkit-user-drag: none;" src="@/assets/img/authz.png" alt="omisheep" width="120" height="40">
			</router-link>
		</div>
		<div class="header-menu" v-if="activeId!==0">
			<div class="menu-item hover-hand" :class="{'active':activeId===1}" @click="goDocs">
        <svg class="icon  router-icon hide"  style="font-size: 15px" aria-hidden="true">
          <use xlink:href="#icon-API"></use>
         </svg>
				{{ trans('文档') }}
			</div>
			<div class="menu-item hover-hand" :class="{'active':activeId===2}" @click="goDevice">
				<svg class="icon router-icon hide" style="font-size: 16px" aria-hidden="true">
          <use xlink:href="#icon-Devices"></use>
         </svg>

        {{ trans('设备管理') }}
			</div>
      			<div class="menu-item hover-hand" :class="{'active':activeId===3}" @click="goData">
				<svg class="icon router-icon hide" style="font-size: 16px" aria-hidden="true">
          <use xlink:href="#icon-OpenData"></use>
         </svg>

        {{ trans('数据权限') }}
			</div>
		</div>
		<div class="user-info-space">
			<div class="user-info user-info-logout" @click="exit" v-if="activeId!==0">
				<span style="color: #0000004f">{{ trans('退出') }}</span>
			</div>
			<router-link to="/login" v-if="activeId===0">
				<div class="user-info user-info-login">
					<span class="login" style="color: rgba(255,255,255,0.75)">{{ trans('登录') }}</span>
				</div>
			</router-link>
		</div>


	</header>
</template>

<script>
import { removeToken } from '@/utils/token'
import { trans } from '@/utils/tanslate'
import axios from '_axios@0.21.4@axios'

export default {
  name: 'HeaderLayout',
  comments: {},
  data () {
    return {
      showToTop: false,
      show: true,
      scroll: 0,
      isTop: true,
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  computed: {
    activeId () {
      if (this.$route.path === '/') return 1
      if (this.$route.path.startsWith('/docs')) return 1
      if (this.$route.path.startsWith('/device')) return 2
      if (this.$route.path.startsWith('/data')) return 3
      return 0
    },
  },
  methods: {
    trans,
    goDocs () {
      this.$router.push('/').catch(err => {
      })
    },
    goDevice () {
      this.$router.push('/device').catch(err => {
      })
    },
    goData () {
      this.$router.push('/data').catch(err => {
      })
    },
    exit () {
      this.$notification.success({
        message: 'Exit successful',
        duration: 1
      })
      this.$router.push('/login').catch(err => {
      })
      axios.get('/user/logout').then(res => {
      })
      removeToken()
    },
    handleScroll () {
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

.logo {
  -webkit-user-drag: none;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;

  .logo-font {
    font-size: 20px;
    margin-left: 3px;
  }
}

.user-info {
  cursor: pointer;
  float: right;
  width: 100px;
  height: 100%;
  padding: 5px;
  line-height: 100%;
  text-align: center;
  font-weight: 600;
  border-radius: 5px;
  box-shadow: 0 1px 1px #00000014;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.user-info-logout {
  border: #e0e1e0 solid 1px;
  background-color: var(--button-color);
}

.user-info-login {
  background-color: var(--main-color);
  color: white;
}

.header:hover {
  background-color: #fff;
  box-shadow: var(--button-shadow-color)
}

.header-menu {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 15px;
  font-size: 20px;

  .active {
    color: #ce7e49;
  }
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

.login {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}

a {
  text-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  background-color: transparent;
  text-decoration: none;
  color: rgba(0, 0, 0, .7);
}

a:hover {
  color: black;
}

.router-icon {
  display: unset;
}

@media screen and (max-width: 700px) {
  .hide{
    opacity: 0;
    position: absolute;
  }

  .header-menu {
    padding: 0;
    margin-left: 50px;
    font-size: 16px;
  }
}

@media screen and (max-width: 580px) {

  .header-menu {
    padding: 0;
    margin-left: 20px;
    font-size: 16px;
  }
}

@media screen and (max-width: 540px) {

  .header-menu {
    padding: 0;
    margin-left: 0px;
    font-size: 16px;
  }
}

@media screen and (max-width: 500px) {
  .router-icon {
    display: none;
  }

  .header {
    padding: 0 10px;
  }

  .menu-item:not(:last-child) {
    margin-right: 5px;
  }

  .header-menu {
    padding: 0;
    font-size: 16px;
  }

  .user-info-space {
    transform: scale(0.8);
  }
}
</style>
