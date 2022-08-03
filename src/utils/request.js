import axios from 'axios'
import { trans } from '@/utils/tanslate'
import Vue from 'vue'
import { getToken } from '@/utils/token'
import { prefix } from '@/utils/api'
import router from '@/router'

axios.interceptors.request.use(
  function (config) {
    config.baseURL = prefix
    config.params = {
      uuid: getToken(),
      ...config.params
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(new Error(response.data.message))
    }
  },
  function (error) {
    Vue.prototype.$message.error(trans("token 过期, 请重新登录"))
    Vue.prototype.$router.push('/').catch(err => {
    })
    return error.response.data
  }
)
