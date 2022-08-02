export const getUrl = function (v1, v2) {
  let i = window.location.href.indexOf(':')
  let h = window.location.href.substring(0, i)
  if (!v2) {
    return `${h}://${v1}`
  } else {
    return `${h}://${v1}:${v2}`
  }
}
