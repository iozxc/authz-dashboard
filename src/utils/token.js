import axios from '_axios@0.21.4@axios'
import Vue from 'vue'
import router from '@/router'
import { trans } from '@/utils/tanslate'

export function saveToken (token) {
  window.localStorage.setItem('authz_db_uuid', token)
}

export function getToken () {
  return window.localStorage.getItem('authz_db_uuid')
}

// 删除token
export function removeToken () {
  window.localStorage.removeItem('authz_db_uuid')
}

let arr = ['#/login', '#/outline']

let lastTime = new Date().getTime()
let currentTime = new Date().getTime()

let timer
let isStart = false

export const startTestTime = () => {
  if (isStart) return
  isStart = true
  timer = window.setInterval(testTime, 20 * 1000)
}

export const cancelTestTime = () => {
  window.clearInterval(timer)
  isStart = false
}

let timeOut = 60 * 1000

export function initTimeOut () {
  axios.get('/user/expiration-time').then(res => {
    timeOut = res.data
  })
}

function testTime () {
  currentTime = new Date().getTime() //更新当前时间

  if (arr.includes(location.hash)) {
    lastTime = new Date().getTime()
    return
  }

  axios.get('/user/check-status').then(res => {
    if (res.code !== 100) {
      removeToken()
      router.push('/login').then(r => {
      })
    } else if (currentTime - lastTime > timeOut) { //判断是否超时---超时
      window.clearInterval(timer)
      isStart = false
      console.log('超时')
      router.push('/outline')
      axios.get('/user/logout').then(res => {
        removeToken()
      })
    }
  })

}

document.addEventListener('mouseover', () => {
  lastTime = new Date().getTime()
})
