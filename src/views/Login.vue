<template>
  <div class="login">
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <div class="form">
          <h1>Authz Dashboard</h1>
          <span>use your account</span>
          <input type="text" v-model:value="username" placeholder="username"/>
          <input type="password" v-model:value="password" placeholder="password"/>
          <button @click="doLogin" :disabled="waitLogin">{{ waitLogin ? 'Waiting...' : 'Login' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getToken, saveToken } from '@/utils/token'
import { prefix } from '@/utils/utils'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      waitLogin: false,
      ok: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    doLogin () {
      if (this.waitLogin) {
        this.$message.warning('waiting')
        return
      }
      if (this.ok) return
      this.waitLogin = true
      let username = this.username
      let password = this.password
      let data = {
        username,
        password
      }
      this.$http.post(`${prefix}/user/login`, data).then(res => {
        if (res.data.code === 100) {
          this.$notification.success({
            message: 'Successful: ' + username,
            duration: 3
          })
          this.setUser(res.data.data.username)
          saveToken(res.data.data.uuid)
          this.$router.push('/').catch(err => {
          })
          this.ok = true
        } else {
          this.password = ''
          this.$message.error('Account password error')
        }
        this.waitLogin = false
      })

    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: url("~@/assets/img/bg.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;

  -webkit-display: flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  user-select: none;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid var(--main-color);
  background-color: var(--main-color);
  color: #FFFFFF;
  font-size: var(--main-font-size);
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 20px;
  transition: transform 80ms ease-in;
}


button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

.form {
  background-color: #ffffffba;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  text-decoration: none;
  position: relative;
  width: 80%;
  display: block;
  margin: 9px auto;
  padding: 8px;
  border-radius: 6px;
  border: none;
  height: 50px;
  background: var(--input-fade-color) !important;
  user-select: unset;
}

input:focus-within {
  border: none;
}

.container {
  background-color: #ffffffba;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
  0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  height: 350px;
  width: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 100%;
  z-index: 2;
}

@media screen and (max-width: 500px) {
  .container {
    width: 380px;
  }
}
</style>
