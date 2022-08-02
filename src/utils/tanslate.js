import transJson from '@/utils/translate.json'

let lang = ['en-US', 'zh-CN']

let cur_lang = 'zh-CN'
// let cur_lang = 'en-US'

export const changeLang = function (v) {
  cur_lang = v
}
export const trans = function (v) {
  if (cur_lang === 'zh-CN') return v
  return transJson[v][cur_lang]
}
