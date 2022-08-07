import axios from 'axios'
import { trans } from '@/utils/tanslate'
import Vue from 'vue'
import { cancelTestTime, getToken, removeToken } from '@/utils/token'
import { prefix } from '@/utils/api'
import router from '@/router'

axios.interceptors.request.use(
  function (config) {
    config.baseURL = prefix
    if (config.url === '/user/login') return config
    if (!config.params) config.params = {}
    if (!config.params.uuid) {
      config.params = {
        uuid: getToken(),
        ...config.params
      }
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
    if (!['#/login', '#/outline'].includes(location.hash)) {
      router.push('/login').catch(err => {
      })
      cancelTestTime()
      removeToken()
    }
    return error.response.data
  }
)
