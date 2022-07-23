import { Icon } from 'ant-design-vue'

const scriptUrl = `
http://cdn.omisheep.cn/js/k-iconfont.js
`

export const IconFont = Icon.createFromIconfontCN({ scriptUrl })

export const importScript = function (src) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  document.getElementsByTagName('head')[0].appendChild(script)
}
